"use client"

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createUser } from "./actions";
import { ISignupFormData, SignupSchema } from "./definitions";
import useAppStore from "@/lib/useAppStore";

const SignupPage: React.FC = () => {
  const router = useRouter()

  const setErrorMessage = useAppStore(state => state.setErrorMessage);

  const setUser = useAppStore((state) => state.setUser);
  const setAccessToken = useAppStore((state) => state.setAccessToken);

  const {
    register,
    handleSubmit: handleSignup,
    formState: { errors, isSubmitting },
  } = useForm<ISignupFormData>({ resolver: zodResolver(SignupSchema) });

  const signupUser = async (data: ISignupFormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error('Password and ConfirmPassword do not match');
      }

      const { user, token } = await createUser(data);

      setUser(user);
      setAccessToken(token);

    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");

      return;
    }

    router.push('/dashboard');
  }

  return (
    <>
      <div>
        <p className="font-semibold text-2xl">Get Started</p>
        <p className="text-sm">Create your account now</p>
      </div>

      <form
        onSubmit={handleSignup((data) => signupUser(data))}
        className="form-control w-full py-4"
      >
        <div className="my-1">
          <label className="label">
            <span className="label-text text-black font-medium">Name</span>
          </label>
          <input
            {...register('name')}
            type="text"
            className="input w-full border-gray-200 focus:border-[#5D1B2A] focus:outline-none"
          />
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
          <input
            {...register('email')}
            type="email"
            className="input w-full border-gray-200 focus:border-[#5D1B2A] focus:outline-none"
          />
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
          <input
            {...register('password')}
            type="password"
            className="input w-full border-gray-200 focus:border-[#5D1B2A] focus:outline-none"
          />
          {errors.password && (
            <span className="label-text-alt text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="my-1">
          <label className="label">
            <span className="label-text text-black font-medium">
              Confirm Password
            </span>
          </label>
          <input
            {...register('confirmPassword')}
            type="password"
            className="input w-full border-gray-200 focus:border-[#5D1B2A] focus:outline-none"
          />
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