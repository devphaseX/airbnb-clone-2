'use client';

import { useContext } from 'react';
import { ProfileContext } from '../components/ProfileProvider/ProfileProvider';

const useProfile = () => {
  const profile = useContext(ProfileContext);
  return profile;
};

export { useProfile };
