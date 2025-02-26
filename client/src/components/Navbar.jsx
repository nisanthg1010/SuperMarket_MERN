import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // When a nav link is clicked, close the mobile menu.
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
        <img 
            style={{
              width: '70px',
              height: '70px',
              objectFit: 'contain', 
              borderRadius: '10px', 
            }} 
            src='/images/logo.png' 
            alt="Food 1" 
          />
        </Link>
        <nav className={`navbar__menu ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={closeMenu}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={closeMenu}>
                Cart
              </Link>
            </li>
            <li>
              <Link to="/admin" onClick={closeMenu}>
                Admin
              </Link>
            </li>
            {isSignedIn && user ? (
              <>
                <li>
                  <Link to="/profile" onClick={closeMenu}>
                    Profile
                  </Link>
                </li>
                <li>
                  <SignOutButton
                    afterSignOutUrl="/auth"
                    onSignOut={() => localStorage.removeItem('cart')}
                  >
                    <button className="navbar__signout" onClick={closeMenu}>
                      Sign Out
                    </button>
                  </SignOutButton>
                </li>
              </>
            ) : (
              <li>
                <Link to="/auth" onClick={closeMenu}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="navbar__toggle" onClick={toggleMenu}>
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
