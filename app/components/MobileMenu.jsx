"use client"

import { useState } from "react"

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          {isOpen ? (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.293 4.293a1 1 0 00-1.414 0L12 10.586 5.707 4.293a1 1 0 00-1.414 1.414L10.586 12l-6.293 6.293a1 1 0 101.414 1.414L12 13.414l6.293 6.293a1 1 0 001.414-1.414L13.414 12l6.293-6.293a1 1 0 000-1.414z"
            />
          ) : (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="space-y-1 pb-3 pt-2">
          <a
            href="#"
            className="block border-l-4 border-indigo-500 bg-gray-900 py-2 pl-3 pr-4 text-base font-medium text-white"
          >
            Home
          </a>

          <a
            href="#"
            className="block border-l-4 py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-700 hover:text-white"
          >
            About
          </a>

          <a
            href="#"
            className="block border-l-4 py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Contact
          </a>
        </div>
      )}
    </div>
  )
}

export default MobileMenu
