"use client";

import { createAuthCookie } from "@/actions/auth.action";
import { RegisterSchema } from "@/helpers/schemas";
import { RegisterFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const Register = () => {
  const router = useRouter();

  const initialValues: RegisterFormType = {
    name: "Acme",
    email: "admin@acme.com",
    password: "admin",
    confirmPassword: "admin",
  };

  const handleRegister = useCallback(
    async (values: RegisterFormType) => {
      // `values` contains name, email & password. You can use provider to register user

      await createAuthCookie();
      router.replace("/");
    },
    [router]
  );

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6">Register</div>

      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
              <Input
                variant="bordered"
                label="Name"
                value={values.name}
                isInvalid={!!errors.name && !!touched.name}
                errorMessage={errors.name}
                onChange={handleChange("name")}
              />
              <Input
                variant="bordered"
                label="Email"
                type="email"
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
              <Input
                variant="bordered"
                label="Password"
                type="password"
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
              <Input
                variant="bordered"
                label="Confirm password"
                type="password"
                value={values.confirmPassword}
                isInvalid={
                  !!errors.confirmPassword && !!touched.confirmPassword
                }
                errorMessage={errors.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
            >
              Register
            </Button>
            <div className="flex flex-col gap-4 mt-6">
              <button
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-bold text-white hover:bg-gray-800 disabled:opacity-50"
                // onClick={handleGoogleAuth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-5 w-5"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.1 0 5.9 1.2 8.1 3.3l6.1-6.1C34.1 3.5 29.3 1.5 24 1.5 14.8 1.5 7.2 7.2 4.3 15.1l7.7 6C13.3 15.1 18.2 9.5 24 9.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M46.4 24.5c0-1.7-.2-3.4-.5-5h-22v9h12.7c-.6 3.2-2.5 5.9-5.2 7.8l7.8 6C43.1 38.1 46.4 31.7 46.4 24.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M11.9 28.9c-1.1-3.2-1.1-6.8 0-10l-7.7-6c-2.7 5.3-2.7 11.7 0 17.1l7.7-6z"
                  />
                  <path
                    fill="#4285F4"
                    d="M24 46.5c5.4 0 10.4-1.8 14.3-4.9l-7.8-6c-2.1 1.4-4.7 2.2-7.5 2.2-5.8 0-10.7-3.9-12.4-9.1l-7.7 6C7.2 40.8 14.8 46.5 24 46.5z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
                Google
              </button>
              <button
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-black bg-white px-5 py-3 text-sm font-bold text-black hover:bg-gray-200 disabled:opacity-50"
                // onClick={handleGitHubAuth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.54 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  />
                </svg>
                Github
              </button>
            </div>
          </>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm">
        Already have an account ?{" "}
        <Link href="/login" className="font-bold">
          Login here
        </Link>
      </div>
    </>
  );
};
