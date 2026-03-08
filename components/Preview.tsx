"use client";

import type { Theme, ComponentConfig } from "@/types";
import ComponentPreview from "./ComponentPreview";

interface PreviewProps {
  selectedId: string;
  config: ComponentConfig;
  theme: Theme;
  onOpenSidebar: () => void;
  onOpenConfig: () => void;
  isMobile: boolean;
}

export default function Preview({
  selectedId,
  config,
  theme,
  onOpenSidebar,
  onOpenConfig,
  isMobile,
}: PreviewProps) {
  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: theme.border, backgroundColor: theme.surface }}
      >
        {isMobile && (
          <button
            onClick={onOpenSidebar}
            className="p-2 rounded-lg"
            style={{ backgroundColor: theme.surfaceMid }}
          >
            ☰
          </button>
        )}
        <div className="flex-1 text-center font-medium">{selectedId}</div>
        {isMobile && (
          <button
            onClick={onOpenConfig}
            className="p-2 rounded-lg"
            style={{ backgroundColor: theme.surfaceMid }}
          >
            ⚙️
          </button>
        )}
      </div>

      {/* Preview area */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div
          className="p-8 rounded-xl"
          style={{
            backgroundColor: theme.surfaceHi,
            border: `1px solid ${theme.border}`,
          }}
        >
          <ComponentPreview id={selectedId} config={config} theme={theme} />
        </div>
      </div>

      {/* Bottom toolbar */}
      <div
        className="flex items-center justify-center gap-4 px-4 py-3 border-t"
        style={{ borderColor: theme.border, backgroundColor: theme.surface }}
      >
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{
            backgroundColor: theme.exportBg,
            color: theme.exportColor,
          }}
        >
          📋 Copy Code
        </button>
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{
            backgroundColor: theme.primary,
            color: "#fff",
          }}
        >
          💾 Export
        </button>
      </div>
    </main>
  );
}
