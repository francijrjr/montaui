"use client";

import { TreeView } from "@/components/monta-ui/tree-view";

export default function Example() {
  return (
    <TreeView
      data={[
        {
          id: "projects",
          label: "Projetos",
          children: [{ id: "monta", label: "Monta UI" }],
        },
      ]}
    />
  );
}
