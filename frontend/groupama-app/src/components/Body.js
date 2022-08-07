import React from "react"

export default function Body() {

    const [count, setCount] = React.useState(0)

    function addCount(){
        setCount( prevCount => {
           return (
                prevCount + 1
            )
        })
    }

    function removeCount () {
        setCount( prevCount => {
            return (
                 prevCount - 1
             )
         })
    }

    const [isWhite, setIsWHite] = React.useState(true)

    function turnColor (){
        setIsWHite(prevColor => {
            return (
                !prevColor
            )
        })
    }


    const [myColor, setMyColor] = React.useState("red")

    const overTheRainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]

    function changeColor () {
        let i = Math.floor(Math.random() * 7)
        setMyColor(overTheRainbow[i])
        console.log(myColor, i)
        
    }

    




  return (
    <main>
        <div>
            <button onClick={addCount}>click to count</button>
            <div className="counter"> {count} </div>
            <button onClick={removeCount}>click to -</button>

        </div>

        <div>
            <button onClick={turnColor}>change color white/black</button>
            <div className={isWhite ? "white":"black"}></div>
        </div>

        <div>
            <h3>Rainbow!</h3>
            <button onClick={changeColor}>Random color</button>
            <div className={myColor}></div>
        </div>


        
       
        


    </main>
  );
}