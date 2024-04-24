import React, { useState } from 'react';
import '../index.css';
import freecyclelogo from '../assets/logo2.png'

const people = [
  {
    name: 'Jason Ang',
    role: 'Scrum Master, Full Stack Developer',
    imageUrl:
      '',
  },
  {
    name: 'Willy Sobczak',
    role: 'Product Manager, Full Stack Developer',
    imageUrl:
      ''
  },
  {
    name: 'Endrit Berberi',
    role: 'Full Stack Developer',
    imageUrl:
      '',
  },
  {
    name: 'Abraham Stefanos',
    role: 'Full Stack Developer',
    imageUrl:
      '',
  },
  // More people...
]

export default function AboutPage() {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    const mailto = `mailto:team@freecycle.com?subject=Message from Website Visitor&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
  };
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <h2 className="text-4xl font-extrabold text-green-600">Meet our Team</h2>
          <p className="mt-4 text-lg text-green-600 font-medium">Software Engineer Roles</p>
        </div>
        <div className="flex flex-wrap justify-center gap-10 pb-16">
          {people.map((person, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              {/* Uncomment below if images are available
              <img src={person.imageUrl} alt={person.name} className="h-32 w-32 rounded-full mx-auto"/> */}
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{person.name}</h3>
              <p className="text-green-600">{person.role}</p>
            </div>
          ))}
        </div>
        <section className="bg-green-50 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-green-600">About Us</h2>
              <p className="mt-4 text-lg leading-7 text-gray-600">
                FOR any private individual, business, or other institution/entity WHO would like to provide or receive non-monetary donations, THE FREEcycle is a location-specific web-based social platform THAT allows users to create an account to post their own donations or message the author of other posts to receive items free of charge. UNLIKE other legacy sales-based platforms, OUR product is built to show users posts of items they didn’t know they needed with a robust user network while storing no monetary transactions.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <img src={freecyclelogo} alt="About Us" className="h-48 object-contain"/>
            </div>
          </div>
        </section>
     {/* Contact Section */}
     <div className="flex justify-center items-center flex-col py-16">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl text-center font-semibold text-green-600 mb-4">Contact the Team</h3>
            <textarea
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              onClick={handleSendMessage}
              className="mt-4 w-full bg-green-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-green-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}