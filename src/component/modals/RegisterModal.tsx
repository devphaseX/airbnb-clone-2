'use client';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRegister } from '@/hooks/useRegisterHook';
import { Modal } from './Modal';
import { Heading } from '../ui/Heading';
import { Input } from '../ui';

interface RegisterFieldValues extends FieldValues {
  name: string;
  email: string;
  password: string;
}

const RegisterModal: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registerModal = useRegister();

  const onSubmit: SubmitHandler<RegisterFieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/register', {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
      });

      if (response.ok) {
        registerModal.onClose();
      }
    } catch (e) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <div>
        <Input
          name="email"
          label="Email"
          register={register}
          errors={errors}
          required
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={registerModal.isOpen}
      disabled={isSubmitting}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export { RegisterModal };
