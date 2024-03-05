import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        FREEcycle
      </Link>
      <ul className="flex space-x-4">
        <li>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
        </li>
        <li>
          <Link to="/create_account" className="hover:text-gray-300">
            Create Account
          </Link>
        </li>
        <li>
          <Link to="/create_post" className="hover:text-gray-300">
            Create Post
          </Link>
        </li>
      </ul>
    </nav>
  )
}
