"use client"

import Link from "next/link";
import React, { useState } from "react";

const SignInPage: React.FC = () => {
  const [errorDetected, setErrorDetected] = useState(false);

  return (
    <>
      <div>
        <p className="font-semibold text-2xl">Welcome Back!</p>
        <p className="text-sm">Sign in to your account</p>

        {errorDetected && (
          <p className="text-sm text-red-500">
            Something went wrong. Please try again
          </p>
        )}
      </div>

      <form
        // onSubmit={handleSignIn((data) => signInUser(data))}
        className="form-control w-full"
      >
        <div className="my-1">
          <label className="label">
            <span className="label-text text-black font-medium">Email</span>
          </label>
          <input
            // {...register('email')}
            type="email"
            className="input w-full border-gray-200 focus:border-[#5D1B2A] focus:outline-none"
          />
          {/* {errors.email && (
            <span className="label-text-alt text-red-500">
              {errors.email.message}
            </span>
          )} */}
        </div>

        <div className="my-1">
          <label className="label">
            <span className="label-text text-black font-medium">Password</span>
          </label>
          <input
            // {...register('password')}
            type="password"
            className="input w-full border-gray-200 focus:border-[#5D1B2A] focus:outline-none"
          />
          {/* {errors.password && (
            <span className="label-text-alt text-red-500">
              {errors.password.message}
            </span>
          )} */}
        </div>

        <button className="btn button-filled w-full mt-6">
          {/* {isLoading && (
            <span className="loading loading-spinner loading-sm"></span>
          )} */}
          Sign In
        </button>
      </form>

      <p className="text-sm mt-8">
        Don't have an account?{' '}
        <span className="button-colored p-0">
          <Link href={'/sign-up'}>Create one now!</Link>
        </span>
      </p>
    </>
  )
}

export default SignInPage;