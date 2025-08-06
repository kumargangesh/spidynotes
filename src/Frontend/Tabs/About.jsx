import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../Context/NoteContext';
import NoteItem from './NoteDesign/NoteItem';
import "./NoteStyle.css";

export default function About() {

  const context = useContext(noteContext);

  const { notes, fetchAllNotes, addNote, updateNote, setAlertMessage, toggleToShow } = context;

  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDesc, setNewNoteDesc] = useState("");
  const [errorMessage, changeErrorMessage] = useState("");

  const [enewNoteTitle, esetNewNoteTitle] = useState("");
  const [enewNoteDesc, esetNewNoteDesc] = useState("");
  const [eerrorMessage, changeeErrorMessage] = useState("");

  const [noteToUpdate, changeNoteToUpdate] = useState();

  useEffect(() => {
    fetchAllNotes();
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
      <div className="newNoteForm">
        <h1 style={{
          marginBottom: "3%"
        }}>New Note Form</h1>
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
          />
        </div>

        <p style={{
          color: 'red',
          fontWeight: "bolder"
        }}>{errorMessage}</p>

        <button className="btn btn-warning addNoteButton" onClick={addNewNote} style={{
          width: "15%",
          height: "50px"
        }}>Add Note</button>
      </div>

      {/* <!-- Button trigger modal --> */}
      <button style={{
        display: "none"
      }} ref={ref} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Updating a note</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
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

            <div class="modal-footer">
              <button ref={refClose} type="button" class="btn btn-secondary" data-bs-dismiss="modal" style={{
                width: "20%",
                height: "50px"
              }}>Close</button>
              <button type="button" class="btn btn-warning" onClick={confirmUpdate} style={{
                width: "30%",
                height: "50px"
              }}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h1 style={{
          marginTop: "-1%",
          marginBottom: "3%",
          marginLeft: "2%"
        }}>Available Notes</h1>
        {
          notes.length !== 0 ?
            notes.map((note) => {
              return <NoteItem note={note} updateNote={updateNNote} />
            })
            :
            <h1>No Notes</h1>
        }
      </div>

    </>
  )
}
