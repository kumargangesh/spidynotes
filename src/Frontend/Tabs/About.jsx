import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../Context/NoteContext';
import NoteItem from './NoteDesign/NoteItem';
import "./NoteStyle.css";
import { Link } from "react-router-dom";

export default function About() {

  const context = useContext(noteContext);

  const { notes, fetchAllNotes, addNote, updateNote, setAlertMessage, toggleToShow, userAuth, impNotes } = context;

  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDesc, setNewNoteDesc] = useState("");
  const [errorMessage, changeErrorMessage] = useState("");

  const [enewNoteTitle, esetNewNoteTitle] = useState("");
  const [enewNoteDesc, esetNewNoteDesc] = useState("");
  const [eerrorMessage, changeeErrorMessage] = useState("");

  const [noteToUpdate, changeNoteToUpdate] = useState();

  const [isUser, toggleIsUser] = useState(false);

  const [newNoteDisplay, toggleNewNoteDisplay] = useState("block");
  const [impNoteDisplay, toggleImpNoteDisplay] = useState("block");
  const [allNoteDisplay, toggleAllNoteDisplay] = useState("block");

  const [newNoteArrow, toggleNewNoteArrow] = useState("fa-solid fa-angle-up");
  const [impNoteArrow, toggleImpNoteArrow] = useState("fa-solid fa-angle-up");
  const [allNoteArrow, toggleAllNoteArrow] = useState("fa-solid fa-angle-up");

  const handleNewNoteArrow = () => {
    if (newNoteArrow === "fa-solid fa-angle-down") {
      toggleNewNoteDisplay("block");
      toggleNewNoteArrow("fa-solid fa-angle-up");
    } else {
      toggleNewNoteDisplay("none");
      toggleNewNoteArrow("fa-solid fa-angle-down");
    }
  }

  const handleImpNoteArrow = () => {
    if (impNoteArrow === "fa-solid fa-angle-down") {
      toggleImpNoteDisplay("block");
      toggleImpNoteArrow("fa-solid fa-angle-up");
    } else {
      toggleImpNoteDisplay("none");
      toggleImpNoteArrow("fa-solid fa-angle-down");
    }
  }

  const handleAllNoteArrow = () => {
    if (allNoteArrow === "fa-solid fa-angle-down") {
      toggleAllNoteDisplay("block");
      toggleAllNoteArrow("fa-solid fa-angle-up");
    } else {
      toggleAllNoteDisplay("none");
      toggleAllNoteArrow("fa-solid fa-angle-down");
    }
  }

  useEffect(() => {
    fetchAllNotes();
    if (userAuth === "")
      toggleIsUser(false);
    else
      toggleIsUser(true);
  });

  const handleNewNoteTitle = (event) => {
    setNewNoteTitle(event.target.value);
  }

  const handleNewNoteDesc = (event) => {
    setNewNoteDesc(event.target.value);
  }

  const ehandleNewNoteTitle = (event) => {
    esetNewNoteTitle(event.target.value);
  }

  const ehandleNewNoteDesc = (event) => {
    esetNewNoteDesc(event.target.value);
  }

  const addNewNote = () => {
    if (newNoteTitle === "" && newNoteDesc === "") {
      changeErrorMessage("enter title and description");
    } else if (newNoteTitle === "") {
      changeErrorMessage("enter title");
    } else if (newNoteDesc === "") {
      changeErrorMessage("enter description");
    } else {
      changeErrorMessage("");
      addNote(newNoteTitle, newNoteDesc);
      toggleToShow(true);
      setAlertMessage("New Note added successfully");
      setTimeout(() => {
        setNewNoteTitle("");
        setNewNoteDesc("");
        toggleToShow(false);
        setAlertMessage("");
      }, 1500);
    }
  }

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNNote = (note) => {
    ref.current.click();
    esetNewNoteTitle(note.title);
    esetNewNoteDesc(note.description);
    changeNoteToUpdate(note);
  }

  const togglePinStatus = (note) => {
    if (note.pinned === true) {
      updateNote(note._id, note.title, note.description, false);
    } else {
      updateNote(note._id, note.title, note.description, true);
    }
  }

  const confirmUpdate = () => {
    // alert("updating note ID: "+noteToUpdate._id);
    if (enewNoteTitle === "" && enewNoteDesc === "") {
      changeeErrorMessage("enter updated title & description");
    } else if (enewNoteTitle === "") {
      changeeErrorMessage("enter updated title");
    } else if (enewNoteDesc === "") {
      changeeErrorMessage("enter updated desription");
    } else {
      changeeErrorMessage("");
      updateNote(noteToUpdate._id, enewNoteTitle, enewNoteDesc);
      toggleToShow(true);
      setAlertMessage("Note updated successfully");
      setTimeout(() => {
        toggleToShow(false);
        setAlertMessage("");
      }, 1500);
      refClose.current.click();
    }
  }

  return (

    <>
      {
        isUser === false ?
          <>
            <center>
              <h1 style={{
                fontWeight: "bolder",
                fontSize: "40px",
                marginTop: "8%"
              }}>No User found, you can either Login or SignUp User</h1>
            </center>
            <Link to='/'><button className="btn btn-warning noUserBtn">Login / Signup</button></Link>
          </>
          :
          <>
            <div className="newNoteForm">
              <div className="newnoticon d-flex justify-content-between" style={{
                display: "flex",
                // border : "1px solid black"
              }}>
                <h1 style={{
                  marginBottom: "3%"
                }}>Add Note Form</h1>
                <i className={newNoteArrow} onClick={handleNewNoteArrow} style={{
                  fontSize: "45px",
                  marginTop: ".5%",
                  marginRight: "2%"
                }} />
              </div>

              <div style={{
                display: newNoteDisplay
              }}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={newNoteTitle}
                    onChange={handleNewNoteTitle}
                    placeholder='note title'
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={newNoteDesc}
                    onChange={handleNewNoteDesc}
                    placeholder='note description'
                    style={{
                      height: '200px'
                    }}
                  />
                </div>

                <p style={{
                  color: 'red',
                  fontWeight: "bolder"
                }}> {errorMessage} </p>

                <button className="btn btn-warning addNoteButton loginButton" onClick={addNewNote}>Add Note </button>
              </div>

            </div>

            {/* <!-- Button trigger modal --> */}

            <button style={{
              display: "none"
            }} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Updating a note</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="newNoteForm">
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={enewNoteTitle}
                          onChange={ehandleNewNoteTitle}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          value={enewNoteDesc}
                          onChange={ehandleNewNoteDesc}
                          style={{
                            height: "150px"
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <p style={{
                    color: 'red',
                    fontWeight: "bolder",
                    marginLeft: "5%",
                    marginTop: "-3%"
                  }}>{eerrorMessage}</p>

                  <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary loginButton" data-bs-dismiss="modal" >Close</button>
                    <button type="button" className="btn btn-warning loginButton" onClick={confirmUpdate} >Update Note</button>
                  </div>
                </div>
              </div>
            </div>

            {
              impNotes.length > 0 ?
                <div>
                  <div className="alllnotesandicon d-flex justify-content-between" >
                    <h1 style={{
                      marginTop: "3%",
                      marginBottom: "3%",
                      marginLeft: "2%"
                    }}>Important Notes</h1>
                    <i className={impNoteArrow} style={{
                      fontSize: "45px",
                      marginTop: "3.3%",
                      marginRight: "3.7%"
                    }} onClick={handleImpNoteArrow} />
                  </div>

                  <div style={{
                    display: impNoteDisplay
                  }}>

                    <div className="row" >
                      {
                        impNotes.map((note) => {
                          return <NoteItem note={note} updateCurrentNote={updateNNote} togglePinStatus={togglePinStatus} />
                        })
                      }
                    </div>

                  </div>

                </div>
                :
                <></>
            }

            {/* {

              impNotes.length > 0 ?
                <div className="row">
                  <div className="impnotesandicon d-flex justify-content-between">
                    <h1 style={{
                      marginTop: "-1%",
                      marginBottom: "3%",
                      marginLeft: "2%"
                    }}>Important Notes</h1>
                    <i className={impNoteArrow} style={{
                      fontSize: "45px",
                      marginTop: ".5%",
                      marginRight: "2%"
                    }} onClick={handleImpNoteArrow} />
                  </div>
                  <div style={{
                    display: impNoteDisplay
                  }}>
                    {
                      impNotes.length !== 0 ?
                        impNotes.map((note) => {
                          return <NoteItem note={note} updateCurrentNote={updateNNote} togglePinStatus={togglePinStatus} />
                        })
                        :
                        <h1></h1>
                    }
                  </div>
                </div>
                :
                <></>

            } */}

            {
              notes.length > 0 ?
                <div>
                  <div className="alllnotesandicon d-flex justify-content-between" >
                    <h1 style={{
                      marginTop: "3%",
                      marginBottom: "3%",
                      marginLeft: "2%"
                    }}>Available Notes</h1>
                    <i className={allNoteArrow} style={{
                      fontSize: "45px",
                      marginTop: "3.3%",
                      marginRight: "3.7%"
                    }} onClick={handleAllNoteArrow} />
                  </div>

                  <div style={{
                    display: allNoteDisplay
                  }}>

                    <div className="row" >
                      {
                        notes.map((note) => {
                          return <NoteItem note={note} updateCurrentNote={updateNNote} togglePinStatus={togglePinStatus} />
                        })
                      }
                    </div>

                  </div>

                </div>
                :
                <></>
            }


            {/* {
              notes.length > 0 ?
                <div className="row">
                  <div className="alllnotesandicon d-flex justify-content-between">
                    <h1 style={{
                      marginTop: "3%",
                      marginBottom: "3%",
                      marginLeft: "2%"
                    }}>Available Notes</h1>
                    <i className={allNoteArrow} style={{
                      fontSize: "45px",
                      marginTop: ".5%",
                      marginRight: "2%"
                    }} onClick={handleAllNoteArrow} />
                  </div>
                  {
                    notes.length !== 0 ?
                      notes.map((note) => {
                        return <NoteItem note={note} updateCurrentNote={updateNNote} togglePinStatus={togglePinStatus} />
                      })
                      :
                      <></>
                  }

                </div>
                :
                <></>
            } */}



          </>
      }
    </>
  )
}
