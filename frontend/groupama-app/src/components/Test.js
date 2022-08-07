import React from "react"

export default function Test() {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email : "evelyne.arits@gmail.com", password : "password" })
    };

    const [myUser, setMyUser] = React.useState({
        email:"",
        password:""
    })

    React.useEffect(() => {
        fetch("http://localhost:5000/api/auth/signup", requestOptions)
        .then(res => res.json())
        .then(data => setMyUser(data))
    }, [])


    return (
        <div>
            this is my user: {myUser.email}


        </div>
        
        
    )
}