/**
 * @class SupabaseBucketFactory - a factory class for creating and managing buckets and folders in Supabase Storage
 * explicity for use with json blobs
 */


import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { StorageError, SearchOptions } from '@supabase/storage-js';

const supabaseUrl = `https://${import.meta.env.VITE_SUPABASE_NAME}.supabase.co`;
const supabaseKey = import.meta.env.VITE_DATABASE_API_KEY;

const handleError = (error: StorageError, retValue: any) => {
    console.error(error);
    return retValue;
}



export class SupabaseBucketFactory {
    client: SupabaseClient;
    bucketName: string;
    /** aka partition/tenant maybe? */
    subFolder: string;
    // TODO maybe need to break up into two classes; one for buckets and one for folders

    constructor(bucketName: string, subFolder: string = '') {
        this.client = createClient(supabaseUrl, supabaseKey);
        this.bucketName = bucketName;
        this.subFolder = subFolder;

        this.getBucketDetails = this.getBucketDetails.bind(this);
        this.listAllBuckets = this.listAllBuckets.bind(this);
        this.updateBucket = this.updateBucket.bind(this);
        this.deleteBucket = this.deleteBucket.bind(this);
        this.emptyBucket = this.emptyBucket.bind(this);

        this.addFile = this.addFile.bind(this);
        this.updateFile = this.updateFile.bind(this);
        this.getFileContent = this.getFileContent.bind(this);
        this.listAllFiles = this.listAllFiles.bind(this);
        this.queryFiles = this.queryFiles.bind(this);
    }

    async getBucketDetails() {
        const { data, error } = await this.client.storage
            .getBucket(this.bucketName);
        if (error) handleError(error, {});
        return data;
    }

    async listAllBuckets() {
        const { data, error } = await this.client.storage
            .listBuckets();
        if (error) handleError(error, []);
        return data;
    }

    async updateBucket(isPublic: boolean = false) {
        const { data, error } = await this.client.storage
            .updateBucket(this.bucketName, {
                public: isPublic,
                allowedMimeTypes: [ 'application/json' ],
            })
        if (error) handleError(error, {});
        return data;
    }

    async deleteBucket() {
        const { data, error } = await this.client.storage
            .deleteBucket(this.bucketName);
        if (error) handleError(error, {});
        return data;
    }

    async emptyBucket() {
        const { data, error } = await this.client.storage
            .emptyBucket(this.bucketName);
        if (error) handleError(error, {});
        return data;
    }

    /**
     * @method addFile - upload a file to an existing bucket
     * @warning -  the file name must be unique to that folder or error will be thrown
     * @param fileName - the name of the file to be uploaded - aka the UUID
     */
    async addFile(fileName: string, fileBody: string) {
        const { data, error } = await this.client.storage
            .from(this.bucketName)
            .upload(`${this.subFolder}/${fileName}.json`, fileBody, {
                contentType: 'application/json',
                upsert: false
            })
        if (error) handleError(error, {});
        return data;
    }
    // TODO may need to take base64 approach at some point
    /**
     * @method updateFile - update a file in an existing bucket
     * @warning - overrides contents of existing file
     */
    async updateFile(fileName: string, fileBody: string) {
        const { data, error } = await this.client.storage
            .from(this.bucketName)
            .update(`${this.subFolder}/${fileName}.json`, fileBody, {
                contentType: 'application/json',
                upsert: false
            })
        if (error) handleError(error, {});
        return data;
    }

    /**
     * @method getFile - downloads a file from an existing bucket
     */
    async getFileContent(folderPath: string, fileName: string) {
        const { data, error } = await this.client.storage
            .from(this.bucketName)
            .createSignedUrl(`${folderPath}/${fileName}`, 60);
        if (error) handleError(error, {});
        if (data) {
            const response = await fetch(data.signedUrl);
            const fileContents = await response.json();
            console.log('getFileContent', fileContents)
            return fileContents;
        }
        return {};
    }

    async listAllFiles(fileOptions: SearchOptions = {}, searchString: string | null = null) {
        // TODO using offset for pagination...
        const { data, error } = await this.client.storage
            .from(this.bucketName)
            .list(this.subFolder, {
                ...fileOptions,
                ...searchString && { search: searchString }
            });
        if (error) handleError(error, []);
        console.log('listAllFiles', data)
        return data;
    }

    async queryFiles(fileOptions: SearchOptions = {}, searchString: string) {
        let retVal: any = [];
        retVal = await this.listAllFiles(fileOptions, searchString);
        return retVal;
    }


    static create(bucketName: string) {
        return new SupabaseBucketFactory(bucketName);
    }

    static async createBucket(bucketName: string, subFolder: string, isPublic: boolean = false) {
        const bucketClient = new SupabaseBucketFactory(bucketName, subFolder);
        const { data, error } = await bucketClient.client.storage
            .createBucket(bucketName, {
                public: isPublic,
                allowedMimeTypes: [ 'application/json' ],
            });
        if (error) handleError(error, {});
        return data;
    }


}