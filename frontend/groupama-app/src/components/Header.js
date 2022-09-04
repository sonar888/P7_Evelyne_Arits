// Import React elements

import React from "react"
import {Link}  from 'react-router-dom';


// Import React-Boostrap and css elements

import logo from "../logo/icon-left-font-monochrome-white.png"
import "bootstrap/dist/css/bootstrap.css"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


//Import React components

import { AuthContext } from "../context/AuthContext";
import removeCookie from "../session/removeCookie";


// This function displays the head but also changes based on the authentication of the user

export default function Header() {

  const {authentication, setAuthentication} = React.useContext(AuthContext)


  // The function that will log out the user when he clicks on the button
  function handleLogout() {
    removeCookie('Groupomania');
    setAuthentication({isAuthenticated : false})

  }


  // The header
  return (
   <Navbar bg="red" variant="dark">
    <Container>
      <Navbar.Brand>
        <img
          alt=""
          src={logo}
          width="170"
          height="100"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <div>

        {/* This dipslay the logout button when the user is logged in, or the option to login/signup */}
        {authentication.isAuthenticated? <button onClick={handleLogout}>Logout</button> : <> <Link to ="/login">Login</Link> <Link to ="/signup">Signup</Link> </>} 
      
      </div>
    </Container>
  </Navbar>
  );
}



// see https://github.com/marialena31/online-store-90mn/blob/main/src/components/App.js
//see https://github.com/marialena31/rest-countries-api/tree/master/src

