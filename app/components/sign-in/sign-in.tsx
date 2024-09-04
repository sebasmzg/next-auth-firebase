"use client";

import InputField from "../input/inputField";
import { useState } from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { log } from "console";

const SignIn: React.FC = () => {
  // Define the initial state type
  interface UserState {
    email: string;
    password: string;
  }

  // Set the initial state
  const initialState: UserState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState<UserState>(initialState);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(user.email, user.password);
      console.log(res);
      sessionStorage.setItem("user", String(true));
      setUser(initialState);
      router.push("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleGoogleSignIn = async ()=>{
    try {
      const res = await signInWithGoogle()
      console.log(res);
      sessionStorage.setItem("user", String(true));
      router.push("/");
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 dark:bg-gray-800">
      <div className="w-full max-w-sm bg-gray-800 dark:bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-100 dark:text-gray-300 mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="mt-4 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Sign In with Google
        </button>
        <p className="text-gray-300 mt-4">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
