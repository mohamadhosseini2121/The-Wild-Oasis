"use client";

import Image from "next/image";
import bg from "@/public/bg.png";
import { signInAction } from "@/app/_lib/actions";
import { useFormState } from "react-dom";
import FormButton from "@/app/_components/FormButton";

export default function Login() {
  const [state, action] = useFormState(signInAction, null);

  return (
    <section className="">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top blur"
        alt="Mountains and forests with two cabins"
      />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 relative z-10">
        <div className="w-full bg-primary-950 text-primary-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight   md:text-2xl">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" action={action}>
              <div>
                <label htmlFor="email">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                  placeholder="name@company.com"
                />
                {state?.errors?.email &&
                  state.errors.email.map((error) => (
                    <p className="text-xs text-red-500 mt-1" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                />
                {state?.errors?.password &&
                  state.errors.password.map((error) => (
                    <p className="text-xs text-red-500 mt-1" key={error}>
                      {error}
                    </p>
                  ))}
              </div>

              <FormButton
                type="submit"
                pendingText="Loading..."
                className="w-full bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
              >
                Login / Create Account
              </FormButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
