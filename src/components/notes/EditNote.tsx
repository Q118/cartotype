import { NoteForm } from "./NoteForm";
import { NoteData, Tag } from "../../types";
import { useNote } from "./NoteLayout";


type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
    availableStoreTags: Tag[];
}



export function EditNote({ onSubmit, onAddTag, availableTags, availableStoreTags }: EditNoteProps): JSX.Element {
    
    // console.log('availableStoreTags', availableStoreTags)
    const note = useNote();

    return (
        <>
            <h1 className="mb-4">Edit Note</h1>
            <NoteForm
                onSubmit={data => onSubmit(note.id, data)}
                onAddTag={onAddTag}
                title={note.title}
                markdown={note.markdown}
                tags={note.tags}
                storeItemTags={note.storeItemTags}
                availableTags={availableTags}
                availableStoreTags={availableStoreTags}
            />
        </>
    )
}