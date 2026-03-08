"use client";

import type { Theme, ComponentConfig } from "@/types";

interface ConfigPanelProps {
  config: ComponentConfig;
  setConfig: (config: ComponentConfig) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Record<string, Theme>;
  onClose?: () => void;
}

export default function ConfigPanel({
  config,
  setConfig,
  theme,
  setTheme,
  themes,
  onClose,
}: ConfigPanelProps) {
  return (
    <aside
      className="w-[248px] flex-shrink-0 h-full overflow-y-auto p-4"
      style={{ backgroundColor: theme.surface, borderLeft: `1px solid ${theme.border}` }}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2"
          style={{ color: theme.textMuted }}
        >
          ✕
        </button>
      )}

      <h2 className="text-sm font-semibold mb-4" style={{ color: theme.textPrimary }}>
        ⚙️ Configuration
      </h2>

      {/* Theme selector */}
      <div className="mb-6">
        <label className="text-xs font-medium mb-2 block" style={{ color: theme.textMuted }}>
          Theme
        </label>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(themes).map(([key, t]) => (
            <button
              key={key}
              onClick={() => setTheme(t)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{
                backgroundColor: t.primary,
                border: theme.name === t.name ? `2px solid ${theme.textPrimary}` : "none",
              }}
              title={t.name}
            >
              {t.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Color pickers */}
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: theme.textMuted }}>
            Primary Color
          </label>
          <input
            type="color"
            value={config.primaryColor}
            onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: theme.textMuted }}>
            Border Radius: {config.borderRadius}px
          </label>
          <input
            type="range"
            min="0"
            max="24"
            value={config.borderRadius}
            onChange={(e) => setConfig({ ...config, borderRadius: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: theme.textMuted }}>
            Font Size: {config.fontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="20"
            value={config.fontSize}
            onChange={(e) => setConfig({ ...config, fontSize: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: theme.textMuted }}>
            Padding: {config.padding}px
          </label>
          <input
            type="range"
            min="8"
            max="32"
            value={config.padding}
            onChange={(e) => setConfig({ ...config, padding: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: theme.textMuted }}>
            Shadow Intensity: {Math.round(config.shadowIntensity * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={config.shadowIntensity * 100}
            onChange={(e) => setConfig({ ...config, shadowIntensity: Number(e.target.value) / 100 })}
            className="w-full"
          />
        </div>
      </div>
    </aside>
  );
}
