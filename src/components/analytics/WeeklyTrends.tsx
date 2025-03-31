import React from 'react';

interface WeeklyTrendsProps {
  trends: Array<{
    day: string;
    tickets: number;
  }>;
}

export default function WeeklyTrends({ trends }: WeeklyTrendsProps) {
  return (
    <div className="bg-dark-800 overflow-hidden shadow-lg rounded-lg border border-dark-700 lg:col-span-2">
      <div className="p-5">
        <h3 className="text-lg font-medium text-dark-100 mb-4">
          Weekly Ticket Volume
        </h3>
        <div className="relative h-80 pl-16 pr-8 pt-4 pb-12">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-7 grid-rows-4 gap-0">
            {[...Array(5)].map((_, i) => {
              const maxValue = Math.max(...trends.map(d => d.tickets));
              return (
                <div 
                  key={i}
                  className="col-span-7 border-t border-dark-700/30"
                >
                  <span className="absolute -left-12 top-0 transform -translate-y-1/2 text-sm text-dark-400">
                    {maxValue === 0 ? (4 - i) * 5 : Math.round((maxValue * (4 - i)) / 4)}
                  </span>
                </div>
              );
            })}
            {trends.map((_, i) => (
              <div
                key={i}
                className="row-span-4 border-l border-dark-700/30"
              />
            ))}
          </div>
          
          {/* Line chart */}
          <div className="relative h-[calc(100%-48px)]">
            <svg className="w-full h-full overflow-visible">
              {/* Line */}
              <path
                d={trends.map((day, i) => 
                  `${i === 0 ? 'M' : 'L'} ${(i * 100) / (trends.length - 1)}% 100%`
                ).join(' ')}
                fill="none"
                stroke="rgb(var(--color-primary))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Data points */}
              {trends.map((day, i) => (
                <g key={i}>
                  <circle
                    cx={`${(i * 100) / (trends.length - 1)}%`}
                    cy="100%"
                    r="4"
                    fill="rgb(var(--color-primary))"
                    stroke="rgb(var(--color-dark-800))"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                  <text
                    x={`${(i * 100) / (trends.length - 1)}%`}
                    y="100%"
                    dy="28"
                    textAnchor="middle"
                    className="text-sm text-dark-400"
                  >
                    {day.day}
                  </text>
                  <text
                    x={`${(i * 100) / (trends.length - 1)}%`}
                    y="95%"
                    dy="-12"
                    textAnchor="middle"
                    className="text-sm text-dark-400"
                  >
                    {day.tickets}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}