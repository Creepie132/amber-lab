"use client";

import type { Widget, Theme } from "@/types";
import WidgetContent from "./WidgetContent";

interface WidgetBlockProps {
  widget: Widget;
  isSelected: boolean;
  theme: Theme;
  onDragStart: (clientX: number, clientY: number) => void;
  onResizeStart: (clientX: number, clientY: number) => void;
  onClick: () => void;
  onDelete: () => void;
}

export default function WidgetBlock({
  widget,
  isSelected,
  theme,
  onDragStart,
  onResizeStart,
  onClick,
  onDelete,
}: WidgetBlockProps) {
  const parts = widget.contentAlign === "center"
    ? ["center", "center"]
    : widget.contentAlign.split("-");
  const [v, h] = parts;

  const alignStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: v === "top" ? "flex-start" : v === "bottom" ? "flex-end" : "center",
    alignItems: h === "left" ? "flex-start" : h === "right" ? "flex-end" : "center",
  };

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        position: "absolute",
        left: widget.x,
        top: widget.y,
        width: widget.width,
        height: widget.height,
        backgroundColor: theme.surface,
        border: `2px solid ${isSelected ? theme.primary : theme.border}`,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: isSelected
          ? `0 0 0 3px ${theme.primary}33, 0 4px 16px rgba(0,0,0,0.15)`
          : "0 2px 8px rgba(0,0,0,0.08)",
        zIndex: isSelected ? 10 : 1,
        userSelect: "none",
      }}
    >
      {/* Drag handle header */}
      <div
        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); onDragStart(e.clientX, e.clientY); }}
        onTouchStart={(e) => { e.stopPropagation(); onDragStart(e.touches[0].clientX, e.touches[0].clientY); }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 10px",
          backgroundColor: isSelected ? theme.primary + "22" : theme.surfaceMid,
          borderBottom: `1px solid ${theme.border}`,
          cursor: "grab",
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ opacity: 0.5 }}>⠿</span>
          {widget.title}
        </span>
        {isSelected && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: theme.textMuted,
              fontSize: 14,
              padding: "0 2px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Content area */}
      <div
        style={{
          width: "100%",
          height: "calc(100% - 33px)",
          padding: 12,
          overflow: "hidden",
          boxSizing: "border-box",
          ...alignStyle,
        }}
      >
        <WidgetContent contentType={widget.contentType} theme={theme} />
      </div>

      {/* Resize handle (bottom-right corner) */}
      <div
        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); onResizeStart(e.clientX, e.clientY); }}
        onTouchStart={(e) => { e.stopPropagation(); onResizeStart(e.touches[0].clientX, e.touches[0].clientY); }}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 20,
          height: 20,
          cursor: "se-resize",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: 4,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRight: `2px solid ${theme.textMuted}`,
            borderBottom: `2px solid ${theme.textMuted}`,
            opacity: isSelected ? 1 : 0.3,
          }}
        />
      </div>
    </div>
  );
}
