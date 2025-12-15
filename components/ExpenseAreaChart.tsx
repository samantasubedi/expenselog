"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { ChartContainer } from "@/components/ui/chart";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";

export default function ExpenseAreaChart() {
  const session = useSession();
  const useremail = session.data?.user?.email;
  const query = useQuery({
    queryKey: ["allexpenses", useremail],
    queryFn: async () => {
      const res = await axios.get("../app/api/user", {
        params: { email: useremail },
      });
      return res.data;
    },
    enabled: !!useremail,
  });
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const expenses = query.data.retrivedExpenses;
  const chartData = useMemo(() => {
    if (!expenses) return [];

    const monthlyMap: Record<string, number> = {};

    expenses.forEach((expense: any) => {
      const date = new Date(expense.date);
      const month = months[date.getMonth()];

      monthlyMap[month] = (monthlyMap[month] || 0) + Number(expense.amount);
    });

    return Object.entries(monthlyMap).map(([month, expense]) => ({
      month,
      expense,
    }));
  }, [expenses]);

  return (
    <ChartContainer>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="expense"
          stroke="#2563eb"
          fill="#93c5fd"
        />
      </AreaChart>
    </ChartContainer>
  );
}
