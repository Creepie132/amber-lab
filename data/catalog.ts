import type { CatalogCategory } from "@/types";

export const CATALOG: CatalogCategory[] = [
  {
    category: "Buttons",
    emoji: "🔘",
    items: [
      { id: "button-primary", name: "Primary", tag: "btn" },
      { id: "button-secondary", name: "Secondary", tag: "btn" },
      { id: "button-ghost", name: "Ghost", tag: "btn" },
    ],
  },
  {
    category: "Inputs",
    emoji: "✏️",
    items: [
      { id: "input-text", name: "Text Input", tag: "input" },
      { id: "input-search", name: "Search", tag: "input" },
    ],
  },
  {
    category: "Cards",
    emoji: "🃏",
    items: [
      { id: "card-basic", name: "Basic Card", tag: "card" },
      { id: "card-interactive", name: "Interactive", tag: "card" },
    ],
  },
  {
    category: "Badges",
    emoji: "🏷️",
    items: [
      { id: "badge-default", name: "Default", tag: "badge" },
      { id: "badge-success", name: "Success", tag: "badge" },
      { id: "badge-warning", name: "Warning", tag: "badge" },
    ],
  },
  {
    category: "Controls",
    emoji: "🎛️",
    items: [
      { id: "toggle-switch", name: "Toggle", tag: "ctrl" },
      { id: "avatar-circle", name: "Avatar", tag: "ctrl" },
    ],
  },
];
