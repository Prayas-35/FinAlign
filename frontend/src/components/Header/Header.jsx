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
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Logout
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
                Profile
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
