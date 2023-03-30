import { FormEvent, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useTheme } from '../../context/ThemeContext';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import { SelectForm } from './SelectForm';
import { DetailForm } from './DetailForm';
import { InputSearchForm } from './InputSearchForm';
import { getPhotosForSelection } from "../../api/axios";
import { ResultItem, StorePrice } from '../../types';
import { StepTrack } from './StepTrack';


// ? TODO: put all the useQuery stuff into its own hooks file

// TODO: handle the very last STEP... add the item to the database
// TODO: apply theme styling throughout Form Parts


type FormData = {
    inputSearch: string;
    selectOptions: ResultItem[];
    selectedItem: ResultItem | null;
    price: StorePrice;
    storeTitle: string;
    isDataLoading: boolean;
}


const INITIAL_DATA: FormData = {
    inputSearch: '',
    selectOptions: [],
    selectedItem: null,
    price: { dollars: 0, cents: 0 },
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
        <SelectForm
            {...data}
            isDataLoading={isDataLoading}
            refreshData={() => refetch()}
            updateFields={updateFields}
        />,
        <DetailForm
            {...data}
            updateFields={updateFields}
        />,
    ]);


    function updateFields(fields: Partial<FormData>) {
        //* override all the old info with the new info
        setData(prev => ({ ...prev, ...fields }));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (isFirstStep) { // then its the search one
            refetch().then((res: any) => {
                updateFields({ selectOptions: res.data });
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
                <StepTrack
                    stepLength={steps.length}
                    currentStepIndex={currentStepIndex}
                    step={step}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    back={back}
                />
            </form>
        </Container>
    )
}