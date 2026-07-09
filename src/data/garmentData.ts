import { FabricInfo, PrintingTechnique } from '../types';

export const fabrics: FabricInfo[] = [
  {
    id: 'cotton-100',
    name: '100% Cotton',
    vietnameseName: 'Cotton 100% Tự Nhiên',
    composition: '100% sợi quả bông tự nhiên',
    characteristics: [
      'Thấm hút mồ hôi cực tốt, tạo cảm giác thoáng mát dồi dào',
      'Mềm mại, thân thiện với làn da nhạy cảm, không kích ứng',
      'Dễ bị nhăn sau khi giặt, có thể hơi co rút nhẹ ở lần giặt đầu'
    ],
    pros: [
      'Thoáng khí vượt trội, phù hợp khí hậu nóng ẩm Việt Nam',
      'Thân thiện với môi trường và an toàn cho trẻ em',
      'Bám mực in rất tốt (đặc biệt là in kỹ thuật số DTG và in lụa)'
    ],
    cons: [
      'Dễ nhăn nheo, cần ủi thường xuyên',
      'Độ bền phom dáng không cao bằng vải pha sợi tổng hợp',
      'Giá thành tương đối cao'
    ],
    bestFor: 'Áo thun thời trang cao cấp, đồ em bé, đồ ngủ, áo thun mùa hè.',
    breathability: 5,
    durability: 3,
    elasticity: 3,
    priceRange: 'Cao',
    image: 'cotton'
  },
  {
    id: 'cvc-65-35',
    name: 'CVC (65% Cotton, 35% Polyester)',
    vietnameseName: 'Vải CVC (Cotton pha Poly)',
    composition: '65% Cotton và 35% Polyester',
    characteristics: [
      'Sự kết hợp hoàn hảo giữa tính mát của cotton và độ bền của polyester',
      'Ít nhăn hơn cotton 100%, giữ màu tốt và giữ phom ổn định',
      'Bề mặt vải láng mịn, sờ vào cảm giác mềm tay và dầy dặn'
    ],
    pros: [
      'Độ bền cao, ít bị xù lông hay co rút',
      'Vẫn thấm hút mồ hôi tốt nhờ hàm lượng cotton cao',
      'Dễ bảo quản, giặt nhanh khô và ít nhăn'
    ],
    cons: [
      'Kém thoáng mát hơn Cotton 100% một chút',
      'Không dùng được cho kỹ thuật in chuyển nhiệt (Sublimation) trực tiếp'
    ],
    bestFor: 'Áo thun đồng phục công ty, áo polo, thời trang công sở, thời trang dạo phố.',
    breathability: 4,
    durability: 4,
    elasticity: 4,
    priceRange: 'Trung bình',
    image: 'cvc'
  },
  {
    id: 'tici-35-65',
    name: 'Tici / TC (35% Cotton, 65% Polyester)',
    vietnameseName: 'Vải Tici (65/35)',
    composition: '35% Cotton và 65% Polyester',
    characteristics: [
      'Vải dầy dặn, đứng dáng, độ bền cơ học cực cao',
      'Hầu như không nhăn sau khi giặt',
      'Giá thành bình dân, phù hợp sản xuất số lượng lớn'
    ],
    pros: [
      'Giá cả rất tiết kiệm, tối ưu chi phí tối đa',
      'Độ bền màu cực tốt, không lo phai hay giãn vải',
      'Giữ form áo cực tốt kể cả sau nhiều lần giặt'
    ],
    cons: [
      'Thấm hút mồ hôi ở mức trung bình, hơi nóng khi mặc ngoài trời nắng gắt',
      'Bề mặt vải có thể hơi cứng so với cotton 100%'
    ],
    bestFor: 'Áo thun đồng phục công nhân, sự kiện ngắn ngày, áo khoác gió, đồ bảo hộ.',
    breathability: 2.5,
    durability: 5,
    elasticity: 3,
    priceRange: 'Thấp',
    image: 'tici'
  },
  {
    id: 'polyester-100',
    name: '100% Polyester (Vải thun lạnh / mè)',
    vietnameseName: 'Vải Thun Lạnh / Mè (100% Poly)',
    composition: '100% sợi Polyester tổng hợp',
    characteristics: [
      'Trơn bóng, cực kỳ nhẹ và láng mịn',
      'Kháng nước tốt, khô siêu nhanh, không bao giờ nhăn',
      'Có khả năng chống tia UV và chịu lực ma sát tốt'
    ],
    pros: [
      'Cực kỳ bền, không nhăn, không xù lông',
      'Khô siêu tốc, rất thích hợp cho vận động thể thao',
      'Lên màu in chuyển nhiệt (Sublimation) cực kỳ sắc nét, rực rỡ và vĩnh viễn không phai'
    ],
    cons: [
      'Không thấm hút mồ hôi vào bên trong sợi vải (chỉ đẩy mồ hôi ra ngoài bề mặt để bay hơi)',
      'Có thể gây cảm giác hầm bí đối với người không quen'
    ],
    bestFor: 'Quần áo thể thao, áo bóng đá, đồ chạy bộ, áo thun quảng cáo in tràn thân.',
    breathability: 2,
    durability: 5,
    elasticity: 4.5,
    priceRange: 'Thấp',
    image: 'poly'
  },
  {
    id: 'french-terry',
    name: 'French Terry (Nỉ da cá)',
    vietnameseName: 'Vải Nỉ Da Cá (French Terry)',
    composition: 'Thường pha Cotton và Polyester',
    characteristics: [
      'Mặt ngoài mịn màng, mặt trong có các vòng lặp sợi xếp lớp như vảy cá',
      'Giữ nhiệt tốt nhưng vẫn có độ thông thoáng nhất định',
      'Vải dầy dặn, sờ đầm tay, co giãn tốt'
    ],
    pros: [
      'Lên phom áo hoodie, sweater cực chuẩn và trẻ trung',
      'Mềm mại, ấm áp nhưng không quá nóng bí',
      'Độ bền cao, hạn chế bai nhão tối đa'
    ],
    cons: [
      'Giặt lâu khô hơn các loại vải mỏng khác',
      'Dễ bám bụi ở mặt trong da cá nếu bảo quản không kỹ'
    ],
    bestFor: 'Áo Hoodie, Sweater, quần Jogger, áo khoác giữ ấm mùa thu đông.',
    breathability: 3,
    durability: 4.5,
    elasticity: 4,
    priceRange: 'Trung bình',
    image: 'french-terry'
  }
];

