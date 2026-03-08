"use client";

import type { Widget, ContentType, ContentAlign, Theme } from "@/types";

interface PropertiesPanelProps {
  selectedWidget: Widget | null;
  onUpdateWidget: (w: Widget) => void;
  theme: Theme;
}

const CONTENT_TYPES: { value: ContentType; label: string; emoji: string }[] = [
  { value: "text", label: "Text", emoji: "📝" },
  { value: "input", label: "Input", emoji: "✏️" },
  { value: "search", label: "Search", emoji: "🔍" },
  { value: "chart", label: "Chart", emoji: "📊" },
  { value: "stats", label: "Stats", emoji: "📈" },
  { value: "list", label: "List", emoji: "📋" },
  { value: "button-group", label: "Buttons", emoji: "🔘" },
  { value: "image", label: "Image", emoji: "🖼️" },
  { value: "table", label: "Table", emoji: "📑" },
];

const ALIGNS: { value: ContentAlign; symbol: string }[] = [
  { value: "top-left", symbol: "↖" },
  { value: "top-center", symbol: "↑" },
  { value: "top-right", symbol: "↗" },
  { value: "center-left", symbol: "←" },
  { value: "center", symbol: "·" },
  { value: "center-right", symbol: "→" },
  { value: "bottom-left", symbol: "↙" },
  { value: "bottom-center", symbol: "↓" },
  { value: "bottom-right", symbol: "↘" },
];

export default function PropertiesPanel({
  selectedWidget,
  onUpdateWidget,
  theme,
}: PropertiesPanelProps) {
  if (!selectedWidget) {
    return (
      <aside
        style={{
          width: 236,
          flexShrink: 0,
          height: "100%",
          backgroundColor: theme.surface,
          borderLeft: `1px solid ${theme.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🖱️</div>
          <p style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.5 }}>
            Select a widget on the canvas to edit its properties
          </p>
        </div>
      </aside>
    );
  }

  const update = (partial: Partial<Widget>) => {
    onUpdateWidget({ ...selectedWidget, ...partial });
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 10,
    color: theme.textMuted,
    marginBottom: 4,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 10px",
    borderRadius: 7,
    border: `1px solid ${theme.border}`,
    backgroundColor: theme.surfaceHi,
    color: theme.textPrimary,
    fontSize: 12,
    boxSizing: "border-box",
  };

  return (
    <aside
      style={{
        width: 236,
        flexShrink: 0,
        height: "100%",
        overflowY: "auto",
        backgroundColor: theme.surface,
        borderLeft: `1px solid ${theme.border}`,
        padding: 14,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1,
          color: theme.textMuted,
          marginBottom: 14,
        }}
      >
        Widget Properties
      </div>

      {/* Title */}
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>Title</label>
        <input
          value={selectedWidget.title}
          onChange={(e) => update({ title: e.target.value })}
          style={inputStyle}
        />
      </div>

      {/* Content Type */}
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>Content Type</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
          {CONTENT_TYPES.map((ct) => {
            const isActive = selectedWidget.contentType === ct.value;
            return (
              <button
                key={ct.value}
                onClick={() => update({ contentType: ct.value })}
                style={{
                  padding: "6px 7px",
                  borderRadius: 7,
                  border: `1px solid ${isActive ? theme.primary : theme.border}`,
                  backgroundColor: isActive ? theme.primary + "22" : "transparent",
                  color: isActive ? theme.primary : theme.textSub,
                  cursor: "pointer",
                  fontSize: 11,
                  fontWeight: isActive ? 700 : 400,
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span>{ct.emoji}</span>
                <span>{ct.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Alignment */}
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>Content Alignment</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
          {ALIGNS.map(({ value, symbol }) => {
            const isActive = selectedWidget.contentAlign === value;
            return (
              <button
                key={value}
                onClick={() => update({ contentAlign: value })}
                title={value}
                style={{
                  height: 30,
                  borderRadius: 6,
                  border: `1px solid ${isActive ? theme.primary : theme.border}`,
                  backgroundColor: isActive ? theme.primary : theme.surfaceMid,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  color: isActive ? "#fff" : theme.textMuted,
                }}
              >
                {symbol}
              </button>
            );
          })}
        </div>
      </div>

      {/* Position & Size */}
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>Position & Size</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {(["x", "y", "width", "height"] as const).map((key) => (
            <div key={key}>
              <div style={{ fontSize: 10, color: theme.textDim, marginBottom: 2 }}>{key.toUpperCase()}</div>
              <input
                type="number"
                value={selectedWidget[key]}
                onChange={(e) => update({ [key]: Number(e.target.value) })}
                style={{ ...inputStyle, padding: "4px 8px", fontSize: 12 }}
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
