"use client";

import * as React from "react";
import { ResponsiveContainer, Tooltip, TooltipProps } from "recharts";

export function ChartContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}
