'use client';

import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';

const badgeColors = {
  css: 'bg-pink-300',
  tooling: 'bg-blue-300',
  database: 'bg-green-300',
  utility: 'bg-purple-300',
  framework: 'bg-amber-300',
  state: 'bg-indigo-300',
  ui: 'bg-cyan-300',
  typescript: 'bg-orange-300',
  authentication: 'bg-teal-300',
};

type Props = {
  tag: string;
};
export default function StackItemBadge({ tag }: Props) {
  return (
    <Badge
      key={tag}
      className={cn(
        badgeColors[tag as keyof typeof badgeColors] || 'bg-red-300',
        'pointer-events-none flex items-center justify-center text-xs font-medium uppercase tracking-wider text-gray-800'
      )}
    >
      {tag}
    </Badge>
  );
}
