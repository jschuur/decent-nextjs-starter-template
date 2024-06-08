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

import { StackItem } from '@/lib/types';

type Props = {
  item: StackItem;
};
export default function StackItemEntry({ item }: Props) {
  return (
    <Card className='grid grid-rows-[auto,1fr,auto] shadow hover:even:rotate-1 hover:odd:-rotate-1 hover:scale-105 hover:shadow-lg hover:bg-orange-50 transition ease-in-out'>
      <CardHeader className='grid grid-cols-subgrid grid-rows-subgrid'>
        <CardTitle>
          {item.name}
        </CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-subgrid grid-rows-subgrid'>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
      {item.link && (
        <CardFooter className='grid grid-cols-subgrid grid-rows-subgrid'>
          <Button variant='secondary' className='bg-blue-100 hover:bg-blue-200'>
            <FileTextIcon className='mr-2' size={16} />
            <a href={item.link} target='_blank' rel='noopener noreferrer'>
              Documentation
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
