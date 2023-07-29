import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note } from "./App"

type NoteDetailsProps = {
   notes:Note[] 
}

export function Details({notes}:NoteDetailsProps) {
    const { id } = useParams()
    const note = notes.find(n => n.id === id)
    if (note == null) {
        return <Navigate to='/' replace/>
    }
    return (
        <Outlet context={note}/>
    )
}



// eslint-disable-next-line react-refresh/only-export-components
export function useNotes(){
    return useOutletContext<Note >()
}