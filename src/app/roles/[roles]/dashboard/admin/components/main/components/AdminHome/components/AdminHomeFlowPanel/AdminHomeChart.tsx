"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  day: string;
  value: number;
}

interface Props {
  data: DataPoint[];
}

export default function AdminHomeChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={190}>
      <BarChart data={data} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="rgba(15,23,42,0.06)"
        />
        <XAxis dataKey="day" stroke="rgba(15,23,42,0.6)" />
        <YAxis stroke="rgba(15,23,42,0.6)" />
        <Tooltip formatter={(v: number | string | undefined) => [v ?? "-", "Atendimentos"]} />
        <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
