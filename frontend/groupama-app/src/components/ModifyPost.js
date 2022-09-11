import React from "react";
import {Link, useNavigate, useLocation}  from 'react-router-dom'


import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.css"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';


import { AuthContext } from "../context/AuthContext";



export default function ModifyPost () {


// This enables us to prefill the forms with the information from the post so that the user does not need to retype his whole post/title
    const location = useLocation()
    const { title , text, id } = location.state


    const {authentication} = React.useContext(AuthContext)
    const {refresh, setRefresh} = React.useContext(AuthContext)

// Is used to redirect the user once he has submitted the post    
    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        title: title,
        text: text

    })
    
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


    const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authentication.token}`},
                body: JSON.stringify({ title : formData.title , text : formData.text }),
        
            };

    function handleModifyPost(event) {
        event.preventDefault();

        fetch("http://localhost:5000/api/pagePosts/" + id, requestOptions)
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
                    
                                       
                    <Button variant="secondary" onClick={handleModifyPost}>Submit</Button>
                </form>
            
            </Col>
        </Stack>
    </Container>
    )
}