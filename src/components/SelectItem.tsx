import { Col, Card, Button } from "react-bootstrap";

type SelectItemProps = {
    currentTheme: string;
    imgUrl: string;
    description: string;
}

// !!! PU HERE... fix the button visual then keep building the form steps
// * then put the notes part in

export function SelectItem({ currentTheme, imgUrl, description }: SelectItemProps) {
    
    const currentThemeClasses: string = currentTheme === 'dark' ? 'bg-secondary text-white' : 'bg-white text-dark';
    

    return (
        <>
            <Col>
                <Card className='h-100' style={{
                    border: `1px solid ${currentTheme === 'dark' ? '#ccc' : 'black'}`,
                }}>
                    <Card.Img
                        variant="top"
                        src={imgUrl}
                        height="200px"
                        style={{ objectFit: 'cover' }}
                    />
                    <Card.Body className={`d-flex flex-column ${currentThemeClasses}}`}>
                        <Card.Title>{description}</Card.Title>
                        <Button>select</Button>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}