import React from 'react';
import { APP_NAME } from '../../config/app';

const testimonials = [
  {
    content: `${APP_NAME} has transformed how we handle customer support. Our response times are down 50% and customer satisfaction is at an all-time high.`,
    author: 'Sarah Thompson',
    role: 'Customer Success Manager, TechCorp',
  },
  {
    content: `The analytics and reporting features have given us invaluable insights into our support operations. We can now make data-driven decisions to improve our service.`,
    author: 'Michael Chen',
    role: 'Support Director, CloudScale',
  },
];

export default function Testimonials() {
  return (
    <div className="bg-dark-800 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-base font-semibold uppercase tracking-wide text-primary">Testimonials</h2>
            <p className="mt-2 text-3xl font-extrabold text-dark-100">Loved by teams worldwide</p>
            <p className="mt-4 text-lg text-dark-300">
              Don't just take our word for it - hear what our customers have to say about their experience with {APP_NAME}.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <div className="space-y-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-dark-700 rounded-lg p-6">
                  <p className="text-dark-100">"{testimonial.content}"</p>
                  <div className="mt-6">
                    <p className="text-base font-medium text-dark-200">{testimonial.author}</p>
                    <p className="text-sm text-dark-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}