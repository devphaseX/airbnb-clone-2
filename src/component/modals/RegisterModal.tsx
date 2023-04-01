'use client';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { useRegister } from '@/hooks/useRegisterHook';
import { Modal } from './Modal';
import { Heading } from '../ui/Heading';
import { Input } from '../ui';
import { toast } from 'react-hot-toast';
import { Button } from '../ui/Button';

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
      toast.error((e as { message?: string })?.message ?? `${e}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const bodyContent = (
    <div>
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <div className="flex flex-col gap-4 mt-4">
        <Input
          name="email"
          label="Email"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
          required
          disabled={isSubmitting}
        />
        <Input
          name="name"
          label="Name"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
          required
          disabled={isSubmitting}
        />
        <Input
          name="password"
          label="Password"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
          required
          disabled={isSubmitting}
        />
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        label="Continue with Google"
        outline
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        label="Continue with Github"
        outline
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <p className="text-center text-neutral-500 mt-4 font-light">
        <span>Already have an account?</span>
        <span
          onClick={() => {
            registerModal.onClose();
          }}
          className="text-neutral-800 cursor-pointer hover:underline ml-4"
        >
          Log in
        </span>
      </p>
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
      footer={footerContent}
    />
  );
};

export { RegisterModal };
