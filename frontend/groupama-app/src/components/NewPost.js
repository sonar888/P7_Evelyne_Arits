import React from "react";

import "bootstrap/dist/css/bootstrap.css"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import InputGroup from 'react-bootstrap/InputGroup';


import {Link, useNavigate}  from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";



// import Popup from 'reactjs-popup';

// export default function NewPostBtn() {
//     const[isOpen, setIsOpen] = React.useState(false)
//     const[btn, setBtn] = React.useState(true)

//     const [formData, setFormData] = React.useState(
//         {author: "",
//         comments: ""
    
//     }
//     )

//     function togglePopUp () {
//         setIsOpen(!isOpen)
//         setBtn(!btn)
//     }


//     function handleChange(event) {
//         setFormData(prevFormData => {
//             return {
//                 ...prevFormData,
//                 [event.target.name]: event.target.value
//             }
//         })
//     }


//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ author : "auteur inconnu" , text : formData.comments }),

//     };

//     function submitPost(event) {
//         event.preventDefault();
//         fetch("http://localhost:5000/api/pagePosts", requestOptions)
//         .then(res => {
//             if (res.ok) {

//               return res.json();
//             }
//             throw res;
//           })
//           .then (res => {
//             console.log(res)
//           })
//           .catch(error => {
//             console.log(error)
//             })
//         setIsOpen(!isOpen)
//         setBtn(!btn)
//         // fetch("http://localhost:5000/api/pagePosts", 
//         // {
//         //     method: 'GET',
//         //     headers: { 'Content-Type': 'application/json' }
    
//         // }
//         // )


//         };
    
    
//     return (

//         <>

           
//             <button onClick={togglePopUp}>{btn? "+" : "-"}</button>
//             {isOpen && 
//             <div className="popup-box">
//                 <div className="box">
                
//                     <form>
//                         <textarea 
//                             value={formData.comments}
//                             placeholder="Comments"
//                             onChange={handleChange}
//                             name="comments"
//                         />
//                         <button onClick={submitPost}>Send</button>
//                     </form>                
//                 </div>
//             </div> 
//             }


        
//         </>

        
//     )
// }

export default function NewPost() {

    const {authentication} = React.useContext(AuthContext)
    const {refresh, setRefresh} = React.useContext(AuthContext)
    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        title: "",
        text: ""

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
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authentication.token}`},
                body: JSON.stringify({ title : formData.title , text : formData.text }),
        
            };

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