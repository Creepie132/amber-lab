"use client";

import { useState } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { THEMES } from "@/data/themes";
import { CATALOG } from "@/data/catalog";
import type { Theme, ComponentConfig } from "@/types";
import Sidebar from "./Sidebar";
import Preview from "./Preview";
import ConfigPanel from "./ConfigPanel";
import PageBuilder from "./PageBuilder";

type AppMode = "preview" | "builder";

export default function AmberLab() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [mode, setMode] = useState<AppMode>("preview");
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

  // Mode switcher bar (shown at top in all layouts)
  const ModeSwitcher = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 6px",
        borderRadius: 10,
        backgroundColor: theme.surfaceMid,
        border: `1px solid ${theme.border}`,
      }}
    >
      {(["preview", "builder"] as AppMode[]).map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          style={{
            padding: "5px 12px",
            borderRadius: 7,
            fontSize: 12,
            fontWeight: mode === m ? 700 : 400,
            backgroundColor: mode === m ? theme.primary : "transparent",
            color: mode === m ? "#fff" : theme.textMuted,
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.15s",
          }}
        >
          {m === "preview" ? "🧪 Preview" : "🏗️ Builder"}
        </button>
      ))}
    </div>
  );

  // Page Builder mode
  if (mode === "builder") {
    return (
      <div
        className="flex flex-col h-screen"
        style={{ backgroundColor: theme.bg, color: theme.textPrimary }}
      >
        {/* Builder top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
            borderBottom: `1px solid ${theme.border}`,
            backgroundColor: theme.surface,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary }}>
            🏗️ Page Builder
          </span>
          <ModeSwitcher />
          <div style={{ width: 100 }} />
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <PageBuilder theme={theme} />
        </div>
      </div>
    );
  }

  // Desktop: 3 columns
  if (isDesktop) {
    return (
      <div
        className="flex flex-col h-screen"
        style={{ backgroundColor: theme.bg, color: theme.textPrimary }}
      >
        {/* Top bar with mode switcher */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px 16px",
            borderBottom: `1px solid ${theme.border}`,
            backgroundColor: theme.surface,
            flexShrink: 0,
          }}
        >
          <ModeSwitcher />
        </div>
        <div className="flex flex-1 overflow-hidden">
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
            showSidebarBtn={false}
            showConfigBtn={false}
          />
          <ConfigPanel
            config={config}
            setConfig={setConfig}
            theme={theme}
            setTheme={setTheme}
            themes={THEMES}
          />
        </div>
      </div>
    );
  }

  // Tablet: 2 columns + config drawer
  if (isTablet) {
    return (
      <div
        className="flex flex-col h-screen"
        style={{ backgroundColor: theme.bg, color: theme.textPrimary }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px 16px",
            borderBottom: `1px solid ${theme.border}`,
            backgroundColor: theme.surface,
            flexShrink: 0,
          }}
        >
          <ModeSwitcher />
        </div>
        <div className="flex flex-1 overflow-hidden">
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
            showSidebarBtn={false}
            showConfigBtn={true}
          />
        </div>
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
      {/* Mode switcher */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px 16px",
          borderBottom: `1px solid ${theme.border}`,
          backgroundColor: theme.surface,
          flexShrink: 0,
        }}
      >
        <ModeSwitcher />
      </div>
      <Preview
        selectedId={selectedId}
        config={config}
        theme={theme}
        onOpenSidebar={() => setSidebarOpen(true)}
        onOpenConfig={() => setConfigOpen(true)}
        showSidebarBtn={true}
        showConfigBtn={true}
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
