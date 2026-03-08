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

export type ContentType =
  | 'text'
  | 'input'
  | 'search'
  | 'chart'
  | 'stats'
  | 'list'
  | 'button-group'
  | 'image'
  | 'table';

export type ContentAlign =
  | 'top-left' | 'top-center' | 'top-right'
  | 'center-left' | 'center' | 'center-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type Widget = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  contentType: ContentType;
  contentAlign: ContentAlign;
};

export type SidebarSection = {
  id: string;
  title: string;
  icon: string;
  items: { id: string; label: string }[];
};

export type PageLayout = {
  id: string;
  name: string;
  widgets: Widget[];
  sidebarSections: SidebarSection[];
};
