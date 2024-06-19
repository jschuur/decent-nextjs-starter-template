import { JWT } from '@auth/core/jwt';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth, { Session } from 'next-auth';
import Google from 'next-auth/providers/google';

import { getUserRoles } from '@/auth/roles';
import { db } from '@/db/db';
import { accounts, sessions, users } from '@/db/schema';
import { env } from '@/env';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  debug: env.AUTH_DEBUG,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
  session: { strategy: 'jwt' },
  trustHost: true,
  callbacks: {
    jwt({ token, user, trigger }) {
      // add extra fields to the JWT token (for use in the session callback)
      if (user) {
        token.id = user.id as string;
        token.roles = getUserRoles(user);
      }

      // if (trigger === 'signUp') {
      //   console.log('New user signed up', { user });
      // }

      return token;
    },
    // gets called every time a session is checked
    session({ session, token }: { session: Session; token: JWT }) {
      // add extra fields to the session object
      session.user.id = token.id;
      session.user.roles = token.roles;

      return session;
    },
  },
});
