import { LucideIcon } from 'lucide-react';

export type StepId = 'info' | 'password' | 'product';

export interface Step {
  id: StepId;
  name: string;
  icon: LucideIcon;