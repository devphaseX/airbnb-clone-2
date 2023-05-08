import { ItemCategory } from '@/data/category/data';
import { useSearchParams } from 'next/navigation';
import { ParsedUrlQuery } from 'querystring';
import { useMemo } from 'react';

interface Query extends ParsedUrlQuery {
  category?: ItemCategory;
}

interface UseQueryProps<QueryResult> {
  queryMapFn: (queryState: Query) => QueryResult;
}

const useQuery = <QR>({ queryMapFn }: UseQueryProps<QR>) => {
  const queryParams = useSearchParams();
  return useMemo(
    () => queryMapFn(Object.fromEntries(queryParams ?? [[]])),
    [queryParams]
  );
};

export { useQuery };
