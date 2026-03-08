export type Theme = {
  name: string;
  emoji: string;
  preview: string[];
  bg: string;
  surface: string;
  surfaceHi: string;
  surfaceMid: string;
  primary: string;
  primaryGrad: string;
  secondary: string;
  border: string;
  borderHi: string;
  borderMid: string;
  textPrimary: string;
  textSub: string;
  textMuted: string;
  textDim: string;
  activeItemBg: string;
  activeItemBorder: string;
  activeItemColor: string;
  tagActiveBg: string;
  tagActiveColor: string;
  exportBg: string;
  exportColor: string;
  monoFont: string;
  isDark: boolean;
};

export type ComponentConfig = {
  primaryColor: string;
  accentColor: string;
  borderRadius: number;
  shadowIntensity: number;
  fontSize: number;
  padding: number;
  fontFamily: string;
};

export type CatalogItem = {
  id: string;
  name: string;
  tag: string;
};

export type CatalogCategory = {
  category: string;
  emoji: string;
  items: CatalogItem[];
};
