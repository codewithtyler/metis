import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Clock, Tag } from 'lucide-react';
import { Product, Category } from '../../types';

interface TicketHeaderProps {
  ticket: {
    subject: string;
    createdAt: string;
    customerId: string;
    categoryId: string;
  };
  product: Product;
  category?: Category;
  customerName: string;
}

export default function TicketHeader({ ticket, product, category, customerName }: TicketHeaderProps) {
  return (
    <div className="mb-6">
      <div className="mb-4">
        <Link
          to="/tickets"
          className="inline-flex items-center text-dark-300 hover:text-dark-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to tickets
        </Link>
      </div>
      
      <div>
        <h1 className="text-2xl font-semibold text-dark-100">{ticket.subject}</h1>
        <div className="mt-2 flex items-center text-dark-400 text-sm">
          <span className="text-dark-300 font-medium mr-2">{product.name}</span>
          <span className="mx-2">•</span>
          <User className="w-4 h-4 mr-1.5" />
          <span>{customerName}</span>
          <span className="mx-2">•</span>
          <Clock className="w-4 h-4 mr-1.5" />
          <span>
            {new Date(ticket.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {category && (
        <div className="mt-4 inline-flex items-center bg-dark-800 px-4 py-2 rounded-lg border border-dark-700">
          <Tag className="w-4 h-4 text-dark-400 mr-2" />
          <span className="text-dark-100">{category.name}</span>
        </div>
      )}
    </div>
  );
}