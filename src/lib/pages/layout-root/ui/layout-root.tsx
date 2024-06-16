import type { Metadata } from "next";

import "@shared/design-system/globals.css";
import { cn } from "@ui/utils";
import { ReactNode, FC } from "react";
import { fonts } from "../lib/fonts";
import { Providers } from "./providers";

export interface LayoutRootProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Decent Next.js Starter Template",
  description:
    "Quickly start a new Next.js project with common tools and configurations.",
};

export const LayoutRoot: FC<LayoutRootProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-blue-50 font-sans antialiased flex flex-col",
          fonts.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};
