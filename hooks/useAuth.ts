import { useAppSelector } from "./useRedux";

export const useAuth = () => {
  const { email, token, id } = useAppSelector((state: any) => state.user);

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
};
