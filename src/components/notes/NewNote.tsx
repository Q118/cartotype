import { NoteForm } from "./NoteForm";
import { NoteData, Tag } from "../../types";

// type NewNoteProps = {
    // onSubmit: (data: NoteData) => void;
    // onAddTag: (tag: Tag) => void;
    // availableTags: Tag[];
// }

export function NewNote(): JSX.Element {


    return (
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm
                // onSubmit={onSubmit}
                // onAddTag={onAddTag}
                // availableTags={availableTags}
            />
        </>
    )
}