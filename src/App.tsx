import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import { New } from "./New"
import {} from './Details'
import { useLocalStorage } from "./useLocalStorage"
import { useMemo } from "react";
import {v4 as uuidV4} from "uuid"
import NotesList from "./NotesList"
import { Note } from "./Note"
import { Edit } from "./Edit"

export type RawNotes = {
  id: string
} & RawNotesData

export type RawNotesData ={
  title:string
  body: string
  tagIds:string[]
}

export type Note ={
  id: string
} & NoteData

export type NoteData ={
  title:string
  body: string
  tags:Tag[]
}

export type Tag={
  id: string
  label:string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNotes[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])
  
  function onCreateNotes({tags,...data}: NoteData) {
    setNotes(prevNotes => {
    return[...prevNotes,{...data, id:uuidV4(),tagIds: tags.map(tag => tag.id)},]
  })
  }

  function addTag(tag:Tag) {
    setTags(prev => [...prev,tag])
  }
 
  function onUpdateNotes(id:string,{tags,...data}:NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if(note.id === id) {
          return{ ...note, ...data, tagIds: tags.map(tag => tag.id)}
        } else {
          return note
        }
      })
    })
  }

  return (
    <>
      <Container className="my-4">
      <Routes>
        <Route path="/" element={<NotesList notes={notesWithTags}  availableTags={tags}/>} />
          <Route path="/create" element={<New onSubmit={onCreateNotes} onAddTag={addTag} availableTags={tags} />} />
        <Route path="*" element={<Navigate to='/'/>}/>
        <Route path="/:id" element={<Details  notes={notesWithTags}/>} >
          <Route index element={<Note />} />
          <Route path="edit" element={<Edit onSubmit={onUpdateNotes} onAddTag={addTag} availableTags={tags} />} />
        </Route> 
    </Routes>
      </Container>
  
    </>
  )
}

export default App
