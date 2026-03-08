"use client";

import type { Theme, CatalogCategory } from "@/types";

interface SidebarProps {
  catalog: CatalogCategory[];
  selectedId: string;
  onSelect: (id: string) => void;
  theme: Theme;
}

export default function Sidebar({ catalog, selectedId, onSelect, theme }: SidebarProps) {
  return (
    <aside
      className="w-[212px] flex-shrink-0 h-full overflow-y-auto p-4"
      style={{ backgroundColor: theme.surface, borderRight: `1px solid ${theme.border}` }}
    >
      <div className="mb-4">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          <span>🧪</span> Amber Lab
        </h1>
      </div>
      {catalog.map((category) => (
        <div key={category.category} className="mb-4">
          <div
            className="text-xs font-medium uppercase tracking-wide mb-2"
            style={{ color: theme.textMuted }}
          >
            {category.emoji} {category.category}
          </div>
          <div className="space-y-1">
            {category.items.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
                style={{
                  backgroundColor: selectedId === item.id ? theme.activeItemBg : "transparent",
                  borderLeft: selectedId === item.id ? `3px solid ${theme.primary}` : "3px solid transparent",
                  color: selectedId === item.id ? theme.activeItemColor : theme.textSub,
                }}
              >
                {item.name}
                <span
                  className="ml-2 text-xs px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: theme.surfaceMid,
                    color: theme.textMuted,
                  }}
                >
                  {item.tag}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
