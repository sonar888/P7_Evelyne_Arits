import React from "react"

import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import CloseButton from 'react-bootstrap/CloseButton';



import { AuthContext } from "../context/AuthContext";

export default function DeletePostBtn (props) {

  const {authentication} = React.useContext(AuthContext)
  const {refresh, setRefresh} = React.useContext(AuthContext)

  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${authentication.token}`}

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