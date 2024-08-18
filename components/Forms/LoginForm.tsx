"use client";
import React, { memo } from "react";
import { Input } from "@nextui-org/input";

import { LoginFormProps } from "@/types/formTypes";

const LoginForm: React.FC<LoginFormProps> = ({ register, errors }) => {
  return (
    <>
      <div>
        <Input
          isRequired
          className="max-w-l"
          label="Username"
          placeholder="Username"
          type="text"
          {...register("username")}
        />
        {errors.username && (
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.username.message}
          </span>
        )}
      </div>
      <div>
        <Input
          isRequired
          className="max-w-l"
          label="Password"
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.password.message}
          </span>
        )}
      </div>
    </>
  );
};

export default memo(LoginForm);
