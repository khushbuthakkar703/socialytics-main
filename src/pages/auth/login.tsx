import Button from "@/components/Button";
import {
  useStytchB2BClient,
  useStytchMember,
  useStytchMemberSession,
} from "@stytch/nextjs/dist/b2b";
import { StytchB2BHeadlessClient } from "@stytch/vanilla-js/dist/b2b";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  email: string;
};

export default function login() {
  const router = useRouter();

  const stytch = useStytchB2BClient() as StytchB2BHeadlessClient;
  const member = useStytchMember();
  const session = useStytchMemberSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    stytch.magicLinks.email.discovery.send({
      email_address: data.email,
      discovery_redirect_url: `${window.location.origin}/auth/discover`,
    });
    toast.success("We just sent you an email to login.");
  };

  useEffect(() => {
    const tokens = stytch.session.getTokens();
    console.log(tokens);
  }, []);

  console.log(session);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-300">
      <div className="flex w-full max-w-md flex-col rounded-md bg-white px-4 py-8 shadow-md sm:px-6 md:px-8 lg:px-10">
        <div className="self-center text-xl font-medium uppercase text-gray-800 sm:text-2xl">
          Login To Your Account
        </div>

        <div className="relative mt-10 h-px bg-gray-300">
          <div className="absolute left-0 top-0 -mt-2 flex w-full justify-center">
            <span className="bg-white px-4 text-xs uppercase text-gray-500">
              Login with Email
            </span>
          </div>
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6 flex flex-col">
              <label className="mb-1 text-xs tracking-wide text-gray-600 sm:text-sm">
                E-Mail Address:
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>

                <input
                  id="email"
                  type="email"
                  disabled={isSubmitted}
                  className="w-full rounded-lg border border-gray-400 bg-white py-2 pl-10  pr-4 text-sm text-black placeholder-gray-500 focus:border-blue-400 focus:outline-none sm:text-base"
                  placeholder="E-Mail Address"
                  {...register("email", {
                    required: "required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email.",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <span role="alert">{errors.email.message?.toString()}</span>
              )}
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                disabled={isSubmitted}
                className="flex w-full items-center justify-center rounded bg-blue-600 py-2 text-sm text-white transition duration-150 ease-in hover:bg-blue-700 focus:outline-none sm:text-base"
              >
                <span className="mr-2 uppercase">Login</span>
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
