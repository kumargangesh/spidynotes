import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import noteContext from './Context/NoteContext';

export default function Navbar() {
    const conetxt = useContext(noteContext);
    const { userAuth, userEmail } = conetxt;
    const [isUser, toggleUser] = useState(false);

    useEffect(() => {
        if (userAuth !== "")
            toggleUser(true);
    });

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">SpidyNotes</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>

                        {
                            isUser === true ?
                                <Link to="/user"><button className='btn btn-success'>{((userEmail).charAt(0)).toUpperCase()}</button></Link>
                                :
                                <div className="d-flex" role="search">
                                    <Link className="btn btn-success mx-2" type="submit" to="/">Login</Link>
                                    <Link className="btn btn-success mx-1" type="submit" to="/signup" style={{
                                        marginLeft: "5%"
                                    }}>SignUp</Link>
                                </div>
                        }

                    </div>
                </div>
            </nav>



        </div>
    )
}
