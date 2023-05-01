import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Tag } from '../../types';
import { useTheme } from '../../context/ThemeContext';

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
            <Modal.Header>
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
                                            title="Delete Tag"
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
                <Button id="close-modal-x" onClick={handleClose}>
                    &times;
                </Button>
            </Modal.Header>
        </Modal>
    )
}