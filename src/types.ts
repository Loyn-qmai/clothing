export interface FabricInfo {
  id: string;
  name: string;
  vietnameseName: string;
  composition: string;
  characteristics: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  breathability: number; // 1-5 scale
  durability: number; // 1-5 scale
  elasticity: number; // 1-5 scale
  priceRange: 'Thấp' | 'Trung bình' | 'Cao' | 'Rất cao';
  image: string; // fallback or generated, let's use high quality visual representations
}

export interface PrintingTechnique {
  id: string;
  name: string;
  vietnameseName: string;
  description: string;
  suitableFabrics: string[];
  minQuantity: number;
  pros: string[];
  cons: string[];
  durability: number; // 1-5 scale
  vibrancy: number; // 1-5 scale
  setupCost: string;
  unitCost: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface SizeSuggestion {
  size: string;
  fitNotes: string;
}
