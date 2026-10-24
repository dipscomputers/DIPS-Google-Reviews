import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { BarChart3, PieChart as PieIcon, ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryDistributionChartProps {
  usedReviewIds: number[];
}

export const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({
  usedReviewIds,
}) => {
  const [chartType, setChartType] = useState<'bar' | 'donut'>('bar');
  const [isExpanded, setIsExpanded] = useState(false);

  // Compute category breakdown
  const cscUsed = usedReviewIds.filter(
    (id) => (id >= 1 && id <= 50) || (id >= 201 && id <= 250)
  ).length;

  const compUsed = usedReviewIds.filter(
    (id) => (id >= 51 && id <= 100) || (id >= 151 && id <= 200)
  ).length;

  const onlineUsed = usedReviewIds.filter(
    (id) => (id >= 101 && id <= 150) || (id >= 251 && id <= 300)
  ).length;

  const totalUsed = usedReviewIds.length;

  const data = [
    {
      name: 'CSC व सरकार',
      shortName: 'CSC',
      used: cscUsed,
      remaining: 100 - cscUsed,
      total: 100,
      color: '#f59e0b', // Amber / Indian Saffron
    },
    {
      name: 'कम्प्युटर क्लास',
      shortName: 'कम्प्युटर',
      used: compUsed,
      remaining: 100 - compUsed,
      total: 100,
      color: '#10b981', // Emerald
    },
    {
      name: 'पॅन व ऑनलाइन',
      shortName: 'ऑनलाइन',
      used: onlineUsed,
      remaining: 100 - onlineUsed,
      total: 100,
      color: '#8b5cf6', // Purple
    },
  ];

  // Pie chart dataset
  // If zero reviews used yet, show initial even allocation so chart isn't empty!
  const pieData =
    totalUsed > 0
      ? [
          { name: 'CSC सेवा', value: cscUsed, color: '#f59e0b' },
          { name: 'कम्प्युटर क्लास', value: compUsed, color: '#10b981' },
          { name: 'ऑनलाइन कामे', value: onlineUsed, color: '#8b5cf6' },
        ].filter((d) => d.value > 0)
      : [
          { name: 'CSC सेवा (100)', value: 100, color: '#f59e0b' },
          { name: 'कम्प्युटर क्लास (100)', value: 100, color: '#10b981' },
          { name: 'ऑनलाइन कामे (100)', value: 100, color: '#8b5cf6' },
        ];

  // Custom Dark Tooltip
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof data[0] }> }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700/80 p-2.5 rounded-xl shadow-xl text-xs z-50">
          <div className="font-bold text-white flex items-center gap-1.5 mb-1">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.name}</span>
          </div>
          <div className="text-slate-300">
            दिलेले रिव्ह्यूज:{' '}
            <strong className="text-emerald-400 font-bold tabular-nums">
              {item.used}
            </strong>{' '}
            / {item.total}
          </div>
          <div className="text-slate-400 text-[10px]">
            शिल्लक: <span className="tabular-nums">{item.remaining}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-3.5 my-2 shadow-lg transition-all">
      {/* Header with Expand/Collapse */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-left cursor-pointer group flex-1"
        >
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>कॅटेगरी आकडेवारी (Top Categories)</span>
              <span className="text-[10px] text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.2 rounded">
                Recharts
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              कोणत्या सेवेला किती रिव्ह्यू मिळाले ते पहा
            </div>
          </div>
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Chart Type Toggle (visible when expanded) */}
          {isExpanded && (
            <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-[10px]">
              <button
                onClick={() => setChartType('bar')}
                className={`p-1 rounded transition-colors ${
                  chartType === 'bar'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="बार चार्ट"
              >
                <BarChart3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setChartType('donut')}
                className={`p-1 rounded transition-colors ${
                  chartType === 'donut'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="डोनट चार्ट"
              >
                <PieIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Toggle Expand */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-400 hover:text-white cursor-pointer"
            aria-label="Toggle Chart Visibility"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mini Preview row when collapsed */}
      {!isExpanded && (
        <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-800/60 text-[11px]">
          {data.map((item) => (
            <div
              key={item.name}
              className="bg-slate-950/50 p-1.5 rounded-lg border border-slate-800/60 text-center"
            >
              <div className="text-[10px] text-slate-400 truncate">{item.shortName}</div>
              <div className="font-bold tabular-nums" style={{ color: item.color }}>
                {item.used} <span className="text-[9px] text-slate-500 font-normal">/ 100</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expanded Chart View */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 animate-fadeIn">
          {/* Chart View Area */}
          <div className="h-44 w-full min-w-0">
            {chartType === 'bar' ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={160}>
                <BarChart
                  data={data}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <XAxis
                    dataKey="shortName"
                    stroke="#64748b"
                    fontSize={10}
                    tickLine={false}
                    axisLine={{ stroke: '#334155' }}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={10}
                    tickLine={false}
                    axisLine={{ stroke: '#334155' }}
                    domain={[0, Math.max(10, Math.max(...data.map((d) => d.used)) + 5)]}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }}
                  />
                  <Bar
                    dataKey="used"
                    radius={[6, 6, 0, 0]}
                    animationDuration={600}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={160}>
                <PieChart>
                  <Tooltip
                    formatter={(val, name) => [`${val} रिव्ह्यूज`, name]}
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      fontSize: '11px',
                      color: '#f8fafc',
                    }}
                  />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={36}
                    outerRadius={58}
                    paddingAngle={3}
                    animationDuration={600}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Interactive Legend with Live Stats */}
          <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-800/60 text-center">
            {data.map((item) => (
              <div key={item.name} className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-[10px] text-slate-300">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate">{item.shortName}</span>
                </div>
                <div className="text-xs font-bold text-white tabular-nums mt-0.5">
                  {item.used}{' '}
                  <span className="text-[10px] text-slate-400 font-normal">
                    ({Math.round((item.used / (totalUsed || 1)) * (totalUsed ? 100 : 0))}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
