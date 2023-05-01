import { ThemeConfig } from "react-select";
import CreatableReactSelect from 'react-select/creatable';
import { Tag } from "../types";
import { useTheme } from "../context/ThemeContext";
import { v4 as uuidv4 } from 'uuid';

type SelectableWrapperProps = {
    placeholder?: string;
    /** boolean if there is an onCreate event ot take place */
    createOptionEnabled: boolean;
    availableTags: Tag[];
    selectedTags: Tag[];
    setSelectedTags: (tags: any) => void;
    onAddTag?: (tag: Tag) => void;
}



export function SelectableWrapper({
    placeholder = '',
    createOptionEnabled,
    availableTags,
    selectedTags,
    setSelectedTags,
    onAddTag = () => { }
}: SelectableWrapperProps): JSX.Element {
    const { currentTheme } = useTheme();

    const Theme: ThemeConfig = (theme) => ({
        ...theme,
        colors: {
            ...theme.colors,
            /** item hover in menu */
            primary25: currentTheme === 'dark' ? 'indigo' : '#e7d1ff',
            /** item click in menu */
            primary50: currentTheme === 'dark' ? 'darkblue' : 'lightblue',
            /** input background */
            neutral0: currentTheme === 'dark' ? '#212529' : '#f8f9fa',
            /** item background */
            neutral10: currentTheme === 'dark' ? 'darkgreen' : 'lightgreen',
            /** text color in item */
            neutral80: currentTheme === 'dark' ? '#f8f9fa' : '#212529',
        },
    })


    return (
        <>
            <CreatableReactSelect
                isMulti
                theme={Theme}
                placeholder={placeholder}
                value={selectedTags.map(tag => {
                    return { label: tag.label, value: tag.id }
                })}
                options={availableTags?.map(tag => {
                    return { label: tag.label, value: tag.id }
                })}
                onChange={tags => {
                    setSelectedTags(tags.map(tag => {
                        return { label: tag.label, id: tag.value }
                    }))
                }}
                onCreateOption={label => {
                    if (!createOptionEnabled) return undefined;
                    if (label.length === 0) return undefined;
                    const newTag = { id: uuidv4(), label };
                    onAddTag(newTag);
                    setSelectedTags((prevTags: any) => [...prevTags, newTag]);
                }}
                isValidNewOption={() => createOptionEnabled} // use to remove option to 'create new tag' like for NoteList...
            />
        </>
    )
}

/*
/**
     * Determines whether the "create new ..." option should be displayed based on
     * the current input value, select value and options array.
isValidNewOption?: (inputValue: string, value: Options<Option>, options: OptionsOrGroups<Option, Group>, accessors: Accessors<Option>) => boolean;
*/