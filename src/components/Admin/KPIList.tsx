'use client';

import { useQuery } from '@tanstack/react-query';
import { orderBy } from 'lodash';

import KPI from '@/components/Admin/KPI';

import useStackItems from '@/hooks/useStackItems';

import { userCount } from '@/db/queries';
import { cn, formatDateShort } from '@/lib/utils';

async function fetchGitHubStars() {
  return fetch('https://api.github.com/repos/jschuur/decent-nextjs-starter-template').then((res) =>
    res.json()
  );
}

type Props = {
  className?: string;
};
export default function KPIList({ className }: Props) {
  const { data: stackItems } = useStackItems();
  const { data: databaseUsersCount } = useQuery({
    queryKey: ['userCount'],
    queryFn: () => userCount(),
  });
  const { data: gitHubRepo } = useQuery({
    queryKey: ['gitHubRepo'],
    queryFn: () => fetchGitHubStars(),
  });

  const latestStackItem = orderBy(stackItems, 'createdAt', 'desc')[0];

  return (
    <div className={cn(className)}>
      <h2>Project Metrics</h2>
      <div className='grid grid-cols-3 gap-2 py-2'>
        <KPI
          title='GitHub Stars'
          metric={gitHubRepo?.stargazers_count}
          externalLink='https://github.com/jschuur/decent-nextjs-starter-template/stargazers'
        />
        <KPI
          title='Open Issues'
          metric={gitHubRepo?.open_issues}
          externalLink='https://github.com/jschuur/decent-nextjs-starter-template/issues'
        />
        <KPI
          title='Forks'
          metric={gitHubRepo?.forks_count}
          externalLink='https://github.com/jschuur/decent-nextjs-starter-template/forks'
        />
        <KPI
          title='Last Origin Commit'
          metric={formatDateShort(gitHubRepo?.updated_at)}
          externalLink='https://github.com/jschuur/decent-nextjs-starter-template/commits/main/'
        />
        <KPI title='Database Users' metric={databaseUsersCount} />
        <KPI title='Stack Items' metric={stackItems?.length}>
          Most recent: {latestStackItem?.name || '-'}
        </KPI>
      </div>
    </div>
  );
}
