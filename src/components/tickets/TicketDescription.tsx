import React from 'react';

interface TicketDescriptionProps {
  description: string;
}

export default function TicketDescription({ description }: TicketDescriptionProps) {
  return (
    <div className="bg-dark-800 shadow-lg rounded-lg border border-dark-700 mb-8">
      <div className="p-6">
        <h2 className="text-lg font-medium text-dark-100 mb-4">Description</h2>
        <div className="prose prose-invert max-w-none">{description}</div>
      </div>
    </div>
  );
}