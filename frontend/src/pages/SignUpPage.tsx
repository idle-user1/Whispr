import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { signup } from "../lib/api.js";
import { SigmaSquareIcon } from "lucide-react";
import { toast } from "react-hot-toast/headless";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.log("Signup error:", error);
      const errorMessage = error?.response?.data?.message ;
      toast.error(errorMessage);
    }
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(signUpData);
  };
  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 max-w-5xl mx-auto w-full bg-base-100 rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* LEFT SECTION - Brand + Form */}
        <div className="lg:w-1/2 p-6 md:p-8 flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-4">
            <SigmaSquareIcon size={32} className="text-primary" />
            <span className="text-2xl font-bold">Whispr</span>
          </div>

          {/* Error Display */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>
                {(error instanceof Error && 'response' in error 
                  ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
                  : undefined) ?? "Signup failed. Please try again."}
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="mb-2">
              <h2 className="text-2xl font-bold mb-1">Create your account</h2>
              <p className="text-sm text-gray-500">
                Sign up to connect with friends and family
              </p>
            </div>

            {/*USERNAME INPUT */}
            <div>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <svg
                  className="h-4 w-4 opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  className="grow"
                  required
                  placeholder="Username"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  title="Only letters, numbers or dash"
                  value={signUpData.fullName}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, fullName: e.target.value })
                  }
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Must be 3 to 30 characters containing only letters, numbers or
                dash
              </p>
            </div>

            {/*EMAIL INPUT */}
            <div>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <svg
                  className="h-4 w-4 opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  className="grow"
                  placeholder="mail@site.com"
                  required
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, email: e.target.value })
                  }
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Enter a valid email address
              </p>
            </div>

            {/*PASSWORD INPUT */}
            <div>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <svg
                  className="h-4 w-4 opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  className="grow"
                  required
                  placeholder="Password"
                  minLength={6}
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, password: e.target.value })
                  }
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            {/* SIGN UP BUTTON */}
            <button 
              className="btn btn-primary w-full mt-2" 
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Signing up...
                </>
              ) : (
                <>
                  <svg
                    aria-label="Email icon"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  Sign Up with Email
                </>
              )}
            </button>

            {/* LOGIN LINK */}
            <div className="text-center mt-2">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>{" "}
        {/* RIGHT SECTION - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary/10 items-center justify-center p-8">
          <div className="max-w-md text-center space-y-6">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/signUp.jpg"
                alt="Language connection illustration"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">
                Chat with friends instantly
              </h2>
              <p className="opacity-70 text-sm">
                Connect, message, and stay in touch with people around the world
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
