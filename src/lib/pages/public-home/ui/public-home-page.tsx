import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Decent Next.js Starter Template",
  description:
    "Quickly start a new Next.js project with common tools and configurations.",
};

export const PublicHomePage: FC = () => {
  return (
    <div>
      <h1>Public Page</h1>
      <p>Anyone can see this page</p>
    </div>
  );
};
