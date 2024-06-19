import { DefaultSession, User as DefaultUser } from 'next-auth';

import { UserRole } from '@/lib/types';

declare module 'next-auth' {
  // the sessions callback will add these properties
  interface Session {
    user: {
      roles: UserRole[];
      id: string;
    } & DefaultSession['user'];
  }

  // add the custom roles field from the users DB schema
  interface User extends DefaultUser {
    roles: UserRole[];
    id: string;
  }
}

declare module '@auth/core/jwt' {
  // these get added to the JWT token in the jwt callback
  interface JWT {
    roles: UserRole[];
    id: string;
  }
}
