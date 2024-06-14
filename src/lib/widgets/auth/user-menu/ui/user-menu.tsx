import { getSession } from "@shared/services/auth/client";
import { SignedInUserMenu } from "./signed-in-user-menu";
import { SignedOutUserMenu } from "./signed-out-user-menu";

export const UserMenu = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!!user) return <SignedInUserMenu user={user} />;
  return <SignedOutUserMenu />;
};
