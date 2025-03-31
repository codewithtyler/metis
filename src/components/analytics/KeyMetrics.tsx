import React from 'react';
import { Clock, ThumbsUp, TrendingUp } from 'lucide-react';

interface KeyMetricsProps {
  stats: {
    averageResolutionTime: string;
    firstResponseTime: string;
    satisfactionScore: string;
    ticketVolume: {
      weekAgo: number;
    };
  };
}

export default function KeyMetrics({ stats }: KeyMetricsProps) {
  const metrics = [
    {
      icon: Clock,
      label: 'Avg. Resolution Time',
      value: stats.averageResolutionTime,
    },
    {
      icon: Clock,
      label: 'First Response Time',
      value: stats.firstResponseTime,
    },
    {
      icon: ThumbsUp,
      label: 'Customer Satisfaction',
      value: stats.satisfactionScore,
    },
    {
      icon: TrendingUp,
      label: 'Weekly Ticket Volume',
      value: stats.ticketVolume.weekAgo,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-5">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-dark-800 overflow-hidden shadow-lg rounded-lg border border-dark-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <metric.icon className="h-6 w-6 text-dark-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-dark-300 truncate">
                    {metric.label}
                  </dt>
                  <dd className="text-lg font-semibold text-dark-100">
                    {metric.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}