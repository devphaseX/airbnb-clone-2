import { ItemCategory } from '@/components/ui/Categories';
import { CountrySelectValue } from '@/hooks';

enum RentalStep {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

interface RentalFormData {
  category: ItemCategory | null;
  location: CountrySelectValue | null;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
}

const formCanProceedForward = (step: RentalStep) => step < RentalStep.PRICE;
const formCanProceedBackward = (step: RentalStep) => step > RentalStep.CATEGORY;

export {
  RentalStep,
  formCanProceedBackward,
  formCanProceedForward,
  type RentalFormData,
};
