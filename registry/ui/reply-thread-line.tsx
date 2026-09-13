"use client";

import * as React from "react";

export interface ReplyThreadLineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  last?: boolean;
  lineColor?: string;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapseLabel?: string;
  expandLabel?: string;
}

export function ReplyThreadLine({
  children,
  last = true,
  lineColor = "#a1a1aa",
  collapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  collapseLabel = "Ocultar comentários",
  expandLabel = "Mostrar comentários",
  className,
  style,
  ...props
}: ReplyThreadLineProps) {
  const [internalCollapsed, setInternalCollapsed] =
    React.useState(defaultCollapsed);
  const isCollapsed = collapsed ?? internalCollapsed;
  const contentId = React.useId();

  function toggleComments() {
    const nextCollapsed = !isCollapsed;
    if (collapsed === undefined) setInternalCollapsed(nextCollapsed);
    onCollapsedChange?.(nextCollapsed);
  }

  return (
    <div
      {...props}
      className={className}
      style={{
        position: "relative",
        paddingInlineStart: 28,
        paddingBlock: 10,
        minWidth: 0,
        overflowWrap: "anywhere",
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          pointerEvents: "none",
          insetInlineStart: 8,
          top: 0,
          bottom: last ? "auto" : 0,
          height: last ? 26 : undefined,
          width: 16,
          borderInlineStart: `2px solid ${lineColor}`,
          borderBottom: `2px solid ${lineColor}`,
          borderEndStartRadius: 12,
        }}
      />

      <button
        type="button"
        aria-expanded={!isCollapsed}
        aria-controls={contentId}
        onClick={toggleComments}
        className="rounded-md text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          minHeight: 32,
          padding: "4px 6px",
          marginBottom: isCollapsed ? 0 : 6,
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          background: "transparent",
          border: 0,
          fontFamily: "inherit",
        }}
      >
        <span aria-hidden="true" style={{ width: 14, textAlign: "center" }}>
          {isCollapsed ? "+" : "−"}
        </span>
        {isCollapsed ? expandLabel : collapseLabel}
      </button>
      <div id={contentId} hidden={isCollapsed}>
        {children}
      </div>
    </div>
  );
}
