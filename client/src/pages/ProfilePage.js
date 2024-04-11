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

      // Function to focus input field
  const focusInput = (inputRef) => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // References for input fields
  const emailRef = React.useRef(null);
  const zipCodeRef = React.useRef(null);
  const usernameRef = React.useRef(null);

    const onSubmitCredentials = async e => {
      e.preventDefault();
      try {
        const body = { username, email, zip_code };
        const response = await fetch(
          'http://localhost:5000/authentication/update-credentials', // Adjusted to the new endpoint
          {
            method: 'PUT', // Changed to PUT to match the server-side route
            headers: {
              'Content-type': 'application/json',
              'jwt_token': localStorage.token // Make sure the header name matches what your middleware expects
            },
            body: JSON.stringify(body)
          }
        );
    
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
    
        toast.success('Credentials updated successfully!');
        const parseRes = await response.json();
        // Update the state or perform necessary actions after successful update
      } catch (err) {
        console.error('Error:', err.message);
        toast.error(`Unable to update credentials: ${err.message}`);
      }
    };
    


    useEffect(() => {
        checkAuthenticated();
      }, []);
    
      useEffect(() => {
        getProfile();
        setPostsChange(false);
      }, [postsChange]);

      return isAuthenticated ? (
        <div className="p-16 bg-white shadow mt-25">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Profile Section */}
            <div className="relative flex flex-col items-center">
              {/* Profile Image */}
              <div className="w-70 h-70 bg-indigo-100 rounded-full shadow-2xl flex items-center justify-center text-indigo-500">
                <img src="logo.png" alt="Profile" className="h-32 w-32" />
              </div>
              {/* Profile Info */}
              <div className="mt-6 text-center">
                <h1 className="text-4xl font-medium text-gray-700">{username}</h1>
                <p className="font-light text-gray-600 mt-3">{email}</p>
              </div>
            </div>

            {/* Posts Section */}
            <div className="mt-12 flex flex-col justify-center">
              {/* Display a list of posts - assumes you have a component called ListPost */}
              <ListPost allPosts={allPosts.slice(0, 3)} setPostsChange={setPostsChange} />
              {/* "See all" link */}
              <a href="/all-posts" className="text-blue-500 hover:underline self-center mt-4">See all</a>
            </div>
          </div>

          {/* Update Credentials Form */}
      <div className="mt-20 text-center border-b pb-12">
        <h1 className="text-4xl font-medium text-gray-700">Update Credentials</h1>
        <form onSubmit={onSubmitCredentials} className="flex flex-col items-center justify-center">
          <div className="flex items-center my-2">
            <input
              ref={emailRef}
              type="text"
              className="text-gray-500"
              name="email"
              value={email}
              placeholder="Email"
              onChange={e => onChange(e)}
            />
            <button type="button" onClick={() => focusInput(emailRef)}>Change</button>
          </div>
          <div className="flex items-center my-2">
            <input
              ref={zipCodeRef}
              type="text"
              className="text-gray-500"
              name="zip_code"
              value={zip_code}
              placeholder="Zip Code"
              onChange={e => onChange(e)}
            />
            <button type="button" onClick={() => focusInput(zipCodeRef)}>Change</button>
          </div>
          <div className="flex items-center my-2">
            <input
              ref={usernameRef}
              type="text"
              className="text-gray-500"
              name="username"
              value={username}
              placeholder="Username"
              onChange={e => onChange(e)}
            />
            <button type="button" onClick={() => focusInput(usernameRef)}>Change</button>
          </div>
          <button
            type="submit"
            className="block w-full text-center py-3 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
          >
            Update credentials
          </button>
        </form>
      </div>
    </div>
  ) : (
    <HomePage />
  );
}