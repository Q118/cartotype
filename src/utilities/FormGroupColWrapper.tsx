/**
 * agnostic helper to wrap form group columns
 */

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';



export function FormGroupColWrapper(children: JSX.Element, label: string) {
    return (
        <Col>
            <Form.Group controlId={label.toLowerCase()}>
                <Form.Label>{label}</Form.Label>
                {children}
            </Form.Group>
        </Col>
    )
}