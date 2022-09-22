// Import React elements

import React from "react"


// Import React-Boostrap elements

import "bootstrap/dist/css/bootstrap.css"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';


//Import React components

import { AuthContext } from "../context/AuthContext";
import setCookie from "../session/setCookie";
import removeCookie from "../session/removeCookie";
import getCookie from "../session/getCookie";
import {Link, useNavigate}  from 'react-router-dom'





export default function LoginForm() { // the form to handle the login of the user

   const {authentication, setAuthentication} = React.useContext(AuthContext) // he user's authentication data
   const {refresh, setRefresh} = React.useContext(AuthContext) // // the refresh state can be true or false => this does not impact the display, here refresh is used to trigger the UseEffect function when it's value changes
   const navigate = useNavigate() // the component that allows us to navigate to the home page after login
   

   //A state to handle the error
   const [error, setError] = React.useState({
    errorMessage : undefined,
    hasError  : false
    })

    // A state to handle the input data from the user
    const [data, setData] = React.useState({
        email: undefined ,
        password: undefined
    })

    //A function that listens to each keystroke to update the user input
    function handleChange(event) {
        const {type, value, name} = event.target
        setData(prevData => {
            return {
                ...prevData,
                [name] : value
            }
        })
    }

    //Fetch options for the API call
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email : data.email , password : data.password }),

    };

    


    // A function to decode the login token in the cookies once created
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  
  
   
// The function that handles the submission of the login form
    function handleSubmit(event) {
        event.preventDefault();
            fetch("http://localhost:5000/api/auth/login", requestOptions) // request to API
            .then ((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(`Something went wrong ${response.status} ${response.statusText}`) //Setting the error
            })
            .then (response => {
                removeCookie('Groupomania') //updating the cookie
                setCookie('Groupomania', response.token)
                const role = parseJwt(response.token) // retrieving the role from the token
    
                if (role.userAdmin) {
                    setAuthentication({
                        ...response,
                        isAuthenticated: true,
                        isAdmin: true // setting the admin role and user authentication
                    }) 
    
                } else {
                    setAuthentication({
                        ...response,
                        isAuthenticated: true,
                        isAdmin: false 
                    })
                }
                setRefresh(prevRefresh => !prevRefresh) // Loading the post page
                navigate('/') // navigating to the post page  
            })
            .catch(error => {
                setError({
                hasError: true,
                errorMessage: error.message || error.statusText // handling the error
                })})
    };
   
    return (
        <Container fluid className="form">
            <Stack gap={3}>
                <Col
                xs={{ span: 12}} 
                sm={{ span: 8, offset: 2 }}
                md={{ span: 6, offset: 3 }}
                >
                    <form >
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                
                                type="email"
                                placeholder="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            type="password"
                            placeholder="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            />

                        </Form.Group>                    
                        <Button variant="secondary" onClick={handleSubmit}>Login</Button>
                    </form>

                    {error.hasError && (
              <span className="form-error">{error.errorMessage}</span>
            )}
                
                </Col>
            </Stack>
        </Container>
    )
}

