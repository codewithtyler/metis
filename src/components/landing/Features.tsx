import React from 'react';
import { MessageSquare, BarChart, Users } from 'lucide-react';

const features = [
  {
    name: 'Smart Ticketing',
    description: 'Organize and track customer requests with an intuitive ticketing system that keeps everything in one place.',
    icon: MessageSquare,
  },
  {
    name: 'Advanced Analytics',
    description: 'Get insights into your team\'s performance and customer satisfaction metrics.',
    icon: BarChart,
  },
  {
    name: 'Team Collaboration',
    description: 'Work together seamlessly with internal notes, assignments, and shared inboxes.',
    icon: Users,
  },
];

export default function Features() {
  return (
    <div id="features" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-primary">Features</h2>
          <p className="mt-1 text-4xl font-extrabold text-dark-100 sm:text-5xl sm:tracking-tight">
            Everything you need to deliver exceptional support
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-dark-300">
            Streamline your support workflow with powerful features designed to help you work smarter, not harder.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6 h-full">
                <div className="flow-root bg-dark-800 rounded-lg px-6 pb-8 h-full flex flex-col">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-dark-100 tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-dark-300 flex-grow">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}