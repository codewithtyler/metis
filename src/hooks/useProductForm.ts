import { useState } from 'react';
import { Product } from '../types';

export function useProductForm(initialProduct?: Product) {
  const [name, setName] = useState(initialProduct?.name || '');
  const [description, setDescription] = useState(initialProduct?.description || '');
  const [accessType, setAccessType] = useState<'public' | 'private'>(initialProduct?.accessType || 'public');
  const [allowedDomains, setAllowedDomains] = useState<string[]>(initialProduct?.allowedDomains || []);
  const [slug, setSlug] = useState(initialProduct?.slug || '');
  const [error, setError] = useState('');

  const resetForm = () => {
    setName('');
    setDescription('');
    setAccessType('public');
    setAllowedDomains([]);
    setSlug('');
    setError('');
  };

  const generateSlug = (text: string): string => {
    const allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789-';
    let slug = '';
    
    // Convert to lowercase and replace spaces with hyphens
    const normalized = text.toLowerCase();
    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i];
      if (allowedChars.includes(char)) {
        slug += char;
      } else if (char === ' ') {
        // Only add hyphen if previous char wasn't a hyphen
        if (slug[slug.length - 1] !== '-') {
          slug += '-';
        }
      }
    }
    
    // Remove leading/trailing hyphens
    slug = slug.replace(/^-+|-+$/g, '');
    
    return slug || 'untitled';
  };

  return {
    name,
    description,
    accessType,
    allowedDomains,
    slug,
    error,
    setName,
    setDescription,
    setAccessType,
    setAllowedDomains,
    setSlug,
    setError,
    resetForm,
    generateSlug
  };
}