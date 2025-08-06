import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import noteContext from './Context/NoteContext';

export default function Navbar() {

    const [path, setPath] = useState("");
    const conetxt = useContext(noteContext);
    const { userAuth, userEmail } = conetxt;
    const [isUser, toggleUser] = useState(false);

    useEffect(() => {
        if (userAuth !== "")
            toggleUser(true);
    });

    let location = useLocation();
    useEffect(() => {
        setPath(location.pathname);
    });

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">iNoteBook</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/notes' ? "active" : ""}`} aria-current="page" to="/notes">Notes</Link>
                            </li>
                        </ul>

                        {
                            isUser === true ?
                                <button className='btn btn-warning'>{((userEmail).charAt(0)).toUpperCase()}</button>
                            :
                                <div className="d-flex" role="search">
                                    <Link className="btn btn-warning mx-2" type="submit" to="/">Login</Link>
                                    <Link className="btn btn-warning mx-1" type="submit" to="/signup" style={{
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
