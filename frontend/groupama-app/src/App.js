import React from "react"
import Header from "./components/Header"
import Login from "./components/Login"
import Body from "./components/Body"
import Footer from "./components/Footer"
import Posts from "./components/Posts"
import Test from "./components/Test"
import Signin from "./components/Signin"

import "bootstrap/dist/css/bootstrap.css"
import Col from 'react-bootstrap/Col'
import "./App.css"



import { Link } from "react-router-dom";
import {Routes, Route} from "react-router-dom"

import { AuthContext } from "./context/AuthContext"




export default function App() {

  const {authentication} = React.useContext(AuthContext)
  
  return (
    <>
    <Header/>
    {authentication.isAuthenticated? <Posts/> : <Login/>}
    {/* <Posts/> */}
    </>
  )  ;
}


