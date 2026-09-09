"use client";

import { Calendar } from "@/components/monta-ui/calendar";

export default function Example() {
  return <Calendar onSelectDate={(date) => console.log(date.toISOString())} />;
}
