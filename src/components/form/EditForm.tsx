import { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import { updateStoreItem } from '../../api/lib/storeItems';
import { RawNote, ResultItem, StorePrice } from '../../types';
// import { useTheme } from '../../context/ThemeContext';
import Container from 'react-bootstrap/Container';
// import { useQuery } from '@tanstack/react-query';
import { SelectForm } from './SelectForm';
import { DetailForm } from './DetailForm';
import { StepTrack } from './StepTrack';
import { PreviewConfirm } from './PreviewConfirm';
import { consolidateStorePrice } from '../../utilities/formatCurrency';
import { useShoppingCart } from '../../context/ShoppingCartContext';
// import { useAdminLayoutContext } from '../AdminLayout';


type EditFormData = {
    selectOptions: ResultItem[];
    selectedItem: ResultItem | null;
    /** new price set by user */
    price: StorePrice;
    /** storeTitle aka the new title user may choose */
    storeTitle: string;
    isDataLoading: () => boolean;
    /** ids of notes to be attached to this store item */
    attachedNoteIds: string[];
    /** available global notes */
    availableNotes: RawNote[];
};

// okay so right now just hit next and it does go bit top get to the edit it just resets it back to the first step even when we provide a startStep
// why, bc the startStep is not being passed down to the multistepform hook
// to pass it down, we need to pass it down to the EditForm component, and then pass it down to the multistepform hook



type EditFormProps = {
    startStep?: number|null;
};

export function EditForm({ startStep = null }: EditFormProps) {
    // const selected_item = useAdminLayoutContext(); 
    const navigate = useNavigate();
    const { globalStoreItems, refreshStoreItems, isStoreItemsLoading, availableNotes } = useShoppingCart();

    const [ data, setData ] = useState<EditFormData>({
        selectOptions: [],
        selectedItem: null,
        price: { dollars: 0, cents: 0 },
        storeTitle: '',
        isDataLoading: () => false,
        attachedNoteIds: [],
        availableNotes: availableNotes,
    });


    useEffect(() => {
        console.log('change to data', data)
    }, [data])

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
    }

    function handleLastStep() {
        updateStoreItem({
            id: data.selectedItem?.id || '',
            name: data.selectedItem?.name || data.storeTitle,
            price: data.selectedItem?.price || consolidateStorePrice(data.price),
            imgUrl: data.selectedItem?.imgUrl || '',
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