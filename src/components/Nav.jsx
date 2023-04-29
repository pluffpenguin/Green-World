import React from "react";
import Logo from "../assets/logo.png";

function Nav({ setShowModal }) {
  return (
    <>
      <div className="container">
        <nav className="navbar">
          <figure className="logo__wrapper">
            <img src={Logo} className="logo" />
            <h1 className="logo__title">
              <span className="logo__title--green">Green</span> World
            </h1>
          </figure>
          <div className="navbar__right">
            <button onClick={() => setShowModal(true)} id="about">About</button>
          </div>
        </nav>  
      </div>
    </>
  );
}

export default Nav;
