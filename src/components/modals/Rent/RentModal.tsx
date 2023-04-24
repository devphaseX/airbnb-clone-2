'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Heading, Input } from '@/components/ui';
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
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { categories } from '@/data/category/data';

const RentModal = () => {
  const { close, isOpen } = useRentModal();
  const [step, setStep] = useState(RentalStep.CATEGORY);
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
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
  const onSubmit: SubmitHandler<RentalFormData> = async (data) => {
    if (proceedForward) return onNext();

    setFormSubmitLoading(true);
    try {
      const formSubmitResponse = await fetch('/api/listing', {
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!formSubmitResponse.ok) {
      }
      toast.success('Listing created');
      router.refresh();
      resetForm();
      close();
    } catch (e) {
      toast.error('Something went wrong');
    } finally {
      setFormSubmitLoading(false);
    }
  };

  let bodyContent: React.ReactElement;

  const resetForm = useCallback(() => {
    reset();
    setStep(RentalStep.CATEGORY);
  }, []);

  useEffect(() => {
    return function () {
      if (!open) reset();
    };
  }, [open]);

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
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="How would you describe your place"
            subtitle="Short and sweet works best"
          />
          <Input
            name="title"
            label="Title"
            disabled={formSubmitLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            name="description"
            label="Description"
            disabled={formSubmitLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      );

      break;
    }
    case RentalStep.PRICE: {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Now, set your price"
            subtitle="How much do you charge per night?"
          />
          <Input
            name="price"
            label="Price"
            type="number"
            formatPice
            disabled={formSubmitLoading}
            register={register}
            errors={errors}
          />
        </div>
      );
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
