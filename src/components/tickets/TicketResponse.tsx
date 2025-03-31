import React from 'react';
import { User, Lock } from 'lucide-react';
import { TicketResponse as TicketResponseType } from '../../types';

interface TicketResponseProps {
  response: TicketResponseType;
  userName: string;
}

export default function TicketResponse({ response, userName }: TicketResponseProps) {
  return (
    <div
      className={`bg-dark-800 shadow-lg rounded-lg border border-dark-700 ${
        response.isInternal ? 'border-l-4 border-l-yellow-500' : ''
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center">
              <User className="w-4 h-4 text-dark-400" />
            </div>
            <span className="font-medium text-dark-100">{userName}</span>
            {response.isInternal && (
              <span className="flex items-center text-sm text-yellow-500">
                <Lock className="h-4 w-4 mr-1" />
                Internal Note
              </span>
            )}
          </div>
          <span className="text-sm text-dark-400">
            {new Date(response.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        <div className="prose max-w-none">{response.content}</div>
      </div>
    </div>
  );
}