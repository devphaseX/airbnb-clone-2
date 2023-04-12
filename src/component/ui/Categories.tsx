'use client';

import { IconType } from 'react-icons';
import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { BsSnow } from 'react-icons/bs';
import { FaSkiing } from 'react-icons/fa';
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

  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },

  {
    label: 'Pools',
    icon: TbPool,
    description: 'This property has a pool',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is close to a lake',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activities',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is in a castle',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property  has campling activitie',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property  has campling activitie',
  },

  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This property  is in a cave',
  },

  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in a desert',
  },

  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in the barn',
  },

  {
    label: 'Lax',
    icon: IoDiamond,
    description: 'This property is luxury',
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
