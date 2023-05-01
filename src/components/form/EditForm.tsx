import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import { updateStoreItem, getStoreItems } from '../../api/dataStore';
import { ResultItem, StorePrice } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import Container from 'react-bootstrap/Container';
import { useQuery } from '@tanstack/react-query';
import { SelectForm } from './SelectForm';
import { DetailForm } from './DetailForm';
import { StepTrack } from './StepTrack';
import { PreviewConfirm } from './PreviewConfirm';
import { consolidateStorePrice } from '../../utilities/formatCurrency';


type EditFormData = {
    selectOptions: ResultItem[];
    selectedItem: ResultItem | null;
    /** new price set by user */
    price: StorePrice;
    /** storeTitle aka the new title user may choose */
    storeTitle: string;
    isDataLoading: boolean;
};

const INITIAL_DATA: EditFormData = {
    selectOptions: [],
    selectedItem: null,
    price: { dollars: 0, cents: 0 },
    // displayPrice: null,
    storeTitle: '',
    isDataLoading: false,
};

export function EditForm() {
    const [data, setData] = useState(INITIAL_DATA);
    const navigate = useNavigate();

    const { data: storeItems, isLoading, error, refetch, isFetching }: any = useQuery({
        queryKey: [`get-all-store-items`],
        queryFn: () => getStoreItems(),
        enabled: true,
    });

    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        next,
        back,
        notify
    } = useMultistepForm([
        <SelectForm
            {...data}
            editMode={true}
            selectOptions={storeItems}
            isDataLoading={isFetching}
            refreshData={() => refetch()}
            updateFields={updateFields}
        />,
        <DetailForm {...data} updateFields={updateFields} />,
        <PreviewConfirm
            {...data}
            updateFields={updateFields}
            editMode={true}
        />,
    ]);
    function updateFields(fields: Partial<EditFormData>) {
        //* override all the old info with the new info
        setData(prev => ({ ...prev, ...fields }));
    }

    function handleLastStep() {
        updateStoreItem({
            id: data.selectedItem?.id || '',
            name: data.storeTitle,
            price: consolidateStorePrice(data.price),
            imgUrl: data.selectedItem?.imgUrl || '',
        }).then(() => {
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