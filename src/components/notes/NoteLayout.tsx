import { Note } from "../../types";
import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";


type NoteLayoutProps = {
    notes: Note[];
}



export function NoteLayout({ notes }: NoteLayoutProps) {

    const { id } = useParams();

    const note = notes.find(note => note.id === id);

    // use replace so back button doesn't go back here
    // if (!note) return <Navigate to={`/notes/${id}`} replace />
    // TODO ^ this may be a hacky situation that needs to be flushed out later
    
    if (!note) return <Navigate to='/notes' replace />
    
    // else return outlet to render nested routes
    return <Outlet context={note} /> // set note in context so each child route can access it with useNote() belwow
}


export function useNote() {
    return useOutletContext<Note>();
}
