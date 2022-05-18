import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

export default function AddNote() {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({title: "", description:"", tag:""})

    const handleOnClick = (e) => {
        addNote(note.title, note.description, note.tag)

    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div className="container my-3">
            <h1>Add a Note</h1>
            <form>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}  />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' aria-describedby="emailHelp" onChange={onChange}  />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputState">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' aria-describedby="emailHelp" onChange={onChange}  />
                </div>
                
                <button disabled={note.title.length<5 || note.description.length<5 || note.tag.length<3} type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>

            </form>

        </div>
    )
}
