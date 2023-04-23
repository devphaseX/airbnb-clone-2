'use client';

import countries, { type Country } from 'world-countries';

interface CountrySelectValue
  extends Pick<Country, 'latlng' | 'region' | 'flag'> {
  label: string;
  value: string;
}

const formattedCountries: Array<CountrySelectValue> = countries.map(
  (country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
  })
);

interface CountrySelectValue
  extends Pick<Country, 'latlng' | 'region' | 'flag'> {
  label: string;
  value: string;
}

const useWorldCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) =>
    getAll().find((item) => item.value === value);

  return { getAll, getByValue };
};

export { useWorldCountries };

export type { CountrySelectValue };
