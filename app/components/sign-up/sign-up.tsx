"use client"

import { useState } from 'react';
import InputField from '../input/inputField';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'

const SignUp: React.FC = () => {
  // Define the initial state type
  interface UserState {
    email: string;
    password: string;
  }

  // Set the initial state
  const initialState: UserState = {
    email: '',
    password: ''
  };

  const [user, setUser] = useState<UserState>(initialState);

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth) // Create a new user with email and password

  // Handle the input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Destructure the name and value from the target
    setUser((prevState) => ({ // Update the user state
      ...prevState, // Spread the previous state
      [name]: value // Update the changed input value
    }));
  };

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(user.email, user.password) // Create a new user with email and password
      console.log(res);// Log the response
      sessionStorage.setItem('user', JSON.stringify(res?.user)); // Store the user in the session storage
      setUser(initialState); // Reset the user state
      
    } catch (error) {
      console.error('Error signing up:', error ) // Log the error message;
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 dark:bg-gray-800">
      <div className="w-full max-w-sm bg-gray-800 dark:bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-100 dark:text-gray-300 mb-6">Sign Up</h2>
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;