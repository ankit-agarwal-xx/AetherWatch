/* eslint-disable react/prop-types */
import * as React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseSetup';
import Logo from '../assets/logo.png'; // Update this with the correct path to your logo

export default function Register({ setAuthState, setUser }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [username, setUsername] = React.useState('');

  const onSignUpHandle = () => {
    if (email !== '' && password !== '' && password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(email);
          setAuthState('home');
          console.log('Registration successful:', userCredential.user);
        })
        .catch((err) => alert(err));
    } else {
      alert('Passwords do not match or fields are empty.');
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-transparent">
        <div className="relative flex items-center justify-center">
          <div className="w-80 h-60 rounded-full bg-gradient-to-tr from-purple-500 to-orange-800 animate-spin" />
          <img
            src={Logo}
            alt="Logo"
            className="absolute w-50 h-30 object-contained"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-[600px] px-6 py-10 rounded-3xl bg-gradient-to-r from-orange-300 to-orange-800 border border-gray-100">
          <h1 className="text-4xl font-semibold">Register</h1>
          <p className="font-medium text-base text-gray-500 mt-4">Please fill in the details to create an account.</p>
          <div className="mt-6">
            <div className="flex flex-col mb-4">
              <label className="text-base font-medium">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-3 mt-1 bg-transparent"
                placeholder="Enter your username"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-base font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-3 mt-1 bg-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-base font-medium">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-3 mt-1 bg-transparent"
                placeholder="Enter your password"
                type="password"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-base font-medium">Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-3 mt-1 bg-transparent"
                placeholder="Confirm your password"
                type="password"
              />
            </div>
            <div className="mt-6 flex flex-col gap-y-4">
              <button
                onClick={onSignUpHandle}
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-3 bg-violet-500 rounded-lg text-white font-semibold text-lg"
              >
                Register
              </button>
              <button className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-3 rounded-lg text-gray-700 font-semibold text-lg border border-gray-200">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                    fill="#34A853"
                  />
                  <path
                    d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                    fill="#4A90E2"
                  />
                  <path
                    d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                    fill="#FBBC05"
                  />
                </svg>
                Sign up with Google
              </button>
            </div>
            <div className="mt-6 flex justify-center items-center">
              <p className="font-medium text-base">Already have an account?</p>
              <button
                onClick={() => setAuthState('login')}
                className="ml-2 font-medium text-base text-violet-500"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
