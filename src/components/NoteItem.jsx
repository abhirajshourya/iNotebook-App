import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export default function NoteItem(props) {

    const { note, updateNote } = props
    const context = useContext(noteContext)
    const { deleteNote, editNote } = context

    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <span className="card-text">{note.tag}</span>
                    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}
