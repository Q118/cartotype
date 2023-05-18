import { ThemeConfig } from "react-select";
import CreatableReactSelect from 'react-select/creatable';
import { Tag, StoreItemTag } from "../types";
import { useTheme } from "../context/ThemeContext";
import { v4 as uuidv4 } from 'uuid';



type SelectableWrapperProps = {
    placeholder?: string;
    /** boolean if there is an onCreate event to take place.. */
    createOptionEnabled: boolean;
    /** tags are tags OR they are store item names... */
    availableTags: Tag[] | StoreItemTag[];
    selectedTags: Tag[] | StoreItemTag[];
    setSelectedTags: (tags: any) => void;
    onAddTag?: (tag: Tag) => void;
    /** its true if its for tags and false for storeItemTags.. */
    isRawTag: boolean;
}



export function SelectableWrapper({
    placeholder = '',
    createOptionEnabled,
    availableTags,
    selectedTags,
    setSelectedTags,
    onAddTag = () => { },
    isRawTag
}: SelectableWrapperProps): JSX.Element {
    const { currentTheme, isDark } = useTheme();

    // const isRawTag = createOptionEnabled;

    const Theme: ThemeConfig = (theme) => ({
        ...theme,
        colors: {
            ...theme.colors,
            /** item hover in menu */
            primary25: isDark() ? 'var(--bs-secondary)' : 'lightgray',
            // ...isRawTag && { primary25: 'var(--tag-background)' },
            // ...!isRawTag && { primary25: 'var(--storeTag-background)' },
            /** item click in menu */
            primary50: 'var(--accent)',
            /** input background */
            neutral0: isDark() ? 'var(--primary-bg)' : '#f8f9fa',
            /** item background */
            ...isRawTag && { neutral10: 'var(--tag-background)' },
            ...!isRawTag && { neutral10: 'var(--storeTag-background)' },
            /** text color in item */
            neutral80: 'var(--primary-bg)',
            // neutral90: 'pink'
        },
    })

    // console.log('selectedTags', selectedTags);
    // console.log('availableTags', availableTags);



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
                    if (!label || label.length == 0) return undefined;
                    const newTag = { id: uuidv4(), label };
                    onAddTag(newTag);
                    setSelectedTags((prevTags: any) => [ ...prevTags, newTag ]);
                }}
                // use to remove option to 'create new tag' like for NoteList...
                isValidNewOption={(inputValue: string) => createOptionEnabled && inputValue.length > 0}
            />
        </>
    )
}