import React from 'react';
import { Users, Clock } from 'lucide-react';

interface TopAgentsProps {
  agents: Array<{
    name: string;
    resolvedTickets: number;
    avgResolutionTime: string;
  }>;
}

export default function TopAgents({ agents }: TopAgentsProps) {
  return (
    <div className="bg-dark-800 overflow-hidden shadow-lg rounded-lg border border-dark-700">
      <div className="p-5">
        <h3 className="text-lg font-medium text-dark-100 mb-4">
          Top Performing Agents
        </h3>
        <div className="space-y-4">
          {agents.map((agent, index) => (
            <div key={index} className="flex items-center">
              <Users className="h-5 w-5 text-dark-400 mr-2" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-dark-100">
                    {agent.name}
                  </span>
                  <span className="text-sm text-dark-400">
                    {agent.resolvedTickets} tickets
                  </span>
                </div>
                <div className="flex items-center text-sm text-dark-400">
                  <Clock className="h-4 w-4 mr-1" />
                  Avg. Resolution Time: {agent.avgResolutionTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}