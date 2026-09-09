"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/monta-ui/pagination";
import { useState } from "react";

export default function GridPaginada() {
  const [currentPage, setCurrentPage] = useState(3);

  return (
    <div className="space-y-4 p-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              isActive={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={currentPage === 2}
              onClick={() => setCurrentPage(2)}
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={currentPage === 3}
              onClick={() => setCurrentPage(3)}
            >
              3
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              isActive={currentPage === 18}
              onClick={() => setCurrentPage(18)}
            >
              18
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((p) => Math.min(18, p + 1))}
              disabled={currentPage === 18}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
