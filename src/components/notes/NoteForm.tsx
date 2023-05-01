import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import CreatableReactSelect from 'react-select/creatable';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import { NoteData, Tag } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { SelectableWrapper } from '../../utilities/SelectableWrapper';


// TODO: customize all the styling to be consistent with rest of app

type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
} & Partial<NoteData>; // pass in any of the note data as props but make them optional


export function NoteForm({ onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = [] }: NoteFormProps): JSX.Element {
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    const { currentTheme } = useTheme();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value, // they will never be null bc the refs are set to required so use ! to tell TS that
            tags: selectedTags
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
                        <Button type="button" variant="outline-secondary">Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )

}