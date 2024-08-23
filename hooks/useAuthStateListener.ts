import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useAppDispatch } from "./useRedux";

import { setUser, removeUser } from "@/store/slices/userSlice";

export const useAuthStateListener = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token,
            }),
          );
        });
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe(); // Отписываемся от прослушивания при размонтировании компонента
  }, [auth, dispatch]);
};