export const printingTechniques: PrintingTechnique[] = [
  {
    id: 'silk-screen',
    name: 'Screen Printing',
    vietnameseName: 'In Lụa (In Lưới) Thủ Công',
    description: 'Phương pháp in truyền thống lâu đời sử dụng khuôn lưới và mực in (mực nước, mực plastisol hoặc cao su) để gạt mực trực tiếp lên vải qua tấm lưới chụp bản.',
    suitableFabrics: ['Tất cả các loại vải (Cotton, CVC, Poly, Nỉ...)'],
    minQuantity: 10,
    pros: [
      'Chi phí cực kỳ rẻ khi in số lượng lớn (từ 50 áo trở lên)',
      'Hình in dầy dặn, bền màu, có hiệu ứng nổi (in nổi/in cao) rất đẹp',
      'In được trên mọi loại chất liệu vải và mọi màu nền áo'
    ],
    cons: [
      'Chi phí ban đầu làm khuôn chụp bản rất cao (không phù hợp in lẻ 1-2 áo)',
      'Hạn chế về số lượng màu sắc trên hình vẽ (mỗi màu là một khuôn riêng)',
      'Thời gian chuẩn bị và hoàn thành lâu hơn in kỹ thuật số'
    ],
    durability: 4.5,
    vibrancy: 4,
    setupCost: 'Cao',
    unitCost: 'Rất rẻ khi đặt số lượng lớn'
  },
  {
    id: 'dtg',
    name: 'Direct to Garment (DTG)',
    vietnameseName: 'In Kỹ Thuật Số Trực Tiếp (DTG)',
    description: 'Sử dụng máy in chuyên dụng phun mực trực tiếp từ đầu phun lên bề mặt sợi vải (giống như máy in giấy văn phòng). Sử dụng mực chuyên dụng cao cấp.',
    suitableFabrics: ['Vải có hàm lượng Cotton cao (Cotton 100%, CVC)'],
    minQuantity: 1,
    pros: [
      'In được hình ảnh chuyển sắc phức tạp, ảnh chụp chân dung siêu nét',
      'Hình in cực kỳ mỏng nhẹ, sờ vào hầu như không bị cộm cứng áo',
      'Có thể in lẻ từ 1 chiếc cực nhanh không cần chế bản khuôn in'
    ],
    cons: [
      'Giá thành in rất cao, hầu như không giảm nhiều khi in số lượng lớn',
      'Chỉ in đẹp nhất trên vải Cotton 100% (trên vải Poly hình sẽ bị mờ/phai)',
      'Cần quy trình bảo quản giặt giũ kỹ lưỡng'
    ],
    durability: 3.5,
    vibrancy: 4.5,
    setupCost: 'Thấp (Không tốn khuôn)',
    unitCost: 'Cao'
  },
  {
    id: 'sublimation',
    name: 'Sublimation Printing',
    vietnameseName: 'In Chuyển Nhiệt Toàn Thân',
    description: 'Hình in được in bằng mực chuyển nhiệt lên giấy chuyên dụng, sau đó dùng máy ép nhiệt độ cao ép lên vải. Mực chuyển từ thể rắn sang thể khí và thấm sâu trực tiếp vào từng sợi vải.',
    suitableFabrics: ['100% Polyester (Thun lạnh, mè, nỉ poly), vải có màu sáng'],
    minQuantity: 1,
    pros: [
      'Mực thấm trực tiếp vào thớ vải, sờ vào hoàn toàn không có cảm giác cộm hình',
      'Độ bền vĩnh viễn, không bao giờ nứt nẻ hay bong tróc hình in',
      'In tràn thân, in 3D toàn bộ áo cực kỳ rực rỡ và sắc sảo'
    ],
    cons: [
      'Hoàn toàn KHÔNG in được trên vải 100% Cotton (mực không bám được)',
      'Chỉ in được trên vải sáng màu (Trắng, kem, hồng nhạt...). Vải tối màu không lên được hình in'
    ],
    durability: 5,
    vibrancy: 5,
    setupCost: 'Rất thấp',
    unitCost: 'Rất rẻ'
  },
  {
    id: 'heat-transfer-decal',
    name: 'Decal / Heat Transfer Vinyl',
    vietnameseName: 'In Decal Nhiệt / Ép Vinyl',
    description: 'Sử dụng máy cắt decal để cắt hình từ các cuộn màng nhiệt màu sắc hoặc in hình lên màng decal chuyên dụng, sau đó dùng máy ép nhiệt để dán chặt tấm decal lên áo.',
    suitableFabrics: ['Tất cả các chất liệu vải và mọi màu áo'],
    minQuantity: 1,
    pros: [
      'Tạo được nhiều hiệu ứng đặc biệt độc lạ: phản quang, bảy sắc cầu vồng, kim tuyến, giả da, dạ quang...',
      'In lẻ 1 cái lấy ngay, màu sắc cực kỳ nổi bật trên áo tối màu',
      'Đường nét hình in sắc sảo, độ tương phản cực kỳ cao'
    ],
    cons: [
      'Hình in là một màng nhựa dán đè lên áo nên gây bí bách vùng ngực/lưng in',
      'Dễ bị bong tróc mép hoặc nứt nẻ sau thời gian dài sử dụng nếu không giặt tay',
      'Không thể in những chi tiết mảnh li ti hoặc quá phức tạp'
    ],
    durability: 3,
    vibrancy: 4.5,
    setupCost: 'Thấp',
    unitCost: 'Trung bình'
  },
  {
    id: 'dtf',
    name: 'Direct to Film (DTF)',
    vietnameseName: 'In DTF (Kỹ thuật số màng pet)',
    description: 'Công nghệ mới nhất: in mực kỹ thuật số lên một màng PET chuyên dụng, phủ lớp keo chuyển nhiệt, sấy khô rồi ép nhiệt trực tiếp lên bề mặt áo thun.',
    suitableFabrics: ['Mọi chất liệu vải và mọi màu áo'],
    minQuantity: 1,
    pros: [
      'Kết hợp được ưu điểm của in lụa và DTG: in được hình đa sắc siêu chi tiết trên mọi chất liệu vải',
      'Hình in bền hơn decal nhiệt nhiều, mỏng dẻo, co giãn tốt theo thớ vải',
      'Chi phí in lẻ cực kỳ tốt, thời gian thi công rất nhanh'
    ],
    cons: [
      'Bề mặt in vẫn hơi cộm nhẹ (dạng màng dẻo siêu mỏng) so với in phun trực tiếp DTG',
      'Mực in có độ thoáng khí kém ở những mảng in đặc lớn'
    ],
    durability: 4,
    vibrancy: 4.8,
    setupCost: 'Rất thấp',
    unitCost: 'Trung bình'
  }
];

