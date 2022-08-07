import React from "react"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/esm/Col";
import "bootstrap/dist/css/bootstrap.css"

export default function Posts() {

    const [posts, setPosts] = React.useState([])

    React.useEffect(function() {
        
        fetch("http://localhost:5000/api/pagePosts")
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [0])

    console.log(posts)

    const postElements = posts.map(post => (
        <Col
            xs={{ span: 10, offset: 1}} 
            sm={{ span: 8, offset: 2 }}
            // md={{ span: 7, offset: 3 }}
            >
                <Card>
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                        {post.text} by {post.author}
                        </Card.Text>
                        <Button variant="danger">{post.text}</Button>
                    </Card.Body>
                </Card>
            </Col>
    ))


    return (
        <>

        {postElements}
            
        </>
    )
}