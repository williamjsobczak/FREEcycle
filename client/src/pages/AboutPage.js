import React from 'react'
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
  return (
    <div className="bg-white py-24 sm:py-32">
    <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-green-500 sm:text-4xl">Meet our Team</h2>
        <p className="mt-6 text-lg leading-8 text-green-600">
          Software Engineer Roles
        </p>
      </div>
      <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
        {people.map((person) => (
          <li key={person.name}>
            <div className="flex items-center gap-x-6">
              {/* <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" /> */}
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-sm font-semibold leading-6 text-bg-green-500">{person.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <div class="mb-20"></div>
    <section class="bg-gray-100 mb-12">
    <div class="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div class="max-w-lg">
                <h2 class="text-3xl font-extrabold text-green-500 sm:text-4xl">About Us</h2>
                <p class="mt-4 text-gray-600 text-lg">FOR any private individual, business, or other institution/entity WHO would like to provide or receive non-monetary donations, THE FREEcycle is a location-specific web-based social platform THAT allows users to create an account to post their own donations or message the author of other posts to receive items free of charge. UNLIKE other legacy sales-based platforms, OUR product is built to show users posts of items they didn’t know they needed with a robust user network while storing no monetary transactions.</p>
                <div class="mt-8">
                    {/* <a href="#" class="text-blue-500 hover:text-blue-600 font-medium">Learn more about us */}
                        {/* <span class="ml-2">&#8594;</span></a> */}
                </div>
            </div>
            <div class="mt-12 md:mt-0">
            <img src={freecyclelogo} alt="About Us Image" class="object-cover rounded-lg shadow-md" width="400" height="600"/>
            </div>
        </div>
    </div>
</section>
  </div>
  
  )
}