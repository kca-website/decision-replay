import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile } from '../db/db';

interface ProfileState {
  profile: UserProfile | null;
  hasOnboarded: boolean;
  setProfile: (p: UserProfile) => void;
  setOnboarded: (v: boolean) => void;
}

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      hasOnboarded: false,
      setProfile: (p) => set({ profile: p }),
      setOnboarded: (v) => set({ hasOnboarded: v }),
    }),
    { name: 'dr_profile' }
  )
);
