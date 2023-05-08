'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { Avatar } from '../ui/index';
import { MenuItem } from './MenuItem';
import { useRegisterModal } from '@/hooks/useRegisterHook';
import { useLoginModal, useProfile } from '@/hooks';
import { useCallback } from 'react';
import { useRentModal } from '@/hooks/useRentModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/action/getSession';

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const profile = useProfile();
  const rentModal = useRentModal();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.open();
    }
    rentModal.open();
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
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
          onClick={onRent}
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
            <Avatar src={profile.user?.image ?? undefined} />
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
            {profile.user ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favourites" />
                <MenuItem onClick={() => {}} label="My reservation" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={onRent} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="logout" />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    debugger;
                    loginModal.open();
                  }}
                  label="Login"
                />
                <MenuItem onClick={registerModal.open} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { UserMenu };
