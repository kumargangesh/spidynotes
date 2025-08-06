import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../../Context/NoteContext';

export default function NoteItem(props) {

    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote, setAlertMessage, toggleToShow } = context;

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">

                    <div className="titleAndIcon d-flex justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div style={{
                            // border: "1px solid black",
                            width: "25%",
                            marginTop : "2%"
                        }} className="d-flex justify-content-between">
                            <i class="fa-solid fa-pen" onClick={() => {
                                updateNote(note)
                            }} />
                            <i class="fa-solid fa-trash" onClick={() => {
                                deleteNote(note._id)
                                toggleToShow(true)
                                setAlertMessage("Note deleted successfully");
                                setTimeout(() => {
                                    toggleToShow(false);
                                    setAlertMessage("");
                                }, 1500);
                            }} />
                        </div>
                    </div>

                    <p className="card-text">{note.description}</p>

                    {/* <div className="titleAndIcon d-flex justify-content-between">
                        <input className="card-title" value={title} onChange={handleTitle} />
                        <i class="fa-solid fa-pen" />
                        <i class="fa-solid fa-trash" onClick={() => {
                            deleteNote(note._id)
                        }} />
                    </div>
                    <textarea className="card-text" value={desc} onChange={handleDesc} /> */}
                </div>
            </div>
        </div>

    )
}
