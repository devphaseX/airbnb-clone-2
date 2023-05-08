'use client';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useQuery } from '@/hooks';
import { Listing } from '@prisma/client';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { ItemCategory } from '@/data/category/data';

interface HomeListProps {
  listings: Array<Listing>;
}

const HomeList: React.FC<HomeListProps> = ({ listings: serverListings }) => {
  const [listings, setListings] = useState(serverListings);
  const categoryQuery = useRef(
    useQuery({ queryMapFn: (query) => query.category })
  );
  const prevCategoryQuery = useRef<null | ItemCategory>(null);

  const mounted = useRef(false);

  const handleFilter = useCallback(async () => {
    const _categoryQuery = categoryQuery.current;

    try {
      const response = await fetch(
        `/api/listing/${_categoryQuery ? '?category=' + _categoryQuery : ''}`
      );

      if (_categoryQuery !== categoryQuery.current) return;
      if (response.ok) {
        setListings(await response.json());
      } else {
        toast.error('Something went wrong while fetching listing');
      }
    } catch (e) {
      if (_categoryQuery !== categoryQuery.current) return;

      toast.error(
        'Something went wrong while fetching listing.This likely a network issue check your network connectivity'
      );
    }
  }, [categoryQuery.current]);

  useEffect(() => {
    if (mounted && prevCategoryQuery.current !== categoryQuery.current) {
      handleFilter().finally(() => {
        prevCategoryQuery.current = categoryQuery.current ?? null;
      });
    }

    if (!mounted.current) mounted.current = true;
  }, [categoryQuery]);

  return <div></div>;
};

export { HomeList };
