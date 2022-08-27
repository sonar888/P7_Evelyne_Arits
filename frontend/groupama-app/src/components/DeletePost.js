import React from "react"

import Button from 'react-bootstrap/Button';

export default function DeletePostBtn (props) {

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    } 

    

    function handleDeletePost() {

        fetch("http://localhost:5000/api/pagePosts/"+props.id, requestOptions)
        .then(res => {
            if (res.ok) {

              return res.json();
            }
            throw res;
          })
          .then (res => {
            console.log(res)
          })
          .catch(error => {
            console.log(error)
            })


        

    }

    return (
        <Button variant="danger" onClick={handleDeletePost}>Delete</Button>
    )
}