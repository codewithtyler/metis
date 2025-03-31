import React from 'react';
import { Shield, Clock, Users, CheckCircle } from 'lucide-react';

const badges = [
  { icon: Shield, text: '256-bit SSL Encryption' },
  { icon: Clock, text: '99.9% Uptime' },
  { icon: Users, text: '10,000+ Users' },
  { icon: CheckCircle, text: 'GDPR Compliant' },
];

export default function TrustBadges() {
  return (
    <div className="border-t border-dark-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {badges.map((badge) => (
            <div key={badge.text} className="col-span-1 flex justify-center md:col-span-1">
              <div className="flex flex-col items-center">
                <badge.icon className="h-8 w-8 text-dark-400" />
                <p className="mt-2 text-sm text-dark-400 text-center">{badge.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}