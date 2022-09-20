// Import React elements

import React from "react"
import {Link}  from 'react-router-dom';


// Import React-Boostrap and css elements

import logo from "../logo/icon-left-font-monochrome-white.png"
import Button from 'react-bootstrap/Button';
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

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  const user = parseJwt(authentication.token)
  


  // The Navbar

  return (

    <Navbar bg="red">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={logo}
          width="150"
          height="60"
          className="d-inline-block align-top"
        />{' '}
        
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {authentication.isAuthenticated? <p> Signed in as: {user.userName}</p> : ''}
            {authentication.isAuthenticated?  <Button variant="secondary" size="sm" onClick={handleLogout}>Logout </Button> : <> <Link to ="/login">Login</Link> <Link to ="/signup">Signup</Link> </>}
          </Navbar.Text>
        </Navbar.Collapse>
    </Container>
  </Navbar>


   

        // {/* This dipslay the logout button when the user is logged in, or the option to login/signup */}
        // {authentication.isAuthenticated? <button onClick={handleLogout}>Logout</button> : <> <Link to ="/login">Login</Link> <Link to ="/signup">Signup</Link> </>} 
      

 
  );
}



// see https://github.com/marialena31/online-store-90mn/blob/main/src/components/App.js
//see https://github.com/marialena31/rest-countries-api/tree/master/src

