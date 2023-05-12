import { SupabaseTableFactory } from "../models/SupabaseTable";
import { Tag } from "../../types";


/**
 * @class Tags - crud operations for tags
 */
export class Tags extends SupabaseTableFactory {
    subPartionName!: string;


    constructor(subPartitonName: string) {
        super(`tags_${subPartitonName}`);
        this.getAllTags = this.getAllTags.bind(this);
        this.addTag = this.addTag.bind(this);
        this.updateTag = this.updateTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        // TODO implement other ones as they are needed
    }



    async getAllTags() {
        let allNotes: Partial<Tag>[] = [];
        allNotes = await this.getAllItems('id', true);
        return allNotes;
    }

    async addTag(newTag: Tag) {
        let retVal: any = {};
        retVal = await this.addItem(newTag);
        return retVal;
    }

    async updateTag(updatedTag: Tag) {
        let retVal: any = {};
        retVal = await this.updateItem(updatedTag);
        return retVal;
    }

    async deleteTag(id: string) {
        let retVal: any = {};
        retVal = await this.deleteItem(id);
        return retVal;
    }

    static create(subFolderName: string) {
        return new Tags(subFolderName);
    }

    static async getAllTags(subFolderName: string) {
        const tags = Tags.create(subFolderName);
        const allTags = await tags.getAllTags();
        // return allNotes.map((note) => {
        //     // * we need to grab the nested markdown string from the markdown object thats stored in the table that cannot hold specailk characters either
        //     note.markdown = note.markdown.rawText as string;
        //     return note;
        // });
        return allTags;
    }
}