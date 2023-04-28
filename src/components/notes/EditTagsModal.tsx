import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Tag } from '../../types';


type EditTagsModalProps = {
    show: boolean;
    availableTags: Tag[];
    handleClose: () => void;
    onDeleteTag: (id: string) => void;
    onUpdateTag: (id: string, label: string) => void;
}


export function EditTagsModal({ availableTags, show, handleClose, onDeleteTag, onUpdateTag }: EditTagsModalProps) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
                <Modal.Body>
                    <Form>
                        <Stack gap={2}>
                            {availableTags.map(tag => (
                                <Row key={tag.id}>
                                    <Col>
                                        <Form.Control type="text" value={tag.label}
                                            onChange={e => onUpdateTag(tag.id, e.target.value)}
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Button
                                            onClick={() => onDeleteTag(tag.id)}
                                            variant="outline-danger"
                                        >&times;
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                        </Stack>
                    </Form>
                </Modal.Body>
            </Modal.Header>
        </Modal>
    )
}