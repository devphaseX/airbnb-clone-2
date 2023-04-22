import { ItemCategory } from '@/component/ui/Categories';

enum RentalStep {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
interface RentLocation {}

interface RentalFormData {
  category: ItemCategory | null;
  location: RentLocation | null;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
}

export { RentalStep, type RentalFormData };
