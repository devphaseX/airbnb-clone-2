import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps<T extends FieldValues> {
  name: keyof T;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  formatPice?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors;
}

const Input = <T extends FieldValues>({
  name,
  label,
  type,
  disabled,
  required,
  formatPice,
  register,
  errors,
}: InputProps<T>): React.ReactElement => (
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
      id={name as string}
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
      ${
        errors[name as keyof FieldErrors]
          ? 'border-rose-500'
          : 'border-neutral-300'
      }
      ${
        errors[name as keyof FieldErrors]
          ? 'focus:border-rose-500'
          : 'focus:border-black'
      }
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
