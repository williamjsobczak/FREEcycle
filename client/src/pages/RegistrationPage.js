import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function RegistrationPage({ setAuth }) {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    zip_code: ''
  });

  const { email, password, username, zip_code } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
        const body = { email, password };
        const response = await fetch(
            "http://localhost:5000/login",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            }
        );

        const parseRes = await response.json();

        if (response.ok) {
            localStorage.setItem("token", parseRes.jwtToken);
            setAuth(true);
            toast.success("Logged in Successfully");
        } else {
            setAuth(false);
            toast.error(parseRes);
        }
    } catch (err) {
        console.error(err.message);
        toast.error("Error: Unable to sign in");
    }
};
  



  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={onSubmitForm}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              value={username}
              placeholder="Full Name"
              onChange={e => onChange(e)}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              value={email}
              placeholder="Email"
              onChange={e => onChange(e)}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              value={password}
              placeholder="Password"
              onChange={e => onChange(e)}
            />
            <input
              type="zip_code"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="zip_code"
              value={zip_code}
              placeholder="Zip Code"
              onChange={e => onChange(e)}
            />

            <button
              type="submit"
              className="block w-full text-center py-3 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account
            </button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the{' '}
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?{' '}
          <a
            className="no-underline border-b border-blue text-blue"
            href="../sign-in/"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}
