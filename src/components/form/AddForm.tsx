import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import { SelectForm } from './SelectForm';
import { DetailForm } from './DetailForm';
import { InputSearchForm } from './InputSearchForm';
import { getPhotosForSelection } from "../../api/upsplash";
import { RawNote, ResultItem, StorePrice } from '../../types';
import { StepTrack } from './StepTrack';
import { addStoreItem } from '../../api/lib/storeItems';
import { PreviewConfirm } from './PreviewConfirm';


type FormData = {
    inputSearch: string;
    selectOptions: ResultItem[];
    selectedItem: ResultItem | null;
    price: number;
    storeTitle: string;
    isDataLoading: () => boolean;
    /** ids of notes to be attached to this store item */
    attachedNoteIds: string[];
    /** available global notes */
    availableNotes: RawNote[];
}



export function FormApp() {
    const { refreshStoreItems, availableNotes } = useShoppingCart();
    const navigate = useNavigate();
    const [ data, setData ] = useState<FormData>({
        inputSearch: '',
        selectOptions: [],
        selectedItem: null,
        price: 0,
        storeTitle: '',
        isDataLoading: () => false,
        attachedNoteIds: [],
        availableNotes: availableNotes,
    });
    const { data: resultData, isLoading, error, refetch, isFetching }: UseQueryResult = useQuery({
        queryKey: [ `photo-request-${data.inputSearch}` ],
        queryFn: () => getPhotosForSelection(data.inputSearch),
        enabled: false,
    });


    const { steps, currentStepIndex, step, isFirstStep, isLastStep, next, back, notify } = useMultistepForm([
        <InputSearchForm {...data} updateFields={updateFields} />,
        <SelectForm {...data} isDataLoading={() => isLoading || isFetching}
            refreshData={() => refetch()}
            updateFields={updateFields}
        />,
        <DetailForm {...data} updateFields={updateFields} />,
        <PreviewConfirm {...data} updateFields={updateFields} />,
    ]);


    function updateFields(fields: Partial<FormData>) {
        //* override all the old info with the new info
        setData(prev => ({ ...prev, ...fields }));
    }

    function handleLastStep() {
        addStoreItem({
            id: uuidv4(),
            name: data.storeTitle,
            price: data.price,
            imgUrl: data.selectedItem?.imgUrl || '',
            notes: data.attachedNoteIds,
            creditorDisplayName: data.selectedItem?.displayName || '',
        }).then(() => {
            refreshStoreItems(); // update the global store items.. aka trigger a refetch
            navigate('/store');
            notify(`Successfully added ${data.storeTitle} to the store!`);
        }).catch((err) => {
            notify(`something went wrong: ${err}`);
            return;
        })
    };

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
                    notify('Please select an item to continue.');
                    return;
                }
            }
            return next();// any other step in between the first and last
        }
        if (isLastStep) return handleLastStep();
    }

    return (
        <Container className="form-container">
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