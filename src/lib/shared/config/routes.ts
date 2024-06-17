import { Dice5, DoorOpen, Gift, Home } from "lucide-react";
import { ComponentType } from "react";

export type Route<T = null> = (params: T) => {
  url: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

export const HomePage: Route = () => ({
  url: "/",
  label: "Home",
  icon: Home,
});

export const NopePage: Route = () => ({
  url: "/nope",
  label: "Nope",
  icon: Dice5,
});

export const AboutPage: Route = () => ({
  url: "/about",
  label: "About",
  icon: Dice5,
});

export const PrivatePage: Route = () => ({
  url: "/private",
  label: "Private",
  icon: Gift,
});

export const RoomPage: Route<{ slug: string }> = ({ slug }) => ({
  url: `/rooms/${slug}`,
  label: "Room",
  icon: DoorOpen,
});

export const routes: Route<any | null>[] = [
  AboutPage,
  HomePage,
  NopePage,
  PrivatePage,
  RoomPage,
];

export const publicRoutes: Route<any | null>[] = [HomePage, AboutPage];
export const appRoutes: Route<any | null>[] = [PrivatePage, NopePage];
