'use client';
import { createContext } from 'react';
import { SafeUser } from '../../lib/getSession';

const ProfileContext = createContext<{ user: SafeUser | null }>({ user: null });

interface ProfileProviderProps {
  children: React.ReactNode;
  user: SafeUser | null;
}
const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
  user,
}) => (
  <ProfileContext.Provider value={{ user }}>{children}</ProfileContext.Provider>
);

export { ProfileProvider, ProfileContext };
