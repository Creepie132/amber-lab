"use client";

import type { Theme, ComponentConfig } from "@/types";

interface ComponentPreviewProps {
  id: string;
  config: ComponentConfig;
  theme: Theme;
}

export default function ComponentPreview({ id, config, theme }: ComponentPreviewProps) {
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
          style={{
            ...baseStyle,
            backgroundColor: theme.surface,
            border: `1px solid ${theme.border}`,
            width: 280,
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
        >
          <h3 style={{ marginBottom: 8, fontWeight: 600 }}>Interactive Card</h3>
          <p style={{ color: theme.textSub, fontSize: 14 }}>
            Hover me for interaction!
          </p>
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
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div
            style={{
              width: 48,
              height: 24,
              backgroundColor: config.primaryColor,
              borderRadius: 12,
              position: "relative",
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
                right: 2,
                transition: "0.2s",
              }}
            />
          </div>
          <span>Toggle</span>
        </label>
      );

    case "avatar-circle":
      return (
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: config.primaryColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          AB
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
