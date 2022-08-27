import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function ModifyPostBtn () {

    function handleModifyPost() {
        console.log("clicked")
    }

    return (
        <Button variant="danger" onClick={handleModifyPost}>Modify</Button>
    )
}