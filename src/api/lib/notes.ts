import { SupabaseBucketFactory, FileObject } from "../models/SupabaseBucket";
import { RawNote } from "../../types";
// TODO come back and do this


export class Notes extends SupabaseBucketFactory {
    subFolderName!: string;



    constructor(subFolderName: string) {
        // attach all methods from parent class
        super('notes', subFolderName);
        this.getAllNotes = this.getAllNotes.bind(this);
    }


    async getAllNotes(): Promise<RawNote[]> {
        const allNoteData: FileObject[] = await this.listAllFiles();
        let allNotes: RawNote[] = [];
        for await (const note of allNoteData) {
            let noteObject = await this.getFileContent(this.subFolder, note.name);
            if (!noteObject) return [];
            allNotes.push({
                id: note.name,
                title: noteObject.title,
                markdown: noteObject.markdown,
                tagIds: noteObject.tagIds,
                //TODO change below like in the supabase bucket to only house ids.
                storeItemIds: noteObject.storeItemTags.map((storeItemTag: any) => storeItemTag.id),
            });
        }
        return allNotes;
    }

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





