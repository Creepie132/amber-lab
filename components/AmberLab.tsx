"use client";

import { useState } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { THEMES } from "@/data/themes";
import { CATALOG } from "@/data/catalog";
import type { Theme, ComponentConfig } from "@/types";
import Sidebar from "./Sidebar";
import Preview from "./Preview";
import ConfigPanel from "./ConfigPanel";

export default function AmberLab() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [theme, setTheme] = useState<Theme>(THEMES.amber);
  const [selectedId, setSelectedId] = useState<string>("button-primary");
  const [config, setConfig] = useState<ComponentConfig>({
    primaryColor: "#f59e0b",
    accentColor: "#fbbf24",
    borderRadius: 8,
    shadowIntensity: 0.1,
    fontSize: 14,
    padding: 16,
    fontFamily: "Inter",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);

  // Desktop: 3 columns
  if (isDesktop) {
    return (
      <div
        className="flex h-screen"
        style={{ backgroundColor: theme.bg, color: theme.textPrimary }}
      >
        <Sidebar
          catalog={CATALOG}
          selectedId={selectedId}
          onSelect={setSelectedId}
          theme={theme}
        />
        <Preview
          selectedId={selectedId}
          config={config}
          theme={theme}
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenConfig={() => setConfigOpen(true)}
          isMobile={isMobile}
        />
        <ConfigPanel
          config={config}
          setConfig={setConfig}
          theme={theme}
          setTheme={setTheme}
          themes={THEMES}
        />
      </div>
    );
  }

  // Tablet: 2 columns + drawer
  if (isTablet) {
    return (
      <div
        className="flex h-screen"
        style={{ backgroundColor: theme.bg, color: theme.textPrimary }}
      >
        <Sidebar
          catalog={CATALOG}
          selectedId={selectedId}
          onSelect={setSelectedId}
          theme={theme}
        />
        <Preview
          selectedId={selectedId}
          config={config}
          theme={theme}
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenConfig={() => setConfigOpen(true)}
          isMobile={isMobile}
        />
        {/* Config drawer */}
        {configOpen && (
          <div className="fixed inset-0 z-50" onClick={() => setConfigOpen(false)}>
            <div className="absolute inset-0 bg-black/50" />
            <div
              className="absolute right-0 top-0 h-full w-[280px]"
              style={{ backgroundColor: theme.surface }}
              onClick={(e) => e.stopPropagation()}
            >
              <ConfigPanel
                config={config}
                setConfig={setConfig}
                theme={theme}
                setTheme={setTheme}
                themes={THEMES}
                onClose={() => setConfigOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Mobile: fullscreen + bottom sheets
  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundColor: theme.bg, color: theme.textPrimary }}
    >
      <Preview
        selectedId={selectedId}
        config={config}
        theme={theme}
        onOpenSidebar={() => setSidebarOpen(true)}
        onOpenConfig={() => setConfigOpen(true)}
        isMobile={isMobile}
      />
      {/* Sidebar bottom sheet */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute bottom-0 left-0 right-0 h-[75vh] rounded-t-2xl overflow-hidden"
            style={{ backgroundColor: theme.surface }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-400 rounded-full mx-auto my-3" />
            <Sidebar
              catalog={CATALOG}
              selectedId={selectedId}
              onSelect={(id) => {
                setSelectedId(id);
                setSidebarOpen(false);
              }}
              theme={theme}
            />
          </div>
        </div>
      )}
      {/* Config bottom sheet */}
      {configOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setConfigOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute bottom-0 left-0 right-0 h-[75vh] rounded-t-2xl overflow-hidden"
            style={{ backgroundColor: theme.surface }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-400 rounded-full mx-auto my-3" />
            <ConfigPanel
              config={config}
              setConfig={setConfig}
              theme={theme}
              setTheme={setTheme}
              themes={THEMES}
              onClose={() => setConfigOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
