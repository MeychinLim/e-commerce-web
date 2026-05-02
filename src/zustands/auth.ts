// import { StateCreator, create } from "zustand";
// import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";
// import { UserDetailType } from "../types/user";

// type AuthStore = {
//   auth: { token: string | null };
//   authUser: UserDetailType | null;
//   setAuthUser: (user: UserDetailType | null) => void;
//   setToken: (token: string) => void;
//   logout: () => void;
// };

// type LanguagePersist = (
//   config: StateCreator<AuthStore>,
//   options: PersistOptions<AuthStore>
// ) => StateCreator<AuthStore>;

// export const useAuthStore = create<AuthStore, []>(
//   (persist as LanguagePersist)(
//     (set) => ({
//       auth: { token: null },
//       authUser: null,
//       setAuthUser: (user: UserDetailType | null) => set({ authUser: user }),
//       setToken: (token: string) => set(() => ({ auth: { token: token } })),
//       logout: () => set(() => ({ auth: { token: null }, authUser: null })),
//     }),
//     {
//       name: "token",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );
