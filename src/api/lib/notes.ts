// import { SupabaseBucketFactory, FileObject } from "../models/SupabaseBucket";
import { SupabaseTableFactory } from "../models/SupabaseTable";
import { RawNote } from "../../types";
import { PostgrestError } from "@supabase/supabase-js";
// // TODO CONVERT THIS TO USE THE DB AND NOT THE STORAGE...

const handleError = (error: PostgrestError, retValue: any) => {
    console.error(error);
    return retValue;
}
// ! PU HERE .. keep doing all the cruds 

export class Notes extends SupabaseTableFactory {
    subPartitionName!: string;
    // TODO future tableName will break apart by user. maybe.

    constructor(subPartitionName: string) {
        // attach all methods from parent class
        super(`notes_${subPartitionName}`);
        this.getAllNotes = this.getAllNotes.bind(this);
        this.getNoteById = this.getNoteById.bind(this);
        // this.getNoteFromTags = this.getNoteFromTags.bind(this);
        // TODO implement these other four
        // this.getNoteFromTitle = this.getNoteFromTitle.bind(this);
        // this.getNoteFromStoreTags = this.getNoteFromStoreTags.bind(this);
        this.addNote = this.addNote.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    async getAllNotes() {
        let allNotes: Partial<RawNote>[] = [];
        allNotes = await this.getAllItems('id', true);
        return allNotes;
    };

    async getNoteById(id: string) {
        let note: RawNote;
        note = await this.getItemById(id);
        return note;
    }

    async addNote(newNote: RawNote) {
        // console.log('newNote', newNote)
        let retVal: any = {};
        retVal = await this.addItem(newNote);
        return retVal;
    }

    async updateNote(updatedNote: any) {
        let retVal: any = {};
        retVal = await this.updateItem(updatedNote);
        return retVal;
    }

    async deleteNote(id: string) {
        let retVal: any = {};
        retVal = await this.deleteItem(id);
        // console.log('retVal', retVal)
        return retVal;
    }


    /** updates the storeItemIds column of the specified note */
    async updateNoteStoreItemIds(noteId: string, storeItemIds: string[]) {
        const { data, error } = await this.client.from(this.tableName)
            .update({ storeItemIds: storeItemIds })
            .eq('id', noteId);
        if (error) return handleError(error, {});
        return data;
    }


    static create(subFolderName: string) {
        return new Notes(subFolderName);
    }

    static async getAllNotes(subFolderName: string) {
        const notes = Notes.create(subFolderName);
        const allNotes = await notes.getAllNotes();
        return allNotes.map((note) => {
            note.markdown = note.markdown.rawText as string;
            return note;
        });
    }

    // static async addNewNote(

    // static async updateNote(note_id: string, subFolderName: string) {
    //     const notes = Notes.create(subFolderName);
    //     const note = await notes.getNoteById(note_id);
    //     return note;
    // }

    static async getNoteById(note_id: string, subFolderName: string) {
        const notes = Notes.create(subFolderName);
        const note = await notes.getNoteById(note_id);
        return note;
    }
}





