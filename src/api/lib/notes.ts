import { SupabaseBucketFactory } from "../models/SupabaseBucket";
import { RawNote } from "../../types";

// TODO come back and do this


export class Notes extends SupabaseBucketFactory {
    subFolderName!: string;



    constructor(subFolderName: string) {
        // attach all methods from parent class
        super('notes', subFolderName);
        this.getAllNotes = this.getAllNotes.bind(this);
    }


    // async getAllNotes(): Promise<RawNote[]> {
    async getAllNotes(): Promise<any[]|null> {
        const allNoteData = await this.listAllFiles();
        const allNotes = allNoteData?.map(async (note: any) => {
            let noteObject = await this.getFileContent(this.subFolder, note.name);
            console.log(noteObject)
            return {
                id: note.name,
                // title: noteObject?.name,
                // markdown: noteObject?.markdown,
            };
        });

        return allNoteData;
        // return allNotes;
    }

    addNote(fileName: string, fileBody: string) {
        // TODO
        return this.addFile(fileName, fileBody);
    }


    static create(subFolderName: string) {
        return new Notes(subFolderName);
    }
}





