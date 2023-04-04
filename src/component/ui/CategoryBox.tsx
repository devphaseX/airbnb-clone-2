'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { CategoryItemData } from './Categories';

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

  const handleCategory = useCallback(() => {
    const nextParams = new URLSearchParams(params ?? {});
    const currentCategory = nextParams.get('category');

    if (
      currentCategory &&
      currentCategory.toLowerCase() === label.toLowerCase()
    ) {
      nextParams.delete('category');
    } else {
      nextParams.set('category', label.toString());
    }

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
