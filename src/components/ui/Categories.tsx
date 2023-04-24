'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons';
import { Container } from './Container';
import { categories } from '@/data/category/data';
import { CategoryBox } from './CategoryBox';

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
