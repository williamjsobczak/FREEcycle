import React, {useEffect, useState} from 'react'
import HomePage from './HomePage'
import CreatePostPage from './CreatePostPage';
import ListPost from './postlist/ListPost';
import { toast } from 'react-toastify';


export default function ProfilePage({isAuthenticated, checkAuthenticated}) {
    const [name, setName] = useState("");
    // const [zip_code, setZip_code] = useState("");
    // const [email, setEmail] = useState("");

    const [inputs, setInputs] = useState({
      username: '',
      email: '',
      password: '',
      zip_code: ''
    });
    const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

    const { username, password, email, zip_code } = inputs;

    const [allPosts, setAllPosts] = useState([]);
    const [postsChange, setPostsChange] = useState(false);
  
    const getProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/Posting/", {
          method: "GET",
          headers: { jwt_token: localStorage.token },
        });
  
        const parseData = await res.json();
        // Assuming parseData is an array with at least one element
        if (parseData.length > 0) {
          setInputs(prevState => ({
            ...prevState,
            username: parseData[0].username,
            zip_code: parseData[0].zip_code,
            email: parseData[0].email
          }));
        }

        console.log()
        // setName(parseData[0].username); // name is the first array item
        // setZip_code(parseData[0].zip_code);
        // setEmail(parseData[0].email);
      } catch (err) {
        console.error(err.message);
      }
    };

    

    const onSubmitZipCode = async e => {
      e.preventDefault();
      try {
        const body = { email };
        const response = await fetch(
          'http://localhost:5000/update-credentials',
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
    
      } catch (err) {
        console.error('Error:', err.message);
        // Handle error cases where the server returns a non-2xx status code or an error message
        toast.error('unable to update zipcode');
      }
    };

    useEffect(() => {
        checkAuthenticated();
      }, []);
    
      useEffect(() => {
        getProfile();
        setPostsChange(false);
      }, [postsChange]);

    return (
    isAuthenticated ? (
        <div className="p-16">
          <div className="p-8 bg-white shadow mt-24">
          <div class="p-16">
<div class="p-8 bg-white shadow mt-24">
  <div class="grid grid-cols-1 md:grid-cols-3">
    <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
      <div>
        <p class="font-bold text-gray-700 text-xl">jkl</p>
        <p class="text-gray-400">bobby</p>
      </div>
      <div>
           <p class="font-bold text-gray-700 text-xl">klj</p>
        <p class="text-gray-400">smurday</p>
      </div>
          <div>
           <p class="font-bold text-gray-700 text-xl">klj</p>
        <p class="text-gray-400">dasf</p>
      </div>
    </div>
    <div class="relative">
      <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
</svg>
      </div>
    </div>

    <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
<button
  class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
>
  Connect
</button>
    <button
  class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
>
  Message
</button>
    </div>
  </div>

  <div class="mt-20 text-center border-b pb-12">
    <h1 class="text-4xl font-medium text-gray-700">{name} <span class="font-light text-gray-500">27</span></h1>
    <p class="font-light text-gray-600 mt-3">Bob's Burger</p>
    <p class="mt-8 text-gray-500">EMAIL: {email}</p>
    <p class="mt-2 text-gray-500">Zip Code: {zip_code}</p>
    <form onSubmit={onSubmitZipCode}>
    <input
              type="text"
              className="mt-8 text-gray-500"
              name="email"
              value={email}
              placeholder="Email"
              onChange={e => onChange(e)}
            />
    <input
              type="text"
              className="mt-8 text-gray-500"
              name="zip_code"
              value={zip_code}
              placeholder="zip_code"
              onChange={e => onChange(e)}
            />
      <input
              type="text"
              className="mt-8 text-gray-500"
              name="username"
              value={username}
              placeholder="username"
              onChange={e => onChange(e)}
            />
          <button
              type="submit"
              className="block w-full text-center py-3 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
            >
              Update crednetials
            </button>
    </form>
   
      
  </div>

  <div class="mt-12 flex flex-col justify-center">
  <ListPost allPosts={allPosts} setPostsChange={setPostsChange} />
  </div>

</div>
</div>
          </div>
        </div>
      ) : (
        <HomePage />
      )
    );
  }