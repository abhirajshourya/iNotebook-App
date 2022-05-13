const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

//ROUTE 1: Fetch all notes for the logged in user GET "api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    const allFetchedNotes = await notes.find({ user: req.userid })
    res.json(allFetchedNotes);
})

//ROUTE 2: Add new notes GET "api/notes/addnote"
router.get('/addnote', fetchUser, [
    // title must be an atleast 3 chars long
    body('title', 'Enter a valid Title!').isLength({ min: 3 }),
    // description must be at least 5 chars long
    body('description', 'Please describe!').isLength({ min: 5 }),
], async (req, res) => {

    try {
        //read from req.body
        const { title, description, tag } = req.body

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new notes(
            { title, description, tag, user: req.userid }
        )

        const savedNote = await note.save()

        res.json(savedNote)
    } catch (error) {
        res.status(401).send({ "error": "Please auth using valid token"})
    }
})

//ROUTE 3: Update an existing note PUT "api/notes/updatenote/:id"
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        //read from req.body
        const { title, description, tag } = req.body

        //create new note
        const newNote = {}

        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        //Find the note to be updated
        let note = await notes.findById(req.params.id)
        if(!note){ return res.status(404).send("Not Found")}

        //check user's id
        if(note.user.toString() !== req.userid){
            return res.status(401).send("Not Allowed")
        }

        //find and update
        note = await notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json(note)
    }
    catch (error) {
        res.status(401).send({
            "error": "Please auth using valid token"
        })
    }
})

//ROUTE 4: Delete a note using DELETE 'api/notes/deletenote/:id'
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        //read from req.body
        const { title, description, tag } = req.body

        //Find the note to be deleted and delete
        let note = await notes.findById(req.params.id)
        if(!note){ return res.status(404).send("Not Found")}

         //check user's id
         if(note.user.toString() !== req.userid){
            return res.status(401).send("Not Allowed")
        }

        //find and delete
        note = await notes.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted", note: note})
    }
    catch (error) {
        res.status(401).send({
            "error": "Please auth using valid token"
        })
    }
})

module.exports = router;