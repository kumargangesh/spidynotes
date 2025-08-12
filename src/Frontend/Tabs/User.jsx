import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../Context/NoteContext';
import "./UserAuth.css";
import { useNavigate } from 'react-router-dom';

export default function User() {

    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { userEmail } = context;

    const [email, setEmail] = useState(userEmail);
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const forgetPassword = async () => {
        if (email === "") {
            setErrorMessage("enter email");
        } else if (password === "") {
            setErrorMessage("enter password");
        } else {
            const response = await fetch("https://spidynotes-backend.onrender.com/mern/auth/updatePassword", {
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
                    setPassword("");
                    navigate("/");
                }, 1500);
            } else {
                setErrorMessage(json.message);
            }
        }
    }

    return (
        <div className="userlogin">
            <h1 style={{ fontWeight: "bold" }}>SpidyNotes</h1>
            <div className='container'>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" aria-describedby="emailHelp" value={email} onChange={handleEmail} readOnly={
                        userEmail !== "" ?
                            true
                            :
                            false
                    } />
                </div>
                <div className="mb-3">
                    <div className="passandforgot d-flex justify-content-between">
                        <label for="exampleInputPassword1" className="form-label">New Password</label>
                    </div>
                    <input type="text" value={password} onChange={handlePassword} />
                </div>

                <p>{errorMessage}</p>

                <button className="btn btn-success" onClick={forgetPassword}>Forgot Password</button>

            </div>
        </div>
    )
}
