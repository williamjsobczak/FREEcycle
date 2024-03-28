import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function RegistrationPage({ setAuth }) {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    zip_code: ''
  });

  const { username, password, email, zip_code } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
      e.preventDefault();
      try {
        const body = { username, password, email, zip_code };
        const response = await fetch(
          'http://localhost:5000/authentication/registration',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
          }
        );
    
        if (!response.ok) {
          // If the response status is not in the 2xx range, handle the error
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
    
        const parseRes = await response.json();
    
        if (parseRes.jwtToken) {
          localStorage.setItem('token', parseRes.jwtToken);
          setAuth(true);
          toast.success('Registered Successfully');
        } else {
          setAuth(false);
          toast.error('Error: Unable to register');
        }
      } catch (err) {
        console.error('Error:', err.message);
        // Handle error cases where the server returns a non-2xx status code or an error message
        toast.error('Error: Unable to register');
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
            href="/authentication/login"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}