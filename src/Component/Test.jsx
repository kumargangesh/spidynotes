import React, { useState } from 'react'

export default function Test() {

    const [btext, changeBText] = useState("HIDE");
    const [display, changeDisplay] = useState("HIDE");

    const showHide =() => {
        if(btext === "SHOW"){
            changeBText("HIDE");
            changeDisplay("block");
        }
        else{
            changeBText("SHOW");
            changeDisplay("none");
        }
    }

  return (
    <div>
      <center><h1>Click to hide</h1></center>
      <div className="data" style={{
        border : "1px solid black",
        width : "50%",
        padding : "3%",
        display : display
      }}>
        <input type="text" style={{
            width : "90%"
        }} />
        <input type="text" style={{
            width : "90%"
        }} />
        <input type="text" style={{
            width : "90%"
        }} />
        <input type="text" style={{
            width : "90%"
        }} />
      </div>
      <button onClick={showHide}>{btext}</button>
    </div>
  )
}
