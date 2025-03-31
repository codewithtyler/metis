import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { AuthProvider } from '../context/AuthContext';
import { ProductProvider } from '../context/ProductContext'; 
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

// Token validation based on DOM spec
function isValidToken(token: string): boolean {
  if (typeof token !== 'string') {
    throw new TypeError('Token must be a string');
  }

  if (token === '') {
    throw new SyntaxError('Token cannot be empty');
  }

  if (/\s/.test(token)) {
    throw new InvalidCharacterError('Token cannot contain whitespace');
  }

  try {
    CSS.escape(token);
    
    const firstChar = token.charAt(0);
    if (firstChar >= '0' && firstChar <= '9') return false;
    
    if (token.startsWith('--')) return false;
    
    const secondChar = token.charAt(1);
    if (token.startsWith('-') && secondChar >= '0' && secondChar <= '9') return false;
    
    return true;
  } catch {
    return false;
  }
}

class InvalidCharacterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCharacterError';
  }
}

declare global {
  interface Element {
    _classList?: DOMTokenList;
  }
}

class MockDOMTokenList implements DOMTokenList {
  private tokens: Set<string>;
  length: number;
  value: string;
  _initialized: boolean;

  constructor(initialClasses?: string) {
    this.tokens = new Set();
    this._initialized = false;
    if (initialClasses) {
      initialClasses.split(/\s+/).filter(Boolean).forEach(token => {
        if (this.validateToken(token)) {
          this.tokens.add(token);
        }
      });
    }
    this.updateState();
    this._initialized = true;
  }

  private validateToken(token: string): boolean {
    return isValidToken(token);
  }

  add(...tokens: string[]) {
    if (!this._initialized) {
      this.tokens = new Set();
      this._initialized = true;
    }
    tokens.forEach(token => {
      if (this.validateToken(token)) {
        this.tokens.add(token);
      }
    });
    this.updateState();
    return undefined;
  }

  remove(...tokens: string[]) {
    if (!this._initialized) {
      this.tokens = new Set();
      this._initialized = true;
    }
    tokens.forEach(token => {
      if (this.validateToken(token)) {
        this.tokens.delete(token);
      }
    });
    this.updateState();
    return undefined;
  }

  contains(token: string): boolean {
    if (!this._initialized) {
      this.tokens = new Set();
      this._initialized = true;
    }
    if (!this.validateToken(token)) return false;
    return this.tokens.has(token);
  }

  item(index: number): string | null {
    if (!this._initialized) {
      this.tokens = new Set();
      this._initialized = true;
    }
    return Array.from(this.tokens)[index] || null;
  }

  toggle(token: string, force?: boolean): boolean {
    if (!this._initialized) {
      this.tokens = new Set();
      this._initialized = true;
    }
    if (!this.validateToken(token)) return false;
    
    if (force !== undefined) {
      if (force) {
        this.tokens.add(token);
      } else {
        this.tokens.delete(token);
      }
    } else {
      if (this.tokens.has(token)) {
        this.tokens.delete(token);
      } else {
        this.tokens.add(token);
      }
    }
    
    this.updateState();
    return this.tokens.has(token);
  }

  replace(oldToken: string, newToken: string): boolean {
    if (!this._initialized) {
      this.tokens = new Set();
      this._initialized = true;
    }
    if (!this.validateToken(oldToken) || !this.validateToken(newToken)) return false;
    if (!this.tokens.has(oldToken)) return false;
    this.tokens.delete(oldToken);
    this.tokens.add(newToken);
    this.updateState();
    return true;
  }

  supports(token: string): boolean {
    try {
      return this.validateToken(token);
    } catch {
      return false;
    }
  }

  entries(): IterableIterator<[number, string]> {
    if (!this._initialized) {
      this.tokens = new Set();
      this._initialized = true;
    }
    return Array.from(this.tokens).entries();
  }

  forEach(callback: (value: string, key: number, parent: DOMTokenList) => void): void {
    if (!this._initialized) {
      this.tokens = new Set();
      this._initialized = true;
    }
    Array.from(this.tokens).forEach((value, key) => callback(value, key, this));
  }

  keys(): IterableIterator<number> {
    if (!this._initialized) {
      this.tokens = new Set();
      this._initialized = true;
    }
    return Array.from(this.tokens).keys();
  }

  values(): IterableIterator<string> {
    if (!this._initialized) {
      this.tokens = new Set();
      this._initialized = true;
    }
    return this.tokens.values();
  }

  [Symbol.iterator](): IterableIterator<string> {
    if (!this._initialized) {
      this.tokens = new Set();
      this._initialized = true;
    }
    return this.tokens.values();
  }

  private updateState(): void {
    this.value = Array.from(this.tokens).join(' ');
    this.length = this.tokens.size;
  }

  toString(): string {
    return Array.from(this.tokens).join(' ');
  }
}

// Mock CSS.escape
global.CSS = {
  escape: (str: string) => str
};

// Mock className setter to sync with classList
Object.defineProperty(Element.prototype, 'className', {
  get() {
    return this._classList ? this._classList.value : '';
  },
  set(value: string) {
    this._classList = new MockDOMTokenList(value) as unknown as DOMTokenList;
    return true;
  },
  configurable: true,
  enumerable: true
});

// Mock classList
Object.defineProperty(Element.prototype, 'classList', {
  get() {
    if (!this._classList) {
      const mockList = new MockDOMTokenList('');
      this._classList = new Proxy(mockList, {
        get(target, prop) {
          if (prop === Symbol.toStringTag) return 'DOMTokenList';
          if (prop in target) {
            const value = target[prop as keyof typeof target];
            return typeof value === 'function' ? value.bind(target) : value;
          }
          return undefined;
        }
      }) as unknown as DOMTokenList;
    }
    return this._classList;
  },
  configurable: true,
  enumerable: true
});

// Test wrapper with providers
export function TestWrapper({ children }: { children: React.ReactNode }) {
  const mockUser = {
    id: 'admin1',
    email: 'admin@team.com',
    name: 'John Admin',
    role: 'admin',
    teamId: 'team1',
    productIds: ['product1']
  };

  // Mock localStorage
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
    if (key === 'auth_user') return JSON.stringify(mockUser);
    return null;
  });

  return (
    <MemoryRouter>
      <AuthProvider>
        <ProductProvider>
          {children}
        </ProductProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Cleanup after each test case
afterEach(() => {
  cleanup();
  // Reset any classList mocks
  Object.defineProperty(Element.prototype, '_classList', {
    value: undefined,
    writable: true,
    configurable: true
  });
  vi.restoreAllMocks();
});