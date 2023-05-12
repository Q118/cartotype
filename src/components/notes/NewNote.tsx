import { NoteForm } from "./NoteForm";
import { NoteData, Tag, StoreItemTag } from "../../types";

type NewNoteProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
    availableStoreTags: StoreItemTag[];
}



export function NewNote({ onSubmit, onAddTag, availableTags, availableStoreTags }: NewNoteProps): JSX.Element {


    return (
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm
                onSubmit={onSubmit}
                onAddTag={onAddTag}
                availableTags={availableTags}
                availableStoreTags={availableStoreTags}
            />
        </>
    )
}