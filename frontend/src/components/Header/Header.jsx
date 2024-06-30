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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"   className="w-6 h-6"/>
</svg>

          <span className="ml-2 text-lg font-semibold">FinAlign</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {token ? (
            <>
              <Link to="/profile" className="text-white hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </Link>
              <Link to='/stocks' className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
             </svg>
              </Link>
              <Link to='/analytics' className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
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
          {token ? (
            <>
              <Link
                to="/profile"
                className="block text-white hover:text-gray-300 mb-2"
                onClick={toggleMenu}
              >
               Profile
              </Link>
              <Link to='/stocks'
               className="block text-white hover:text-gray-300 mb-2"
               onClick={toggleMenu}> Stocks
              </Link>
              <Link to='/analytics'
               className="block text-white hover:text-gray-300 mb-2"
               onClick={toggleMenu}> Analytics
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
