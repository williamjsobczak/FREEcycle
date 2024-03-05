import React from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';

export default function Layout({children}) {
  return (
    <div>
    <Navbar/>
      <main>{children}</main>
    <Footer/>
    </div>
  )
}