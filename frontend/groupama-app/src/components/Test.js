import React from "react"
import Button from "./Button";

export default function Test() {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email : "evelyne@gmail.com", password : "12345" })
    };

    const [myUser, setMyUser] = React.useState({
        email:"",
        password:""
    })

    React.useEffect(() => {
        fetch("http://localhost:5000/api/auth/login", requestOptions)
        .then(res => res.json())
        .then(data => setMyUser(data))
    }, [])

    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    return (
        <div>
            this is my user: {myUser.userId}<br/>
            {isAuthenticated? <Button/> : "You need to authenticate"} <br/>
            error message: {myUser.message}


        </div>
        
        
    )
}