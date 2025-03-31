import React from 'react';
import { Star } from 'lucide-react';

interface RatingModalProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function RatingModal({
  rating,
  onRatingChange,
  onSubmit,
  onClose
}: RatingModalProps) {
  return (
    <div className="fixed inset-0 bg-dark-900/75 flex items-center justify-center">
      <div className="bg-dark-800 rounded-lg p-8 max-w-md w-full border border-dark-700">
        <h3 className="text-lg font-medium text-dark-100 mb-4">
          How satisfied were you with our support?
        </h3>
        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRatingChange(star)}
              className="focus:outline-none"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-dark-300'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-dark-600 rounded-md text-sm font-medium text-dark-200 bg-dark-800 hover:bg-dark-700"
          >
            Skip
          </button>
          <button
            onClick={onSubmit}
            disabled={rating === 0}
            className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
}