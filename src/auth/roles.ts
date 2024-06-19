import { User } from 'next-auth';
import { z } from 'zod';

import { UserRole } from '@/lib/types';

type PotentialUser = User | undefined;

export const userRoles = ['Admin'] as const;
export const userRoleSchema = z.array(z.enum(userRoles));

export const hasRole = (user: PotentialUser, role: UserRole) =>
  user?.roles?.includes(role) || false;

// Internal role helpers
const isAdmin = (user: PotentialUser) => hasRole(user, 'Admin');

// Feature specific permission helpers
export const canEditStackItems = (user: PotentialUser) => isAdmin(user);

export function getUserRoles(user: User) {
  return userRoleSchema.parse(user?.roles || []);
}
