import { useContext } from 'react';
import { ProfileContext } from '../component/ProfileProvider/ProfileProvider';

const useProfile = () => {
  const profile = useContext(ProfileContext);
  return profile;
};

export { useProfile };
