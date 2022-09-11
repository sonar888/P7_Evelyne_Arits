import React from "react";
import Button from 'react-bootstrap/Button';

import { AuthContext } from "../context/AuthContext";


export default function Like (props) {

    const {refresh, setRefresh} = React.useContext(AuthContext) // the refresh state can be true or false => this does not impact the display, here refresh is used to trigger the UseEffect function when it's value changes
    const {authentication} = React.useContext(AuthContext) // this boolean handles the authentication 

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${authentication.token}`}
    }

    function likePost () {
        fetch("http://localhost:5000/api/pagePosts/" +props.id + "/like", requestOptions)
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
        <Button onClick={likePost}>Like</Button>
    )
}