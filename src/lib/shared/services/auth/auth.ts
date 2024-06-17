import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { env } from "@shared/config/env";
import { db } from "@shared/services/db";
import { redirect } from "next/navigation";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  debug: env.AUTH_DEBUG,
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  trustHost: true,
});

export interface AssertUserOpts {
  redirectUrl?: string;
}

export const assertUser = async (opts?: AssertUserOpts) => {
  "use server";
  const session = await auth();
  if (!session) return redirect(opts?.redirectUrl || "/denied");
  return session;
};
