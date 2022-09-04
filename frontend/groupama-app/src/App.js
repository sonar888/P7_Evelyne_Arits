import React from "react"
import Header from "./components/Header"
import Login from "./components/Login"
import Footer from "./components/Footer"
import Posts from "./components/Posts"
import Signup from "./components/Signup"
import getCookie from "./session/getCookie"

import "bootstrap/dist/css/bootstrap.css"
import Col from 'react-bootstrap/Col'
import "./App.css"



import { Link } from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import { AuthContext } from "./context/AuthContext"
import NewPost from "./components/NewPost"
import ModifyPost from "./components/ModifyPost"




export default function App() {

  const {authentication, setAuthentication} = React.useContext(AuthContext)

  // React.useEffect(function() {
  //   if (typeof getCookie('Gourpomania') !== undefined) {
  //     setAuthentication(authentication.isAuthenticated: true)
  //   }
  // }, [0])
 
  
  
  return (
    <>
   
    <Router>
      <Header />
      <Routes>
        <Route  path = "/home" element={ authentication.isAuthenticated? <>  <Posts/></> : <Login/> }> </Route>  
        <Route  path = "/login" element={<Login/>}> </Route>
        <Route  path = "/signup" element={<Signup/>}> </Route>
        <Route  path = "/create" element={<NewPost/>}> </Route>
        <Route path = "/modify" element = {<ModifyPost/>}></Route>
      </Routes>
    </Router> 
      
      
      
      
      
      
  
        
        
  
    {/* <Posts/> */}


    
    
    
    </>
  )  ;
}


