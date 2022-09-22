// Import React elements

import React from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


// Importing the different components
import Header from "./components/Header"
import Login from "./components/Login"
import Posts from "./components/Posts"
import Signup from "./components/Signup"
import NewPost from "./components/NewPost"
import ModifyPost from "./components/ModifyPost"
import Footer from "./components/Footer"
import { AuthContext } from "./context/AuthContext"


//Importing boostrap framwork
import "bootstrap/dist/css/bootstrap.css"

//Importing CSS styling
import "./App.css"


export default function App() {


// Authentication of the user
  const {authentication, setAuthentication} = React.useContext(AuthContext)

 
  
  
  return (
    <div className="page">
    <Router>
      <Header />
      <Routes>
        <Route  exact path = "/" element={ authentication.isAuthenticated? <>  <Posts/></> : <Login/> }> </Route>  
        <Route  path = "/login" element={<Login/>}> </Route>
        <Route  path = "/signup" element={<Signup/>}> </Route>
        <Route  path = "/create" element={ authentication.isAuthenticated? <>  <NewPost/></> : <Login/> }> </Route>
        <Route path = "/modify" element = { authentication.isAuthenticated? <>  <ModifyPost/></> : <Login/> }></Route>
      </Routes>
      <Footer/>
    </Router> 
    </div>
  )  ;
}


