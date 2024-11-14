import { useAppSelector } from "./useRedux";

import { RootState } from "@/types/rootStateTypes";

export const useAuth = () => {
  const { email, token, id } = useAppSelector((state: RootState) => state.user);

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
};