export const garmentSteps = [
  {
    step: '01',
    title: 'Thiết Kế & Lên Rập (Pattern Making)',
    description: 'Phác thảo ý tưởng thiết kế, vẽ chi tiết kỹ thuật (Tech Pack) và tạo bản rập chuẩn theo các size (S, M, L, XL...) trên phần mềm rập chuyên dụng như Gerber hay Optitex.'
  },
  {
    step: '02',
    title: 'Lựa Chọn & Kiểm Định Vải (Fabric Sourcing)',
    description: 'Tuyển chọn chất liệu phù hợp (cotton, poly, lanh...) theo yêu cầu thiết kế. Thực hiện kiểm tra độ co rút, kiểm định độ phai màu để đảm bảo chất lượng đồng đều trước khi sản xuất.'
  },
  {
    step: '03',
    title: 'Trải Vải & Cắt Bán Thành Phẩm (Fabric Cutting)',
    description: 'Vải cuộn được trải phẳng xếp chồng nhiều lớp cực kỳ thẳng hàng trên bàn cắt lớn. Bản rập sơ đồ được áp lên và máy cắt đầu máy hoặc máy cắt laser sẽ cắt vải thành các mảnh bán thành phẩm.'
  },
  {
    step: '04',
    title: 'In / Thêu Hoàn Thiện Chi Tiết (Printing & Embroidery)',
    description: 'Các mảnh vải bán thành phẩm (như thân trước, thân sau, tay áo) được mang đi in ấn hoặc thêu logo trước khi may ráp. Việc in trên bán thành phẩm giúp hình in chuẩn xác và không bị lỗi mép gấp.'
  },
  {
    step: '05',
    title: 'May Ráp Sản Phẩm (Sewing & Assembly)',
    description: 'Chuyền may công nghiệp thực hiện ráp các chi tiết vải lại với nhau theo quy trình khép kín: vắt sổ, may sườn, may cổ, lên lai tay và vạt áo thun. Mỗi thợ may chuyên một công đoạn cụ thể.'
  },
  {
    step: '06',
    title: 'Kiểm Soát Chất Lượng & Đóng Gói (QA/QC & Packaging)',
    description: 'Áo hoàn thiện được cắt chỉ thừa sạch sẽ, ủi hơi nước phảng phiu để phẳng nếp gấp. Bộ phận QC kiểm định nghiêm ngặt lỗi kỹ thuật, gắn thẻ bài (tag), đóng túi kiếng và thùng carton.'
  }
];

