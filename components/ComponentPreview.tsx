"use client";

import { useState } from "react";
import type { Theme, ComponentConfig } from "@/types";

interface ComponentPreviewProps {
  id: string;
  config: ComponentConfig;
  theme: Theme;
}

export default function ComponentPreview({ id, config, theme }: ComponentPreviewProps) {
  const [toggleOn, setToggleOn] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [chips, setChips] = useState(["React", "TypeScript", "Tailwind"]);
  const [checked, setChecked] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const baseStyle = {
    borderRadius: config.borderRadius,
    fontSize: config.fontSize,
    padding: config.padding,
    fontFamily: config.fontFamily,
    boxShadow: `0 4px 12px rgba(0,0,0,${config.shadowIntensity})`,
  };

  switch (id) {
    case "button-primary":
      return (
        <button
          style={{
            ...baseStyle,
            backgroundColor: config.primaryColor,
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Primary Button
        </button>
      );

    case "button-secondary":
      return (
        <button
          style={{
            ...baseStyle,
            backgroundColor: "transparent",
            color: config.primaryColor,
            border: `2px solid ${config.primaryColor}`,
            cursor: "pointer",
          }}
        >
          Secondary Button
        </button>
      );

    case "button-ghost":
      return (
        <button
          style={{
            ...baseStyle,
            backgroundColor: "transparent",
            color: theme.textPrimary,
            border: "none",
            cursor: "pointer",
          }}
        >
          Ghost Button
        </button>
      );

    case "button-icon":
      return (
        <div style={{ display: "flex", gap: 10 }}>
          {(["🏠", "⚙️", "🔔"] as const).map((icon, i) => (
            <button
              key={i}
              style={{
                ...baseStyle,
                width: 44,
                height: 44,
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: i === 0 ? config.primaryColor : theme.surfaceMid,
                color: i === 0 ? "#fff" : theme.textPrimary,
                border: `1px solid ${theme.border}`,
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      );

    case "button-danger":
      return (
        <button
          style={{
            ...baseStyle,
            backgroundColor: "#ef4444",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          🗑️ Delete
        </button>
      );

    case "input-text":
      return (
        <input
          type="text"
          placeholder="Enter text..."
          style={{
            ...baseStyle,
            backgroundColor: theme.surfaceHi,
            color: theme.textPrimary,
            border: `1px solid ${theme.border}`,
            width: 240,
          }}
        />
      );

    case "input-search":
      return (
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              ...baseStyle,
              backgroundColor: theme.surfaceHi,
              color: theme.textPrimary,
              border: `1px solid ${theme.border}`,
              width: 240,
              paddingLeft: 40,
            }}
          />
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
            🔍
          </span>
        </div>
      );

    case "input-password":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="password"
            placeholder="Password..."
            style={{
              ...baseStyle,
              backgroundColor: theme.surfaceHi,
              color: theme.textPrimary,
              border: `1px solid ${theme.border}`,
              width: 240,
            }}
          />
          <input
            type="password"
            placeholder="Confirm password..."
            style={{
              ...baseStyle,
              backgroundColor: theme.surfaceHi,
              color: theme.textPrimary,
              border: `1px solid ${config.primaryColor}`,
              width: 240,
            }}
          />
        </div>
      );

    case "input-textarea":
      return (
        <textarea
          placeholder="Write something..."
          rows={4}
          style={{
            ...baseStyle,
            backgroundColor: theme.surfaceHi,
            color: theme.textPrimary,
            border: `1px solid ${theme.border}`,
            width: 260,
            resize: "none" as const,
            lineHeight: 1.5,
          }}
        />
      );

    case "card-basic":
      return (
        <div
          style={{
            ...baseStyle,
            backgroundColor: theme.surface,
            border: `1px solid ${theme.border}`,
            width: 280,
          }}
        >
          <h3 style={{ marginBottom: 8, fontWeight: 600 }}>Card Title</h3>
          <p style={{ color: theme.textSub, fontSize: 14 }}>
            This is a basic card component with some content.
          </p>
        </div>
      );

    case "card-interactive":
      return (
        <div
          onMouseEnter={() => setCardHovered(true)}
          onMouseLeave={() => setCardHovered(false)}
          style={{
            ...baseStyle,
            backgroundColor: theme.surface,
            border: `1px solid ${cardHovered ? config.primaryColor : theme.border}`,
            width: 280,
            cursor: "pointer",
            transform: cardHovered ? "translateY(-4px)" : "translateY(0)",
            transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
            boxShadow: cardHovered
              ? `0 8px 24px rgba(0,0,0,${config.shadowIntensity * 2})`
              : `0 4px 12px rgba(0,0,0,${config.shadowIntensity})`,
          }}
        >
          <h3 style={{ marginBottom: 8, fontWeight: 600, color: theme.textPrimary }}>
            Interactive Card
          </h3>
          <p style={{ color: theme.textSub, fontSize: 14 }}>
            {cardHovered ? "✨ Nice hover!" : "Hover me for interaction!"}
          </p>
        </div>
      );

    case "card-profile":
      return (
        <div
          style={{
            ...baseStyle,
            backgroundColor: theme.surface,
            border: `1px solid ${theme.border}`,
            width: 260,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: config.primaryColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              margin: "0 auto 12px",
            }}
          >
            AB
          </div>
          <div style={{ fontWeight: 600, color: theme.textPrimary }}>Alex Brown</div>
          <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 4 }}>Senior Designer</div>
          <div
            style={{
              marginTop: 12,
              padding: "4px 12px",
              borderRadius: config.borderRadius,
              backgroundColor: config.accentColor + "33",
              color: config.primaryColor,
              display: "inline-block",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Pro
          </div>
        </div>
      );

    case "badge-default":
      return (
        <span
          style={{
            ...baseStyle,
            backgroundColor: theme.surfaceMid,
            color: theme.textPrimary,
            padding: "4px 12px",
            display: "inline-block",
          }}
        >
          Default
        </span>
      );

    case "badge-success":
      return (
        <span
          style={{
            ...baseStyle,
            backgroundColor: "#22c55e",
            color: "#fff",
            padding: "4px 12px",
            display: "inline-block",
          }}
        >
          Success
        </span>
      );

    case "badge-warning":
      return (
        <span
          style={{
            ...baseStyle,
            backgroundColor: "#f59e0b",
            color: "#fff",
            padding: "4px 12px",
            display: "inline-block",
          }}
        >
          Warning
        </span>
      );

    case "toggle-switch":
      return (
        <label
          onClick={() => setToggleOn(!toggleOn)}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        >
          <div
            style={{
              width: 48,
              height: 24,
              backgroundColor: toggleOn ? config.primaryColor : theme.surfaceMid,
              borderRadius: 12,
              position: "relative",
              transition: "background-color 0.2s",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                backgroundColor: "#fff",
                borderRadius: "50%",
                position: "absolute",
                top: 2,
                left: toggleOn ? 26 : 2,
                transition: "left 0.2s",
              }}
            />
          </div>
          <span style={{ color: theme.textPrimary, fontFamily: config.fontFamily }}>
            {toggleOn ? "On" : "Off"}
          </span>
        </label>
      );

    case "avatar-circle":
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {[
            { initials: "AB", color: config.primaryColor, textColor: "#fff" },
            { initials: "CD", color: config.accentColor, textColor: "#fff" },
            { initials: "+3", color: theme.surfaceMid, textColor: theme.textMuted },
          ].map((av, i) => (
            <div
              key={i}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: av.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: av.textColor,
                fontWeight: 600,
                fontSize: 13,
                border: `2px solid ${theme.surface}`,
                marginLeft: i > 0 ? -12 : 0,
              }}
            >
              {av.initials}
            </div>
          ))}
        </div>
      );

    case "checkbox-basic":
      return (
        <label
          onClick={() => setChecked(!checked)}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: config.fontFamily }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: Math.min(config.borderRadius, 6),
              border: `2px solid ${checked ? config.primaryColor : theme.border}`,
              backgroundColor: checked ? config.primaryColor : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.15s, border-color 0.15s",
              flexShrink: 0,
            }}
          >
            {checked && <span style={{ color: "#fff", fontSize: 12, lineHeight: 1 }}>✓</span>}
          </div>
          <span style={{ fontSize: config.fontSize, color: theme.textPrimary }}>
            {checked ? "Checked" : "Unchecked"}
          </span>
        </label>
      );

    case "alert-success":
      return (
        <div
          style={{
            ...baseStyle,
            backgroundColor: "#f0fdf4",
            border: "1px solid #22c55e",
            color: "#166534",
            width: 300,
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <span>✅</span>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>Success</div>
            <div style={{ fontSize: 13 }}>Your changes have been saved.</div>
          </div>
        </div>
      );

    case "alert-error":
      return (
        <div
          style={{
            ...baseStyle,
            backgroundColor: "#fef2f2",
            border: "1px solid #ef4444",
            color: "#991b1b",
            width: 300,
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <span>❌</span>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>Error</div>
            <div style={{ fontSize: 13 }}>Something went wrong. Please try again.</div>
          </div>
        </div>
      );

    case "alert-info":
      return (
        <div
          style={{
            ...baseStyle,
            backgroundColor: theme.isDark ? theme.surfaceMid : "#eff6ff",
            border: `1px solid ${config.accentColor}`,
            color: theme.textPrimary,
            width: 300,
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <span>ℹ️</span>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>Info</div>
            <div style={{ fontSize: 13, color: theme.textSub }}>Here is some useful information.</div>
          </div>
        </div>
      );

    case "progress-bar":
      return (
        <div style={{ width: 280 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
              fontSize: config.fontSize,
              color: theme.textSub,
              fontFamily: config.fontFamily,
            }}
          >
            <span>Loading...</span>
            <span>65%</span>
          </div>
          <div
            style={{
              height: 8,
              backgroundColor: theme.surfaceMid,
              borderRadius: config.borderRadius,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "65%",
                height: "100%",
                background: `linear-gradient(90deg, ${config.primaryColor}, ${config.accentColor})`,
                borderRadius: config.borderRadius,
              }}
            />
          </div>
        </div>
      );

    case "spinner-loader":
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              border: `3px solid ${theme.surfaceMid}`,
              borderTop: `3px solid ${config.primaryColor}`,
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <span style={{ fontSize: config.fontSize, color: theme.textSub, fontFamily: config.fontFamily }}>
            Loading...
          </span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      );

    case "nav-tabs": {
      const tabs = ["Overview", "Details", "Settings"];
      return (
        <div style={{ width: 300 }}>
          <div style={{ display: "flex", borderBottom: `2px solid ${theme.border}`, marginBottom: 16 }}>
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: "8px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: config.fontFamily,
                  fontSize: config.fontSize,
                  color: activeTab === i ? config.primaryColor : theme.textMuted,
                  borderBottom: activeTab === i ? `2px solid ${config.primaryColor}` : "2px solid transparent",
                  marginBottom: -2,
                  transition: "color 0.2s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{ color: theme.textSub, fontSize: 13, fontFamily: config.fontFamily }}>
            Content for <strong style={{ color: theme.textPrimary }}>{tabs[activeTab]}</strong>
          </div>
        </div>
      );
    }

    case "chip-default":
      return (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Design", "Development", "UX"].map((label) => (
            <span
              key={label}
              style={{
                padding: "4px 12px",
                borderRadius: config.borderRadius,
                backgroundColor: theme.surfaceMid,
                color: theme.textPrimary,
                fontSize: 13,
                fontFamily: config.fontFamily,
                border: `1px solid ${theme.border}`,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      );

    case "chip-removable":
      return (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {chips.map((chip) => (
            <span
              key={chip}
              style={{
                padding: "4px 10px",
                borderRadius: config.borderRadius,
                backgroundColor: config.accentColor + "33",
                color: theme.textPrimary,
                fontSize: 13,
                fontFamily: config.fontFamily,
                border: `1px solid ${config.accentColor}`,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {chip}
              <button
                onClick={() => setChips(chips.filter((c) => c !== chip))}
                style={{ background: "none", border: "none", cursor: "pointer", color: theme.textMuted, lineHeight: 1, padding: 0 }}
              >
                ✕
              </button>
            </span>
          ))}
          {chips.length === 0 && (
            <button
              onClick={() => setChips(["React", "TypeScript", "Tailwind"])}
              style={{
                padding: "4px 12px",
                borderRadius: config.borderRadius,
                backgroundColor: theme.surfaceMid,
                color: theme.textMuted,
                fontSize: 13,
                border: `1px solid ${theme.border}`,
                cursor: "pointer",
              }}
            >
              + Reset
            </button>
          )}
        </div>
      );

    case "tooltip-basic":
      return (
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
            style={{
              ...baseStyle,
              backgroundColor: config.primaryColor,
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Hover for Tooltip
          </button>
          {tooltipVisible && (
            <div
              style={{
                position: "absolute",
                bottom: "calc(100% + 8px)",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: theme.isDark ? theme.surfaceHi : "#1f2937",
                color: theme.isDark ? theme.textPrimary : "#fff",
                padding: "6px 10px",
                borderRadius: 6,
                fontSize: 12,
                whiteSpace: "nowrap",
                pointerEvents: "none",
                fontFamily: config.fontFamily,
                zIndex: 50,
              }}
            >
              This is a tooltip!
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  border: "5px solid transparent",
                  borderTopColor: theme.isDark ? theme.surfaceHi : "#1f2937",
                }}
              />
            </div>
          )}
        </div>
      );

    default:
      return (
        <div
          style={{
            ...baseStyle,
            backgroundColor: theme.surfaceMid,
            color: theme.textMuted,
            textAlign: "center",
          }}
        >
          Select a component
        </div>
      );
  }
}
