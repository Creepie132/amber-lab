"use client";

import type { ContentType, Theme } from "@/types";

interface WidgetContentProps {
  contentType: ContentType;
  theme: Theme;
}

export default function WidgetContent({ contentType, theme }: WidgetContentProps) {
  switch (contentType) {
    case "text":
      return (
        <p style={{ fontSize: 13, lineHeight: 1.6, color: theme.textSub }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      );

    case "input":
      return (
        <div style={{ width: "100%" }}>
          <label style={{ display: "block", fontSize: 11, color: theme.textMuted, marginBottom: 4 }}>
            Label
          </label>
          <input
            readOnly
            placeholder="Enter value..."
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: 8,
              border: `1px solid ${theme.border}`,
              backgroundColor: theme.surfaceHi,
              color: theme.textPrimary,
              fontSize: 13,
              boxSizing: "border-box",
            }}
          />
        </div>
      );

    case "search":
      return (
        <div style={{ position: "relative", width: "100%" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>
            🔍
          </span>
          <input
            readOnly
            placeholder="Search..."
            style={{
              width: "100%",
              padding: "8px 12px 8px 32px",
              borderRadius: 8,
              border: `1px solid ${theme.border}`,
              backgroundColor: theme.surfaceHi,
              color: theme.textPrimary,
              fontSize: 13,
              boxSizing: "border-box",
            }}
          />
        </div>
      );

    case "chart": {
      const bars = [65, 80, 45, 90, 55, 70, 85];
      return (
        <div style={{ width: "100%" }}>
          <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 8, fontWeight: 600 }}>
            Bar Chart
          </div>
          <svg width="100%" height="80" viewBox={`0 0 ${bars.length * 30} 80`} preserveAspectRatio="none">
            {bars.map((v, i) => (
              <rect
                key={i}
                x={i * 30 + 4}
                y={80 - (v / 90) * 70}
                width={22}
                height={(v / 90) * 70}
                rx={3}
                fill={theme.primary}
                opacity={0.5 + 0.5 * (i % 2)}
              />
            ))}
          </svg>
        </div>
      );
    }

    case "stats":
      return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%" }}>
          {[
            { label: "Total", value: "1,284", trend: "↑ 12%" },
            { label: "Active", value: "849", trend: "↑ 8%" },
            { label: "Pending", value: "132", trend: "↓ 3%" },
            { label: "Done", value: "303", trend: "↑ 21%" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ padding: 8, borderRadius: 8, backgroundColor: theme.surfaceMid }}
            >
              <div style={{ fontSize: 10, color: theme.textMuted }}>{stat.label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: "#22c55e" }}>{stat.trend}</div>
            </div>
          ))}
        </div>
      );

    case "list":
      return (
        <div style={{ width: "100%" }}>
          {["Item one", "Item two", "Item three", "Item four"].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "7px 4px",
                borderBottom: `1px solid ${theme.border}`,
                fontSize: 13,
                color: theme.textSub,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: theme.primary,
                  flexShrink: 0,
                }}
              />
              {item}
            </div>
          ))}
        </div>
      );

    case "button-group":
      return (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Primary", "Secondary", "Cancel"].map((label, i) => (
            <button
              key={label}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 13,
                cursor: "pointer",
                backgroundColor: i === 0 ? theme.primary : "transparent",
                color: i === 0 ? "#fff" : theme.textPrimary,
                border: `1px solid ${i === 0 ? theme.primary : theme.border}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      );

    case "image":
      return (
        <div
          style={{
            width: "100%",
            height: "80%",
            minHeight: 80,
            backgroundColor: theme.surfaceMid,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.textDim,
            fontSize: 32,
            border: `2px dashed ${theme.border}`,
          }}
        >
          🖼️
        </div>
      );

    case "table":
      return (
        <div style={{ width: "100%", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ backgroundColor: theme.surfaceMid }}>
                {["Name", "Status", "Value"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "6px 8px",
                      textAlign: "left",
                      color: theme.textMuted,
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Alpha", "Active", "1,200"],
                ["Beta", "Pending", "340"],
                ["Gamma", "Done", "980"],
              ].map(([name, status, value]) => (
                <tr key={name} style={{ borderTop: `1px solid ${theme.border}` }}>
                  <td style={{ padding: "6px 8px", color: theme.textPrimary }}>{name}</td>
                  <td style={{ padding: "6px 8px", color: theme.textSub }}>{status}</td>
                  <td style={{ padding: "6px 8px", color: theme.textSub }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return (
        <div style={{ color: theme.textMuted, fontSize: 13 }}>Select content type</div>
      );
  }
}
