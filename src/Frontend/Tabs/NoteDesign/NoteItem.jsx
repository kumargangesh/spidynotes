import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../../Context/NoteContext';
import "./NoteStyle.css";

export default function NoteItem(props) {

    const { note, updateCurrentNote } = props;
    const context = useContext(noteContext);
    const { deleteNote, setAlertMessage, toggleToShow, updateNote } = context;

    const [impIcon, changeImpIcon] = useState();

    const changeNoteStatus = () => {
        if (impIcon === "fa-regular fa-lightbulb") {
            changeImpIcon("fa-solid fa-lightbulb");
            updateNote(note._id, note.title, note.description, true);
        } else {
            changeImpIcon("fa-regular fa-lightbulb");
            updateNote(note._id, note.title, note.description, false);
        }
    }

    return (
        <div className="col-md-4 " style={{
            marginTop: "1.5%",
            marginBottom: "1.5%"
        }}>
            <div className="card">
                <div className="card-body">

                    <h5 className="card-title">{note.title}</h5>

                    <pre className="card-text">{note.description}</pre>

                    <div className="icons d-flex justify-content-between">
                        <i className="fa-solid fa-pen" onClick={() => {
                            updateCurrentNote(note)
                        }} />
                        <i className="fa-solid fa-trash" onClick={() => {
                            deleteNote(note._id)
                            toggleToShow(true)
                            setAlertMessage("Note deleted successfully");
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
                        } onClick={changeNoteStatus} />

                    </div>
                </div>
            </div>
        </div>
    )
}
