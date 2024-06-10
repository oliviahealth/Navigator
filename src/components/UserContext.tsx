'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { IUser } from '@/lib/definitions';

import useAppStore from '@/lib/useAppStore';

interface UserContextProps {
  user: IUser | null;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ user, children }: { user: IUser | null; children: ReactNode }) => {
  const setUser = useAppStore(state => state.setUser);

  if(user) {
    setUser(user);
  }

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
