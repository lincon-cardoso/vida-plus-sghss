import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
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
    <ResponsiveContainer width="100%" height={150}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 20 }}
        aria-label="Gráfico de atendimentos"
        role="img"
      >
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="value" fill="#2563eb" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
}
