import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
};
export default function ErrorCallout({
  children,
  className,
  title = "Error",
}: Props) {
  return (
    <Alert variant="destructive" className="bg-red-50">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="pb-2">{title}</AlertTitle>
      <AlertDescription>
        <div className={cn("text-destructive", className)}>{children}</div>
      </AlertDescription>
    </Alert>
  );
}
