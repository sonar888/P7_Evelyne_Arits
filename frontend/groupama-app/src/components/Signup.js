// Import React elements

import React from "react";

// Import React-Boostrap and css elements

import "bootstrap/dist/css/bootstrap.css"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';


// The signup function

// Handles the form and then sends the information to the API to create a new user
export default function Signup() {


// A state with the form data
    const [signupData, setSignupData] = React.useState({
        firstName: "",
        lastName:"",
        email: "",
        password :""
    })

// This function watches the form input and updates the form data with every keystroke
    function handleChange(event){
        const {name, type, value} = event.target

        setSignupData( prevData => {
            return {
                ...prevData,
                [name]: value

            }
        }) 
    }


// The form data is used to fill the body of the API request
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName:signupData.firstName, lastName: signupData.lastName, email : signupData.email , password : signupData.password })
    };


//The function that sends the informationt to the API
    function handleSubmit(event) {
        event.preventDefault()
        console.log("Form submitted", requestOptions.body)
        fetch("http://localhost:5000/api/auth/signup", requestOptions)
            .then(res => res.json())
            .then(data => setSignupData(data))

    }

 
// The form for signup
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
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="firstName"
                                placeholder="First Name"
                                name="firstName"
                                value={signupData.firstName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="lastName"
                                placeholder="Last Name"
                                name="lastName"
                                value={signupData.lastName}
                                onChange={handleChange}
                            />
                            
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email"
                                name="email"
                                value={signupData.email}
                                onChange={handleChange}
                            />
                            
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            type="password"
                            placeholder="password"
                            name="password"
                            value={signupData.password}
                            onChange={handleChange}
                            />
                            
                        </Form.Group> 

                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                                           
                        <Button variant="secondary" onClick={handleSubmit}>Signup</Button>
                    </form>
                
                </Col>
            </Stack>
        </Container>
    )
}