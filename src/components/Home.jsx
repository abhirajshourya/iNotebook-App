import React from 'react'
import AddNote from './AddNote'
import Notes from './Notes'

export default function Home(props) {
  return (
    <div>
      <AddNote alertMaker={props.alertMaker}/>
      <Notes alertMaker={props.alertMaker}/>
    </div>
  )
}
