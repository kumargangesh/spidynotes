import React from 'react';
import "./NouserFound.css";
import { Link } from 'react-router-dom';

export default function NouserFound() {
  return (
    <div className='notfound'>
      <h1>Oops!!!</h1>
      <h3>404 - No User Found</h3>
      <Link to="/"><button className="btn btn-success">Login/Signup</button></Link>
    </div>
  )
}
