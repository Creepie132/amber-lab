"use client";

import { useState } from "react";
import type { PageLayout, Widget, SidebarSection, Theme } from "@/types";
import Canvas from "./Canvas";
import SidebarEditor from "./SidebarEditor";
import PropertiesPanel from "./PropertiesPanel";

interface PageBuilderProps {
  theme: Theme;
}

const DEFAULT_PAGE: PageLayout = {
  id: "page-1",
  name: "My Page",
  widgets: [
    {
      id: "w-1",
      x: 20,
      y: 20,
      width: 320,
      height: 180,
      title: "Statistics",
      contentType: "stats",
      contentAlign: "center",
    },
    {
      id: "w-2",
      x: 360,
      y: 20,
      width: 240,
      height: 180,
      title: "Search",
      contentType: "search",
      contentAlign: "center",
    },
    {
      id: "w-3",
      x: 20,
      y: 220,
      width: 580,
      height: 220,
      title: "Data Table",
      contentType: "table",
      contentAlign: "top-left",
    },
  ],
  sidebarSections: [
    {
      id: "sec-1",
      title: "Dashboard",
      icon: "🏠",
      items: [
        { id: "i-1", label: "Overview" },
        { id: "i-2", label: "Analytics" },
      ],
    },
    {
      id: "sec-2",
      title: "Settings",
      icon: "⚙️",
      items: [
        { id: "i-3", label: "Profile" },
        { id: "i-4", label: "Appearance" },
      ],
    },
  ],
};

// Mobile tab type
type MobileTab = "structure" | "canvas" | "properties";

export default function PageBuilder({ theme }: PageBuilderProps) {
  const [page, setPage] = useState<PageLayout>(DEFAULT_PAGE);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<MobileTab>("canvas");

  const updateWidget = (updated: Widget) => {
    setPage((p) => ({
      ...p,
      widgets: p.widgets.map((w) => (w.id === updated.id ? updated : w)),
    }));
  };

  const addWidget = () => {
    const id = `w-${Date.now()}`;
    const newWidget: Widget = {
      id,
      x: 20,
      y: Math.max(0, ...page.widgets.map((w) => w.y + w.height)) + 20,
      width: 280,
      height: 160,
      title: "New Widget",
      contentType: "text",
      contentAlign: "top-left",
    };
    setPage((p) => ({ ...p, widgets: [...p.widgets, newWidget] }));
    setSelectedWidgetId(id);
    setMobileTab("properties");
  };

  const deleteWidget = (id: string) => {
    setPage((p) => ({ ...p, widgets: p.widgets.filter((w) => w.id !== id) }));
    setSelectedWidgetId(null);
  };

  const selectedWidget = page.widgets.find((w) => w.id === selectedWidgetId) ?? null;

  const sidebarEditor = (
    <SidebarEditor
      sections={page.sidebarSections}
      selectedId={selectedSectionId}
      onSelect={setSelectedSectionId}
      onChange={(sections) => setPage((p) => ({ ...p, sidebarSections: sections }))}
      theme={theme}
    />
  );

  const canvas = (
    <Canvas
      page={page}
      selectedId={selectedWidgetId}
      onSelect={(id) => {
        setSelectedWidgetId(id);
        if (id) {
          setSelectedSectionId(null);
          setMobileTab("properties");
        }
      }}
      onUpdateWidget={updateWidget}
      onAddWidget={addWidget}
      onDeleteWidget={deleteWidget}
      theme={theme}
    />
  );

  const propertiesPanel = (
    <PropertiesPanel
      selectedWidget={selectedWidget}
      onUpdateWidget={updateWidget}
      theme={theme}
    />
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Mobile tab bar */}
      <div
        className="flex md:hidden"
        style={{
          borderBottom: `1px solid ${theme.border}`,
          backgroundColor: theme.surface,
        }}
      >
        {(["structure", "canvas", "properties"] as MobileTab[]).map((tab) => {
          const labels: Record<MobileTab, string> = {
            structure: "🗂️ Structure",
            canvas: "🎨 Canvas",
            properties: "⚙️ Properties",
          };
          return (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              style={{
                flex: 1,
                padding: "10px 4px",
                fontSize: 11,
                fontWeight: mobileTab === tab ? 700 : 400,
                color: mobileTab === tab ? theme.primary : theme.textMuted,
                background: "none",
                border: "none",
                borderBottom: `2px solid ${mobileTab === tab ? theme.primary : "transparent"}`,
                cursor: "pointer",
              }}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Desktop: 3-column layout */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        {sidebarEditor}
        {canvas}
        {propertiesPanel}
      </div>

      {/* Mobile: single active panel */}
      <div className="flex md:hidden flex-1 overflow-hidden">
        {mobileTab === "structure" && sidebarEditor}
        {mobileTab === "canvas" && canvas}
        {mobileTab === "properties" && propertiesPanel}
      </div>
    </div>
  );
}
