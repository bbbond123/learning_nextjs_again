'use client';

interface ChartProps {
  data: { label: string; value: number }[];
  title?: string;
}

export default function Chart({ data, title }: ChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="my-6 p-6 border-2 border-cyan-300 rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
      {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="w-24 text-sm font-medium">{item.label}</span>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-8 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              >
                <span className="text-white text-sm font-bold">
                  {item.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
