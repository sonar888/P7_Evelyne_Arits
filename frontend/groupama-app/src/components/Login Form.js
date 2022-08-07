import React from "react"


import "bootstrap/dist/css/bootstrap.css"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';




export default function LoginForm() {

    const [loginData, setLoginData] = React.useState({
        email:"",
        password:""
    })

    console.log(loginData)

    function handleChange(event) {
        const {type, value, name} = event.target
        setLoginData(prevData => {
            return {
                ...prevData,
                [name] : value
            }
        })
    }

    function handleSubmit(loginData) {
        console.log("Form submitted", loginData)
    }
    return (
        <Container fluid>
            <Stack gap={3}>
                <Col
                xs={{ span: 12}} 
                sm={{ span: 8, offset: 2 }}
                md={{ span: 6, offset: 3 }}

                
                >
                    <form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email"
                                name="email"
                                value={loginData.email}
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
                            value={loginData.password}
                            onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>                    
                        <Button variant="secondary">Login</Button>
                    </form>
                
                </Col>
            </Stack>
            
            
            
            



        </Container>
    )
}