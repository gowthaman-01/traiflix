import { sendPasswordResetEmail } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUp = () => {
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signUp(email, password);
  };
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Traiflix - Sign Up</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://fontmeme.com/permalink/220514/8e630bfe7af5a5909c7a23d812300c6e.png"
        alt="traiflix logo"
        width={150}
        height={150}
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            ></input>
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-400 tracking-wider">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
            ></input>
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-400 tracking-wider">
                {errors.password.message}
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              className="input"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
            ></input>
            {errors.confirmPassword && (
              <p className="p-1 text-[13px] font-light text-orange-400 tracking-wider">
                {errors.confirmPassword.message}
              </p>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
        >
          Sign Up
        </button>
        <div className="flex gap-x-1 text-[gray]">
          Already have an account?
          <div
            className="text-white hover:underline cursor-pointer"
            onClick={() => Router.push("/login")}
          >
            {" "}
            Login
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
