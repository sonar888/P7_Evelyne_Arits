import React from "react";

export default function Test() {
    const [file, setFile] = React.useState()

    

    function handleChange(event) {
        console.log(event.target.files[0])
        setFile(event.target.files[0])
        
    }

    console.log(file)
    
    function handleSubmit(event) {



      event.preventDefault()

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzBhNTQ5NmQ3MGI4YWQ4ODEzZTBkNDQiLCJ1c2VyTmFtZSI6IkV2ZWx5bmUgQXJpdHMiLCJ1c2VyQWRtaW4iOnRydWUsImlhdCI6MTY2MzUwMzM5MywiZXhwIjoxNjYzNTg5NzkzfQ.RKsPR8B3MmZNCtnhFUsU0uHJXz22S97yyXrL0Pr8-60");


      
      var formdata = new FormData();
      formdata.append("image", file, "/C:/Users/Evelyne/Pictures/Saved Pictures/moutarde.jpg");
      formdata.append("text", "to update ");
      formdata.append("title", "the api title");
      

      // console.log(formData.file)
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://localhost:5000/api/pagePosts", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }  
  
    return (
      <div className="App">
          <form >
            <h1>React File Upload</h1>
            <input type="file" onChange={handleChange}/>
            <button type="submit" onClick={handleSubmit}>Upload</button>
          </form>
      </div>
    );
  
}


// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzBhNTQ5NmQ3MGI4YWQ4ODEzZTBkNDQiLCJ1c2VyTmFtZSI6IkV2ZWx5bmUgQXJpdHMiLCJ1c2VyQWRtaW4iOnRydWUsImlhdCI6MTY2MzUwMzM5MywiZXhwIjoxNjYzNTg5NzkzfQ.RKsPR8B3MmZNCtnhFUsU0uHJXz22S97yyXrL0Pr8-60");

// var formdata = new FormData();
// formdata.append("image", fileInput.files[0], "/C:/Users/Evelyne/Pictures/Saved Pictures/moutarde.jpg");
// formdata.append("text", "to update ");
// formdata.append("title", "the api title");

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: formdata,
//   redirect: 'follow'
// };

// fetch("http://localhost:5000/api/pagePosts", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));