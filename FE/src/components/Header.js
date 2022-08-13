import React from "react";
import "@fontsource/poppins";
import './Header.css'


function Header() {
  return (
    <header>
      <h1>
        <img className="Opensea-logo" src="https://nftwolf.io/wp-content/uploads/2021/09/opensea-logo.png"></img>
      </h1>
      <nav>
        <ul>
          <li>
            <a href="/">Explore</a>
          </li>
          <li>
            <a href="/create">Create</a>
          </li>
          <li>
            <a href="/my-collections">My Collections</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;