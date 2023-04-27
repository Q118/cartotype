// import { useMemo } from 'react';
// import { useLocalStorage } from '../hooks/useLocalStorage';
// import { NoteData, RawNote, Tag } from '../types';
// import { v4 as uuidv4 } from 'uuid';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


export function Notes() {


    return (
        <Container className="my-4">
            <h4>Notes Page</h4>
            <Outlet />
        </Container>
    );
}

