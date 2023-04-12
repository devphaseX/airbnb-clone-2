import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  name: keyof FieldValues;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  formatPice?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  type,
  disabled,
  required,
  formatPice,
  register,
  errors,
}: InputProps) => (
  <div
    className="
    w-full
    relative
"
  >
    {formatPice && (
      <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2" />
    )}
    <input
      id={name}
      disabled={disabled}
      {...register(name as any, { required })}
      placeholder=" "
      type={type}
      className={`peer
      w-full
      p-4
      pt-6
      font-light
      bg-white
      border-2
      rounded-md
      outline-none
      transition
      disabled:opacity-70
      disabled:cursor-not-allowed
      ${formatPice ? 'pl-9' : 'pl-4'}
      ${errors[name] ? 'border-rose-500' : 'border-neutral-300'}
      ${errors[name] ? 'focus:border-rose-500' : 'focus:border-black'}
      `}
    />
    <label
      id="input-label"
      className={`
       absolute
       top-5
       origin-[0]
       z-10
       transition
       -translate-y-3
       ${formatPice ? 'left-9' : 'left-4'}
       peer-placeholder-shown:translate-y-0
       peer-placeholder-shown:scale-100
       peer-focus:scale-75
       peer-focus:-translate-y-4
       `}
    >
      {label}
    </label>
  </div>
);

export { Input };
