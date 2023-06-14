import { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import { updateStoreItem } from '../../api/lib/storeItems';
import { RawNote, ResultItem, StorePrice } from '../../types';
import Container from 'react-bootstrap/Container';
import { SelectForm } from './SelectForm';
import { DetailForm } from './DetailForm';
import { StepTrack } from './StepTrack';
import { PreviewConfirm } from './PreviewConfirm';
import { useShoppingCart } from '../../context/ShoppingCartContext';



type EditFormData = {
    selectOptions: ResultItem[];
    selectedItem: ResultItem | null;
    /** new price set by user */
    price: number;
    /** storeTitle aka the new title user may choose */
    storeTitle: string;
    isDataLoading: () => boolean;
    /** ids of notes to be attached to this store item */
    attachedNoteIds: string[];
    /** available global notes */
    availableNotes: RawNote[];
};


type EditFormProps = {
    startStep?: number|null;
};

export function EditForm({ startStep = null }: EditFormProps) {
    const navigate = useNavigate();
    const { globalStoreItems, refreshStoreItems, isStoreItemsLoading, availableNotes } = useShoppingCart();

    const [ data, setData ] = useState<EditFormData>({
        selectOptions: [],
        selectedItem: null,
        price: 0,
        storeTitle: '',
        isDataLoading: () => false,
        attachedNoteIds: [],
        availableNotes: availableNotes,
    });


    useEffect(() => {
        console.log('change to data', data)
    }, [JSON.stringify(data)])

    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        next,
        back,
        notify,
        goTo
    } = useMultistepForm([
        <SelectForm
            {...data}
            editMode={true}
            selectOptions={globalStoreItems}
            isDataLoading={() => isStoreItemsLoading()}
            refreshData={() => refreshStoreItems()}
            updateFields={updateFields}
        />,
        <DetailForm {...data} updateFields={updateFields} />,
        <PreviewConfirm
            {...data}
            updateFields={updateFields}
            editMode={true}
        />,
    ], startStep);

    console.log('currentStepIndex: ', currentStepIndex);
    // if (startStep) goTo(startStep);

    function updateFields(fields: Partial<EditFormData>) {
        //* override all the old info with the new info
        setData(prev => ({ ...prev, ...fields }));
        //* for nested parts of data, still have to do the ...prev
    }

    function handleLastStep() {
        updateStoreItem({
            id: data.selectedItem?.id || '',
            name: data.selectedItem?.name || data.storeTitle,
            price: data.selectedItem?.price || data.price,
            imgUrl: data.selectedItem?.imgUrl || '',
            notes: data.attachedNoteIds
        }).then(() => {
            refreshStoreItems();
            navigate('/store');
            notify(`Successfully updated ${data.storeTitle} in the store`);
        }).catch((err) => {
            notify(`something went wrong: ${err}`);
            return;
        })
    }


    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (isFirstStep) { // then its the select one
            console.log(data)
            if (data.selectedItem === null || !data.selectedItem) {
                alert('select an item to continue');
                return;
            }
            // navigate(`/admin/${data.selectedItem.id}/edit`);
            return next();
        }
        if (!isLastStep) return next();
        if (isLastStep) handleLastStep();
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
                    editMode={true}
                />
            </form>
        </Container>
    )
}