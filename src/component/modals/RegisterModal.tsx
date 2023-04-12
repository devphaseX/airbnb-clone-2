'use client';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { useRegisterModal } from '@/hooks/useRegisterHook';
import { Modal } from './Modal';
import { Heading } from '../ui/Heading';
import { Input } from '../ui';
import { toast } from 'react-hot-toast';
import { Button } from '../ui/Button';
import { signIn } from 'next-auth/react';
import { useLoginModal } from '@/hooks';

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

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

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
        toast.success('Registration successful');
        registerModal.close();
      } else {
        toast.error('Something went wrong while logging. Try again later?');
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
        onClick={() => signIn('google')}
      />
      <Button
        label="Continue with Github"
        outline
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <p className="text-center text-neutral-500 mt-4 font-light">
        <span>Already have an account?</span>
        <span
          onClick={() => {
            registerModal.close();
            loginModal.open();
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
      onClose={registerModal.close}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export { RegisterModal };
