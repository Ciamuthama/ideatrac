import { NoteData, Tag } from "./App";
import { NoteForm } from "./Form";
import { useNotes } from "./Details";

type EditNotesProps = {
    onSubmit: (id:string,data:NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function Edit({ onSubmit, onAddTag, availableTags }: EditNotesProps) {
    const note= useNotes()
    return (

        <>
        <h2 className="mb-4">Edit Note</h2>
        <NoteForm title={note.title} tags={note.tags} body={note.body}  onSubmit={data=> onSubmit(note.id,data)} onAddTag={onAddTag} availableTags={availableTags} />
        </>

    )
}