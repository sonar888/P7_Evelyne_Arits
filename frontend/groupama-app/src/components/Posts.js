import React from "react"
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/esm/Col";
import "bootstrap/dist/css/bootstrap.css";

import NewPostBtn from "./NewPost";
import ModifyPostBtn from "./ModifyPost";
import DeletePostBtn from "./DeletePost";

import { AuthContext } from "../context/AuthContext";

export default function Posts() {


    const {refresh} = React.useContext(AuthContext)
    const {authentication} = React.useContext(AuthContext)
    const [posts, setPosts] = React.useState([])
    const [tokenId, setTokenID ] = React.useState()
    // const [postElements, setPostElements] = React.useState()

    


    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${authentication.token}`}

        }

   
  console.log(authentication.token)

    React.useEffect( function() {  
        
        fetch("http://localhost:5000/api/pagePosts", requestOptions)
        .then (res => res.json())
        .then (res => setPosts(res))
        
                
        

        console.log("rendered")
    }, [refresh])



    

    const postElements = posts.map(post => {
        return (

            <Col
            xs={{ span: 10, offset: 1}} 
            sm={{ span: 8, offset: 2 }}
            // md={{ span: 7, offset: 3 }}
            key={post._id}>
                <Card  >
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>
                        {post.text} by {post.author.name}
                        </Card.Text>
                        <ModifyPostBtn />
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


 // React.useEffect ( () => {
    //     setTokenID (authentication.token)
    // }, [0]) 
    // console.log(authentication, tokenId)

  // var myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json")
    //   myHeaders.append("Authorization", "Bearer " + token)


    // add a loading to wait for API response (if/else) and return when loaded
    // use quantity see screenshot as prop to re-render the page

