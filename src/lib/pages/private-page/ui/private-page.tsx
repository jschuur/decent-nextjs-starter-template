import { assertUser } from "@shared/services/auth";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Decent Next.js Starter Template",
  description:
    "Quickly start a new Next.js project with common tools and configurations.",
};

export const PrivatePage: FC = async () => {
  await assertUser();

  return (
    <div>
      <h1>Private Page</h1>
      <p>Only logged in users can see this page</p>
    </div>
  );
};
