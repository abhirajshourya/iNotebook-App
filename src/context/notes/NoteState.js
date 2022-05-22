import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000"
    const token = localStorage.getItem('token')

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    //Functions:

    // 1. Add a note
    const addNote = async (title, description, tag) => {
        
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
            body: JSON.stringify({title, description, tag})
        })

        fetchNotes()
    }

    // 2. Delete a note
    const deleteNote = async (id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            }
        })
        fetchNotes()
    }

    // 3. Edit a note
    const editNote = async (id, title, description, tag) => {

        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
            body: JSON.stringify({title, description, tag})
        })

        //Edit in client
        fetchNotes()
    }

    // 4. Fetch all notes
    const fetchNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
        })
       
        setNotes(await response.json())
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;