import React, {useState} from 'react'
import { toast } from "react-toastify";


export default function RegistrationPage({ setAuth }) {


    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: "",
        zipcode: ""
      });
    
      const { email, password, name, zipcode } = inputs;
    
      const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    
      const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { email, password, name, zipcode };
                  const response = await fetch(
            "http://localhost:5000/authentication/register",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
          const parseRes = await response.json();
    
          if (parseRes.jwtToken) {
            localStorage.setItem("token", parseRes.jwtToken);
            setAuth(true);
            toast.success("Registered Successfully");
          } else {

            setAuth(false);
            toast.error('parseRes error: ', parseRes);
          }
        } catch (err) {
           
          console.error('onSubmit form error: ', err.message);
        }
       
      };
    

  return (

<div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                    <form onSubmit={onSubmitForm}>
                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="name"
                        value={name}
                        placeholder="Full Name" 
                        onChange={e => onChange(e)}
                        />

                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={e => onChange(e)}
                         />

                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        value={password}
                        placeholder="Password" 
                        onChange={e => onChange(e)}    
                        />
                    <input 
                        type="zipcode"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="zipcode"
                        value={zipcode}
                        placeholder="Zip Code" 
                        onChange={e => onChange(e)}    
                        />
                    {/* <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password" /> */}

                    <button
                      
                        class="green-full text-center py-3 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
                    >Create Account</button>

                    <div class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </form>
                </div>
                
                <div class="text-grey-dark mt-6">
                    Already have an account? 
                    <a class="no-underline border-b border-blue text-blue" href="../sign-in/">
                        Log in
                    </a>
                </div>
            </div>
        </div>
  )
}
