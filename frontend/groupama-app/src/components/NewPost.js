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

const [file, setFile] = React.useState();
const [form, setForm] = React.useState({
    title: "",
    text: ""
})


// This function watches the form input and updates the form data with every keystroke
    function handleChange(event) {
        // const file = event.target.files[0]
        const {type, value, name} = event.target
        setForm(prevData => {
            return {
                ...prevData,
                
                [name] : value,
                
            }
        })
       
        
        // console.log(files[0].name)
    }

    function handleFile(event) {
        setFile(event.target.files[0])
    }





//The function that sends the informationt o the API
    function handleSubmit(event) {
        event.preventDefault();


        const myHeaders = new Headers();
        // ("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${authentication.token}`);

        const formdata = new FormData();
        formdata.append("image", file);
        formdata.append("text", form.text);
        formdata.append("title", form.title);

        console.log(formdata.file)

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };

        fetch("http://localhost:5000/api/pagePosts", requestOptions)
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
                                value={form.title}
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
                                    value={form.text}
                                    onChange={handleChange} aria-label="With textarea" />
                            </InputGroup>            
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="file"
                                // value={file}
                                onChange={handleFile}
                            />
                        </Form.Group>
                        
                                           
                        <Button variant="secondary" onClick={handleSubmit}>Submit</Button>
                    </form>
                
                </Col>
            </Stack>
        </Container>
    )
}