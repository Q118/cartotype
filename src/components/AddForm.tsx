import { useState } from 'react';
import {
    Row,
    Card,
    InputGroup,
    Container,
    Form,
    Button,
    Col
} from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '../context/ThemeContext';
import { getPhotosForSelection } from "../api/axios";
import { SelectItem } from './SelectItem';

type ResultItem = {
    id: string;
    description: string;
    imgUrl: string;
    downloadLocation: string;
}


export function AddForm() {
    const { currentTheme } = useTheme();

    // const BORDER = currentTheme === 'dark' ? '1px solid white' : '1px solid black';
    
    const [formState, setFormState] = useState({
        searchInput: '',
        // .. other things
    });
    
    const currentThemeClasses: string = currentTheme === 'dark' ? 'bg-secondary text-white' : 'bg-white text-dark';

    const { data, isLoading, error, refetch, isFetching }: any = useQuery({
        queryKey: [`photo-request-${formState.searchInput}`],
        queryFn: () => getPhotosForSelection(formState.searchInput),
        enabled: false,
    });


    function handleSearchClick(e: any) {
        e.preventDefault();
        refetch();
        console.log('search clicked');
    }


    return (
        <Container style={{
            border: `1px solid ${currentTheme === 'dark' ? 'white' : 'black'}`,
            borderRadius: '5px',
            padding: '1rem',
        }}>
            <div className='text-center'>
                <h3>Add New Store Item</h3>
            </div>
            <br />
            {/* <hr /> */}
            <InputGroup className='mb-2'>
                <Form.Label>
                    Enter Input:
                </Form.Label>&nbsp;
                <Form.Control
                    className={`bg-${currentTheme}`}
                    placeholder="e.g. wallet, hat, golf club, etc..."
                    aria-label="User-input-item"
                    style={{ color: 'inherit' }}
                    onChange={(e) => setFormState({ ...formState, searchInput: e.target.value })}
                />
                <Button
                    id={`${currentTheme}Cart`}
                    variant="outline-light"
                    onClick={(e) => handleSearchClick(e)}
                >
                    Search
                </Button>
            </InputGroup>
            {/* TODO implement a spinnger or something that signals loading */}
            {isLoading === true && (
                <div>
                    <p>Loading...</p>
                </div>
            )}
            <Row md={2} xs={1} lg={3} className="g-3">
                {data?.map((item: ResultItem) => {
                    return (
                        <SelectItem 
                            key={item.id}
                            currentTheme={currentTheme}
                            imgUrl={item.imgUrl}
                            description={item.description}
                        />
                    )
                })}
            </Row>
        </Container>
    )


}