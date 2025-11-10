import { useNavigate } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


type CustomBarChartProps = {
  data: any[];
  argsId: string;
  series: string[];
  seriesId: string;
}


export const chartColors = [
  "#e6194B", 
  "#3cb44b", 
  "#ffe119", 
  "#4363d8",
  "#f58231", 
  "#911eb4", 
  "#46f0f0", 
  "#f032e6", 
  "#bcf60c", 
  "#fabebe", 
  "#008080", 
  "#e6beff", 
  "#9a6324",
  "#fffac8", 
  "#800000", 
  "#aaffc3", 
  "#808000", 
  "#ffd8b1", 
  "#000075", 
  "#808080", 
];

export function CustomBarChart({ data, argsId, series, seriesId }: CustomBarChartProps) {
  const navigate = useNavigate();

  return (
    <ResponsiveContainer
      height="100%"
      width="100%"
    >
      <BarChart
        accessibilityLayer
        barCategoryGap="10%"
        barGap={4}
        data={data}
        height={300}
        margin={{
          bottom: 5,
          left: 20,
          right: 30,
          top: 20
        }}
        syncMethod="index"
        width={500}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={argsId} />
        <YAxis />
        <Legend />
        {
          series.map((serie, idx) => {
            return (
              <Bar 
                key={idx}
                style={{ cursor: "pointer" }}
                dataKey={serie}
                fill={chartColors[idx]}
                stackId="a"
                onClick={
                  (data) => navigate({
                    to: "/tables",
                    search: {
                      [argsId]: data.payload[argsId],
                      [seriesId]: serie,
                    }
                  })
                }
              />
            );
          })
        }
        <Tooltip
          defaultIndex={1}
          cursor={false}
          labelStyle={{ color: "black"}}
        />
      </BarChart>
    </ResponsiveContainer>
  );

}