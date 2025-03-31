import React from 'react';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    totalTickets: number;
    openTickets: number;
    avgResponseTime: string;
    satisfaction: string;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-dark-800 overflow-hidden shadow-lg rounded-lg border border-dark-700">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-dark-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-dark-300 truncate">
                  Total Tickets
                </dt>
                <dd className="text-lg font-semibold text-dark-100">
                  {stats.totalTickets}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark-800 overflow-hidden shadow-lg rounded-lg border border-dark-700">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-6 w-6 text-dark-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-dark-300 truncate">
                  Open Tickets
                </dt>
                <dd className="text-lg font-semibold text-dark-100">
                  {stats.openTickets}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark-800 overflow-hidden shadow-lg rounded-lg border border-dark-700">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-6 w-6 text-dark-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-dark-300 truncate">
                  Avg. Response Time
                </dt>
                <dd className="text-lg font-semibold text-dark-100">
                  {stats.avgResponseTime}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark-800 overflow-hidden shadow-lg rounded-lg border border-dark-700">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-dark-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-dark-300 truncate">
                  Customer Satisfaction
                </dt>
                <dd className="text-lg font-semibold text-dark-100">
                  {stats.satisfaction}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}