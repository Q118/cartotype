import { FormWrapper } from "./FormWrapper";
// import { ResultItem } from '../../types';
import { useTheme } from "../../context/ThemeContext";

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

    const { currentTheme } = useTheme();


    return (
        <FormWrapper title="Add New Store Item">
            <label>Search Term: </label>
            <input
                autoFocus
                required
                type="text"
                value={inputSearch}
                id={`input-${currentTheme}`}
                // !! tthis
                onChange={e => updateFields({ inputSearch: e.target.value })}
            />
        </FormWrapper>
    )
}