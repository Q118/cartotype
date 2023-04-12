
import { useEffect, useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { MdLibraryAddCheck } from 'react-icons/md';
// import { TbPhotoCheck, TbPhotoPlus } from 'react-icons/tb';
// import { GrSelect } from 'react-icons/gr';
import { AiOutlineSelect } from 'react-icons/ai';
// import { useTheme } from '../../context/ThemeContext';


type SelectItemProps = {
    editMode?: boolean;
    identifier: string;
    currentTheme: string;
    imgUrl: string;
    description: string;
    // creditorName: string;
    creditorDisplayName: string;
    handleOnSelect: (e: any) => void;
    identifierSelected: string | null;
}

const UNSPLASH_URL: string = 'https://unsplash.com/?utm_source=cartotype&utm_medium=referral';
const CREDITOR_URL = (username: string) => `https://unsplash.com/@${username}?utm_source=cartotype&utm_medium=referral`;

// * NEXT TODO then put the notes part in

export function SelectItem({
    identifier,
    currentTheme,
    imgUrl,
    description,
    // creditorName,
    creditorDisplayName,
    handleOnSelect,
    identifierSelected,
    editMode = false,
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
                <Card id={`${identifier}-card`}
                    className={`h-100 ${isSelected ? 'selected-card' : ''}`}
                    style={{ border: `1px solid ${currentTheme === 'dark' ? '#ccc' : 'black'}` }}>
                    <Card.Img
                        title={description}
                        variant="top"
                        src={imgUrl}
                        height="200px"
                        style={{ objectFit: 'cover' }}
                    />
                    {/* // TODO: persist the displayNames in to the database SO THAT we can use the crediting when in Edit Mode also! */}
                    {!editMode && (
                        <span className={`credit-text credit-text-${currentTheme}`}>
                            Photo by&nbsp;
                            <a href={CREDITOR_URL(creditorDisplayName)} target="_blank" rel="noreferrer">
                                {creditorDisplayName}
                            </a> on&nbsp;
                            <a href={UNSPLASH_URL} target="_blank" rel="noreferrer">
                                Unsplash
                            </a>
                        </span>
                    )}
                    <Card.Body className={`d-flex flex-column ${currentThemeClasses}`}>
                        <div style={{
                            marginTop: "1rem",
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