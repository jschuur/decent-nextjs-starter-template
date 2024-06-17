import { IconUser } from "@tabler/icons-react";
import { Avatar as AvatarRoot,AvatarFallback, AvatarImage } from "@ui/avatar";
import { User } from "next-auth";

import { cn } from "@/lib/utils";

type Props = {
  user: User;
  className?: string;
};

export default function Avatar({ user, className }: Props) {
  const initials = user?.name
    ? user?.name
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .slice(0, 3)
        .join("")
    : "";

  return (
    <AvatarRoot
      className={cn(
        "size-8 sm:size-10 border-white-500 border-[2px] border-blue-100",
        className,
      )}
    >
      <AvatarImage
        className={cn("select-none pointer-events-none")}
        src={user.image || undefined}
      />
      <AvatarFallback className="text-black text-sm sm:text-base">
        {initials || <IconUser className="size-4 sm:size-5" />}
      </AvatarFallback>
    </AvatarRoot>
  );
}
