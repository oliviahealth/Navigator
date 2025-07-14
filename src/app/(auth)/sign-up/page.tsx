"use client"

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { createUser } from "./actions";
import { ISignupFormData, SignupSchema } from "./definitions";
import useAppStore from "@/lib/useAppStore";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const SignupPage: React.FC = () => {
  const router = useRouter()

  const setErrorMessage = useAppStore(state => state.setErrorMessage);

  const setUser = useAppStore((state) => state.setUser);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit: handleSignup,
    formState: { errors, isSubmitting },
  } = useForm<ISignupFormData>({ resolver: zodResolver(SignupSchema) });

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard/logs-and-consent-forms" });
  };

  const signupUser = async (data: ISignupFormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error('Password and ConfirmPassword do not match');
      }

      const { user } = await createUser({ ...data, email: data.email.toLowerCase() });

      setUser(user);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");

      return;
    }

    router.push('/dashboard/logs-and-consent-forms');
  }

  return (
    <>
      <div>
        <p className="font-semibold text-2xl">Get Started</p>
        <p className="text-sm">Create your account now</p>
      </div>

      {/* <div className="flex items-center dark:bg-gray-800 my-4" onClick={handleGoogleSignIn}>
        <button className="px-4 py-2 border flex justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 w-full">
          <img className="w-5 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
          <span>Sign Up With Google</span>
        </button>
      </div> */}

      {/* <div className="flex items-center mt-5">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div> */}

      <form
        onSubmit={handleSignup((data) => signupUser(data))}
        className="form-control w-full"
      >
        <div className="my-1">
          <label className="label">
            <span className="label-text text-black font-medium">Name</span>
          </label>
          <div className="flex w-full items-center border border-gray-200 rounded-xl p-1">
            <input
              {...register('name')}
              type="text"
              className="input flex-1 border-0 focus:border-transparent focus:ring-0 focus:outline-none"
              placeholder="Your name"
            />
          </div>
          {errors.name && (
            <span className="label-text-alt text-red-500">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="my-1">
          <label className="label">
            <span className="label-text text-black font-medium">Email</span>
          </label>
          <div className="flex w-full items-center border border-gray-200 rounded-xl p-1">
            <input
              {...register('email')}
              type="email"
              className="input flex-1 border-0 focus:border-transparent focus:ring-0 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <span className="label-text-alt text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="my-1">
          <label className="label">
            <span className="label-text text-black font-medium">Password</span>
          </label>
          <div className="flex w-full items-center gap-2 border border-gray-200 rounded-xl p-1">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              className="input flex-1 border-0 focus:border-transparent focus:ring-0 focus:outline-none"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-500 text-sm px-2"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
            </button>
          </div>

          {errors.password && (
            <span className="label-text-alt text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="my-1">
          <label className="label">
            <span className="label-text text-black font-medium">Confirm Password</span>
          </label>
          <div className="flex w-full items-center gap-2 border border-gray-200 rounded-xl p-1">
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              className="input flex-1 border-0 focus:border-transparent focus:ring-0 focus:outline-none"
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="text-gray-500 text-sm px-2"
              aria-label="Toggle password visibility"
            >
              {showConfirmPassword ? <RiEyeFill /> : <RiEyeOffFill />}
            </button>
          </div>

          {errors.confirmPassword && (
            <span className="label-text-alt text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button className="btn button-filled w-full mt-6">
          {isSubmitting && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          Sign Up
        </button>
      </form>

      <p className="text-sm mt-8">
        Have an account?{' '}
        <span className="button-colored p-0">
          <Link href={'/sign-in'}>Sign In</Link>
        </span>
      </p>
    </>
  )
}

export default SignupPage;