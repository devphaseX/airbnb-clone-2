'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface RentFeatureCounterProps {
  title: string;
  subtitle: string;
  value?: number;
  boundary: { min: number; max?: number };
  onChange: (value: number) => void;
}

const RentFeatureCounter: React.FC<RentFeatureCounterProps> = ({
  title,
  subtitle,
  onChange,
  boundary: { min, max },
  value = min,
}) => {
  const onAdd = useCallback(
    () => (typeof max === 'undefined' || value < max) && onChange(value + 1),
    [onChange, value]
  );
  const onReduce = useCallback(
    () => value > min && onChange(value - 1),
    [onChange, value]
  );

  return (
    <div className="flex flex-row  items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            justify-center
            items-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
        "
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            justify-center
            items-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
        "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export { RentFeatureCounter };
