import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown) {
  if (error instanceof z.ZodError) return fromError(error).toString();

  if (error instanceof Error) return error.message;

  return String(error);
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatDateShort(date: Date | string | undefined) {
  return date && format(new Date(date), 'LLL do, yyyy');
}
