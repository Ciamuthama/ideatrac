import { NoteData, Tag } from "./App";
import { NoteForm } from "./Form";

type EditNotesProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function Edit({onSubmit,onAddTag, availableTags}:EditNotesProps) {
    return (

        <>
        <h2 className="mb-4">Edit Note</h2>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
        </>

    )
}