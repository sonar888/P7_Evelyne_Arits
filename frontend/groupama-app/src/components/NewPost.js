// Import React elements

import React from "react";
import {Link, useNavigate}  from 'react-router-dom'


// Import React-Boostrap elements

import "bootstrap/dist/css/bootstrap.css"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';


//Import React components

import { AuthContext } from "../context/AuthContext";


// The function that allows the user to create new posts: it displays the form for the user and has functions to handle and submit the form

export default function NewPost() {

    const {authentication} = React.useContext(AuthContext) // the data is used to authenticate the API call
    const {refresh, setRefresh} = React.useContext(AuthContext) // the state is used to refrest the GET call in the post components once the new post has been added
    const navigate = useNavigate()

  
// A state with the form data
    const [formData, setFormData] = React.useState({
        title: "",
        text: ""

    })


// This function watches the form input and updates the form data with every keystroke
    function handleChange(event) {
        const {type, value, name} = event.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name] : value
            }
        })
        console.log(formData)
    }


// The form data is used to fill the body of the API request
    const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authentication.token}`},
                body: JSON.stringify({ title : formData.title , text : formData.text }),
        
            };


//The function that sends the informationt o the API
    function handleSubmit(event) {
        event.preventDefault();

        fetch("http://localhost:5000/api/pagePosts", requestOptions)
        .then(res => {
            if (res.ok) {

              return res.json();
            }
            throw res;
          })
          .then (res => {
            setRefresh( prevData => !prevData)
            navigate('/Home')
            
          })
          .catch(error => {
            console.log(error)
            })
    }


// The form to fill in the post
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
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                placeholder="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Label>Text</Form.Label>                           
                        <InputGroup>                            
                            <Form.Control as="textarea" 
                                type="text"
                                placeholder="text"
                                name="text"
                                value={formData.text}
                                onChange={handleChange} aria-label="With textarea" />
                        </InputGroup>
                            
                        </Form.Group>
                        
                                           
                        <Button variant="secondary" onClick={handleSubmit}>Submit</Button>
                    </form>
                
                </Col>
            </Stack>
        </Container>
    )
}