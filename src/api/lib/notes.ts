// import { SupabaseBucketFactory, FileObject } from "../models/SupabaseBucket";
import { SupabaseTableFactory } from "../models/SupabaseTable";
import { RawNote } from "../../types";
// // TODO CONVERT THIS TO USE THE DB AND NOT THE STORAGE...


// ! PU HERE .. keep doing all the cruds 

export class Notes extends SupabaseTableFactory {
    subPartitionName!: string;
    // TODO future tableName will break apart by user. maybe.

    constructor(subPartitionName: string) {
        // attach all methods from parent class
        super(`notes_${subPartitionName}`);
        this.getAllNotes = this.getAllNotes.bind(this);
        // this.getNoteById = this.getNoteById.bind(this);
        // this.getNoteFromTags = this.getNoteFromTags.bind(this);
        // this.getNoteFromTitle = this.getNoteFromTitle.bind(this);
        // this.getNoteFromStoreTags = this.getNoteFromStoreTags.bind(this);
        this.addNote = this.addNote.bind(this);
        // this.updateNote = this.updateNote.bind(this);
    }

    async getAllNotes() {
        let allNotes: Partial<RawNote>[] = [];
        allNotes = await this.getAllItems('id', true);
        return allNotes;
    };


    async addNote(newNote: RawNote) {
        console.log('newNote', newNote)
        let retVal: any = {};
        retVal = await this.addItem(newNote);
        return retVal;
    }


    static create(subFolderName: string) {
        return new Notes(subFolderName);
    }

    static async getAllNotes(subFolderName: string) {
        const notes = Notes.create(subFolderName);
        const allNotes = await notes.getAllNotes();
        return allNotes.map((note) => {
            // * we need to grab the nested markdown string from the markdown object thats stored in the table that cannot hold specailk characters either
            note.markdown = note.markdown.markdown as string;
            return note;
        });
    }
}





