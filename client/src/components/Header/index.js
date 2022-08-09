import React from 'react';
import "./header.css";
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 flex-row align-center" style={{maxHeight: "100px"}}>
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Lowki</h1>
          </Link>
          <p className="m-0">You say it, we post it.</p>
        </div>
        <div className='d-flex flex-row'>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2 d-flex flex-row" to="/me">
              <div className='mr-3 circular--landscape'>
                <img className='rounded-circle shadow-4' src={Auth.getProfile().data.profilePic}/>
              </div>
                {Auth.getProfile().data.username}'s profile  
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
