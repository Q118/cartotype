import { FormEvent, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useTheme } from '../../context/ThemeContext';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import { SelectForm } from './SelectForm';
import { DetailForm } from './DetailForm';
import { InputSearchForm } from './InputSearchForm';
import { getPhotosForSelection } from "../../api/axios";
// TODO: put all the useQuery stuff into its own hooks file
import { ResultItem } from '../../types';

// TODO update all the individual forms to use what INputSearch is doing


// TODO : NEED TO handle the case where user enters a search term that returns no results..
// ! right now its throwing errors...

type FormData = {
    inputSearch: string;
    selectOptions: ResultItem[];
    selectedItem: ResultItem | null;
    price: number;
    storeTitle: string;
    isDataLoading: boolean;
}

// firstName: string;
// lastName: string;
// age: string;
// street: string;
// city: string;
// state: string;
// zip: string;
// email: string;
// password: string;


const INITIAL_DATA: FormData = {
    inputSearch: '',
    selectOptions: [],
    selectedItem: null,
    price: 0,
    storeTitle: '',
    isDataLoading: false,
}


export function FormApp() {
    const [data, setData] = useState(INITIAL_DATA);

    const { data: resultData, isLoading, error, refetch, isFetching: isDataLoading }: UseQueryResult = useQuery({
        queryKey: [`photo-request-${data.inputSearch}`],
        queryFn: () => getPhotosForSelection(data.inputSearch),
        enabled: false,
    });

    const { currentTheme } = useTheme();
    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        next,
        back,
    } = useMultistepForm([
        <InputSearchForm {...data} updateFields={updateFields} />,
        <SelectForm {...data}
            isDataLoading={isDataLoading}
            refreshData={() => refetch()}
            updateFields={updateFields}
        />,
        <DetailForm  {...data}
            updateFields={updateFields}
        />,
    ]);


    function updateFields(fields: Partial<FormData>) {
        // override all teh old info with the new info
        setData(prev => ({ ...prev, ...fields }));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (isFirstStep) { // then its the search one
            refetch().then((res: any) => {
                console.log(res);
                updateFields({ selectOptions: res.data });
                // return next();
            });
        }
        if (!isLastStep) {
            if (!isFirstStep) { // its the second step
                if (data.selectedItem === null) {
                    alert('select an item to continue');
                    return;
                }
            }
            return next();
        }
        if (isLastStep) alert('all done!'); //TODO set in to the Storedata instead of alert
    }

    return (
        <Container
            style={{
                border: `1px solid ${currentTheme === 'dark' ? 'white' : 'black'}`,
                borderRadius: '5px',
                padding: '1rem',
                position: "relative",
                maxWidth: "max-content",
            }}
        >
            <form onSubmit={handleSubmit}>
                {/* top corner position of step display */}
                <div style={{
                    position: 'absolute',
                    top: '.5rem',
                    right: '.5rem'
                }}>
                    {currentStepIndex + 1} / {steps.length}
                </div>
                {step}
                <div
                    style={{
                        marginTop: "1rem",
                        // this will get our buttons to the far right side
                        display: "flex",
                        gap: ".5rem",
                        justifyContent: "flex-end",
                    }}
                >
                    {!isFirstStep && <button type="button" onClick={back}>Back</button>}
                    <button type="submit">
                        {isLastStep ? "Finish" : isFirstStep ? "Search" : "Next"}
                    </button>
                </div>
            </form>
        </Container>
    )
}