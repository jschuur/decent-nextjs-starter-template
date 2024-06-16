import { FC } from "react";
import { SignedInUserMenu } from "./signed-in-user-menu";
import { SignedOutUserMenu } from "./signed-out-user-menu";
import { auth } from "@/lib/shared/services/auth";

export const UserMenu: FC = async () => {
  const session = await auth();
  const user = session?.user;
  if (!!user) return <SignedInUserMenu user={user} />;
  return <SignedOutUserMenu />;
};