// Recommends fabrics based on answers to simple choices
export function recommendFabric(answers: {
  activity: string; // sport, uniform, daily, winter
  budget: string; // low, medium, high
  priorities: string[]; // breathe, durable, no-wrinkle, eco
}): { fabric: FabricInfo; matchScore: number; reason: string } {
  let bestFabric = fabrics[0];
  let bestScore = -1;
  let explanation = '';

  for (const fab of fabrics) {
    let score = 0;
    
    // Activity match
    if (answers.activity === 'sport') {
      if (fab.id === 'polyester-100') score += 5;
      else if (fab.id === 'french-terry') score += 1;
      else score -= 2; // cotton absorbs sweat but stays heavy, less ideal for intense sports
    } else if (answers.activity === 'uniform') {
      if (fab.id === 'cvc-65-35') score += 5;
      else if (fab.id === 'tici-35-65') score += 4;
      else if (fab.id === 'cotton-100') score += 2;
    } else if (answers.activity === 'daily') {
      if (fab.id === 'cotton-100') score += 5;
      else if (fab.id === 'cvc-65-35') score += 4;
      else if (fab.id === 'french-terry') score += 2;
    } else if (answers.activity === 'winter') {
      if (fab.id === 'french-terry') score += 5;
      else if (fab.id === 'tici-35-65') score += 2;
      else score -= 1;
    }

    // Budget match
    if (answers.budget === 'low') {
      if (fab.priceRange === 'Thấp') score += 4;
      else if (fab.priceRange === 'Trung bình') score += 1;
      else score -= 3;
    } else if (answers.budget === 'high') {
      if (fab.priceRange === 'Cao') score += 4;
      else if (fab.priceRange === 'Trung bình') score += 2;
    }

    // Priorities match
    if (answers.priorities.includes('breathe') && fab.breathability >= 4) {
      score += 3;
    }
    if (answers.priorities.includes('durable') && fab.durability >= 4) {
      score += 3;
    }
    if (answers.priorities.includes('no-wrinkle') && fab.id !== 'cotton-100') {
      score += 3; // Polyester or blends don't wrinkle
    }
    if (answers.priorities.includes('eco') && fab.id === 'cotton-100') {
      score += 4; // natural fibers
    }

    if (score > bestScore) {
      bestScore = score;
      bestFabric = fab;
    }
  }

  // Create explanation in Vietnamese based on the selection
  if (bestFabric.id === 'cotton-100') {
    explanation = 'Dựa trên nhu cầu của bạn, chất liệu Cotton 100% là sự lựa chọn tối ưu nhờ đặc tính thoáng khí tự nhiên tuyệt đối và sự an toàn, thân thiện với làn da. Nó cực kỳ lý tưởng cho trang phục dạo phố hàng ngày và những người thích sự mượt mà tự nhiên.';
  } else if (bestFabric.id === 'cvc-65-35') {
    explanation = 'Vải CVC pha trộn hoàn hảo giữa cotton thoáng mát và polyester đứng dáng, bền bỉ. Đây là sự lựa chọn cực kỳ sáng suốt cho áo đồng phục hoặc polo dạo phố nhờ tính bền bỉ cao, ít bị nhăn mà vẫn giữ được độ mát mẻ tối đa.';
  } else if (bestFabric.id === 'tici-35-65') {
    explanation = 'Vải Tici mang lại lợi thế kinh tế vượt trội và độ giữ phom áo đứng dáng cực tốt. Vì vải hầu như không nhăn và bền màu cao, nó rất phù hợp cho trang phục lao động công nghiệp, đồng phục số lượng lớn với chi phí tiết kiệm.';
  } else if (bestFabric.id === 'polyester-100') {
    explanation = 'Với nhu cầu vận động cao hoặc in ấn rực rỡ, vải thun lạnh Polyester 100% là câu trả lời lý tưởng. Vải co giãn cực tốt, kháng nước nhẹ, nhanh khô tuyệt đối và hỗ trợ hoàn hảo cho công nghệ in chuyển nhiệt không phai màu.';
  } else if (bestFabric.id === 'french-terry') {
    explanation = 'Vải nỉ da cá French Terry có độ dày dặn vượt trội và giữ ấm cơ thể rất tốt. Thiết kế các vòng lặp da cá ở mặt trong giúp giữ nhiệt mà vẫn có sự lưu thông khí nhẹ, thích hợp nhất để lên phom cho áo khoác, hoodie hay sweater thời trang.';
  }

  return { fabric: bestFabric, matchScore: bestScore, reason: explanation };
}

