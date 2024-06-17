import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipTrigger,
} from "@ui/tooltip";
import { ReactNode, useState } from "react";

type Props = {
  tooltip: string | (() => string) | undefined | null;
  delayDuration?: number;
  children: ReactNode;
  asChild?: boolean;
};

export default function Tooltip({
  children,
  tooltip,
  delayDuration = 1000,
  asChild,
}: Props) {
  const [content, setContent] = useState<string | undefined | null>(
    typeof tooltip === "function" ? tooltip() : tooltip,
  );

  if (!tooltip) return null;

  const updateContent = (open: boolean) => {
    if (open && typeof tooltip === "function") {
      setContent(tooltip());
    }
  };

  return (
    <TooltipRoot onOpenChange={updateContent} delayDuration={delayDuration}>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent className="z-10">
        <p>{content}</p>
      </TooltipContent>
    </TooltipRoot>
  );
}
