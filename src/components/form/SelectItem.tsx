
import { useEffect, useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { MdLibraryAddCheck } from 'react-icons/md';
// import { TbPhotoCheck, TbPhotoPlus } from 'react-icons/tb';
import { GrSelect } from 'react-icons/gr';
import { AiOutlineSelect } from 'react-icons/ai';
// import { useTheme } from '../../context/ThemeContext';


type SelectItemProps = {
    identifier: string;
    currentTheme: string;
    imgUrl: string;
    description: string;
    handleOnSelect: (e: any) => void;
    identifierSelected: string | null;
}

// * NEXT TODO then put the notes part in

export function SelectItem({
    identifier,
    currentTheme,
    imgUrl,
    description,
    handleOnSelect,
    identifierSelected
}: SelectItemProps) {

    const [isSelected, setIsSelected] = useState(false);
    useEffect(() => {
        if (identifierSelected === identifier) {
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
    }, [identifierSelected])

    const currentThemeClasses: string = currentTheme === 'dark' ? 'bg-secondary text-white' : 'bg-white text-dark';


    return (
        <>
            <Col>
                <Card
                    id={`${identifier}-card`}
                    className={`h-100 ${isSelected ? 'selected-card' : ''}`}
                    style={{
                        border: `1px solid ${currentTheme === 'dark' ? '#ccc' : 'black'}`,
                    }}
                >
                    <Card.Img
                        title={description}
                        variant="top"
                        src={imgUrl}
                        height="200px"
                        style={{ objectFit: 'cover' }}
                    />
                    <Card.Body className={`d-flex flex-column ${currentThemeClasses}}`}>
                        <div style={{
                            marginTop: "1rem",
                            // this will get our buttons to the far right side
                            display: "flex",
                            gap: ".5rem",
                            justifyContent: "flex-end",
                        }}>
                            <Button
                                variant={`outline-${currentTheme === 'dark' ? 'light' : 'dark'}`}
                                onClick={handleOnSelect}
                                id={identifier}
                            >
                                {!isSelected ? (<><AiOutlineSelect /> Select</>) : <MdLibraryAddCheck />}
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}