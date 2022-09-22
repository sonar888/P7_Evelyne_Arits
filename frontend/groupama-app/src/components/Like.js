// Import React elements
import React from "react";


//Import React components

import { AuthContext } from "../context/AuthContext";


//Import Font awesome elements

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'


export default function Like (props) { //This function handles the click of the like button

    const {refresh, setRefresh} = React.useContext(AuthContext) // the refresh state can be true or false => this does not impact the display, here refresh is used to trigger the UseEffect function when it's value changes
    const {authentication} = React.useContext(AuthContext) // this boolean handles the authentication 


    // The request options for the fecth call
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${authentication.token}`}
    }

    function likePost () {
        fetch("http://localhost:5000/api/pagePosts/" +props.id + "/like", requestOptions) //We call the API onClick of the button
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
        <FontAwesomeIcon icon={faThumbsUp} onClick={likePost}/>
    )
}