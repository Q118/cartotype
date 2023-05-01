import { FormWrapper } from "../../utilities/FormWrapper";


type SearchFormData = {
    inputSearch: string;
}

type SearchFormProps = SearchFormData & {
    // ! this allows for aton of flexibility (in combo with how its setup in FormApp)
    // i.e. we can pass in any number of fields and get them updated without having to pass in all of them
    updateFields: (fields: Partial<SearchFormData>) => void
}


export function InputSearchForm({
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
                id="search-input"
                autoComplete="off"
                onChange={e => updateFields({ inputSearch: e.target.value })}
            />
        </FormWrapper>
    )
}