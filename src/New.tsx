import { NoteData, Tag } from "./App";
import { NoteForm } from "./Form";

type NewNotesProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function New({onSubmit,onAddTag, availableTags}:NewNotesProps) {
    return (

        <>
        <h2 className="mb-4">Create New Note</h2>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
        </>

    )
}