import React, { useState, useRef, useContext, useEffect } from "react";
import { UserContext } from "@contexts/UserProvider";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

function Signup() {
  const router = useRouter();

  const [termsAcceptance, setTermsAcceptance] = useState(false);

  const { isAuthenticated, signUp } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated, router]);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  const [termsError, setTermsError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const validateInputs = (
    termsAcceptance: boolean,
    id: string,
    name?: string,
    email?: string,
    password?: string,
    imageUrl?: string,
  ) => {
    if (!name || name.length > 64) {
      toast.error(' Invalid name, must be between 1 and 64 characters')
      return "ERROR: Invalid name";
    }

    if (!email || !email.includes("@") || email.length > 128) {
      toast.error(' Invalid email address')
      return "ERROR: Invalid email";
    }

    if (!password || password.length < 8 || password.length > 24) {
      toast.error('Password must be between 8 and 24 characters')
      return "ERROR: Password must be between 8 and 24 characters";
    }

    if (!imageUrl) {
      toast.error('Provide a image URL')
      return "ERROR: Invalid image URL";
    }

    try {
      new URL(imageUrl);
    } catch (e) {
      toast.error('Invalid image URL')
      return "ERROR: Invalid image URL";
    }

    if (!termsAcceptance) {
      toast.error('You must accept the terms and conditions')
      return "ERROR: You must accept the terms and conditions";
    }

    return { id, name, email, password, imageUrl };
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const id = uuidv4();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const imageUrl = imageUrlRef.current?.value;

    const response = validateInputs(termsAcceptance, id, name, email, password, imageUrl);

    response === "ERROR: Invalid name" ? setNameError(true) : setNameError(false);
    response === "ERROR: Invalid email" ? setEmailError(true) : setEmailError(false);
    response === "ERROR: Password must be between 8 and 24 characters"
      ? setPasswordError(true)
      : setPasswordError(false);
    response === "ERROR: Invalid image URL" ? setImageError(true) : setImageError(false);
    response === "ERROR: You must accept the terms and conditions" ? setTermsError(true) : setTermsError(false);

    if (typeof response === "string") return;

    await signUp(response);
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen min-h-screen gap-8 py-16">
      <h1 className="text-sm font-semibold text-gray-500 dark:text-white">E-Commerce</h1>
      <header className="flex gap-4 text-gray-700 md:w-1/6 dark:text-gray-300">
        <button onClick={() => router.push("/")} className="text-2xl font-semibold text-left">
          &lt;-
        <span className="text-2xl font-semibold text-left">Signup</span>
        </button>
      </header>
      <form className="flex flex-col items-center w-full gap-4 text-sm font-medium dark:text-white" noValidate onSubmit={handleSignUp}>
        <div className="flex flex-col md:w-1/6">
          <label htmlFor="name" className={`pb-2 ${nameError ? "text-red-500" : ""}`}>
            Name
          </label>
          <input
            ref={nameRef}
            autoComplete="name"
            type="text"
            id="name"
            className={`w-full px-4 py-2 ring-1
            dark:bg-slate-600 bg-white
             ${
              nameError ? "ring-red-500" : "ring-gray-300"
            } outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700`}
          />
        </div>
        <div className="flex flex-col md:w-1/6">
          <label htmlFor="email" className={`pb-2 ${emailError ? "text-red-500" : ""}`}>
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
        <div className="flex flex-col md:w-1/6">
          <label htmlFor="password" className={`pb-2 ${passwordError ? "text-red-500" : ""}`}>
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
        <div className="flex flex-col md:w-1/6">
          <label htmlFor="image" className={`pb-2 ${imageError ? "text-red-500" : ""}`}>
            Image URL
          </label>
          <input
            ref={imageUrlRef}
            autoComplete="off"
            type="text"
            id="image"
            className={`w-full px-4 py-2 ring-1 
            dark:bg-slate-600 bg-white ${
              
              imageError ? "ring-red-500" : "ring-gray-300"
            } outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700`}
          />
        </div>
        <div className="px-2 py-8 mx-auto border md:w-1/3">
          <label
            className="flex items-center justify-center w-full gap-2 transition-all"
            onChange={() => setTermsAcceptance(!termsAcceptance)}
          >
            <input name="name" type="checkbox" className="hidden" value="checked" />
            <span
              className={`relative flex w-4 h-4 items-center justify-center rounded cursor-pointer
              ${termsError ? "ring-1 ring-red-500" : ""}
              ${
                termsAcceptance ? "bg-violet-700 hover:bg-violet-700 after:opacity-100" : "bg-gray-300 after:opacity-0"
              } transition-colors hover:bg-fgVar after:absolute after:content-[''] after:w-[4px] after:h-[6px] after:border-b-2 after:border-r-2 after:border-extreme after:rotate-[40deg] after:transition-opacity after:bg-transparent`}
            />
            <span className={`font-medium  text-sm ${termsError ? "text-red-500" : ""}`}>
              I acknowledge that this is not a real e-commerce website.
            </span>
          </label>
        </div>
        <div className="flex justify-end gap-4 pt-4 md:w-1/6">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-gray-700 transition-colors dark:text-white hover:text-violet-700"
          >
            Login
          </button>
          <button className="px-4 py-2 text-white rounded bg-violet-700">Signup</button>
        </div>
      </form>
    </main>
  );
}

export default Signup;