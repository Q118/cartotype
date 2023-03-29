import { FormWrapper } from "./FormWrapper";
import { ResultItem } from '../../types';

type SearchFormData = {
    // firstName: string
    // lastName: string
    // age: string
    inputSearch: string;
}

type SearchFormProps = SearchFormData & {
    // ! this allows for aton of flexibility (in combo with how its setup in FormApp)
    // i.e. we can pass in any number of fields and get them updated without having to pass in all of them
    updateFields: (fields: Partial<SearchFormData>) => void
}


export function InputSearchForm({
    // firstName,
    // lastName,
    // age,
    inputSearch,
    updateFields,
}: SearchFormProps) {
    return (
        <FormWrapper title="Add New Store Item">
            <label>Search Term: </label>
            <input
                autoFocus
                required
                type="text"
                value={inputSearch}
                // !! tthis
                onChange={e => updateFields({ inputSearch: e.target.value })}
            />
        </FormWrapper>
    )
}