import { Plan } from '../types';

export const plans: Plan[] = [
  {
    type: 'free',
    name: 'Free',
    price: 0,
    teamMembers: 1,
    features: [
      'Submit support tickets',
      'Single user support',
    ],
  },
  {
    type: 'team',
    name: 'Team',
    price: 27,
    teamMembers: 10,
    features: [
      'Everything in Free',
      'Analytics dashboard',
      'Custom categories',
      'Up to 10 team members',
    ]
  }
];