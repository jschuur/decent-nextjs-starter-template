import { ExternalLink } from 'lucide-react';
import { ReactNode } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { cn } from '@/lib/utils';

type Props = {
  title: string;
  externalLink?: string;
  metric: string | number | undefined;
  footer?: string | JSX.Element;
  className?: string;
  children?: ReactNode;
};
export default function KPI({ children, title, externalLink, metric, footer, className }: Props) {
  return (
    <Card className={cn(className)}>
      <CardHeader className='pb-2'>
        <CardDescription>
          <span className='flex items-center justify-between gap-2'>
            {title}
            {externalLink && (
              <a href={externalLink} target='_blank' rel='noreferrer'>
                <ExternalLink className='size-4' />
              </a>
            )}
          </span>
        </CardDescription>
        <CardTitle className='text-4xl'>{metric || '-'}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
