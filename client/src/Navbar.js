import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
    <Link to="/" className="site-title">
      FREEcycle
    </Link>
    <ul>
    <Link to="/about" className="site-title">
      About
      <ul></ul>
    </Link>
    <Link to="/create_post" className="site-title">
      Create Post
    </Link>
    </ul>
  </nav>
  )
}