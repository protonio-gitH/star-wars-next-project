import * as yup from "yup";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  LoginFormData,
  RegisterFormData,
  UseFormSubmitHandleReturn,
} from "@/types/formTypes";

const regSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const logSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const useLoginFormSubmitHandle =
  (): UseFormSubmitHandleReturn<LoginFormData> => {
    // const isReg = type === "reg";
    // const schema = isReg ? regSchema : logSchema;

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginFormData>({
      resolver: yupResolver(logSchema),
    });

    const submit: SubmitHandler<LoginFormData> = (data) => {
      console.log("Отправленные данные:", data);
    };

    const error: SubmitErrorHandler<LoginFormData> = (data) => {
      console.log(data);
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
    //   const isReg = type === "reg";
    //   const schema = isReg ? regSchema : logSchema;

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterFormData>({
      resolver: yupResolver(regSchema),
    });

    const submit: SubmitHandler<RegisterFormData> = (data) => {
      console.log("Отправленные данные:", data);
    };

    const error: SubmitErrorHandler<RegisterFormData> = (data) => {
      console.log(data);
    };

    return {
      register,
      handleSubmit,
      errors,
      submit,
      error,
    };
  };
