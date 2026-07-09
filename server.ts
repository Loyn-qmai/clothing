import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with named parameters as instructed in gemini-api skill.
// Set User-Agent in headers for telemetry.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `Bạn là một Chuyên gia hàng đầu trong ngành Thời trang, May mặc và In ấn áo thun tại Việt Nam.
Nhiệm vụ của bạn là tư vấn, giải đáp mọi thắc mắc của người dùng về:
1. Chất liệu vải: Cách phân biệt các loại vải (Cotton 100%, CVC, Tici, Polyester thun lạnh, nỉ da cá, lanh, lụa, kaki...), đặc tính thấm hút, co giãn, độ bền, và loại vải nào phù hợp với mục đích cụ thể (vận động, mặc nhà, đi làm, làm đồng phục).
2. Công nghệ và kỹ thuật in ấn áo: Giải thích nguyên lý, ưu/nhược điểm, độ bền và chi phí của các kỹ thuật phổ biến như In lụa thủ công, In kỹ thuật số trực tiếp (DTG), In Chuyển Nhiệt (Sublimation), In Decal nhiệt/Vinyl, In DTF (màng PET).
3. Quy trình may mặc: Từ thiết kế, lên rập, cắt bán thành phẩm, in/thêu, may ráp đến kiểm định chất lượng (QA/QC) và đóng gói.
4. Cách tính toán size áo, tư vấn phối đồ và bảo quản quần áo lâu bền (như giặt lộn trái áo, không dùng chất tẩy mạnh với hình in, cách phơi đồ dầy).

Thông tin nền tảng của bạn (Hãy thống nhất thông tin này khi trả lời nếu có liên quan):
- Cotton 100%: Thoáng mát nhất, thấm hút mồ hôi tối đa, dễ nhăn, giá cao. Thích hợp in DTG hoặc in lụa.
- CVC (65/35): Pha cotton và polyester, ít nhăn, đứng phom, thấm hút tốt. Thích hợp cho áo polo và đồng phục.
- Tici / TC (35/65): Nhiều polyester, bền màu, hầu như không nhăn, giá rẻ bình dân, phù hợp đồng phục công nhân.
- Polyester (thun lạnh/mè): 100% Poly, siêu nhẹ, trơn bóng, nhanh khô, chống nhăn. Thích hợp in chuyển nhiệt toàn thân và đồ thể thao.
- Nỉ da cá (French Terry): Vải dày giữ ấm, dệt vòng lặp da cá ở mặt trong, co giãn tốt, thích hợp làm Hoodie và Sweater.
- In Lụa: Cực rẻ khi làm số lượng lớn (>50 cái).
- In DTG: In phun trực tiếp siêu nét, in lẻ từ 1 áo, chỉ in trên cotton cao.
- In Chuyển nhiệt: In tràn thân, bền vĩnh viễn không phai, nhưng chỉ in trên vải 100% Poly sáng màu.
- In DTF / PET: Ép màng pet kỹ thuật số, in được mọi vải mọi màu, hình in sắc nét, bền dẻo dai.
- In Decal/Vinyl: Cắt ép màng nhựa nổi, phản quang, dạ quang, dễ nứt viền nếu giặt máy mạnh.

Hãy trả lời bằng tiếng Việt một cách thân thiện, khách quan, giàu kiến thức, chuyên nghiệp và có định dạng dễ đọc (sử dụng gạch đầu dòng, bôi đậm từ khóa quan trọng). Đừng trả lời bằng các mã code lập trình trừ khi người dùng hỏi cụ thể về lập trình thời trang.`;

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Q&A chatbot API with Gemini
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Nội dung tin nhắn không được để trống' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Chưa cấu hình API Key cho Gemini. Vui lòng kiểm tra mục Settings > Secrets.'
      });
    }

    // Format chat history to comply with @google/genai schema: { role: 'user' | 'model', parts: [{ text: string }] }
    const contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        });
      });
    }

    // Push current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'Xin lỗi, tôi gặp sự cố khi xử lý thông tin này.';
    
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: 'Có lỗi xảy ra trong quá trình kết nối với trợ lý AI.',
      details: error.message || error
    });
  }
});

// Vite middleware setup for Development and Static assets for Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Running in Development mode with Vite middleware.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Running in Production mode serving static files from dist.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
