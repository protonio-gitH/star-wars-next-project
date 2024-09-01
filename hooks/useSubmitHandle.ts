import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";

import { useAppDispatch } from "./useRedux";

import {
  LoginFormData,
  RegisterFormData,
  UseFormSubmitHandleReturn,
} from "@/types/formTypes";
import { logSchema, regSchema } from "@/config/validationSchemas";
import { setUser } from "@/store/slices/userSlice";
import { useModal } from "@/components/ModalProvider";
import { AppDispatch } from "@/types/dispatchTypes";

const handleAuthSuccess = async (
  user: User,
  dispatch: AppDispatch,
  reset: () => void,
  onClose: () => void,
) => {
  onClose();
  reset();
  const token = await user.getIdToken();

  dispatch(
    setUser({
      email: user.email,
      id: user.uid,
      token,
    }),
  );
};

const handleAuthError = (e: FirebaseError) => {
  if (e.message === "Firebase: Error (auth/email-already-in-use).") {
    toast.error("This email is already use", {
      autoClose: 2000,
    });
  } else if (e.message === "Firebase: Error (auth/invalid-credential).") {
    toast.error("Incorrent login or password", {
      autoClose: 2000,
    });
  } else if (
    e.message ===
    "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
  ) {
    toast.error("Many failed login attempts", {
      autoClose: 2000,
    });
  }
};

export const useLoginFormSubmitHandle =
  (): UseFormSubmitHandleReturn<LoginFormData> => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<LoginFormData>({
      resolver: yupResolver(logSchema),
    });

    const dispatch = useAppDispatch();
    const { onClose } = useModal();
    const auth = getAuth();

    const submit: SubmitHandler<LoginFormData> = (data) => {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(({ user }) => handleAuthSuccess(user, dispatch, reset, onClose))
        .catch((e) => {
          console.error(e.message);
          reset();
          handleAuthError(e);
        });
    };

    const error: SubmitErrorHandler<LoginFormData> = (data) => {
      console.error("Form validation errors:", data);
    };

    return {
      register,
      handleSubmit,
      errors,
      submit,
      error,
    };
  };

export const useRegFormSubmitHandle =
  (): UseFormSubmitHandleReturn<RegisterFormData> => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<RegisterFormData>({
      resolver: yupResolver(regSchema),
    });

    const dispatch = useAppDispatch();
    const { onClose } = useModal();
    const auth = getAuth();

    const submit: SubmitHandler<RegisterFormData> = (data) => {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(({ user }) => handleAuthSuccess(user, dispatch, reset, onClose))
        .catch((e) => {
          reset();
          handleAuthError(e);
        });
    };

    const error: SubmitErrorHandler<RegisterFormData> = (data) => {
      console.error("Form validation errors:", data);
    };

    return {
      register,
      handleSubmit,
      errors,
      submit,
      error,
    };
  };
