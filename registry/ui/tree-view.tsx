"use client"

import * as React from "react"
import { ChevronRight, Folder, FolderOpen, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
}

export function TreeView({ data, className }: { data: TreeNode[]; className?: string }) {
  return (
    <div className={cn("space-y-1 text-xs select-none", className)}>
      {data.map(node => (
        <TreeItem key={node.id} node={node} />
      ))}
    </div>
  )
}

function TreeItem({ node }: { node: TreeNode }) {
  const [open, setOpen] = React.useState(false)
  const isBranch = Boolean(node.children && node.children.length > 0)

  return (
    <div>
      <div
        onClick={() => isBranch && setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 px-2 py-1.5 rounded-md cursor-pointer transition-colors hover:bg-muted",
          !isBranch && "pl-6 text-muted-foreground hover:text-foreground"
        )}
      >
        {isBranch && (
          <ChevronRight className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", open && "rotate-90")} />
        )}
        {isBranch ? (
          open ? <FolderOpen className="h-4 w-4 text-[#753399]" /> : <Folder className="h-4 w-4 text-[#753399]" />
        ) : (
          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
        )}
        <span className="font-medium text-foreground">{node.label}</span>
      </div>
      {isBranch && open && (
        <div className="pl-4 ml-2 border-l border-border space-y-1 mt-1">
          {node.children!.map(child => (
            <TreeItem key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  )
}