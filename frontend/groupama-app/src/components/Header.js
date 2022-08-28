import React, { useContext } from "react"
import logo from "../logo/icon-left-font-monochrome-white.png"
import {Link}  from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.css"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


import { AuthContext } from "../context/AuthContext";

export default function Header() {

  const {authentication} = React.useContext(AuthContext)

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
        {authentication.isAuthenticated? <button>Logout</button> : <Link to ="/login">Login</Link>}
        {/*  
        <a href ="">Sign-up</a> */}
      </div>
    </Container>
  </Navbar>
  );
}

// importer le composant login
// ajouter le composant login dans le composant link 
// utilisation de components link 
// router switch index.js + private route

// see https://github.com/marialena31/online-store-90mn/blob/main/src/components/App.js
//see https://github.com/marialena31/rest-countries-api/tree/master/src

