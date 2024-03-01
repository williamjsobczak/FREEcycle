import './App.css';
import Layout from './Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
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
        </Routes>
        </Layout>
      </BrowserRouter>
  
    </div>
  );
}

export default App;
