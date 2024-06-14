"use client";
import { FileTextIcon } from "lucide-react";

import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";

import { cn } from "@/lib/utils";

import { StackItem } from "@/lib/types";

const badgeColors = {
  css: "bg-pink-300",
  tooling: "bg-blue-300",
  database: "bg-green-300",
  utility: "bg-purple-300",
  framework: "bg-amber-300",
  state: "bg-indigo-300",
  ui: "bg-cyan-300",
  typescript: "bg-orange-300",
  authentication: "bg-teal-300",
};

type Props = {
  item: StackItem;
};
export default function StackItemEntry({ item }: Props) {
  return (
    <Card className="grid grid-rows-[auto,1fr,auto] shadow hover:even:rotate-1 hover:odd:-rotate-1 hover:scale-105 hover:shadow-lg hover:bg-orange-50 transition ease-in-out">
      <CardHeader className="grid grid-cols-subgrid grid-rows-subgrid">
        <CardTitle>
          {item.name}
          <div className="flex flex-row gap-2 pt-3">
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                className={cn(
                  badgeColors[tag as keyof typeof badgeColors] || "bg-red-300",
                  "text-gray-800 font-medium tracking-wider uppercase text-xs pointer-events-none",
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-subgrid grid-rows-subgrid">
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
      {item.link && (
        <CardFooter className="grid grid-cols-subgrid grid-rows-subgrid">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
          >
            <Button
              variant="secondary"
              className="w-full bg-blue-100 hover:bg-blue-200"
            >
              <FileTextIcon className="mr-2" size={16} />
              Documentation
            </Button>
          </a>
        </CardFooter>
      )}
    </Card>
  );
}
