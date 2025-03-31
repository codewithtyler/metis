// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'agent' | 'customer';
  teamId: string;
  productIds?: string[];
  password?: string;
  status?: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  teamId: string;
  accessType: 'public' | 'private';
  defaultTemplateId?: string;
  allowedDomains?: string[];
  slug: string;
}

export interface ProductAccess {
  id: string;
  productId: string;
  userId: string;
  accessType: 'user' | 'admin';
  createdAt: string;
}

// Team Types
export interface Team {
  id: string;
  name: string;
  domain: string;
}

// Ticket Types
export interface Ticket {
  id: string;
  subject: string;
  description: string;
  categoryId: string;
  status: 'new' | 'in_progress' | 'pending' | 'resolved';
  productId: string;
  assignedToId?: string;
  customerId: string;
  teamId: string;
  queueType: 'agent' | 'admin';
  escalationReason?: string;
  createdAt: string;
  updatedAt: string;
  templateId?: string;
  customFields?: Record<string, any>;
  satisfaction?: number;
  firstResponseAt?: string;
}

export interface TicketResponse {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  isInternal: boolean;
  createdAt: string;
}

// Template Types
export interface TicketTemplate {
  id: string;
  name: string;
  description: string;
  teamId: string;
  isDefault: boolean;
  fields: TemplateField[];
}

export type FieldType = 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'date';

export interface TemplateField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
}

// Category Types
export interface Category {
  id: string;
  name: string;
  teamId: string;
  productIds?: string[];
  isDefault?: boolean;
  isEnabled: boolean;
}

// Plan Types
export interface Plan {
  type: string;
  name: string;
  price: number;
  teamMembers: number;
  features: string[];
}