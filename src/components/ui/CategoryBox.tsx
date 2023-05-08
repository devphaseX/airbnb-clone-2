'use client';

import { CategoryItemData } from '@/data/category/data';
import { useQuery } from '@/hooks';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface CategoryBoxProps extends Omit<CategoryItemData, 'description'> {
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const params = useSearchParams();
  const router = useRouter();

  const categoryQuery = useQuery({ queryMapFn: ({ category }) => category });

  const handleCategory = useCallback(() => {
    if (categoryQuery === label) return;
    const nextParams = new URLSearchParams(params ?? {});
    nextParams.set('category', label);
    router.push(`/?${nextParams.toString()}`);
  }, [params, label, router]);

  return (
    <div
      onClick={handleCategory}
      className={`
         flex
         flex-col
         justify-center
         gap-2
         p-3
         border-b-2
         hover:text-neutral-800
         transition
         cursor-pointer
         ${selected ? 'border-b-neutral-800' : 'border-transparent'}
         ${selected ? 'text-neutral-800' : 'text-neutral-500'}
         `}
    >
      <Icon size={26} />
      <p className="font-medium text-sm">{label}</p>
    </div>
  );
};

export { CategoryBox };
