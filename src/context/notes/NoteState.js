import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{

    const notesInitial=[
        {
          "_id": "627eab5102dcf4d0e07ae78a",
          "user": "627e73d193bbb578a211df5e",
          "title": "12's note 1",
          "description": "MyNotes Description over hereMyNotes Description over hereMyNotes Description over here!",
          "tag": "General",
          "date": "2022-05-13T19:02:41.195Z",
          "__v": 0
        },
        {
          "_id": "627eab5102dcf4d0e07ae78a",
          "user": "627e73d193bbb578a211df5e",
          "title": "12's note 1",
          "description": "MyNotes Description over hereMyNotes Description over hereMyNotes Description over here!",
          "tag": "General",
          "date": "2022-05-13T19:02:41.195Z",
          "__v": 0
        },
        {
          "_id": "627eab5102dcf4d0e07ae78a",
          "user": "627e73d193bbb578a211df5e",
          "title": "12's note 1",
          "description": "MyNotes Description over hereMyNotes Description over hereMyNotes Description over here!",
          "tag": "General",
          "date": "2022-05-13T19:02:41.195Z",
          "__v": 0
        },
        {
          "_id": "627eab5102dcf4d0e07ae78a",
          "user": "627e73d193bbb578a211df5e",
          "title": "12's note 1",
          "description": "MyNotes Description over hereMyNotes Description over hereMyNotes Description over here!",
          "tag": "General",
          "date": "2022-05-13T19:02:41.195Z",
          "__v": 0
        },
        {
          "_id": "627eab5102dcf4d0e07ae78a",
          "user": "627e73d193bbb578a211df5e",
          "title": "12's note 1",
          "description": "MyNotes Description over hereMyNotes Description over hereMyNotes Description over here!",
          "tag": "General",
          "date": "2022-05-13T19:02:41.195Z",
          "__v": 0
        },
        {
          "_id": "627eab5402dcf4d0e07ae78c",
          "user": "627e73d193bbb578a211df5e",
          "title": "12's note 2",
          "description": "MyNotes Description over hereMyNotes Description over hereMyNotes Description over here!",
          "tag": "General",
          "date": "2022-05-13T19:02:44.965Z",
          "__v": 0
        },
        {
          "_id": "627eab5802dcf4d0e07ae78e",
          "user": "627e73d193bbb578a211df5e",
          "title": "12's note 3",
          "description": "MyNotes Description over hereMyNotes Description over hereMyNotes Description over here!",
          "tag": "General",
          "date": "2022-05-13T19:02:48.893Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;