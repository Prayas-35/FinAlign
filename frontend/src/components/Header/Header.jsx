import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home after logout
  };

  return (
    <div>
      <header className="bg-background px-4 lg:px-6 h-14 flex items-center justify-between shadow-md">
        <Link to="/" className="flex items-center text-white">
          <MountainIcon className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">FinAlign</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          <Link to="#" className="text-white hover:text-gray-300">
            About Us
          </Link>
          {token ? (
            <>
              <Link to="/profile" className="text-white hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>

              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-white hover:text-gray-300">
                Sign Up
              </Link>
              <Link to="/login" className="text-white hover:text-gray-300">
                Log In
              </Link>
            </>
          )}
        </nav>
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none"
        >
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Open main menu</span>
        </button>
      </header>

      {menuOpen && (
        <nav className="lg:hidden bg-background p-4 shadow-md">
          <Link
            to="#"
            className="block text-white hover:text-gray-300 mb-2"
            onClick={toggleMenu}
          >
            About Us
          </Link>
          {token ? (
            <>
              <Link
                to="/profile"
                className="block text-white hover:text-gray-300 mb-2"
                onClick={toggleMenu}
              >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block text-white hover:text-gray-300 mb-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="block text-white hover:text-gray-300 mb-2"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="block text-white hover:text-gray-300 mb-2"
                onClick={toggleMenu}
              >
                Log In
              </Link>
            </>
          )}
        </nav>
      )}
    </div>
  );
};

export default Header;

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
