const express = require("express"); // getting express
const router = express.Router(); // getting router from express.Router()
const FetchUser = require("../middleware/FetchUser");
const Notes = require("../models/NotesModel");
const {body, validationResult} = require("express-validator");

// ROUTE 1. to fetch all notes of logged user using "/mern/notes/fetchallnotes" using GET request and Login required

router.get("/fetchAllNotes", FetchUser, async(req, res) => {  
    const notes = await Notes.find({ user : req.user.id });
    res.status(200).send({notes});
});

// ROUTE 2. to add a new note using "/mern/notes/addNote" using POST request and Login required

router.post("/addNote", FetchUser, [
    body("title").isLength({ min : 1 }),
    body("description").isLength({ min : 1 })
], async(req, res) => {
    const error = validationResult(req); // getting errors from validationResult
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });
    // returning status 400, with json message for errors received from errors array

    const { title, description, pinned } = req.body;

    try{
        const note = new Notes({ // creating a new note of a logged in user
            title, description, pinned, user : req.user.id // here user is the id of logged in User, getting from FetchUser, which is the middleware function
        });

        const savedNote = await note.save();

        res.status(200).json({savedNote});
    }catch(error){
        res.status(500).send({ error : error.message})
    }
});

// ROUTE 3. to update a Note using "/mern/Notes/updateNote" by PUT request and Login required

router.put("/updateNote/:id", FetchUser, [
    body("title").isLength({ min : 1 }),
    body("description").isLength({ min : 1 })
], async(req, res) => {
    const error = validationResult(req); // getting errors from validationResult
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });
    // returning status 400, with json message for errors received from errors array

    const { title, description, pinned } = req.body;

    try{
        let newNote = {  }; // creating a new note 

        if(title) { newNote.title = title } // checking whether the title exists
        if(description) { newNote.description = description } // checking whether the description exists
        newNote.pinned = pinned // checking whether the description exists

        let noteToUpdate = await Notes.findById(req.params.id); // fetching the note using id receiving from parameters
        if(!noteToUpdate){
            res.status(401).json({"message" : "Note not found"});
        }

        if(noteToUpdate.user.toString() != req.user.id){ // checking whether the logged in user is updating its own notes or not
            res.status(401).json({"message" : "You are not allowed to make changes in this note"});
        }

        noteToUpdate = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true});
        // finally updating the note 
        res.status(200).json({ "message" : "Note updated successfully" });

    }catch(error){
        res.status(500).send({ error : error.message})
    }
});

// ROUTE 4. to delete a Note using "/mern/Notes/deleteNote" by DELETE request and Login required

router.delete("/deleteNote/:id", FetchUser, async(req, res) => {
    try{
        let noteToUpdate = await Notes.findById(req.params.id); // fetching the note using id receiving from parameters
        if(!noteToUpdate){
            res.status(401).json({"message" : "Note not found"});
        }

        if(noteToUpdate.user.toString() != req.user.id){ // checking whether the logged in user is updating its own notes or not
            res.status(401).json({"message" : "You are not allowed to make changes in this note"});
        }

        noteToUpdate = await Notes.findByIdAndDelete(req.params.id);
        // finally deleting the note 

        res.status(200).json({ "message" : "Note deleted successfully" });

    }catch(error){
        res.status(500).send({ error : error.message})
    }
});

module.exports = router; // exporting the router variable to parent component