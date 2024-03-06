import './App.css';
import React, { Fragment, useState, useEffect } from "react";
import Layout from './Layout';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CreatePostPage from './pages/CreatePostPage';
import SignInPage from './pages/SignInPage';
import ProductDescriptionPage from './pages/ProductDescriptionPage';
import RegistrationPage from './pages/RegistrationPage';
import PageNotFound from './pages/PageNotFound'
import ProfilePage from './pages/ProfilePage';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

// npm i -D react-router-dom@latest



function App() {

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error('checkAuthenticated error: ', err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };





  return (
    <div className="App">
         <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
      <Layout setAuth={setAuth} isAuthenticated={isAuthenticated} checkAuthenticated={checkAuthenticated}>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/create_post"  element={isAuthenticated ? 
            <CreatePostPage isAuthenticated={isAuthenticated} checkAuthenticated={checkAuthenticated} /> : 
            <SignInPage setAuth={setAuth} />
            } />
          <Route path="/profile" element={
          isAuthenticated ? 
            <ProfilePage isAuthenticated={isAuthenticated} checkAuthenticated={checkAuthenticated} /> : 
            <SignInPage setAuth={setAuth} />
            }  />
          <Route path="/sign-in" element={
          isAuthenticated ? 
            <Navigate to="/" /> : 
            <SignInPage setAuth={setAuth} />
            }  />
          <Route path="/registration" element={
          isAuthenticated ? 
            <Navigate to="/" /> : 
            <RegistrationPage setAuth={setAuth} />
            } 
          />
          <Route path="/product-description" element={<ProductDescriptionPage />} />
          <Route path="/*" element={<PageNotFound />} />
         

        </Routes>
        </Layout>
      </BrowserRouter>
  
    </div>
  );
}

export default App;