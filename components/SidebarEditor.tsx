"use client";

import { useState } from "react";
import type { SidebarSection, Theme } from "@/types";

interface SidebarEditorProps {
  sections: SidebarSection[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onChange: (sections: SidebarSection[]) => void;
  theme: Theme;
}

const ICONS = ["📁", "⚙️", "🏠", "📊", "👤", "🔔", "🔍", "📝", "💬", "🎛️", "📌", "🗂️"];

export default function SidebarEditor({
  sections,
  selectedId,
  onSelect,
  onChange,
  theme,
}: SidebarEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addSection = () => {
    const id = `section-${Date.now()}`;
    const newSection: SidebarSection = {
      id,
      title: "New Section",
      icon: ICONS[sections.length % ICONS.length],
      items: [{ id: `item-${Date.now()}`, label: "Item 1" }],
    };
    onChange([...sections, newSection]);
    onSelect(id);
    setExpandedId(id);
  };

  const removeSection = (id: string) => {
    onChange(sections.filter((s) => s.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const updateSection = (updated: SidebarSection) => {
    onChange(sections.map((s) => (s.id === updated.id ? updated : s)));
  };

  const addItem = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;
    updateSection({
      ...section,
      items: [
        ...section.items,
        { id: `item-${Date.now()}`, label: `Item ${section.items.length + 1}` },
      ],
    });
  };

  const removeItem = (sectionId: string, itemId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;
    updateSection({ ...section, items: section.items.filter((i) => i.id !== itemId) });
  };

  const updateItemLabel = (sectionId: string, itemId: string, label: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;
    updateSection({
      ...section,
      items: section.items.map((i) => (i.id === itemId ? { ...i, label } : i)),
    });
  };

  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        height: "100%",
        overflowY: "auto",
        backgroundColor: theme.surface,
        borderRight: `1px solid ${theme.border}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ padding: "12px 12px 8px", borderBottom: `1px solid ${theme.border}` }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1,
            color: theme.textMuted,
            marginBottom: 8,
          }}
        >
          Sidebar Structure
        </div>
        <button
          onClick={addSection}
          style={{
            width: "100%",
            padding: "7px",
            borderRadius: 8,
            backgroundColor: theme.primary + "22",
            color: theme.primary,
            border: `1px dashed ${theme.primary}`,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          + Add Section
        </button>
      </div>

      {/* Sections list */}
      <div style={{ flex: 1, padding: 8 }}>
        {sections.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: theme.textDim,
              fontSize: 12,
              padding: "20px 8px",
            }}
          >
            No sections yet.<br />Add one above.
          </div>
        )}

        {sections.map((section) => {
          const isExpanded = expandedId === section.id;
          const isSelected = selectedId === section.id;

          return (
            <div
              key={section.id}
              style={{
                marginBottom: 6,
                borderRadius: 10,
                border: `1px solid ${isSelected ? theme.primary : theme.border}`,
                overflow: "hidden",
              }}
            >
              {/* Section header row */}
              <div
                onClick={() => {
                  onSelect(section.id);
                  setExpandedId(isExpanded ? null : section.id);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 10px",
                  backgroundColor: isSelected ? theme.activeItemBg : theme.surfaceMid,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 14 }}>{section.icon}</span>
                <span
                  style={{
                    flex: 1,
                    fontSize: 12,
                    fontWeight: 600,
                    color: isSelected ? theme.activeItemColor : theme.textPrimary,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {section.title}
                </span>
                <span style={{ fontSize: 10, color: theme.textDim }}>{isExpanded ? "▲" : "▼"}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSection(section.id);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: theme.textMuted,
                    fontSize: 13,
                    padding: 0,
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Expanded editor */}
              {isExpanded && (
                <div style={{ padding: "8px 10px", backgroundColor: theme.surface }}>
                  {/* Title input */}
                  <input
                    value={section.title}
                    onChange={(e) => updateSection({ ...section, title: e.target.value })}
                    placeholder="Section title"
                    style={{
                      width: "100%",
                      padding: "5px 8px",
                      borderRadius: 6,
                      border: `1px solid ${theme.border}`,
                      backgroundColor: theme.surfaceHi,
                      color: theme.textPrimary,
                      fontSize: 12,
                      marginBottom: 8,
                      boxSizing: "border-box",
                    }}
                  />

                  {/* Icon picker */}
                  <div style={{ fontSize: 10, color: theme.textDim, marginBottom: 4 }}>Icon</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                    {ICONS.map((icon) => (
                      <button
                        key={icon}
                        onClick={() => updateSection({ ...section, icon })}
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 6,
                          border: `1px solid ${section.icon === icon ? theme.primary : theme.border}`,
                          backgroundColor: section.icon === icon ? theme.primary + "22" : "transparent",
                          cursor: "pointer",
                          fontSize: 13,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>

                  {/* Items */}
                  <div style={{ fontSize: 10, color: theme.textDim, marginBottom: 4 }}>Items</div>
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}
                    >
                      <input
                        value={item.label}
                        onChange={(e) => updateItemLabel(section.id, item.id, e.target.value)}
                        style={{
                          flex: 1,
                          padding: "4px 7px",
                          borderRadius: 6,
                          border: `1px solid ${theme.border}`,
                          backgroundColor: theme.surfaceHi,
                          color: theme.textPrimary,
                          fontSize: 12,
                        }}
                      />
                      <button
                        onClick={() => removeItem(section.id, item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: theme.textMuted,
                          fontSize: 13,
                          padding: 0,
                          flexShrink: 0,
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addItem(section.id)}
                    style={{
                      width: "100%",
                      padding: "4px",
                      borderRadius: 6,
                      backgroundColor: "transparent",
                      color: theme.textMuted,
                      border: `1px dashed ${theme.border}`,
                      cursor: "pointer",
                      fontSize: 11,
                      marginTop: 2,
                    }}
                  >
                    + Add Item
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
