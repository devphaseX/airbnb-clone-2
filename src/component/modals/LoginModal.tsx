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
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { Modal } from './Modal';
import { Heading } from '../ui/Heading';
import { Input } from '../ui';
import { Button } from '../ui/Button';
import { useLoginModal, useRegisterModal } from '@/hooks';

interface LoginFieldValues extends FieldValues {
  email: string;
  password: string;
}

const LoginModal: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onSubmit: SubmitHandler<LoginFieldValues> = async (data) => {
    setIsSubmitting(true);
    const callback = await signIn('credentials', { ...data });

    if (callback && callback.ok) {
      toast.success('Login successful');
    } else if (callback?.error) {
      toast.error(callback.error);
    } else {
      toast.error('Something went wrong while logging');
    }
    setIsSubmitting(false);
  };

  const bodyContent = (
    <div>
      <Heading title="Welcome back" subtitle="Login to your account!" />
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
        <span>Don't have an account?</span>
        <span
          onClick={() => {
            loginModal.close();
            registerModal.open();
          }}
          className="text-neutral-800 cursor-pointer hover:underline ml-4"
        >
          register
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      disabled={isSubmitting}
      title="Register"
      actionLabel="Continue"
      onClose={loginModal.close}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export { LoginModal };
