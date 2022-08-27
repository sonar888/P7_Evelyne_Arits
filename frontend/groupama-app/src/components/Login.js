import React from "react"

import "bootstrap/dist/css/bootstrap.css"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import { AuthContext } from "../context/AuthContext";





export default function LoginForm() {

   const {authentication, setAuthentication} = React.useContext(AuthContext) 

    

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


   

    function handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:5000/api/auth/login", requestOptions)
        .then(res => {
            if (res.ok) {

              return res.json();
            }
            throw res;
          })
          .then (res => {
            setAuthentication({
                ...res,
                isAuthenticated: true
            })
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
                            <Form.Label>Email address</Form.Label>
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