import React, { useState, useRef, useContext, useEffect } from "react";
import { UserContext } from "@contexts/UserProvider";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function Login() {
  const router = useRouter();

  const { isAuthenticated, logIn } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated){
      router.push("/");
    } 
  }, [isAuthenticated, router]);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const validateInputs = (email?: string, password?: string) => {
    if (!email || !email.includes("@")) {
      toast.error('Invalid email')
      return "ERROR: Invalid email";
    }

    if (!password || password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return "ERROR: Password must be at least 8 characters";
    }

    return { email, password };
  };

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const response = validateInputs(email, password);

    response === "ERROR: Invalid email"
      ? setEmailError(true)
      : setEmailError(false);
    response === "ERROR: Password must be at least 8 characters"
      ? setPasswordError(true)
      : setPasswordError(false);

    if (typeof response === "string") return
    await logIn(response);
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen gap-8 py-16">
      <h1 className="text-sm font-semibold text-gray-500 dark:text-white">E-Commerce</h1>
      <header className="flex w-1/6 gap-4 text-gray-700 dark:text-gray-300">
        <button
          onClick={() => router.push("/")}
          className="text-2xl font-semibold text-left"
        >
          &lt;-
        <span className="font-semibold text-left md:text-2xl">Login</span>
        </button>
      </header>
      <form
        className="flex flex-col gap-4 text-sm font-medium md:w-1/6 dark:text-gray-100"
        noValidate
        onSubmit={handleLogIn}
      >
        <div className="flex flex-col w-full">
          <label
            htmlFor="email"
            className={`pb-2 ${emailError ? "text-red-500" : ""}`}
          >
            Email
          </label>
          <input
            ref={emailRef}
            autoComplete="email"
            type="text"
            id="email"
            className={`w-full px-4 py-2 ring-1
            dark:bg-slate-600 bg-white
             ${
               emailError ? "ring-red-500" : "ring-gray-300"
             } outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700`}
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="password"
            className={`pb-2 ${passwordError ? "text-red-500" : ""}`}
          >
            Password
          </label>
          <input
            ref={passwordRef}
            autoComplete="off"
            type="password"
            id="password"
            className={`w-full px-4 py-2 ring-1
            dark:bg-slate-600 bg-white
            ${
              passwordError ? "ring-red-500" : "ring-gray-300"
            } outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700`}
          />
        </div>
        <div className="flex justify-end w-full gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="text-gray-700 transition-colors dark:text-white hover:text-violet-700"
          >
            Signup
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-gray-100 transition-colors rounded bg-violet-700 hover:bg-violet-900 hover:text-white"
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
