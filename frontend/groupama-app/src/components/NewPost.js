import React from "react";

// import Popup from 'reactjs-popup';

export default function NewPostBtn() {
    const[isOpen, setIsOpen] = React.useState(false)
    const[btn, setBtn] = React.useState(true)

    const [formData, setFormData] = React.useState(
        {author: "",
        comments: ""
    
    }
    )

    function togglePopUp () {
        setIsOpen(!isOpen)
        setBtn(!btn)
    }


    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author : "auteur inconnu" , text : formData.comments }),

    };

    function submitPost(event) {
        event.preventDefault();
        fetch("http://localhost:5000/api/pagePosts", requestOptions)
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
        setIsOpen(!isOpen)
        setBtn(!btn)
        // fetch("http://localhost:5000/api/pagePosts", 
        // {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' }
    
        // }
        // )


        };
    
    
    return (

        <>

           
            <button onClick={togglePopUp}>{btn? "+" : "-"}</button>
            {isOpen && 
            <div className="popup-box">
                <div className="box">
                
                    <form>
                        <textarea 
                            value={formData.comments}
                            placeholder="Comments"
                            onChange={handleChange}
                            name="comments"
                        />
                        <button onClick={submitPost}>Send</button>
                    </form>                
                </div>
            </div> 
            }


        
        </>

        
    )
}