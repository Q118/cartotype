import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { RawNote, RawNotedata } from '../../types';

type NoteListGroupFormBitProps = {

    currentNotesForItem: RawNote[];
    onAddNote: (note: RawNotedata) => void;
    onRemoveNote: (note: RawNotedata) => void;
    availableNotes: RawNote[];
    // ? tags
}


export function NoteListGroupFormBit() {



    return (
        <>
            <ListGroup className="listGroup-associatedNotes">
                <ListGroup.Item className="listItem-associatedNotes">note 1</ListGroup.Item>
                <ListGroup.Item className="listItem-associatedNotes-alt">fmds,mf,.ds</ListGroup.Item>
                <ListGroup.Item className="listItem-associatedNotes">note 2</ListGroup.Item>
                <ListGroup.Item className="listItem-associatedNotes-alt">note dmsadka</ListGroup.Item>
                <ListGroup.Item className="listItem-associatedNotes">ghfjdhdsk</ListGroup.Item>
                <ListGroup.Item className="listItem-associatedNotes-alt">koekrl;ew</ListGroup.Item>
            </ListGroup>
        </>
    )
}