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
import { IconType } from 'react-icons/lib';

interface CategoryItemData {
  label: ItemCategory;
  icon: IconType;
  description: string;
}

enum ItemCategory {
  BEACH = 'beach',
  WINDMILLS = 'windwills',
  MODERN = 'modern',
  COUNTRYSIDE = 'countryside',
  POOLS = 'pools',
  ISLANDS = 'islands',
  LAKE = 'lake',
  SKIING = 'skiing',
  CASTLES = 'castles',
  CAMPING = 'camping',
  ARCTIC = 'arctic',
  CAVE = 'cave',
  DESERT = 'desert',
  BARNS = 'barns',
  LAX = 'lax',
}

const categories: Array<CategoryItemData> = [
  {
    label: ItemCategory.BEACH,
    icon: TbBeach,
    description: 'This propertu is close to the beach',
  },
  {
    label: ItemCategory.WINDMILLS,
    icon: GiWindmill,
    description: 'This propertu is close to the beach',
  },
  {
    label: ItemCategory.MODERN,
    icon: MdOutlineVilla,
    description: 'This propertu is close to the beach',
  },

  {
    label: ItemCategory.COUNTRYSIDE,
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },

  {
    label: ItemCategory.POOLS,
    icon: TbPool,
    description: 'This property has a pool',
  },
  {
    label: ItemCategory.ISLANDS,
    icon: GiIsland,
    description: 'This property is on an island',
  },
  {
    label: ItemCategory.LAKE,
    icon: GiBoatFishing,
    description: 'This property is close to a lake',
  },
  {
    label: ItemCategory.SKIING,
    icon: FaSkiing,
    description: 'This property has skiing activities',
  },
  {
    label: ItemCategory.CASTLES,
    icon: GiCastle,
    description: 'This property is in a castle',
  },
  {
    label: ItemCategory.CAMPING,
    icon: GiForestCamp,
    description: 'This property  has campling activitie',
  },
  {
    label: ItemCategory.ARCTIC,
    icon: BsSnow,
    description: 'This property  has campling activitie',
  },

  {
    label: ItemCategory.CAVE,
    icon: GiCaveEntrance,
    description: 'This property  is in a cave',
  },

  {
    label: ItemCategory.DESERT,
    icon: GiCactus,
    description: 'This property is in a desert',
  },

  {
    label: ItemCategory.BARNS,
    icon: GiBarn,
    description: 'This property is in the barn',
  },

  {
    label: ItemCategory.LAX,
    icon: IoDiamond,
    description: 'This property is luxury',
  },
];

export { categories, type CategoryItemData, ItemCategory };
