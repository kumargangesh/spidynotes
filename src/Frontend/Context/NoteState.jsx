import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {

    // const host = "https://inotebook-backend-gx6p.onrender.com";
    const host = "http://localhost:5000";

    const tempNotes = [];
    const tempImpNotes = [];

    const [notes, setNotes] = useState(tempNotes);
    const [alertMessage, setAlertMessage] = useState("");
    const [toShow, toggleToShow] = useState(false);
    const [userAuth, setUserAuth] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const [impNotes, setImpNotes] = useState(tempImpNotes);

    // fetching all the notes

    const fetchAllNotes = async () => {
        const response = await (fetch(`${host}/mern/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': userAuth
                // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3Mjg0ZGFmMjhhNjVjNmQ0MDY4ZjJmIn0sImlhdCI6MTc1Mjk1NzkwNH0.iwIKO1fRYxbk1h4BJ_NlxOr7V6dVaASFIfQ1cD-7pMg"
            },
            // body : JSON.stringify({title, description})
        }));

        const json = await response.json();
        const allNotes = json.notes;

        let importantNotes = [];
        let normalNotes = [];

        for(let g=0;g<allNotes.length;g++){
            if(allNotes[g].pinned === true)
                importantNotes.push(allNotes[g]);
            else
                normalNotes.push(allNotes[g]);
        }

        setNotes(normalNotes);

        setImpNotes(importantNotes);
    }

    // adding a new note

    const addNote = async (title, description) => {

        // Now we are going to make API calls 

        const response = await (fetch(`${host}/mern/notes/addNote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': userAuth
                // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3Mjg0ZGFmMjhhNjVjNmQ0MDY4ZjJmIn0sImlhdCI6MTc1Mjk1NzkwNH0.iwIKO1fRYxbk1h4BJ_NlxOr7V6dVaASFIfQ1cD-7pMg"
            },
            body: JSON.stringify({ title, description, pinned : false })
        }));

        // setNotes(notes.concat(note));
    }

    // updating a notes

    const updateNote = async (id, title, description, pinned) => {

        // alert("in update: "+pinned);

        // Now we are going to make API calls 

        const response = await (fetch(`${host}/mern/Notes/updateNote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': userAuth
                // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3Mjg0ZGFmMjhhNjVjNmQ0MDY4ZjJmIn0sImlhdCI6MTc1Mjk1NzkwNH0.iwIKO1fRYxbk1h4BJ_NlxOr7V6dVaASFIfQ1cD-7pMg"
            },
            body: JSON.stringify({ title, description, pinned })
        }));


        // for(let g=0;g<notes.length;g++){
        //     if(notes[g]._id === id){
        //         notes[g].title = title;
        //         notes[g].description = description;
        //     }
        // }
    }

    // delete a note

    const deleteNote = async (id) => {

        const response = await (fetch(`${host}/mern/Notes/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': userAuth
                // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3Mjg0ZGFmMjhhNjVjNmQ0MDY4ZjJmIn0sImlhdCI6MTc1Mjk1NzkwNH0.iwIKO1fRYxbk1h4BJ_NlxOr7V6dVaASFIfQ1cD-7pMg"
            }
        }));


        // alert("note to delete, with ID: "+id);

        const json = response.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote, fetchAllNotes, alertMessage, setAlertMessage, toShow, toggleToShow, userAuth, setUserAuth, userEmail, setUserEmail, impNotes, setImpNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
