"use client";

import { GoogleAnalytics as GoogleAnalyticsScript } from "@next/third-parties/google";

import { env } from "@shared/config/env";
import { FC } from "react";

export const GoogleAnalytics: FC = () => {
  return env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ? (
    <GoogleAnalyticsScript gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
  ) : null;
};
