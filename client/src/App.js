import './App.css';
import Layout from './Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CreatePostPage from './pages/CreatePostPage';
import SignInPage from './pages/SignInPage';
import ProductDescriptionPage from './pages/ProductDescriptionPage';
import PostItem from './components/PostItem';
import Login from './components/Login'; // Import the Login component
import CreateAccount from './components/CreateAccount'; // Import the CreateAccount component
// npm i -D react-router-dom@latest
function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/create_post" element={<CreatePostPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/product-description" element={<ProductDescriptionPage />} />
          <Route path="/post-item" element={<PostItem />} />
          <Route path="/login" element={<Login />} /> {/* New route for Login */}
          <Route path="/create_account" element={<CreateAccount />} /> {/* New route for CreateAccount */}

        </Routes>
        </Layout>
      </BrowserRouter>
  
    </div>
  );
}

export default App;