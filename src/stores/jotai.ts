import { atom } from 'jotai';

import { QueryClient } from '@tanstack/react-query';

export const queryClientAtom = atom<QueryClient | null>(null);
