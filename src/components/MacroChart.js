"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function MacroChart({ proteinCals, totalCals = 2500 }) {
  // Rough estimate for visualization purposes:
  // Remaining cals split roughly 50/50 between carbs and fats
  const remainingCals = Math.max(totalCals - proteinCals, 0);
  const data = [
    { name: "Protein", value: proteinCals, color: "#ff2b2b" },
    { name: "Carbs", value: remainingCals * 0.5, color: "#6b0000" },
    { name: "Fats", value: remainingCals * 0.5, color: "#333333" },
  ];

  return (
    <div className="w-full h-[200px] mt-4 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: '#ff2b2b', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[#888] text-xs uppercase tracking-widest">Target</span>
        <span className="text-[#f5f5f5] font-bold text-xl" style={{ fontFamily: 'var(--font-rajdhani)' }}>{totalCals}</span>
        <span className="text-[#888] text-[10px] uppercase">kcal</span>
      </div>
    </div>
  );
}
