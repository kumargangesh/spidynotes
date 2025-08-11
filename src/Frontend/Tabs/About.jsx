import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../Context/NoteContext';
import NoteItem from './NoteDesign/NoteItem';
import "./NoteStyle.css";
// import { Link } from "react-router-dom";
import NouserFound from './NouserFound';

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
      addNote(newNoteTitle, newNoteDesc, false);
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
    changeeErrorMessage("");
    ref.current.click();
    esetNewNoteTitle(note.title);
    esetNewNoteDesc(note.description);
    changeNoteToUpdate(note);
  }

  // const togglePinStatus = (note) => {
  //   alert(note._id);
  //   if (note.pinned === true) {
  //     updateNote(note._id, note.title, note.description, false);
  //   } else {
  //     updateNote(note._id, note.title, note.description, true);
  //   }
  // }

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
          <NouserFound />
          :
          <>
            <div className="newNoteForm">
              <div className="newnoticon d-flex justify-content-between" style={{
                display: "flex",
                // border : "1px solid black"
              }}>
                <h1>Add Note Form</h1>
                <i className={newNoteArrow} onClick={handleNewNoteArrow} />
              </div>

              <div className="newnote" style={{
                display: newNoteDisplay
              }}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                  <br />
                  <input
                    type="email"
                    // className="form-control"
                    // id="exampleInputEmail1"
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
                    // className="form-control"
                    // id="exampleInputPassword1"
                    value={newNoteDesc}
                    onChange={handleNewNoteDesc}
                    placeholder='note description'
                  />
                </div>

                <p style={{
                  color: 'red',
                  fontWeight: "bolder"
                }}> {errorMessage} </p>

                <button className="btn btn-success addNoteButton loginButton" onClick={addNewNote}>Add Note </button>
              </div>

            </div>

            {/* <!-- Button trigger modal --> */}

            <button style={{
              display: "none"
            }} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Updating a note</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ color : "white" }}></button>
                  </div>
                  <div className="modal-body">
                    <div className="newNoteForm updateForm">
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <br />
                        <input
                          type="email"
                          // className="form-control"
                          // id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={enewNoteTitle}
                          onChange={ehandleNewNoteTitle}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea
                          type="text"
                          // className="form-control"
                          // id="exampleInputPassword1"
                          value={enewNoteDesc}
                          onChange={ehandleNewNoteDesc}
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
                    <button ref={refClose} type="button" className="btn btn-secondary updateformbutton loginButton" data-bs-dismiss="modal" >Close</button>
                    <button type="button" className="btn btn-success updateformbutton loginButton" onClick={confirmUpdate} >Update Note</button>
                  </div>
                </div>
              </div>
            </div>

            {
              impNotes.length > 0 ?
                <div style={{
                  marginTop: "5%"
                }}>
                  <div className="alllnotesandicon d-flex justify-content-between" >
                    <h1>Important Notes</h1>
                    <i className={impNoteArrow} onClick={handleImpNoteArrow} />
                  </div>

                  <div style={{
                    display: impNoteDisplay
                  }}>

                    <div className="row impNotesList">
                      {
                        impNotes.map((note) => {
                          return (
                            <NoteItem note={note} updateCurrentNote={updateNNote} />
                          )
                        })
                      }
                    </div>

                  </div>

                </div>
                :
                <></>
            }

            {
              notes.length > 0 ?
                <div style={{
                  marginTop: "5%"
                }}>
                  <div className="alllnotesandicon d-flex justify-content-between" >
                    <h1>Available Notes</h1>
                    <i className={allNoteArrow} onClick={handleAllNoteArrow} />
                  </div>

                  <div style={{
                    display: allNoteDisplay
                  }}>

                    <div className="row impNotesList">
                      {
                        notes.map((note) => {
                          return <NoteItem note={note} updateCurrentNote={updateNNote} />
                          // return <NoteItem note={note} updateCurrentNote={updateNNote} togglePinStatus={togglePinStatus} />
                        })
                      }
                    </div>

                  </div>

                </div>
                :
                <></>
            }

          </>
      }
    </>
  )
}
