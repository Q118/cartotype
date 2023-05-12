import { PostgrestError, createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = `https://${import.meta.env.VITE_SUPABASE_NAME}.supabase.co`;
// const supabaseKey = import.meta.env.MODE === 'development' ? import.meta.env.VITE_DATABASE_API_KEY : process.env.DATABASE_API_KEY;
const supabaseKey = import.meta.env.VITE_DATABASE_API_KEY;

// TODO pagination


const handleError = (error: PostgrestError, retValue: any) => {
    console.error(error);
    return retValue;
}

type ItemToUpsert = {
    id: string;
};

type QueryObject = {
    /** select columns, all is assumed if none provided */
    select?: string;
    /** filter by column value */
    eq: [ string, string ];
    /** order by column value, asc is assumed if not provided */
    order?: 'asc' | 'desc';
    /** column to order by, id is assumed if not provided */
    orderBy?: string;
};

/*  
* Filters must be applied after any of select(), update(), upsert(), delete(), and rpc() and before modifiers. 
*/

export class SupabaseTableFactory {
    client: SupabaseClient;
    tableName: string;

    constructor(tableName: string) {
        this.client = createClient(supabaseUrl, supabaseKey);
        this.tableName = tableName;
        this.getAllItems = this.getAllItems.bind(this);
        this.getItemById = this.getItemById.bind(this);
        this.queryItems = this.queryItems.bind(this);
        this.addItem = this.addItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    async getAllItems(orderBy: string = 'id', ascending: boolean = true) {
        const { data, error } = await this.client.from(this.tableName)
            .select('*')
            .order(orderBy, { ascending: ascending });
        if (error) return handleError(error, []);
        return data || [];
    }

    async getItemById(id: string) {
        const { data, error } = await this.client.from(this.tableName)
            .select('*')
            .eq('id', id);
        if (error) return handleError(error, {});
        return data;
    }

    async queryItems(queryObject: QueryObject) {
        const _select = queryObject.select || '*';
        const _order = queryObject.order || 'asc';
        const _orderBy = queryObject.orderBy || 'id';
        const { data, error } = await this.client.from(this.tableName)
            .select(_select)
            .eq(queryObject.eq[ 0 ], queryObject.eq[ 1 ])
            .order(_orderBy, { ascending: _order === 'asc' });
        if (error) return handleError(error, []);
        return data;
    }

    async addItem(item: ItemToUpsert) {
        const { data, error } = await this.client.from(this.tableName)
            .insert([ item ]);
        if (error) return handleError(error, {});
        return data;
    }

    async updateItem(item: ItemToUpsert) {
        const { data, error } = await this.client.from(this.tableName)
            .upsert(item)
            .eq('id', item.id);
        if (error) return handleError(error, {});
        return data;
    }

    async deleteItem(id: string) {
        const { data, error } = await this.client.from(this.tableName)
            .delete()
            .eq('id', id);
        if (error) return handleError(error, {});
        return data;
    }





    static create(tableName: string) {
        return new SupabaseTableFactory(tableName);
    }


}