import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../../models/user";
interface Props {
  users: User[];
  add: (users: User) => void;
}

export const useHistoricUser = create(
  persist<Props>(
    (set, get) => ({
      users: [],
      add: (data: User) => {
        const old = get().users;
        const user = old.find((u) => u.id === data.id);
        if (user) return;
        set((state) => ({ users: [...state.users, data] }));
      },
    }),
    {
      name: "historic-user",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
