import React from "react"
import logo from "../logo/icon-left-font-monochrome-white.png"
import "bootstrap/dist/css/bootstrap.css"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
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
        <a href ="">Login</a> 
        <a href ="">Sign-up</a>
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

