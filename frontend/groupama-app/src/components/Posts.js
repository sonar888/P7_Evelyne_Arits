// Import React elements

import React from "react"
import { Link } from "react-router-dom";


// Import React-Boostrap elements

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/esm/Col";
import "bootstrap/dist/css/bootstrap.css";


//Import React components

import DeletePostBtn from "./DeletePost";
import { AuthContext } from "../context/AuthContext";


// This component is the main component of the page and displays the posts from the database through API call

export default function Posts() {


    const {refresh} = React.useContext(AuthContext) // the refresh state can be true or false => this does not impact the display, here refresh is used to trigger the UseEffect function when it's value changes
    const {authentication} = React.useContext(AuthContext) // this boolean handles the authentication 
    const [posts, setPosts] = React.useState([]) // an [] of posts
    const [tokenId, setTokenID ] = React.useState()
    

    

// The request options for the fecth call
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${authentication.token}`}
    }

   

// The API call that retrieves the posts data from the database
    React.useEffect( function() {  
        
        fetch("http://localhost:5000/api/pagePosts", requestOptions)
        .then (res => res.json()) //gestion des paragraphes ?
        .then (res => setPosts(res))
    }, [refresh]) // triggered when the refresh value changes



    
// A function that takes each post and renders it in a JSX component
    const postElements = posts.map(post => {
        return (

            <Col
            xs={{ span: 10, offset: 1}} 
            sm={{ span: 8, offset: 2 }}
            key={post._id}>
                <Card  >
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>
                        {post.text} by {post.author.name}
                        </Card.Text>
                        <Button  variant="danger"> <Link to = "/modify" state = {{title : post.title, text : post.text, id : post._id}}> Modify </Link> </Button>
                        <DeletePostBtn id = {post._id}/>
                    </Card.Body>
                </Card>
            </Col>

        )
    }
        
    )


    return (
        <>  
            {postElements} 
            <button > <Link to ="/create">+</Link> </button> 

        </>
    )
}


//Personnal notes, please ignore for now

    // add a loading to wait for API response (if/else) and return when loaded
    // use quantity see screenshot as prop to re-render the page

