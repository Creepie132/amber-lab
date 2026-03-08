import type { CatalogCategory } from "@/types";

export const CATALOG: CatalogCategory[] = [
  {
    category: "Buttons",
    emoji: "🔘",
    items: [
      { id: "button-primary", name: "Primary", tag: "btn" },
      { id: "button-secondary", name: "Secondary", tag: "btn" },
      { id: "button-ghost", name: "Ghost", tag: "btn" },
      { id: "button-icon", name: "Icon", tag: "btn" },
      { id: "button-danger", name: "Danger", tag: "btn" },
    ],
  },
  {
    category: "Inputs",
    emoji: "✏️",
    items: [
      { id: "input-text", name: "Text Input", tag: "input" },
      { id: "input-search", name: "Search", tag: "input" },
      { id: "input-password", name: "Password", tag: "input" },
      { id: "input-textarea", name: "Textarea", tag: "input" },
    ],
  },
  {
    category: "Cards",
    emoji: "🃏",
    items: [
      { id: "card-basic", name: "Basic Card", tag: "card" },
      { id: "card-interactive", name: "Interactive", tag: "card" },
      { id: "card-profile", name: "Profile", tag: "card" },
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
    category: "Alerts",
    emoji: "🔔",
    items: [
      { id: "alert-success", name: "Success", tag: "alert" },
      { id: "alert-error", name: "Error", tag: "alert" },
      { id: "alert-info", name: "Info", tag: "alert" },
    ],
  },
  {
    category: "Progress",
    emoji: "📊",
    items: [
      { id: "progress-bar", name: "Progress Bar", tag: "prog" },
      { id: "spinner-loader", name: "Spinner", tag: "prog" },
    ],
  },
  {
    category: "Navigation",
    emoji: "🗂️",
    items: [
      { id: "nav-tabs", name: "Tabs", tag: "nav" },
      { id: "chip-default", name: "Chips", tag: "nav" },
      { id: "chip-removable", name: "Removable Chips", tag: "nav" },
    ],
  },
  {
    category: "Controls",
    emoji: "🎛️",
    items: [
      { id: "toggle-switch", name: "Toggle", tag: "ctrl" },
      { id: "checkbox-basic", name: "Checkbox", tag: "ctrl" },
      { id: "avatar-circle", name: "Avatar Group", tag: "ctrl" },
      { id: "tooltip-basic", name: "Tooltip", tag: "ctrl" },
    ],
  },
];
