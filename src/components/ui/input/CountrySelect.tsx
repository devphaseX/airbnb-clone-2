'use client';

import Select from 'react-select';
import { CountrySelectValue, useWorldCountries } from '@/hooks';

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}
const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useWorldCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(nextValue) => onChange(nextValue as CountrySelectValue)}
        formatOptionLabel={({ flag, label, region }) => (
          <div className="flex flex-row items-center gap-3">
            <div>{flag}</div>
            <div>
              {label},<span className="text-neutral-500 ml-1">{region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => `p-3 border-2`,
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: { ...theme.colors },
          primary: 'black',
          primary25: '#ffe4e6',
        })}
      />
    </div>
  );
};
export { CountrySelect };
