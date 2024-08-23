import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";

import {
  LoginFormData,
  RegisterFormData,
  UseFormSubmitHandleReturn,
} from "@/types/formTypes";
import { logSchema, regSchema } from "@/config/validationSchemas";
import { setUser } from "@/store/slices/userSlice";
import { useModal } from "@/components/ModalProvider";

const handleAuthSuccess = async (
  user: User,
  dispatch: ReturnType<typeof useDispatch>,
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
    toast.error("This email already use");
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

    const dispatch = useDispatch();
    const { onClose } = useModal();
    const auth = getAuth();

    const submit: SubmitHandler<LoginFormData> = (data) => {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(({ user }) => handleAuthSuccess(user, dispatch, reset, onClose))
        .catch(console.error);
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

    const dispatch = useDispatch();
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
