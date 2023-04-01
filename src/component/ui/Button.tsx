'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  outline?: boolean;
  small?: boolean;
  disabled?: boolean;
  icon?: IconType;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  outline,
  disabled,
  small,
  icon: Icon,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          transition
          w-full
          ${outline ? 'bg-white' : 'bg-rose-500'}
          ${outline ? 'border-black' : 'border-rose-500'}
          ${outline ? 'text-black' : 'text-white'}
          ${small ? 'py-1' : 'py-3'}
          ${small ? 'text-sm' : 'text-md'}
          ${small ? 'font-light' : 'font-semibold'}
          ${small ? 'border-[1px]' : 'border-[2px]'}
`}
  >
    {Icon && (
      <span>
        <Icon
          size={24}
          className="
              absolute
              left-4
              top-3        
        "
        />
      </span>
    )}
    {label}
  </button>
);

export { Button };
