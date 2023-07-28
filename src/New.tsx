import { NoteData } from "./App";
import { NoteForm } from "./Form";

type NewNotesProps = {
    onSubmit: (data:  NoteData)=> void
}

export function New({onSubmit}:NewNotesProps) {
    return (

        <>
        <h2 className="mb-4">Create New Note</h2>
        <NoteForm onSubmit={onSubmit} />
        </>

    )
}