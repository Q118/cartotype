import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';


import { useTheme } from '../../context/ThemeContext';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import { SelectForm } from './SelectForm';
import { DetailForm } from './DetailForm';
import { InputSearchForm } from './InputSearchForm';
import { getPhotosForSelection } from "../../api/upsplash";
import { ResultItem, StorePrice } from '../../types';
import { StepTrack } from './StepTrack';
// import { addToStore } from '../../utilities/store';
import { addStoreItem } from '../../api/dataStore';
import { PreviewConfirm } from './PreviewConfirm';

// // TODO: put all the useQuery stuff into its own hooks file

// // handle the very last STEP... add the item to the database
// TODO: apply theme styling throughout Form Parts includin the nav buttons!


type FormData = {
    inputSearch: string;
    selectOptions: ResultItem[];
    selectedItem: ResultItem | null;
    price: StorePrice;
    storeTitle: string;
    isDataLoading: boolean;
    // displayPrice: number | null;
    // imgUrl: string;
}


const INITIAL_DATA: FormData = {
    inputSearch: '',
    selectOptions: [],
    selectedItem: null,
    price: { dollars: 0, cents: 0 },
    storeTitle: '',
    isDataLoading: false,
    // displayPrice: null,
    // imgUrl: '',
}


export function FormApp() {
    const [data, setData] = useState(INITIAL_DATA);
    const navigate = useNavigate();
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
        <PreviewConfirm
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
            if (!isFirstStep) { // its the second step (at least in this case)
                if (data.selectedItem === null) {
                    alert('select an item to continue');
                    return;
                }
            }
            return next();
        }
        if (isLastStep) {
            addStoreItem({
                id: uuidv4(),
                name: data.storeTitle,
                price: +`${data.price.dollars}.${data.price.cents}`,
                imgUrl: data.selectedItem?.imgUrl || '',
            }).then(() => {
                navigate('/store');
                // TODO naviagate themn to like a confirmation page/success page>..
                // * send it like ... const { state } = useLocation();
            }).catch((err) => {
                alert(`something went wrong: ${err}`)
            })
        }
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