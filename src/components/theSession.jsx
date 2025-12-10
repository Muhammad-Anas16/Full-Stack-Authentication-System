"use client";

import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { AreaChart, Area, CartesianGrid, XAxis } from "recharts";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

function generateDynamicChartData(accountCreatedAt) {
  if (!accountCreatedAt) return [];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const msInMonth = 30 * 24 * 60 * 60 * 1000;
  const accountAgeMS = Date.now() - new Date(accountCreatedAt).getTime();
  const activeMonths = Math.min(6, Math.floor(accountAgeMS / msInMonth) + 1);

  return months.slice(0, activeMonths).map((m, i) => ({
    month: m,
    desktop: Math.floor(120 + Math.random() * (i + 1) * 50),
  }));
}

export default function TheSession({ user }) {
  const router = useRouter();

  const safeUser = {
    name: user?.name || null,
    email: user?.email || null,
    createdAt: user?.createdAt || null,
  };

  const isLoggedIn = !!safeUser.email;

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) router.push("/auth/login");
  };

  const chartData = useMemo(() => {
    return generateDynamicChartData(safeUser.createdAt);
  }, [safeUser.createdAt]);

  const chartConfig = {
    desktop: {
      label: "Activity",
      color: "var(--chart-1)",
    },
  };

  const cleanName = safeUser.name?.replace(/\./g, " ") || "User";

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 sm:p-6 md:p-10">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Welcome back, {cleanName} 👋
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            {safeUser.email || "No email"}
          </p>
        </div>

        {/* LOGOUT ONLY */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition text-white font-medium self-start sm:self-auto cursor-pointer"
          >
            Log Out
          </button>
        )}
      </div>

      {/* CHART CARD */}
      <Card className="bg-[#0d0d0d] border border-gray-800 rounded-2xl shadow-lg w-full max-w-4xl mx-auto mb-10">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            Account Activity
          </CardTitle>
          <CardDescription className="text-green-400 text-sm sm:text-base">
            Last 30 Days • +12.5%
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="w-full overflow-hidden">
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 0, right: 0 }}
                width={undefined}
                height={300}
              >
                <CartesianGrid vertical={false} stroke="#222" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  stroke="#888"
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />

                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--chart-1)"
                  fillOpacity={0.4}
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <div className="flex items-start gap-2 text-sm sm:text-base">
            <div>
              <p className="flex items-center gap-1 font-medium">
                Trending up by 5.2% this month
                <TrendingUp className="h-4 w-4 text-green-400" />
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                Based on your activity timeline
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
