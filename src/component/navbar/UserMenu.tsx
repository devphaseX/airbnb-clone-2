'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { Avatar } from '../ui/index';
import { MenuItem } from './MenuItem';
import { useRegisterModal } from '@/hooks/useRegisterHook';
import { useLoginModal } from '@/hooks';

const UserMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
        hidden
        md:block
        text-sm
        font-semibold
        py-3
        px-4
        rounded-full
      hover:bg-neutral-100
        transition
        cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={() => setOpenMenu((open) => !open)}
          className="
      p-4
      md:py-1
      md:px-2
      border-[1px]
      flex
      flex-row
      items-center
      gap-3
      rounded-full
      cursor-pointer
      hover:shadow-md
      transition
      "
        >
          <span>
            <AiOutlineMenu size={18} />
          </span>
          <span>
            <Avatar />
          </span>
        </div>
      </div>
      {openMenu && (
        <div
          className="
             absolute
             rounded-xl
             shadow-md
             w-[40vw]
             md:w-3/4
             bg-white
             overflow-hidden
             right-0
             top-12
             text-sm"
        >
          <div
            className="
    flex
    flex-col
    cursor-pointer"
          >
            <>
              <MenuItem onClick={loginModal.open} label="Login" />
              <MenuItem onClick={registerModal.open} label="Sign up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export { UserMenu };
