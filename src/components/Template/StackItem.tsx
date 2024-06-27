'use client';

import { FileTextIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import StackItemBadge from '@/components/Template/StackItemBadge';

import { cn } from '@/lib/utils';

import { StackItem } from '@/lib/types';

type Props = {
  item: StackItem;
};
export default function StackItemEntry({ item }: Props) {
  return (
    <>
      <Card
        className={cn(
          'group grid grid-rows-[auto,1fr,auto] shadow transition ease-in-out hover:scale-105 hover:bg-orange-50 hover:shadow-lg hover:odd:-rotate-1 hover:even:rotate-1'
        )}
      >
        <CardHeader className='grid grid-cols-subgrid grid-rows-subgrid'>
          <CardTitle>
            {item.name}
            <div className='flex gap-2 pt-3'>
              <div className='flex gap-2'>
                {item.tags.map((tag) => (
                  <StackItemBadge key={tag} tag={tag} />
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
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
