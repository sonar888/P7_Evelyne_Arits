// Import React elements

import React from "react";

//Import React components

import {Link, useNavigate, useLocation}  from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";


// Import React-Boostrap elements

import "bootstrap/dist/css/bootstrap.css"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';





export default function ModifyPost () { // The function that handles the modifying of posts


// This enables us to prefill the forms with the information from the post so that the user does not need to retype his whole post/title
    const location = useLocation()
    const { title , text, id } = location.state


    const {authentication} = React.useContext(AuthContext)
    const {refresh, setRefresh} = React.useContext(AuthContext)

// Is used to redirect the user once he has submitted the post    
    const navigate = useNavigate()

    //User form data
    const [form, setForm] = React.useState({
        title: title,
        text: text

    })

    // handles the submission of the file
    const [file, setFile] = React.useState()    
    

    //A function that listens to each keystroke to update the user input
    function handleChange(event) {
        const {type, value, name} = event.target
        setForm(prevData => {
            return {
                ...prevData,
                [name] : value
            }
        })
    }

    //A function that sets the file when it is updated
    function handleFile(event) {
        setFile(event.target.files[0])
    }


   
    // Sending the new data to the api
    function handleModifyPost(event) { 
        event.preventDefault();

        //Creating the header
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${authentication.token}`);

        //Creating the body with the file
        const formdata = new FormData();
        formdata.append("image", file);
        formdata.append("text", form.text);
        formdata.append("title", form.title);

        // Request options for the api call
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };

        fetch("http://localhost:5000/api/pagePosts/"+ id, requestOptions) // The call to modify the post with the new data
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            throw res;
          })
          .then (res => {
            setRefresh( prevData => !prevData)
            navigate('/')
            
          })
          .catch(error => {
            console.log(error)
            })
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
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="title"
                            name="title"
                            onChange={handleChange}
                            defaultValue={title}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Text</Form.Label>                           
                        <InputGroup>                            
                            <Form.Control as="textarea" 
                                type="text"
                                name="text"
                                onChange={handleChange} aria-label="With textarea" 
                                defaultValue={text}/>      
                        </InputGroup>     
                    </Form.Group>
                    <Form.Group className="mb-3" >
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleFile}
                            />
                        </Form.Group>              
                    <Button variant="secondary" onClick={handleModifyPost}>Submit</Button>
                </form>
            
            </Col>
        </Stack>
    </Container>
    )
}