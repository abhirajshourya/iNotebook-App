import React, { useState, useContext, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'
import NoteItem from './NoteItem'

export default function Notes(props) {
    const [note, setNote] = useState({id: "",etitle: "", edescription:"", etag:""})
    const context = useContext(noteContext)
    const { notes, fetchNotes, editNote } = context
    const ref = useRef(null)
    const refClose = useRef(null)
    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchNotes()
        }
        else{
            navigate('/login')
        }
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }
    const handleOnClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.alertMaker("Note edited successfully!", "success")
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
        <AddNote alertMaker={props.alertMaker}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Modal
            </button>

            <div>
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} aria-describedby="emailHelp" onChange={onChange} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="inputState">Tag</label>
                                        <input type="text" className="form-control" id="etag" name='etag' aria-describedby="emailHelp" value={note.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                                <button disabled={note.etitle.length<5 || note.edescription.length<5 || note.etag.length<3} type="button" className="btn btn-primary" onClick={handleOnClick}>Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container mx-2">
                {notes.length === 0 && 'No Notes to Display'}</div>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} note={note} updateNote={updateNote}  alertMaker={props.alertMaker}/>
                    })
                }
            </div>
        </>
    )
}
