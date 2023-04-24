import { ItemCategory } from '@/data/category/data';
import { ClientListing } from '@/data/validations/listing.schema.zod';
import { CountrySelectValue } from '@/hooks';

enum RentalStep {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

interface RentalFormData extends Omit<ClientListing, 'category' | 'location'> {
  category: ItemCategory | null;
  location: CountrySelectValue | null;
}

const formCanProceedForward = (step: RentalStep) => step < RentalStep.PRICE;
const formCanProceedBackward = (step: RentalStep) => step > RentalStep.CATEGORY;

export {
  RentalStep,
  formCanProceedBackward,
  formCanProceedForward,
  type RentalFormData,
};
