// Import React elements

import React from "react"

// Import React-Boostrap elements

import CloseButton from 'react-bootstrap/CloseButton';


//Import React components

import { AuthContext } from "../context/AuthContext";


// This function will handle the deletion of the post when the button is clicked
export default function DeletePostBtn (props) { //We get the post id sent through the post

  const {authentication} = React.useContext(AuthContext) //the auth context to authenticate the call
  const {refresh, setRefresh} = React.useContext(AuthContext) // the refresh element to refresh the psot page after deleteion

  const requestOptions = { // API request options
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${authentication.token}`}

    }

    function handleDeletePost() { // The API call to delete the post and handle the error

        fetch("http://localhost:5000/api/pagePosts/"+props.id, requestOptions)
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            throw res;
          })
          .then (res => {
            console.log(res)
            setRefresh (prevData => !prevData)
          })
          .catch(error => {
            console.log(error)
            })
    }
    return (
      <CloseButton onClick={handleDeletePost}/>
    )
}