// import { SupabaseBucketFactory, FileObject } from "../models/SupabaseBucket";
import { SupabaseTableFactory } from "../models/SupabaseTable";
import { RawNote } from "../../types";
// TODO CONVERT THIS TO USE THE DB AND NOT THE STORAGE...


export class Notes extends SupabaseTableFactory {
    // subFolderName!: string;
    // tableName!: string;
    subPartitionName!: string;
    // TODO future tableName will break apart by user. maybe.

    constructor(subPartitionName: string) {
        // attach all methods from parent class
        super(`notes_${subPartitionName}`);
        this.getAllNotes = this.getAllNotes.bind(this);
    }

    async getAllNotes() {
        let allNotes: Partial<RawNote>[] = [];

        allNotes = await this.getAllItems('id', true);




        return allNotes;
    };


    addNote(fileName: string, fileBody: string) {
        // TODO change the storeItemTags to only house ids.
        return this.addFile(fileName, fileBody);
    }


    static create(subFolderName: string) {
        return new Notes(subFolderName);
    }

    static getAllNotes(subFolderName: string): Promise<RawNote[]> {
        const notes = Notes.create(subFolderName);
        // console.log('!!!!notes in getAllNotes', notes);
        return notes.getAllNotes();
    }
}





