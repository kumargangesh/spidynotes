import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../../Context/NoteContext';
import "./Style.css";
import { copy } from "copy-to-clipboard";

export default function NoteItem(props) {

    const { note, updateCurrentNote, togglePinStatus } = props;
    const context = useContext(noteContext);
    const { deleteNote, setAlertMessage, toggleToShow, updateNote } = context;

    const [pin, togglePin] = useState("fa-solid fa-lightbulb");

    const handlePin = () => {
        togglePinStatus(note);
        if (pin === "fa-regular fa-lightbulb") {
            togglePin("fa-solid fa-lightbulb");
            //updateNote(note._id, note.title, note.description, true);
        } else {
            togglePin("fa-regular fa-lightbulb");
            //updateNote(note._id, note.title, note.description, false);
        }
    }

    return (
        <div className="col-md-4" >
            <div className="card my-3" style={{
                border: "1px solid green"
            }}>

                <div className="card-body">

                    <h5 style={{
                        // border: "1px solid black",
                        // width : "280px"
                    }} className="card-title">{note.title}</h5>

                    <pre className="card-text" style={{
                        marginTop: "3%"
                    }}>{note.description}</pre>

                    <div style={{
                        // border: "1px solid black",
                        width: "40%",
                        margin: "2% auto",
                        marginTop: "3%",
                    }} className="d-flex justify-content-between">

                        <i class="fa-regular fa-copy" onClick={() => {
                            copy(note.description)
                        }} />

                        <i class="fa-solid fa-pencil" onClick={() => {
                            updateCurrentNote(note)
                        }} />

                        <i class="fa-solid fa-trash" onClick={() => {
                            deleteNote(note._id)
                            toggleToShow(true)
                            setAlertMessage("Note titles " + note.title + " deleted successfully");
                            setTimeout(() => {
                                toggleToShow(false);
                                setAlertMessage("");
                            }, 1500);
                        }} />

                        <i className={
                            note.pinned === true ?
                                "fa-solid fa-lightbulb"
                                :
                                "fa-regular fa-lightbulb"
                        } onClick={handlePin} />

                    </div>


                </div>

                {/* <div className="card-body">

                    <div className="titleAndIcon d-flex justify-content-between">
                        <h5 style={{
                            // border: "1px solid black",
                            // width : "280px"
                        }} className="card-title">{note.title}</h5>
                        <div style={{
                            // border: "1px solid black",
                            width: "25%",
                            marginTop : "1.8%"
                        }} className="d-flex justify-content-between">
                            <i class="fa-solid fa-pen" onClick={() => {
                                updateCurrentNote(note)
                            }} />

                            <i class="fa-solid fa-trash" onClick={() => {
                                deleteNote(note._id)
                                toggleToShow(true)
                                setAlertMessage("Note titles "+note.title+" deleted successfully");
                                setTimeout(() => {
                                    toggleToShow(false);
                                    setAlertMessage("");
                                }, 1500);
                            }} />

                            <i className = {
                                note.pinned === true ? 
                                    "fa-solid fa-lightbulb"
                                :
                                    "fa-regular fa-lightbulb"
                            } onClick={handlePin} />

                        </div>
                    </div>

                    <pre className="card-text">{note.description}</pre>
                </div> */}
            </div>
        </div>

    )
}
