import { NoteForm } from "./NoteForm";
import { NoteData } from "../../types";

type NewNoteProps = React.HTMLAttributes<HTMLDivElement> & {
    onSubmit: (data: NoteData) => void;
}

export function NewNote({ onSubmit, ...rest }: NewNoteProps): JSX.Element {


    return (
        <div {...rest}>
            <h1 className="mb-4">New Note</h1>
            <NoteForm onSubmit={onSubmit} />
        </div>
    )
}