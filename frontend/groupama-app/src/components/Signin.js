import React from "react";

import "bootstrap/dist/css/bootstrap.css"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';



export default function Signin() {

    const [signinData, setSigninData] = React.useState({
        firstName: "",
        lastName:"",
        email: "",
        password :""
    })

    console.log(signinData)

    function handleChange(event){
        const {name, type, value} = event.target

        setSigninData( prevData => {
            return {
                ...prevData,
                [name]: value

            }
        }) 
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName:signinData.firstName, lastName: signinData.lastName, email : signinData.email , password : signinData.password })
    };


    function handleSubmit(event) {
        event.preventDefault()
        console.log("Form submitted", requestOptions.body)
        fetch("http://localhost:5000/api/auth/signup", requestOptions)
            .then(res => res.json())
            .then(data => setSigninData(data))

    }

    
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
                                value={signinData.firstName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="lastName"
                                placeholder="Last Name"
                                name="lastName"
                                value={signinData.lastName}
                                onChange={handleChange}
                            />
                            
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email"
                                name="email"
                                value={signinData.email}
                                onChange={handleChange}
                            />
                            
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                            type="password"
                            placeholder="password"
                            name="password"
                            value={signinData.password}
                            onChange={handleChange}
                            />
                            
                        </Form.Group> 

                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                                           
                        <Button variant="secondary" onClick={handleSubmit}>Signin</Button>
                    </form>
                
                </Col>
            </Stack>
        </Container>
    )
}