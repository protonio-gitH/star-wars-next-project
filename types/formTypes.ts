import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface UseFormSubmitHandleReturn<T extends FieldValues> {
  register: ReturnType<typeof useForm<T>>["register"];
  handleSubmit: ReturnType<typeof useForm<T>>["handleSubmit"];
  errors: ReturnType<typeof useForm<T>>["formState"]["errors"];
  submit: SubmitHandler<T>;
  error: SubmitErrorHandler<T>;
}

export interface LoginFormProps {
  register: UseFormSubmitHandleReturn<LoginFormData>["register"];
  errors: UseFormSubmitHandleReturn<LoginFormData>["errors"];
}

export interface RegFormProps {
  register: UseFormSubmitHandleReturn<RegisterFormData>["register"];
  errors: UseFormSubmitHandleReturn<RegisterFormData>["errors"];
}
