import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
// import CreatableReactSelect from 'react-select/creatable';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import { NoteData, Tag, StoreItem, StoreItemTag } from '../../types';
import { SelectableWrapper } from '../../utilities/SelectableWrapper';
import { useShoppingCart } from '../../context/ShoppingCartContext';

type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
    storeTags?: StoreItemTag[];
} & Partial<NoteData>; // pass in any of the note data as props but make them optional


export function NoteForm({ onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = [], storeTags = [] }: NoteFormProps): JSX.Element {
    const { globalStoreItemTags } = useShoppingCart();
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const [selectedStoreItemTags, setSelectedStoreItemTags] = useState<StoreItemTag[]>(storeTags);


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
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} required defaultValue={title} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <SelectableWrapper
                                createOptionEnabled={true}
                                availableTags={availableTags}
                                selectedTags={selectedTags}
                                setSelectedTags={setSelectedTags}
                                onAddTag={onAddTag}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="store-items">
                            <Form.Label>Store Items</Form.Label>
                            <SelectableWrapper
                                createOptionEnabled={false}
                                availableTags={globalStoreItemTags}
                                selectedTags={selectedStoreItemTags}
                                setSelectedTags={setSelectedStoreItemTags}
                            />
                        </Form.Group>
                    </Col>

                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control ref={markdownRef} as="textarea" rows={15} required defaultValue={markdown} />
                    <Form.Text className="text-muted">
                        Markdown is supported.
                    </Form.Text>
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="submit">Save</Button>
                    <Link to="..">
                        <Button type="button" variant="secondary">Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )

}