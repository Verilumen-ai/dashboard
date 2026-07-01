import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultAccountPreset } from "@/types/theme";
import type { UserProfile } from "@/types/platform";

const defaultProfile: UserProfile = {
  ...defaultAccountPreset,
  avatarInitials: "AJ",
  password: "",
};

interface UserStore {
  profile: UserProfile;
  updateProfile: (partial: Partial<UserProfile>) => void;
  resetProfile: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      updateProfile: (partial) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...partial,
            avatarInitials:
              partial.name
                ? partial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : state.profile.avatarInitials,
          },
        })),
      resetProfile: () => set({ profile: defaultProfile }),
    }),
    { name: "ate-user-profile" }
  )
);
