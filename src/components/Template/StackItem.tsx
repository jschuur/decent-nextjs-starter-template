'use client';

import { IconEdit, IconTrash } from '@tabler/icons-react';
import { FileTextIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import ConfirmationDialog from '@/components/ConfirmationDialog';

import useDialog from '@/hooks/useDialog';
import useStackItems from '@/hooks/useStackItems';

import { canEditStackItems } from '@/auth/roles';
import { cn } from '@/lib/utils';

import { StackItem } from '@/lib/types';

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
  item: StackItem;
};
export default function StackItemEntry({ item }: Props) {
  const { data: session } = useSession();
  const stackAdmin = canEditStackItems(session?.user);

  const { open } = useDialog<StackItem>('stackItem');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { deleteExistingStackItem } = useStackItems();

  return (
    <>
      <Card
        className={cn(
          'group grid grid-rows-[auto,1fr,auto] shadow transition ease-in-out hover:bg-orange-50 hover:shadow-lg',
          !stackAdmin && 'hover:scale-105 hover:odd:-rotate-1 hover:even:rotate-1'
        )}
      >
        <CardHeader className='grid grid-cols-subgrid grid-rows-subgrid'>
          <CardTitle>
            <div className='flex flex-row items-center justify-between gap-2'>
              <div className='grow'>{item.name}</div>
              {stackAdmin && (
                <div className='hidden text-base text-slate-400 group-hover:block'>
                  #<span className='ml-0.5'>{item.position}</span>
                </div>
              )}
            </div>
            <div className='flex gap-2 pt-3'>
              <div className='flex min-h-6 grow gap-2'>
                {item.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className={cn(
                      badgeColors[tag as keyof typeof badgeColors] || 'bg-red-300',
                      'pointer-events-none text-xs font-medium uppercase tracking-wider text-gray-800'
                    )}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-subgrid grid-rows-subgrid'>
          <CardDescription>{item.description}</CardDescription>
        </CardContent>
        <CardFooter className='grid grid-cols-subgrid grid-rows-subgrid'>
          <div className='flex w-full items-center gap-2'>
            {item.link && (
              <a
                href={item.link}
                className='w-full'
                target='_blank'
                rel='noopener noreferrer'
                tabIndex={-1}
              >
                <Button variant='secondary' className='w-full bg-blue-100 hover:bg-blue-200'>
                  <FileTextIcon className='mr-2' size={16} />
                  Documentation
                </Button>
              </a>
            )}
            {stackAdmin && (
              <>
                <IconEdit
                  onClick={() => open(item)}
                  className='hidden size-5 cursor-pointer text-slate-500 transition ease-in-out hover:scale-125 group-hover:inline-block'
                />
                <IconTrash
                  onClick={() => setConfirmOpen(true)}
                  className='hidden size-5 cursor-pointer text-slate-500 transition ease-in-out hover:scale-125 group-hover:inline-block'
                />
              </>
            )}
          </div>
        </CardFooter>
      </Card>
      <ConfirmationDialog
        title={`Delete ${item.name}`}
        confirmLabel='Delete'
        isOpen={confirmOpen}
        setIsOpen={setConfirmOpen}
        onConfirm={() => deleteExistingStackItem(item)}
      >
        Are you sure you want to delete this stack item?
      </ConfirmationDialog>
    </>
  );
}
