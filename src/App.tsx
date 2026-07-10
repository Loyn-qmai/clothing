import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  MessageSquare,
  Shirt,
  Layers,
  Calculator,
  Ruler,
  RotateCcw,
  Check,
  ChevronRight,
  Info,
  Gauge,
  Scissors,
  Printer,
  HeartHandshake,
  ArrowRight,
  AlertTriangle,
  Send,
  User,
  Bot,
  HelpCircle,
  ThumbsUp,
  Award,
  Zap,
  ShoppingBag,
  Sun,
  Moon,
  Palette,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  fabrics,
  printingTechniques,
  garmentSteps,
  recommendFabric,
  calculateClothingSize,
  estimatePrintingCost
} from './data/garmentData';
import { ChatMessage, FabricInfo, PrintingTechnique } from './types';

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'chat' | 'library' | 'estimator' | 'sizeGuide'>('chat');
  
  // Library sub-tabs
  const [libSubTab, setLibSubTab] = useState<'fabrics' | 'printing' | 'steps'>('fabrics');
  
  // Selected detail item in library
  const [selectedFabricId, setSelectedFabricId] = useState<string>(fabrics[0].id);
  const [selectedPrintingId, setSelectedPrintingId] = useState<string>(printingTechniques[0].id);

  // Chatbot states
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'Xin chào! Tôi là Trợ Lý AI chuyên sâu về thời trang, dệt may và in ấn áo thun tại Việt Nam. Bạn cần tôi tư vấn về chất liệu vải, quy trình may mặc, cách đo size chuẩn hay kỹ thuật in ấn nào hôm nay?',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Cost estimator states
  const [apparelType, setApparelType] = useState<'tshirt' | 'polo' | 'hoodie'>('tshirt');
  const [estimatorFabric, setEstimatorFabric] = useState<string>(fabrics[0].id);
  const [estimatorTechnique, setEstimatorTechnique] = useState<string>(printingTechniques[0].id);
  const [quantity, setQuantity] = useState<number>(30);
  const [colorsCount, setColorsCount] = useState<number>(2);

  // Smart fabric helper states
  const [activity, setActivity] = useState<string>('daily');
  const [budget, setBudget] = useState<string>('medium');
  const [priorities, setPriorities] = useState<string[]>(['breathe', 'durable']);
  const [fabricRecommendation, setFabricRecommendation] = useState<any>(null);

  // Size calculator states
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(65);
  const [sizeSuggestion, setSizeSuggestion] = useState<any>(null);

  // Theme and page background states
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('app-theme');
    return (saved as 'light' | 'dark') || 'light';
  });
  const [pageBgColor, setPageBgColor] = useState<string>(() => {
    const saved = localStorage.getItem('app-bg-color');
    return saved || 'default';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('app-bg-color', pageBgColor);
  }, [pageBgColor]);

  const isDark = theme === 'dark';

  // Dynamic class helpers based on active theme & color customization
  const appBg = isDark 
    ? (pageBgColor === 'ocean' ? 'bg-sky-950 text-sky-100' :
       pageBgColor === 'sage' ? 'bg-emerald-950 text-emerald-100' :
       pageBgColor === 'sunset' ? 'bg-amber-950 text-amber-100' :
       pageBgColor === 'lavender' ? 'bg-purple-950 text-purple-100' :
       'bg-slate-950 text-slate-100')
    : (pageBgColor === 'ocean' ? 'bg-sky-50/70 text-sky-950' :
       pageBgColor === 'sage' ? 'bg-emerald-50/60 text-emerald-950' :
       pageBgColor === 'sunset' ? 'bg-amber-50/60 text-amber-950' :
       pageBgColor === 'lavender' ? 'bg-purple-50/60 text-purple-950' :
       'bg-slate-50 text-slate-900');

  const cardBg = isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900';
  const subCardBg = isDark ? 'bg-slate-800/80 border-slate-700/60 text-slate-200' : 'bg-slate-50 border-slate-200/80 text-slate-700';
  const textTitle = isDark ? 'text-white' : 'text-slate-900';
  const textSubTitle = isDark ? 'text-slate-200' : 'text-slate-700';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500';
  const borderCol = isDark ? 'border-slate-800' : 'border-slate-200';
  const borderLightCol = isDark ? 'border-slate-800/60' : 'border-slate-100';

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initial calculation for recommendation & size
  useEffect(() => {
    handleRecommendFabric();
  }, [activity, budget, priorities]);

  useEffect(() => {
    handleCalculateSize();
  }, [gender, height, weight]);

  // Fabric selection toggle for priorities checklist
  const togglePriority = (p: string) => {
    if (priorities.includes(p)) {
      setPriorities(priorities.filter(item => item !== p));
    } else {
      setPriorities([...priorities, p]);
    }
  };

  // Submit chat question to Gemini API
  const handleSendChat = async (textToSend?: string) => {
    const question = textToSend || chatInput;
    if (!question.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsTyping(true);

    try {
      // Send chat history and current message to Express endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: question,
          history: messages.filter(m => m.id !== 'welcome') // exclude initial chatbot greeting
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Lỗi hệ thống');
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: `❌ **Không thể kết nối trợ lý AI**: ${err.message || 'Hệ thống đang bận'}. Vui lòng thử lại sau hoặc kiểm tra cấu hình khóa bí mật (GEMINI_API_KEY) trong bảng điều khiển AI Studio.`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Trigger fabric recommendation recalculation
  const handleRecommendFabric = () => {
    const rec = recommendFabric({ activity, budget, priorities });
    setFabricRecommendation(rec);
  };

  // Trigger size calculation
  const handleCalculateSize = () => {
    const sug = calculateClothingSize(gender, height, weight);
    setSizeSuggestion(sug);
  };

  // Format currency helper
  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  // Calculate costs dynamically using helper
  const costReport = estimatePrintingCost({
    apparelType,
    quantity,
    fabricId: estimatorFabric,
    techniqueId: estimatorTechnique,
    colorsCount
  });

  // Selected Fabric & Technique metadata for details
  const selectedFabric = fabrics.find(f => f.id === selectedFabricId) || fabrics[0];
  const selectedPrinting = printingTechniques.find(p => p.id === selectedPrintingId) || printingTechniques[0];

  // Quick prompt questions for chatbot
  const suggestionPrompts = [
    'Chất vải mát nhất cho mùa hè gắt là gì?',
    'Nên chọn in DTG hay in chuyển nhiệt?',
    'In DTF màng PET ưu nhược điểm ra sao?',
    'Làm sao phân biệt vải thun cotton xịn?',
    'Cách bảo quản hình in áo thun không bong tróc?'
  ];

  return (
    <div className={`min-h-screen ${appBg} font-sans flex flex-col antialiased transition-colors duration-300`}>
      {/* Dynamic modern navbar in Bento style */}
      <header className="max-w-7xl w-full mx-auto px-4 mt-6 z-40">
        <div className={`${cardBg} border-2 rounded-2xl shadow-sm px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-4 transition-colors duration-300`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-sm">
              P
            </div>
            <div>
              <h1 className={`text-xl font-extrabold tracking-tight uppercase ${textTitle}`}>
                PHI SƠN <span className="text-indigo-600 font-black">AI Expert</span>
              </h1>
              <p className={`text-[10px] ${textMuted} font-bold uppercase tracking-widest`}>
                Cẩm Nang Số &amp; Hệ Thống Quy Chuẩn May Mặc
              </p>
            </div>
          </div>

          {/* Controls for Light/Dark and Page Color */}
          <div className={`flex items-center gap-4 lg:border-l lg:border-r ${borderCol} px-4 py-1.5 mx-auto lg:mx-0`}>
            {/* Theme switcher */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center border-2 ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700 hover:border-slate-600' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              } cursor-pointer`}
              title={isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
            >
              {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            {/* Background Color Palette Select */}
            <div className="flex items-center gap-1.5">
              <Palette className="h-4.5 w-4.5 text-slate-400 mr-1" />
              {[
                { id: 'default', color: 'bg-slate-400', label: 'Mặc định' },
                { id: 'ocean', color: 'bg-sky-400', label: 'Đại dương' },
                { id: 'sage', color: 'bg-emerald-400', label: 'Thảo nguyên' },
                { id: 'sunset', color: 'bg-amber-400', label: 'Hoàng hôn' },
                { id: 'lavender', color: 'bg-purple-400', label: 'Oải hương' }
              ].map(item => {
                const isSelected = pageBgColor === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setPageBgColor(item.id)}
                    className={`w-5 h-5 rounded-full ${item.color} border-2 ${
                      isSelected 
                        ? 'border-indigo-600 ring-2 ring-indigo-300 scale-110' 
                        : isDark ? 'border-slate-800 hover:scale-105' : 'border-white hover:scale-105'
                    } transition-all duration-200 cursor-pointer`}
                    title={item.label}
                  />
                );
              })}
            </div>
          </div>

          {/* Navigation tabs with motion indicators */}
          <nav className={`flex ${isDark ? 'bg-slate-800' : 'bg-slate-100'} p-1 rounded-xl border ${borderCol}`}>
            {[
              { id: 'chat', label: 'Trợ Lý AI', icon: Sparkles },
              { id: 'library', label: 'Kiến Thức', icon: Layers },
              { id: 'estimator', label: 'Tính Giá In', icon: Calculator },
              { id: 'sizeGuide', label: 'Vải & Size', icon: Ruler }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : isDark ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-700/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-indigo-600 rounded-lg"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`h-4.5 w-4.5 relative z-10 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main body area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 pb-24 lg:pb-8">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: AI EXPERT CHATBOT */}
          {activeTab === 'chat' && (
            <motion.div
              key="chat-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[calc(100vh-14rem)] lg:min-h-[600px]"
            >
              {/* Sidebar Q&A Prompts as a Bento Card */}
              <div className={`lg:col-span-1 ${cardBg} p-6 rounded-3xl border-2 shadow-sm flex flex-col justify-between transition-all duration-300`}>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <HelpCircle className="h-5 w-5 text-indigo-600" />
                    <h3 className={`font-extrabold ${textTitle} text-sm uppercase tracking-wider`}>Câu Hỏi Gợi Ý</h3>
                  </div>
                  <p className={`text-xs ${textMuted} mb-4 font-medium leading-relaxed`}>
                    Nhấp vào các chủ đề mẫu để gửi nhanh câu hỏi tới chuyên gia dệt may AI:
                  </p>
                  <div className="space-y-2">
                    {suggestionPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendChat(prompt)}
                        className={`w-full text-left p-3.5 rounded-2xl ${
                          isDark 
                            ? 'bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border-slate-700 hover:border-slate-600' 
                            : 'bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-950 border-slate-100 hover:border-indigo-200'
                        } text-xs border-2 transition-all duration-200 flex items-start gap-2 group font-semibold cursor-pointer`}
                      >
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-600 mt-0.5 shrink-0" />
                        <span>{prompt}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`mt-6 pt-5 border-t-2 ${borderLightCol} hidden lg:block`}>
                  <div className={`${subCardBg} p-4 rounded-2xl border-2 ${borderLightCol} flex items-start gap-3`}>
                    <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-[11px] space-y-1">
                      <p className="font-extrabold text-amber-600 uppercase tracking-wide">Lưu ý quan trọng</p>
                      <p className="font-medium leading-relaxed">
                        Mọi phản hồi được Trợ Lý AI tìm kiếm, tổng hợp tự động từ Internet và không mang tính khẳng định tuyệt đối về kiến thức nhằm tránh rủi ro sai sót. Quý khách nên đối chiếu chuyên gia thực tế trước khi áp dụng.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Interface as a Big Bento Card */}
              <div className={`lg:col-span-3 flex flex-col ${cardBg} rounded-3xl border-2 shadow-sm overflow-hidden h-[550px] sm:h-[650px] lg:h-full transition-all duration-300`}>
                {/* Chat Header */}
                <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b-2 border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="bg-indigo-600 text-white p-2 rounded-xl">
                        <Bot className="h-5 w-5" />
                      </div>
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm uppercase tracking-wide">Chuyên Gia Dệt May &amp; In Ấn</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Trợ lý AI hoạt động 24/7</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <span className="inline-block h-2 w-2 rounded-full bg-indigo-500" />
                    <span>Gemini 3.5 Flash</span>
                  </div>
                </div>

                {/* Messages Body */}
                <div className={`flex-1 overflow-y-auto p-6 space-y-4 ${isDark ? 'bg-slate-950/40' : 'bg-slate-50/50'}`}>
                  {messages.map((msg) => {
                    const isUser = msg.role === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                      >
                        <div className={`p-2.5 rounded-xl self-start border-2 ${
                          isUser 
                            ? 'bg-indigo-50 text-indigo-950 border-indigo-100' 
                            : isDark ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-slate-100 text-slate-850 border-slate-200'
                        }`}>
                          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div className="space-y-1">
                          <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                            isUser 
                              ? 'bg-indigo-600 text-white shadow-sm rounded-tr-none border-2 border-indigo-700 font-medium' 
                              : isDark ? 'bg-slate-800 text-slate-100 border-2 border-slate-700 rounded-tl-none shadow-xs font-medium' : 'bg-white text-slate-850 border-2 border-slate-200 rounded-tl-none shadow-xs font-medium'
                          }`}>
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                          </div>
                          <span className={`text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block ${isUser ? 'text-right' : 'text-left'}`}>
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  
                  {isTyping && (
                    <div className="flex gap-3 max-w-[80%]">
                      <div className={`p-2.5 rounded-xl border-2 self-start ${isDark ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-200'}`}>
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className={`border-2 p-4 rounded-2xl rounded-tl-none shadow-xs flex items-center gap-1.5 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className={`p-4 border-t-2 ${borderCol} ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendChat();
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Hỏi về chất liệu vải, in lụa, in DTF, đo size áo..."
                      className={`flex-1 border-2 rounded-2xl px-4.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold transition-all ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:bg-slate-850 focus:border-indigo-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-500'
                      }`}
                      disabled={isTyping}
                    />
                    <button
                      type="submit"
                      disabled={isTyping || !chatInput.trim()}
                      className={`px-6 rounded-2xl transition-all font-extrabold text-xs uppercase tracking-wider border-2 flex items-center gap-2 shrink-0 cursor-pointer ${
                        isDark 
                          ? 'bg-slate-800 text-white hover:bg-slate-700 border-slate-700 disabled:bg-slate-900 disabled:text-slate-600' 
                          : 'bg-slate-900 text-white hover:bg-slate-800 border-slate-950 disabled:bg-slate-200 disabled:text-slate-400'
                      }`}
                    >
                      <span className="hidden sm:inline">Gửi</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                  <p className="text-[10px] text-slate-400 mt-2 text-center font-bold uppercase tracking-wider">
                    Gợi ý: Cố gắng hỏi chi tiết nhu cầu như &quot;Vải may polo cho dân thiết kế văn phòng&quot; hoặc &quot;Chọn in gì cho 50 áo cotton gầy&quot;.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: KNOWLEDGE LIBRARY */}
          {activeTab === 'library' && (
            <motion.div
              key="library-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Library Navigation */}
              <div className="flex flex-wrap border-b-2 border-slate-200 gap-2">
                {[
                  { id: 'fabrics', label: 'Bách Khoa Sợi Vải', icon: Shirt },
                  { id: 'printing', label: 'Mục Lục In Ấn', icon: Printer },
                  { id: 'steps', label: 'Quy Trình Sản Xuất', icon: Scissors }
                ].map(subTab => {
                  const Icon = subTab.icon;
                  const isSubActive = libSubTab === subTab.id;
                  return (
                    <button
                      key={subTab.id}
                      onClick={() => setLibSubTab(subTab.id as any)}
                      className={`flex items-center gap-2 px-5 py-3 text-sm font-extrabold uppercase tracking-wide transition-all border-b-2 -mb-[2px] cursor-pointer ${
                        isSubActive 
                          ? 'border-indigo-600 text-indigo-600' 
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                      {subTab.label}
                    </button>
                  );
                })}
              </div>

              {/* Sub-tab 1: Fabrics encyclopedia */}
              {libSubTab === 'fabrics' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Left list */}
                  <div className="md:col-span-1 space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">Các Chất Vải Thông Dụng</h3>
                    {fabrics.map((fab) => {
                      const isSelected = selectedFabricId === fab.id;
                      return (
                        <button
                          key={fab.id}
                          onClick={() => setSelectedFabricId(fab.id)}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all text-sm flex items-center justify-between cursor-pointer ${
                            isSelected 
                              ? 'bg-slate-900 text-white border-slate-950 shadow-sm' 
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <p className="font-extrabold">{fab.vietnameseName}</p>
                            <p className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                              {fab.name}
                            </p>
                          </div>
                          <ChevronRight className={`h-4 w-4 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`} />
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Details Panel */}
                  <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-100">
                      <div>
                        <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-indigo-100 text-indigo-700 rounded-full border border-indigo-200">
                          Mã: {selectedFabric.id}
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 mt-2">{selectedFabric.vietnameseName}</h2>
                        <p className="text-xs text-slate-500 font-mono mt-1 font-semibold">
                          Thành phần chính: {selectedFabric.composition}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-start">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Giá thành:</span>
                        <span className={`text-xs font-extrabold px-3 py-1 rounded-md border ${
                          selectedFabric.priceRange === 'Cao' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                          selectedFabric.priceRange === 'Trung bình' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {selectedFabric.priceRange}
                        </span>
                      </div>
                    </div>

                    {/* Scores Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { label: 'Độ Thoáng Khí (Thấm hút)', score: selectedFabric.breathability },
                        { label: 'Độ Bền Vật Lý (Không sờn)', score: selectedFabric.durability },
                        { label: 'Độ Co Giãn (Đàn hồi)', score: selectedFabric.elasticity }
                      ].map((bar, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
                          <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">{bar.label}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-indigo-600 h-full rounded-full" 
                                style={{ width: `${(bar.score / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-extrabold text-slate-850 font-mono">{bar.score}/5</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Characteristic bullet points */}
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-2">
                        <Info className="h-4.5 w-4.5 text-indigo-500" />
                        Đặc Tính Nhận Diện
                      </h4>
                      <ul className="space-y-2">
                        {selectedFabric.characteristics.map((c, i) => (
                          <li key={i} className="text-xs text-slate-600 font-semibold flex items-start gap-2">
                            <span className="h-1.5 w-1.5 bg-slate-400 rounded-full mt-1.5 shrink-0" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-emerald-50/50 p-4 rounded-2xl border-2 border-emerald-100">
                        <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Check className="h-4 w-4 text-emerald-600" />
                          Ưu Điểm Nổi Trội
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedFabric.pros.map((p, i) => (
                            <li key={i} className="text-xs text-emerald-900 font-semibold flex items-start gap-1.5">
                              <span className="text-emerald-500 shrink-0">•</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-rose-50/50 p-4 rounded-2xl border-2 border-rose-100">
                        <h4 className="font-bold text-rose-950 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <span className="text-rose-600 shrink-0 font-bold">×</span>
                          Điểm Cần Hạn Chế
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedFabric.cons.map((c, i) => (
                            <li key={i} className="text-xs text-rose-900 font-semibold flex items-start gap-1.5">
                              <span className="text-rose-400 shrink-0">•</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Best for with Amber highlight box */}
                    <div className="bg-amber-50 border-2 border-amber-200 p-5 rounded-3xl text-amber-900">
                      <h4 className="font-extrabold text-amber-950 text-xs uppercase tracking-wider mb-1">Ứng Dụng Tốt Nhất Cho:</h4>
                      <p className="text-xs leading-relaxed font-bold">
                        {selectedFabric.bestFor}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-tab 2: Printing encyclopedia */}
              {libSubTab === 'printing' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Left list */}
                  <div className="md:col-span-1 space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">Công Nghệ In Ấn</h3>
                    {printingTechniques.map((tech) => {
                      const isSelected = selectedPrintingId === tech.id;
                      return (
                        <button
                          key={tech.id}
                          onClick={() => setSelectedPrintingId(tech.id)}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all text-sm flex items-center justify-between cursor-pointer ${
                            isSelected 
                              ? 'bg-slate-900 text-white border-slate-950 shadow-sm' 
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <p className="font-extrabold">{tech.vietnameseName}</p>
                            <p className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                              {tech.name}
                            </p>
                          </div>
                          <ChevronRight className={`h-4 w-4 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`} />
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Details Panel */}
                  <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-100">
                      <div>
                        <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                          Mã in: {selectedPrinting.id}
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 mt-2">{selectedPrinting.vietnameseName}</h2>
                        <p className="text-xs text-slate-500 font-mono mt-1 font-semibold">
                          Tên quốc tế: {selectedPrinting.name}
                        </p>
                      </div>
                      <div className="text-left self-start sm:self-center bg-slate-50 border-2 border-slate-100 rounded-xl p-3">
                        <span className="text-[9px] text-slate-400 uppercase font-black block tracking-wider">Sản lượng đề xuất</span>
                        <span className="text-xs font-black text-indigo-600 block">
                          Tối thiểu {selectedPrinting.minQuantity} chiếc
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-2">Nguyên Lý Hoạt Động</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        {selectedPrinting.description}
                      </p>
                    </div>

                    {/* Scores Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
                        <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">Độ Bền Hình In (Khi giặt máy)</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-indigo-600 h-full rounded-full" 
                              style={{ width: `${(selectedPrinting.durability / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-extrabold text-slate-800 font-mono">{selectedPrinting.durability}/5</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
                        <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">Độ Tươi Sáng &amp; Độ Chi Tiết</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-indigo-600 h-full rounded-full" 
                              style={{ width: `${(selectedPrinting.vibrancy / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-extrabold text-slate-800 font-mono">{selectedPrinting.vibrancy}/5</span>
                        </div>
                      </div>
                    </div>

                    {/* Suitable Fabrics */}
                    <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
                      <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-2">Vải Phù Hợp In Nhất</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPrinting.suitableFabrics.map((f, i) => (
                          <span key={i} className="bg-white border-2 border-slate-150 text-slate-800 text-xs px-3 py-1 rounded-full font-bold shadow-2xs">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-emerald-50/50 p-4 rounded-2xl border-2 border-emerald-100">
                        <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Check className="h-4 w-4 text-emerald-600" />
                          Ưu Điểm Chính
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedPrinting.pros.map((p, i) => (
                            <li key={i} className="text-xs text-emerald-900 font-semibold flex items-start gap-1.5">
                              <span className="text-emerald-500 shrink-0">•</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-rose-50/50 p-4 rounded-2xl border-2 border-rose-100">
                        <h4 className="font-bold text-rose-950 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <span className="text-rose-600 shrink-0 font-bold">×</span>
                          Nhược Điểm Cần Lưu Ý
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedPrinting.cons.map((c, i) => (
                            <li key={i} className="text-xs text-rose-900 font-semibold flex items-start gap-1.5">
                              <span className="text-rose-400 shrink-0">•</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Setup / Unit Fees */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="border-2 border-slate-100 bg-slate-50 p-4 rounded-2xl">
                        <span className="text-[9px] text-slate-400 uppercase font-black block tracking-wider">Độ phức tạp &amp; Phí chuẩn bị đầu</span>
                        <span className="text-xs font-bold text-slate-700">{selectedPrinting.setupCost}</span>
                      </div>
                      <div className="border-2 border-slate-100 bg-slate-50 p-4 rounded-2xl">
                        <span className="text-[9px] text-slate-400 uppercase font-black block tracking-wider">Biến phí in trên từng áo</span>
                        <span className="text-xs font-bold text-slate-700">{selectedPrinting.unitCost}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-tab 3: Industrial steps timeline */}
              {libSubTab === 'steps' && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-200 shadow-sm">
                  <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-6 before:md:left-8 before:w-1 before:bg-slate-100 before:z-0">
                    <div className="pb-4 border-b-2 border-slate-100 relative z-10 bg-white">
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide">Chu Trình Khép Kín May Mặc Công Nghiệp</h3>
                      <p className="text-xs text-slate-500 mt-1 font-semibold">
                        Hành trình từ tấm vải thô sơ dệt từ sợi bông thiên nhiên thành chiếc áo hoàn mỹ đóng thùng xuất xưởng.
                      </p>
                    </div>

                    {garmentSteps.map((step, idx) => (
                      <div key={idx} className="flex gap-4 md:gap-6 relative z-10 group">
                        {/* Number bullet */}
                        <div className="h-12 w-12 md:h-16 md:w-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 border-4 border-slate-100 shadow-sm font-mono font-black text-sm md:text-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                          {step.step}
                        </div>
                        {/* Content Card */}
                        <div className="flex-1 bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 hover:bg-white hover:shadow-md hover:border-indigo-200 transition-all duration-300">
                          <h4 className="font-black text-slate-900 text-sm md:text-base uppercase tracking-wide">{step.title}</h4>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed font-semibold">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: COST ESTIMATOR */}
          {activeTab === 'estimator' && (
            <motion.div
              key="estimator-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4"
            >
              {/* Configuration Inputs */}
              <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-indigo-600" />
                    Cấu Hình Chi Tiết Đơn Hàng
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">
                    Điều chỉnh các tham số sau để ước tính chi phí sản xuất và in áo gần với thực tế xưởng may nhất.
                  </p>
                </div>

                {/* 1. Apparel Type */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">1. Loại Trang Phục</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'tshirt', label: 'Áo Thun Cổ Tròn', icon: Shirt },
                      { id: 'polo', label: 'Áo Polo Có Cổ', icon: Award },
                      { id: 'hoodie', label: 'Áo Hoodie/Sweater', icon: Zap }
                    ].map(item => {
                      const Icon = item.icon;
                      const isSel = apparelType === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setApparelType(item.id as any)}
                          className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-2 cursor-pointer ${
                            isSel 
                              ? 'bg-slate-900 border-slate-950 text-white shadow-md' 
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          <Icon className={`h-5 w-5 ${isSel ? 'text-indigo-400' : 'text-slate-400'}`} />
                          <span className="text-xs font-extrabold">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Fabric Sourcing */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">2. Chất Liệu Vải</label>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Xem tab &quot;Kiến Thức&quot; để xem đặc tính</span>
                  </div>
                  <select
                    value={estimatorFabric}
                    onChange={(e) => setEstimatorFabric(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-slate-800"
                  >
                    {fabrics.map(fab => (
                      <option key={fab.id} value={fab.id}>
                        {fab.vietnameseName} ({fab.name})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Printing Technique */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">3. Công Nghệ In Đề Xuất</label>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">DTG cho cotton, Sublimation cho poly</span>
                  </div>
                  <select
                    value={estimatorTechnique}
                    onChange={(e) => setEstimatorTechnique(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-slate-800"
                  >
                    {printingTechniques.map(tech => (
                      <option key={tech.id} value={tech.id}>
                        {tech.vietnameseName} (Tối thiểu {tech.minQuantity} áo)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sliders Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Quantity Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">4. Số Lượng Áo</label>
                      <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full font-mono border border-indigo-150">
                        {quantity} chiếc
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="1000"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full accent-slate-900 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-black uppercase tracking-wider">
                      <span>1 cái (Lẻ)</span>
                      <span>50 (Vừa)</span>
                      <span>1000 (Sỉ lớn)</span>
                    </div>
                  </div>

                  {/* Colors count slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">5. Số Màu In (Nếu in lụa)</label>
                      <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full font-mono border border-indigo-150">
                        {colorsCount} màu
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={colorsCount}
                      onChange={(e) => setColorsCount(Number(e.target.value))}
                      className="w-full accent-slate-900 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-black uppercase tracking-wider">
                      <span>1 màu</span>
                      <span>5 màu</span>
                      <span>10 màu (Ảnh)</span>
                    </div>
                  </div>
                </div>

                {/* Warning / Incompatibility Box */}
                {!costReport.valid ? (
                  <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-rose-900 space-y-1">
                      <p className="font-extrabold uppercase tracking-wide">Cảnh Báo Không Tương Thích!</p>
                      <p className="leading-relaxed font-semibold">{costReport.message}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-emerald-900 space-y-1">
                      <p className="font-extrabold uppercase tracking-wide">Cấu Hình Hoàn Hảo!</p>
                      <p className="leading-relaxed font-semibold">
                        Chất liệu vải và công nghệ in bạn chọn có mức độ tương thích hóa học tối ưu. Hình in sẽ có màu sắc chuẩn, bám chặt, chống phai cực tốt.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Cost Results Display Card */}
              <div className="lg:col-span-5 bg-slate-900 text-white p-6 md:p-8 rounded-3xl border-2 border-slate-950 shadow-lg flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full text-[10px] uppercase font-bold tracking-wider">
                    Bản Ước Tính Xuất Xưởng
                  </span>
                  <h3 className="text-2xl font-black mt-4 border-b-2 border-slate-800 pb-4">
                    Tóm Tắt Đơn Hàng
                  </h3>

                  {/* Pricing Breakdown */}
                  <div className="space-y-4 py-6 border-b-2 border-slate-800">
                    <div className="flex justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
                      <span>Giá phôi áo thô ({quantity} chiếc)</span>
                      <span>{formatVND(costReport.basePrice)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
                      <span>Phí kỹ thuật &amp; công in ấn</span>
                      <span>{formatVND(costReport.printingPrice)}</span>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                      <div>
                        <span className="text-slate-400 text-[10px] block font-black uppercase tracking-widest">Giá sỉ trên mỗi áo</span>
                        <span className="text-indigo-400 text-2xl font-black">{formatVND(costReport.unitPrice)}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono font-bold">/ chiếc</span>
                    </div>
                  </div>

                  {/* Total Cost Highlight */}
                  <div className="py-6">
                    <span className="text-slate-400 text-xs block font-black uppercase tracking-widest">Tổng Chi Phí Đơn Hàng (Ước Tính)</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 block">
                      {formatVND(costReport.totalPrice)}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-2 italic leading-relaxed font-bold uppercase tracking-wider">
                      * Đã tự động áp dụng chiết khấu số lượng {quantity >= 100 ? '18%' : quantity >= 30 ? '10%' : quantity >= 10 ? '5%' : '0%'} khi may số lượng lớn.
                    </p>
                  </div>
                </div>

                {/* Bulk Pricing Info Banner */}
                <div className="bg-slate-800/80 p-4 rounded-2xl border-2 border-slate-700/50 flex items-start gap-3">
                  <Info className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-slate-300 space-y-1">
                    <p className="font-extrabold text-white uppercase tracking-wider">Yêu cầu báo giá chính xác?</p>
                    <p className="leading-relaxed font-semibold">
                      Sao chép kết quả này và dán vào phần **Trợ Lý AI** để được tư vấn thiết kế và cách tối ưu hóa chi phí in khuôn chi tiết hơn!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: SMART FABRIC SELECTOR & SIZE CALCULATOR */}
          {activeTab === 'sizeGuide' && (
            <motion.div
              key="sizeguide-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Tool A: Smart fabric recommendations helper */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <Zap className="h-5 w-5 text-indigo-600" />
                    Bộ Lọc Chọn Vải Thông Minh
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">
                    Trực quan hóa và tìm kiếm dòng vải tối ưu tương ứng theo hoạt động thường nhật của bạn.
                  </p>
                </div>

                {/* Activity Question */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Hoạt động chính chủ đạo</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'daily', label: 'Dạo phố, thời trang' },
                      { id: 'sport', label: 'Vận động, Thể thao' },
                      { id: 'uniform', label: 'Đi làm, Đồng phục' },
                      { id: 'winter', label: 'Giữ ấm, Thu Đông' }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => setActivity(item.id)}
                        className={`p-3.5 rounded-xl border-2 text-xs font-extrabold text-left transition-all cursor-pointer ${
                          activity === item.id 
                            ? 'bg-slate-900 text-white border-slate-950' 
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Question */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Ngân sách dự kiến</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'low', label: 'Tiết kiệm tối đa' },
                      { id: 'medium', label: 'Cân bằng, vừa phải' },
                      { id: 'high', label: 'Cao cấp, tinh xảo' }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => setBudget(item.id)}
                        className={`p-3 rounded-xl border-2 text-xs font-extrabold text-center transition-all cursor-pointer ${
                          budget === item.id 
                            ? 'bg-slate-900 text-white border-slate-950' 
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priorities checklist */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Yêu cầu ưu tiên (Chọn nhiều)</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'breathe', label: 'Thoáng khí, mát' },
                      { id: 'durable', label: 'Bền, ít xù lông' },
                      { id: 'no-wrinkle', label: 'Không nhăn nheo' },
                      { id: 'eco', label: 'Tự nhiên, bảo vệ da' }
                    ].map(item => {
                      const isSel = priorities.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => togglePriority(item.id)}
                          className={`px-3 py-2 rounded-lg border-2 text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                            isSel 
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-950' 
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          {isSel ? <Check className="h-3.5 w-3.5 text-indigo-600" /> : <div className="h-3.5 w-3.5 border-2 border-slate-300 rounded-sm" />}
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Result recommendation display */}
                {fabricRecommendation && (
                  <div className="bg-indigo-50/50 border-2 border-indigo-150 p-5 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] text-indigo-700 uppercase font-black tracking-wider">Chất liệu tối ưu nhất cho bạn</span>
                        <h4 className="text-lg font-black text-indigo-950 mt-1">
                          {fabricRecommendation.fabric.vietnameseName}
                        </h4>
                      </div>
                      <span className="bg-indigo-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-md shadow-xs">
                        {fabricRecommendation.fabric.priceRange}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-900 leading-relaxed font-semibold">
                      {fabricRecommendation.reason}
                    </p>
                    <div className="pt-2 border-t border-indigo-100 flex justify-between items-center text-[10px] text-indigo-700 font-extrabold uppercase tracking-wide">
                      <span>Độ co giãn: {fabricRecommendation.fabric.elasticity}/5</span>
                      <span>Độ mát: {fabricRecommendation.fabric.breathability}/5</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Tool B: Size suggestions calculator */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-indigo-600" />
                    Đo Size Áo Chuẩn Á Đông
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">
                    Nhập số đo hình thể để tìm kiếm kích thước trang phục chuẩn xác, tránh đổi trả hàng phức tạp.
                  </p>
                </div>

                {/* Gender selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Giới tính</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'male', label: 'Nam giới (Phom áo rộng dầy)' },
                      { id: 'female', label: 'Nữ giới (Phom chiết eo/chuẩn)' }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => setGender(item.id as any)}
                        className={`p-3.5 rounded-xl border-2 text-xs font-extrabold text-center transition-all cursor-pointer ${
                          gender === item.id 
                            ? 'bg-slate-900 text-white border-slate-950' 
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Height Input */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Chiều cao</label>
                    <span className="text-xs font-extrabold text-indigo-600 font-mono">
                      {height} cm ({(height/100).toFixed(2)}m)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="200"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full accent-slate-900 cursor-pointer"
                  />
                </div>

                {/* Weight Input */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Cân nặng</label>
                    <span className="text-xs font-extrabold text-indigo-600 font-mono">
                      {weight} kg
                    </span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="120"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full accent-slate-900 cursor-pointer"
                  />
                </div>

                {/* Suggestion block */}
                {sizeSuggestion && (
                  <div className="bg-amber-50 border-2 border-amber-200 p-5 rounded-2xl flex items-start gap-4">
                    {/* Big Size Display */}
                    <div className="h-16 w-16 bg-slate-900 border-2 border-slate-950 text-white font-black rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md">
                      {sizeSuggestion.size}
                    </div>
                    {/* Size Notes */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-amber-900 uppercase font-black tracking-wider block">Kích Thước Khuyên Dùng</span>
                      <p className="text-xs text-amber-950 leading-relaxed font-bold">
                        {sizeSuggestion.fitNotes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer information bar */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t-2 border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-extrabold uppercase tracking-wider text-sm">
              <HeartHandshake className="h-5 w-5 text-indigo-400" />
              <span>CÔNG TY DỆT MAY PHI SƠN</span>
            </div>
            <p className="text-slate-500 leading-relaxed font-semibold">
              Cẩm nang ngành dệt may thông minh hỗ trợ bởi công nghệ Gemini AI.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold uppercase tracking-wider text-sm">
              <Phone className="h-4.5 w-4.5 text-indigo-400" />
              <span>SĐT Liên Hệ Hỗ Trợ</span>
            </div>
            <div>
              <a 
                href="tel:0877918706" 
                className="text-2xl font-black text-indigo-400 hover:text-indigo-300 transition-colors tracking-widest font-mono block hover:underline"
              >
                0877918706
              </a>
              <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider mt-1">
                May Đo - Báo Giá - Tư Vấn Kỹ Thuật 24/7
              </p>
            </div>
          </div>

          <div className="md:text-right text-slate-500 space-y-2 font-bold">
            <div className="flex justify-start md:justify-end gap-6 mb-2">
              <div className="space-y-1 text-left md:text-right">
                <span className="text-white font-black uppercase text-[9px] block tracking-widest text-slate-300">Công Nghệ</span>
                <p className="text-slate-500 font-bold">Express + React + Tailwind</p>
              </div>
              <div className="space-y-1 text-left md:text-right">
                <span className="text-white font-black uppercase text-[9px] block tracking-widest text-slate-300">Trí Tuệ Nhân Tạo</span>
                <p className="text-slate-500 font-bold">Gemini 3.5 Flash</p>
              </div>
            </div>
            <p>© 2026 Phoiaophison</p>
            <p className="text-[10px] text-slate-600 uppercase tracking-wide">Phục vụ cộng đồng Designer, local brand &amp; các xưởng may.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <div className={`lg:hidden fixed bottom-4 left-4 right-4 z-50 ${cardBg} border-2 rounded-2xl shadow-xl px-2 py-2.5 flex items-center justify-around transition-all duration-300 backdrop-blur-md bg-opacity-95`}>
        {[
          { id: 'chat', label: 'Trợ Lý AI', icon: Sparkles },
          { id: 'library', label: 'Kiến Thức', icon: Layers },
          { id: 'estimator', label: 'Tính Giá', icon: Calculator },
          { id: 'sizeGuide', label: 'Vải & Size', icon: Ruler }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col items-center gap-1 flex-1 relative py-1 cursor-pointer"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md scale-110' 
                  : isDark ? 'text-slate-400 hover:text-slate-100' : 'text-slate-500 hover:text-indigo-600'
              }`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <span className={`text-[8px] font-black uppercase tracking-widest ${
                isActive 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : isDark ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
