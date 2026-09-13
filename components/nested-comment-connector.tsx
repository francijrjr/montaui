"use client";

import * as React from "react";

export interface NestedCommentConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  last?: boolean;
  lineColor?: string;
}

export function NestedCommentConnector({
  children,
  last = true,
  lineColor = "#a1a1aa",
  className,
  style,
  ...props
}: NestedCommentConnectorProps) {
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

      {children}
    </div>
  );
}
