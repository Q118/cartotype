/**
 * this page is for the select item component from the addForm and editForm
 */
import { useEffect, useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { MdLibraryAddCheck } from 'react-icons/md';
// import { TbPhotoCheck, TbPhotoPlus } from 'react-icons/tb';
// import { GrSelect } from 'react-icons/gr';
import { AiOutlineSelect } from 'react-icons/ai';
// import { useTheme } from '../../context/ThemeContext';
import { StoreNoteCog } from "../store/StoreNoteCog";
import { CreditBanner } from "../store/CreditBanner";


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


// * NEXT TODO then put the notes part in

export function SelectItem({
    identifier,
    currentTheme,
    imgUrl,
    description,
    creditorDisplayName,
    handleOnSelect,
    identifierSelected,
    editMode = false,
}: SelectItemProps) {

    const [ isSelected, setIsSelected ] = useState(false);

    useEffect(() => {
        if (identifierSelected === identifier) setIsSelected(true);
        else setIsSelected(false);
    }, [ identifierSelected ])

    return (
        <>
            <Col>
                <Card id={`${identifier}-card`}
                    className={`h-100 store-card_admin ${isSelected ? 'selected-card' : ''}`}>
                    <Card.Img
                        title={description}
                        variant="top"
                        src={imgUrl}
                        height="200px"
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="top-right-container">
                        {editMode && <StoreNoteCog storeItem_id={identifier} />}
                    </div>
                    {(creditorDisplayName && creditorDisplayName.length > 0) && (
                        <CreditBanner creditorDisplayName={creditorDisplayName} />
                    )}
                    <Card.Body className={`d-flex flex-column store-card_admin-body`}>
                        <div style={{
                            marginTop: "1rem",
                            display: "flex",
                            gap: ".5rem",
                            justifyContent: "flex-end",
                        }}>
                            <Button onClick={handleOnSelect} id={identifier}
                                variant={`outline-${currentTheme === 'dark' ? 'light' : 'dark'}`}>
                                {!isSelected ? (<><AiOutlineSelect /> Select</>) : <MdLibraryAddCheck />}
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}