// Calculate estimated size based on height, weight, gender
export function calculateClothingSize(gender: 'male' | 'female', heightCm: number, weightKg: number): { size: string; fitNotes: string } {
  let size = 'M';
  let fitNotes = '';

  if (gender === 'male') {
    if (weightKg < 50) {
      size = 'S';
    } else if (weightKg >= 50 && weightKg < 62) {
      size = 'M';
    } else if (weightKg >= 62 && weightKg < 72) {
      size = 'L';
    } else if (weightKg >= 72 && weightKg < 82) {
      size = 'XL';
    } else {
      size = 'XXL';
    }

    // Height adjustments
    if (heightCm > 180 && (size === 'S' || size === 'M')) {
      size = 'L'; // Suggest bigger size for length
      fitNotes = 'Do bạn có chiều cao vượt trội (>1m80), nên chọn size L để chiều dài áo che phủ thắt lưng tốt hơn, tránh bị ngắn thụt.';
    } else if (heightCm < 162 && size === 'L') {
      size = 'M'; // Suggest smaller
      fitNotes = 'Với chiều cao dưới 1m62, size M sẽ vừa vặn hơn về chiều dài áo để tránh cảm giác bị quá dài.';
    } else {
      fitNotes = `Size ${size} được ước lượng chuẩn xác dựa trên chiều cao ${heightCm}cm và cân nặng ${weightKg}kg của nam giới Việt Nam. Mang lại cảm giác vừa vặn, chuẩn dáng.`;
    }
  } else {
    // Female
    if (weightKg < 42) {
      size = 'S';
    } else if (weightKg >= 42 && weightKg < 52) {
      size = 'M';
    } else if (weightKg >= 52 && weightKg < 60) {
      size = 'L';
    } else if (weightKg >= 60 && weightKg < 70) {
      size = 'XL';
    } else {
      size = 'XXL';
    }

    // Height adjustments
    if (heightCm > 170 && (size === 'S' || size === 'M')) {
      size = 'L';
      fitNotes = 'Do bạn cao hơn 1m70, chúng tôi khuyên bạn nên chọn size L để chiều dài tay và thân áo thoải mái khi vận động.';
    } else if (heightCm < 152 && size === 'L') {
      size = 'M';
      fitNotes = 'Chiều cao dưới 1m52 khuyên dùng size M để áo ôm phom đẹp nhất, tránh bị lùng bùng hay tay áo phủ quá dài.';
    } else {
      fitNotes = `Size ${size} tôn dáng nhẹ nhàng cho nữ giới, phù hợp với số đo chiều cao ${heightCm}cm và cân nặng ${weightKg}kg. Hoàn hảo cho trang phục thời trang nữ.`;
    }
  }

  return { size, fitNotes };
}

