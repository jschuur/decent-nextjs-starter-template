import PulseLoader from 'react-spinners/PulseLoader';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  color?: string;
  size?: number;
};

export default function Loading({ className, color = 'lightblue', size = 12 }: Props) {
  return (
    <div className={cn('flex justify-center py-8', className)}>
      <PulseLoader color={color} size={size} />
    </div>
  );
}
