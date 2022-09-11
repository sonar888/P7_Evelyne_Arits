import React from "react"

import "bootstrap/dist/css/bootstrap.css"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import { AuthContext } from "../context/AuthContext";
import setCookie from "../session/setCookie";
import removeCookie from "../session/removeCookie";
import getCookie from "../session/getCookie";
import {Link, useNavigate}  from 'react-router-dom'





export default function LoginForm() {

   const {authentication, setAuthentication} = React.useContext(AuthContext) 
   const {refresh, setRefresh} = React.useContext(AuthContext)
   const navigate = useNavigate()

    

    const [data, setData] = React.useState({
        email:"",
        password:""
    })


    function handleChange(event) {
        const {type, value, name} = event.target
        setData(prevData => {
            return {
                ...prevData,
                [name] : value
            }
        })
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email : data.email , password : data.password }),

    };

    const [error, setError] = React.useState({
        errorMessage : undefined,
        hasError  : false
    })


    // decode the logged in user
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  // loggedin user
  
   

    function handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:5000/api/auth/login", requestOptions)
        
          
          .then (response => {
            console.log (response)
            if (response.status === 200) {
                return response.json()
                    
            } else {
                console.log(response.status)
            }

            
          })
          .then (response => {
            console.log(response)
            removeCookie('Groupomania')

            setCookie('Groupomania', response.token)
            console.log(getCookie('Groupomania'))
            const role = parseJwt(response.token)
            console.log(role)

            if (role.userAdmin) {
                setAuthentication({
                    ...response,
                    isAuthenticated: true,
                    isAdmin: true
                })

            } else {
                setAuthentication({
                    ...response,
                    isAuthenticated: true,
                    isAdmin: false
                    
                })

            }

            
            setRefresh(prevRefresh => !prevRefresh)
            navigate('/Home')

            
          })
          .catch(error => {
            setError({
              hasError: true,
              errorMessage: error.message || error.statusText
            })})};


        
    
        
   
    return (
        <Container fluid>
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
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>password</Form.Label>
                            <Form.Control
                            type="password"
                            placeholder="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
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

// push url to login if no quthenticqted

// state of history.push?
// this.props.history.push(`?${url}`);
//  https://dev.to/gaels/an-alternative-to-handle-global-state-in-react-the-url--3753

// paragraphes: https://askcodez.com/comment-faire-pour-preserver-les-sauts-de-ligne-lors-de-lobtention-de-texte-a-partir-dun-textarea.html