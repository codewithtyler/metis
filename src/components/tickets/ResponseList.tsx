import React from 'react';
import { TicketResponse as TicketResponseType } from '../../types';
import TicketResponse from './TicketResponse';

interface ResponseListProps {
  responses: TicketResponseType[];
  getResponseUser: (userId: string) => string;
}

export default function ResponseList({ responses, getResponseUser }: ResponseListProps) {
  return (
    <div className="space-y-4 mb-8">
      <h2 className="text-lg font-medium text-dark-100 mb-4">Responses</h2>
      {responses.map((response) => (
        <TicketResponse
          key={response.id}
          response={response}
          userName={getResponseUser(response.userId)}
        />
      ))}
    </div>
  );
}