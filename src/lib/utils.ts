import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function isObjectWithProperties<T extends string>(obj: unknown, properties: T[]): obj is { [K in T]: unknown } {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  return properties.every((prop) => prop in obj);
}
