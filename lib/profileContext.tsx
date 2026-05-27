"use client";

import { createContext, useContext, useState, useMemo } from "react";
import { mockUser } from "@/lib/mock/user";

// Items that define profile completeness (synced with profile page)
function computeCompletion(photoUrl: string | null): number {
  const items = [
    true,                      // identity verified
    true,                      // personal info
    mockUser.education.length > 0,
    mockUser.experience.length > 0,
    mockUser.skills.length >= 5,
    true,                      // cv uploaded
    mockUser.cvValidated,      // cv validated
    !!photoUrl,                // profile photo
  ];
  return Math.round((items.filter(Boolean).length / items.length) * 100);
}

type ProfileCtx = {
  photoUrl:          string | null;
  setPhotoUrl:       (url: string | null) => void;
  profileCompletion: number;
};

const ProfileContext = createContext<ProfileCtx>({
  photoUrl:          null,
  setPhotoUrl:       () => {},
  profileCompletion: mockUser.profileCompletion,
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const profileCompletion = useMemo(() => computeCompletion(photoUrl), [photoUrl]);

  return (
    <ProfileContext.Provider value={{ photoUrl, setPhotoUrl, profileCompletion }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
