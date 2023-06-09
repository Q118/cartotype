import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import { NoteData, Tag, StoreItem, StoreItemTag } from '../../types';
import { SelectableWrapper } from '../../utilities/SelectableWrapper';
import { FormGroupColWrapper } from '../../utilities/FormGroupColWrapper';


type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
    availableStoreTags: StoreItemTag[];
} & Partial<NoteData>; // pass in any of the note data as props but make them optional


export function NoteForm({
    onSubmit,
    onAddTag,
    availableTags,
    title = "",
    markdown = "",
    tags = [],
    availableStoreTags,
    storeItemTags = []
}: NoteFormProps): JSX.Element {
    const [ selectedTags, setSelectedTags ] = useState<Tag[]>(tags);
    const [ selectedStoreItemTags, setSelectedStoreItemTags ] = useState<StoreItemTag[]>(storeItemTags);
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value, // they will never be null bc the refs are set to required so use ! to tell TS that
            tags: selectedTags,
            storeItemTags: selectedStoreItemTags
        })
        navigate('..');
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>{FormGroupColWrapper(<Form.Control ref={titleRef} required defaultValue={title} />, 'Title')}</Row>
                <Row>{FormGroupColWrapper(<SelectableWrapper
                    createOptionEnabled={true}
                    availableTags={availableTags}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    onAddTag={onAddTag}
                    isRawTag={true}
                />, 'Tags')}
                    {FormGroupColWrapper(<SelectableWrapper
                        createOptionEnabled={false}
                        availableTags={availableStoreTags}
                        selectedTags={selectedStoreItemTags}
                        setSelectedTags={setSelectedStoreItemTags}
                        isRawTag={false}
                    />, 'Store Item Tags')}
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control ref={markdownRef} as="textarea" rows={15} required defaultValue={markdown} />
                    <div className="mt-1">
                        <Form.Text className="text-muted">
                            Markdown is supported. (Follows <a href="https://github.github.com/gfm/" target="_blank">GitHub Flavored Markdown</a>)
                        </Form.Text>
                    </div>
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="submit" className="carto-btn">Save</Button>
                    <Link to=".."><Button type="button" className='carto-btn-alt'>Cancel</Button></Link>
                </Stack>
            </Stack>
        </Form>
    )
}