// Estimate printing costs
export function estimatePrintingCost(config: {
  apparelType: 'tshirt' | 'polo' | 'hoodie';
  quantity: number;
  fabricId: string;
  techniqueId: string;
  colorsCount: number;
}): {
  basePrice: number;
  printingPrice: number;
  totalPrice: number;
  unitPrice: number;
  valid: boolean;
  message: string;
} {
  let valid = true;
  let message = 'Tính toán thành công';

  // Base apparel cost (fabric quality affects this)
  let apparelBaseCost = 50000; // default t-shirt
  if (config.apparelType === 'polo') apparelBaseCost = 75000;
  if (config.apparelType === 'hoodie') apparelBaseCost = 140000;

  // Fabric modifier
  if (config.fabricId === 'cotton-100') apparelBaseCost += 20000;
  if (config.fabricId === 'french-terry') apparelBaseCost += 15000;
  if (config.fabricId === 'tici-35-65') apparelBaseCost -= 10000;
  if (config.fabricId === 'polyester-100') apparelBaseCost -= 15000;

  // Let's validate compatibility between fabric and printing technique!
  // DTG needs cotton (cotton-100, cvc-65-35)
  if (config.techniqueId === 'dtg' && config.fabricId !== 'cotton-100' && config.fabricId !== 'cvc-65-35') {
    valid = false;
    message = 'Lưu ý: Công nghệ in DTG (Kỹ thuật số trực tiếp) yêu cầu vải phải có tối thiểu 60% Cotton trở lên để mực bám tốt. Vải bạn chọn không tương thích cao, hình in có thể bị mờ nhạt hoặc phai màu sau vài lần giặt.';
  }

  // Sublimation needs light poly (polyester-100)
  if (config.techniqueId === 'sublimation' && config.fabricId !== 'polyester-100') {
    valid = false;
    message = 'Lưu ý: Công nghệ in Chuyển Nhiệt (Sublimation) chỉ bám được trên sợi Polyester 100%. Vải cotton hoặc pha cotton sẽ không giữ được mực (mực sẽ bay màu hoàn toàn khi giặt).';
  }

  // Compute printing cost per unit
  let unitPrintingCost = 25000; // baseline

  if (config.techniqueId === 'silk-screen') {
    // Silk screen setup is expensive, but unit price decreases sharply with quantity
    const setupFee = 300000; // total screen setup
    const unitInk = 8000 + (config.colorsCount * 2000); // 2000 per extra color
    unitPrintingCost = (setupFee / config.quantity) + unitInk;
  } else if (config.techniqueId === 'dtg') {
    // High premium ink, color count doesn't matter much
    unitPrintingCost = 65000;
    // slightly cheaper in bulk but not much because ink is expensive
    if (config.quantity > 50) unitPrintingCost = 55000;
  } else if (config.techniqueId === 'sublimation') {
    unitPrintingCost = 20000; // flat cheap printing
    if (config.quantity > 50) unitPrintingCost = 15000;
  } else if (config.techniqueId === 'heat-transfer-decal') {
    unitPrintingCost = 35000 + (config.colorsCount > 1 ? 5000 : 0);
    if (config.quantity > 50) unitPrintingCost = 30000;
  } else if (config.techniqueId === 'dtf') {
    unitPrintingCost = 30000;
    if (config.quantity > 50) unitPrintingCost = 24000;
  }

  // Apply bulk discount to apparel base cost
  let bulkDiscountMultiplier = 1.0;
  if (config.quantity >= 10 && config.quantity < 30) bulkDiscountMultiplier = 0.95;
  else if (config.quantity >= 30 && config.quantity < 100) bulkDiscountMultiplier = 0.90;
  else if (config.quantity >= 100) bulkDiscountMultiplier = 0.82;

  const finalApparelBaseCost = apparelBaseCost * bulkDiscountMultiplier;
  const unitPrice = Math.round(finalApparelBaseCost + unitPrintingCost);
  const totalPrice = unitPrice * config.quantity;

  return {
    basePrice: Math.round(finalApparelBaseCost * config.quantity),
    printingPrice: Math.round(unitPrintingCost * config.quantity),
    totalPrice,
    unitPrice,
    valid,
    message
  };
}
