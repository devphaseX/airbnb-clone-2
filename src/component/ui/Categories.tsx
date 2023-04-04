'use client';

import { IconType } from 'react-icons';
import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach } from 'react-icons/tb';
import { GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { Container } from './Container';
import { CategoryBox } from './CategoryBox';

interface CategoryItemData {
  label: string;
  icon: IconType;
  description: string;
}

const categories: Array<CategoryItemData> = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This propertu is close to the beach',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This propertu is close to the beach',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This propertu is close to the beach',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const current = params?.get('category');
  const isHomePage = usePathname()?.match(/^\/?$/) ?? false;
  if (!isHomePage) return null;

  return (
    <Container>
      <div className="flex flex-row justify-between items-center mt-16 overflow-x-auto pt-[24px]">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={current === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export { Categories };
export type { CategoryItemData };
