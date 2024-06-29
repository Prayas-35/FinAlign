import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home after logout
  };

  return (
    <div>
      <header className="bg-background px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">FinAlign</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          <Link to="#" className="group relative text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            About Us
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customteal transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
          {token ? (
            <>
              <Link to="/profile" className="group relative text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                Profile
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customteal transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
              <button onClick={handleLogout} className="group relative text-lg font-medium hover:underline underline-offset-4">
                Logout
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customteal transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="group relative text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                Sign Up
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customteal transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
              <Link to="/login" className="group relative text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
                Log In
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customteal transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </>
          )}
        </nav>
        <button onClick={toggleMenu} className="lg:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Open main menu</span>
        </button>
      </header>

      {menuOpen && (
        <nav className="lg:hidden bg-background p-4">
          <Link to="#" className="block text-lg font-medium mb-2" onClick={toggleMenu}>
            About Us
          </Link>
          {token ? (
            <>
              <Link to="/profile" className="block text-lg font-medium mb-2" onClick={toggleMenu}>
                Profile
              </Link>
              <button onClick={() => { handleLogout(); toggleMenu(); }} className="block text-lg font-medium mb-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="block text-lg font-medium mb-2" onClick={toggleMenu}>
                Sign Up
              </Link>
              <Link to="/login" className="block text-lg font-medium mb-2" onClick={toggleMenu}>
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
