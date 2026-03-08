"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Widget, PageLayout, Theme } from "@/types";
import WidgetBlock from "./WidgetBlock";

interface CanvasProps {
  page: PageLayout;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdateWidget: (widget: Widget) => void;
  onAddWidget: () => void;
  onDeleteWidget: (id: string) => void;
  theme: Theme;
}

const GRID = 20;

function snap(v: number) {
  return Math.round(v / GRID) * GRID;
}

export default function Canvas({
  page,
  selectedId,
  onSelect,
  onUpdateWidget,
  onAddWidget,
  onDeleteWidget,
  theme,
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState<{
    widgetId: string;
    startClientX: number;
    startClientY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const [resizing, setResizing] = useState<{
    widgetId: string;
    startClientX: number;
    startClientY: number;
    origW: number;
    origH: number;
  } | null>(null);

  const handleDragStart = useCallback(
    (widgetId: string, clientX: number, clientY: number) => {
      const widget = page.widgets.find((w) => w.id === widgetId);
      if (!widget) return;
      setDragging({
        widgetId,
        startClientX: clientX,
        startClientY: clientY,
        origX: widget.x,
        origY: widget.y,
      });
    },
    [page.widgets]
  );

  const handleResizeStart = useCallback(
    (widgetId: string, clientX: number, clientY: number) => {
      const widget = page.widgets.find((w) => w.id === widgetId);
      if (!widget) return;
      setResizing({
        widgetId,
        startClientX: clientX,
        startClientY: clientY,
        origW: widget.width,
        origH: widget.height,
      });
    },
    [page.widgets]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (dragging) {
        const dx = clientX - dragging.startClientX;
        const dy = clientY - dragging.startClientY;
        const widget = page.widgets.find((w) => w.id === dragging.widgetId);
        if (!widget) return;
        onUpdateWidget({
          ...widget,
          x: Math.max(0, snap(dragging.origX + dx)),
          y: Math.max(0, snap(dragging.origY + dy)),
        });
      }

      if (resizing) {
        const dx = clientX - resizing.startClientX;
        const dy = clientY - resizing.startClientY;
        const widget = page.widgets.find((w) => w.id === resizing.widgetId);
        if (!widget) return;
        onUpdateWidget({
          ...widget,
          width: Math.max(200, snap(resizing.origW + dx)),
          height: Math.max(120, snap(resizing.origH + dy)),
        });
      }
    };

    const onUp = () => {
      setDragging(null);
      setResizing(null);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, resizing, page.widgets, onUpdateWidget]);

  const canvasHeight = Math.max(
    600,
    ...page.widgets.map((w) => w.y + w.height + 60)
  );

  return (
    <div
      ref={canvasRef}
      className="relative flex-1 overflow-auto"
      style={{
        backgroundColor: theme.bg,
        cursor: dragging ? "grabbing" : "default",
        backgroundImage: `radial-gradient(circle, ${theme.border} 1px, transparent 1px)`,
        backgroundSize: `${GRID}px ${GRID}px`,
      }}
      onClick={() => onSelect(null)}
    >
      <div style={{ position: "relative", minHeight: canvasHeight, minWidth: 640 }}>
        {/* Page sidebar preview strip */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 196,
            minHeight: canvasHeight,
            backgroundColor: theme.surface,
            borderRight: `1px solid ${theme.border}`,
            padding: "12px 8px",
            zIndex: 1,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: theme.textDim,
              marginBottom: 12,
              paddingLeft: 8,
            }}
          >
            Sidebar Preview
          </div>
          {page.sidebarSections.length === 0 && (
            <div style={{ fontSize: 12, color: theme.textDim, textAlign: "center", padding: "20px 8px" }}>
              No sections yet
            </div>
          )}
          {page.sidebarSections.map((sec) => (
            <div key={sec.id} style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: theme.textMuted,
                  marginBottom: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "4px 8px",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                <span>{sec.icon}</span>
                <span>{sec.title}</span>
              </div>
              {sec.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "6px 8px",
                    borderRadius: 6,
                    fontSize: 12,
                    color: theme.textSub,
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Widgets area */}
        <div
          style={{
            position: "absolute",
            left: 206,
            top: 0,
            right: 0,
            minHeight: canvasHeight,
          }}
        >
          {page.widgets.map((widget) => (
            <WidgetBlock
              key={widget.id}
              widget={widget}
              isSelected={selectedId === widget.id}
              theme={theme}
              onDragStart={(cx, cy) => handleDragStart(widget.id, cx, cy)}
              onResizeStart={(cx, cy) => handleResizeStart(widget.id, cx, cy)}
              onClick={() => onSelect(widget.id)}
              onDelete={() => onDeleteWidget(widget.id)}
            />
          ))}

          {page.widgets.length === 0 && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: theme.textDim,
                pointerEvents: "none",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 8 }}>🧩</div>
              <div style={{ fontSize: 14 }}>Click + to add a widget</div>
            </div>
          )}
        </div>
      </div>

      {/* Add widget FAB */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddWidget();
        }}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: theme.primary,
          color: "#fff",
          border: "none",
          fontSize: 22,
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        +
      </button>
    </div>
  );
}
