// Import React elements

import React from "react"
import { Link } from "react-router-dom";


// Import React-Boostrap elements

import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/esm/Col";
import "bootstrap/dist/css/bootstrap.css";
import Stack from "react-bootstrap/esm/Stack";
import Spinner from 'react-bootstrap/Spinner';


//Import Font awesome elements

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'


//Import React components

import DeletePostBtn from "./DeletePost";
import { AuthContext } from "../context/AuthContext";
import Like from "./Like";


// This component is the main component of the page and displays the posts from the database through API call

export default function Posts() {


    const {refresh} = React.useContext(AuthContext) // the refresh state can be true or false => this does not impact the display, here refresh is used to trigger the UseEffect function when it's value changes
    const {authentication} = React.useContext(AuthContext) // this component handles the authentication + user auth data
    const [posts, setPosts] = React.useState([]) // an [] of posts
    const [isLoaded, setIsLoaded] = React.useState(false)
    

    

// The request options for the fecth call
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${authentication.token}`}
    }

   

// The API call that retrieves the posts data from the database
    React.useEffect( function() {  
        fetch("http://localhost:5000/api/pagePosts", requestOptions)
        .then ((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Something went wrong')
        })
        .then((response) => {
            setPosts(response)
            setIsLoaded(true)
        })
        .catch((error) => {console.log(error)})  
    }, [refresh]) // triggered when the refresh value changes

    

    
// A function that takes each post and renders it in a JSX component
    const postElements = posts.map(post => {
        return (
            <Col
            xs={{ span: 10, offset: 1}} 
            sm={{ span: 8, offset: 2 }}
            key={post._id}>
                <Card className="card" >
                    <Card.Header>
                    <Stack direction="horizontal" gap={3}>
                        <Card.Title>{post.title}</Card.Title>
                        {authentication.userId === post.author.id || authentication.isAdmin? <button className="bg-light border ms-auto"> <Link to = "/modify" state = {{title : post.title, text : post.text, id : post._id}}> <FontAwesomeIcon icon={faPenToSquare}/> </Link> </button> : ""}
                        <div className="vr" />
                        {authentication.userId === post.author.id || authentication.isAdmin? <DeletePostBtn id = {post._id}/> : ""}
                    </Stack>   
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {post.text}
                        </Card.Text>
                        <Card.Img variant="top" src={post.imageUrl} />
                        <div className="blockquote-footer">
                            Un message de <cite title="Source Title">{post.author.name}</cite>
                        </div>
                        <Like id = {post._id}/> {post.likes}
                    </Card.Body>
                </Card>
            </Col>

        )
    })


    return (
        <>  
            {isLoaded? <div className="page-margin">{postElements}</div> : <Spinner animation="border" variant="primary" />}
            <div className="parent"><button className="round"> <Link to ="/create"><FontAwesomeIcon icon={faPlus} inverse /></Link> </button></div> 
        </>
    )
}

