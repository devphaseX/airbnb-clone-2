'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Heading } from '@/components/ui';
import { categories } from '@/components/ui/Categories';
import { useRentModal } from '../../../hooks/useRentModal';
import { Modal } from '../Modal';
import {
  formCanProceedBackward,
  formCanProceedForward,
  RentalFormData,
  RentalStep,
} from './lib';
import { CategoryItem } from './CatgoryItem';
import { CountrySelect } from '../../ui/input/CountrySelect';
import { RentFeatureCounter } from '../../ui/input/RentFeatureCounter';
import { ImageUpload } from '../../ui/input/ImageUpload';

import { LocationMap } from '@/components/Map';

const RentModal = () => {
  const { close, isOpen } = useRentModal();
  const [step, setStep] = useState(RentalStep.CATEGORY);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RentalFormData>({
    defaultValues: {
      category: null,
      title: '',
      description: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
    },
  });
  const setCustomValue = <Id extends keyof RentalFormData>(
    id: Id,
    value: RentalFormData[Id]
  ) => {
    setValue(id, value as any, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  const selectedCategory = watch('category');
  const selectedLocation = watch('location');
  const selectedBathrooms = watch('bathroomCount');
  const selectedGuestNo = watch('guestCount');
  const selectedRooms = watch('roomCount');
  const selectedImage = watch('imageSrc');

  const proceedForward = formCanProceedForward(step);
  const proceedBackward = formCanProceedBackward(step);

  const actionLabel = proceedForward ? 'Next' : 'Create';
  const secondaryActionLabel = proceedBackward ? 'Back' : undefined;

  const onBack = () => proceedBackward && setStep(step - 1);
  const onNext = () => proceedForward && setStep(step + 1);
  const onSubmit: SubmitHandler<RentalFormData> = (data) => {
    if (!proceedForward) {
    }

    return onNext();
  };

  let bodyContent: React.ReactElement;

  switch (step) {
    case RentalStep.CATEGORY: {
      bodyContent = (
        <div className="flex flex-col gap-4">
          <Heading
            title="Which of these best describes your place?"
            subtitle="Pick a category"
          />
          <div className="grid grid-cols-1  md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((category, i) => (
              <div key={i} className="col-span-1">
                <CategoryItem
                  {...category}
                  selected={selectedCategory === category.label}
                  onClick={(category) => setCustomValue('category', category)}
                />
              </div>
            ))}
          </div>
        </div>
      );
      break;
    }

    case RentalStep.LOCATION: {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where is your place located?"
            subtitle="Help guests find you!"
          />
          <CountrySelect
            value={selectedLocation ?? undefined}
            onChange={(value) => setCustomValue('location', value)}
          />
          <LocationMap center={selectedLocation?.latlng} />
        </div>
      );

      break;
    }
    case RentalStep.INFO: {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Share some basics about your place"
            subtitle="What amenities do you have?"
          />
          <RentFeatureCounter
            title="Guests"
            subtitle="How many guests do you allow?"
            value={selectedGuestNo}
            boundary={{ min: 1, max: 10 }}
            onChange={(value) => setCustomValue('guestCount', value)}
          />
          <RentFeatureCounter
            title="Rooms"
            subtitle="How many room do you have?"
            value={selectedRooms}
            boundary={{ min: 1, max: 10 }}
            onChange={(value) => setCustomValue('roomCount', value)}
          />
          <RentFeatureCounter
            title="Bathrooms"
            subtitle="How many bathrooms do you have?"
            value={selectedBathrooms}
            boundary={{ min: 1, max: 10 }}
            onChange={(value) => setCustomValue('bathroomCount', value)}
          />
        </div>
      );
      break;
    }
    case RentalStep.IMAGES: {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a photo of your place"
            subtitle="Show guests what your place look like!"
          />
          <ImageUpload
            value={selectedImage}
            onChange={(imageSrc) => {
              setCustomValue('imageSrc', imageSrc);
            }}
          />
        </div>
      );

      break;
    }
    case RentalStep.DESCRIPTION: {
      bodyContent = <div></div>;

      break;
    }
    case RentalStep.PRICE: {
      bodyContent = <div></div>;
      break;
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={(proceedBackward && onBack) || undefined}
      title="Airbnb your home!"
      body={bodyContent}
    />
  );
};

export { RentModal };