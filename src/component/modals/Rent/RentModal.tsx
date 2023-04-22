'use client';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Heading } from '@/component/ui';
import { categories, ItemCategory } from '@/component/ui/Categories';
import { useRentModal } from '../../../hooks/useRentModal';
import { Modal } from '../Modal';
import { RentalFormData, RentalStep } from './lib';
import { CategoryItem } from './CatgoryItem';

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

  const selectedCategory = watch('category');
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

  const onBack = useCallback(
    () =>
      setStep((value) => (value > RentalStep.CATEGORY && value - 1) || value),
    [setStep]
  );

  const onNext = useCallback(
    () => setStep((value) => (value < RentalStep.PRICE && value + 1) || value),
    [setStep]
  );

  const canEditFormBackward = step > RentalStep.CATEGORY;
  const canProceedFormForward = step < RentalStep.PRICE;

  const actionLabel = canProceedFormForward ? 'Next' : 'Create';
  const secondaryActionLabel = canEditFormBackward ? 'Back' : undefined;

  let body: React.ReactElement;

  switch (step) {
    case RentalStep.CATEGORY: {
      body = (
        <div className="flex flex-col gap-4">
          <Heading
            title="Which of these best describes your place?"
            subtitle="Pick a category"
          />
          <div className="grid grid-col-1 md:grid-col-2 gap-3 max-h-[50vh] overflow-y-auto">
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
      body = <div></div>;

      break;
    }
    case RentalStep.INFO: {
      body = <div></div>;

      break;
    }
    case RentalStep.IMAGES: {
      body = <div></div>;

      break;
    }
    case RentalStep.DESCRIPTION: {
      body = <div></div>;

      break;
    }
    case RentalStep.PRICE: {
      body = <div></div>;
      break;
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={(canEditFormBackward && onBack) || undefined}
      title="Airbnb your home!"
      body={body}
    />
  );
};

export { RentModal };
