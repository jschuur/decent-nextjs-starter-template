import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { boolean } from 'boolean';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

import { db } from '@/db/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  debug: boolean(process.env.AUTH_DEBUG),
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  trustHost: true,
});
