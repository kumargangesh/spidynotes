import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Navbar';
import About from "./Tabs/About";
import Notes from "./Tabs/Notes";
import noteContext from './Context/NoteContext';
import Alert from './Tabs/NoteDesign/Alert';
import Login from './Tabs/Login';
import Signup from './Tabs/Signup';
import User from './Tabs/User';

export default function Routing() {

  const context = useContext(noteContext);
  const { alertMessage, toShow } = context;

  return (
    <BrowserRouter>
      <Navbar />
      {
        toShow === true ?
          <>
            <Alert message={alertMessage} />
          </>
          :
          <></>
      }
      <div className="container">
        <Routes>
          <Route  element={<Login />} path='/' />
          <Route element={<Notes />} path='/notes' />
          <Route element={<About />} path='/about' />
          <Route  element={<Signup />} path='/signup' />
          <Route element={<User />} path='/user' />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
