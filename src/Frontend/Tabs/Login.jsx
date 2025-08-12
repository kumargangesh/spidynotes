import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../Context/NoteContext';
import validator from "validator";
import "./UserAuth.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { setUserAuth, setUserEmail } = context;

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const loginUser = async () => {
    if (email === "" && password === "") {
      setErrorMessage("enter email and password");
    } else if (email === "") {
      setErrorMessage("enter email");
    } else if (password === "") {
      setErrorMessage("enter password");
    } else {
      if (!validator.isEmail(email)) {
        setErrorMessage("enter a valid email");
      } else if (password.length < 5) {
        setErrorMessage("enter password bigger than 5 characters");
      } else {
        setErrorMessage("");
        const response = await fetch("https://spidynotes-backend.onrender.com/mern/auth/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
          setErrorMessage(json.message);
          setTimeout(() => {
            navigate("/about");
            setUserAuth(json.authToken);
            setUserEmail(email);
          }, 1500);
        } else {
          setErrorMessage(json.message);
        }
      }
    }
  }

  return (
    <div className="userlogin">
      <h1 style={{ fontWeight: "bold" }}>Sign in to SpidyNotes</h1>
      <div className='container'>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" aria-describedby="emailHelp" value={email} onChange={handleEmail} />
        </div>
        <div className="mb-3">
          <div className="passandforgot d-flex justify-content-between">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <label style={{
              color: "#4493F8",
              cursor : "pointer"
            }} htmlFor="exampleInputPassword1" className="form-label" onClick={() => {
              navigate("/user");
            }} >Forgot Password ?</label>
          </div>
          <input type="text" value={password} onChange={handlePassword} />
        </div>

        <p>{errorMessage}</p>

        <button type="submit" className="btn btn-success" onClick={loginUser}>Login</button>

        <center><a href="/signup">Create an account</a></center>

      </div>
    </div>
  )
}
