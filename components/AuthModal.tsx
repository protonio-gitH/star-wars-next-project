"use client";
import React, { memo } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import RegForm from "./Forms/RegForm";
import LoginForm from "./Forms/LoginForm";

import { AuthModalProps } from "@/types/modalTypes";
import {
  useLoginFormSubmitHandle,
  useRegFormSubmitHandle,
} from "@/hooks/useSubmitHandle";

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onOpenChange,
  type,
}) => {
  const {
    register: registerForm,
    handleSubmit: handleSubmitRegister,
    errors: errorsRegister,
    submit: submitRegister,
    error: errorRegister,
  } = useRegFormSubmitHandle();

  const {
    register: loginForm,
    handleSubmit: handleSubmitLogin,
    errors: errorsLogin,
    submit: submitLogin,
    error: errorLogin,
  } = useLoginFormSubmitHandle();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <form
          onSubmit={
            type === "login"
              ? handleSubmitLogin(submitLogin, errorLogin)
              : handleSubmitRegister(submitRegister, errorRegister)
          }
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {type === "login" ? "Вход" : "Регистрация"}
                </ModalHeader>
                <ModalBody className="gap-5">
                  {type === "login" ? (
                    <LoginForm errors={errorsLogin} register={loginForm} />
                  ) : (
                    <RegForm errors={errorsRegister} register={registerForm} />
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">
                    {type === "login" ? "Войти" : "Зарегистрироваться"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default memo(AuthModal);
