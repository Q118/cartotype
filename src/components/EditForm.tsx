// TODO: use a similar approach to the FormApp component to create an EditForm component
// it will allow user to update/delete items in the db
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMultistepForm } from '../hooks/useMultistepForm';
import { updateStoreItem, getStoreItems } from '../api/dataStore';
import { ResultItem, StorePrice } from '../types';
import { useTheme } from '../context/ThemeContext';
import Container from 'react-bootstrap/Container';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { SelectForm } from './form/SelectForm';
import { DetailForm } from './form/DetailForm';
import { StepTrack } from './form/StepTrack';
import { PreviewConfirm } from './form/PreviewConfirm';

/* select an item to edit:
display items and select one
next one
edit the properties of the item
last one:
holds preview and confirm and submit
*/

// !! keep goi9ng with this and compare side by side with FormApp to do a siumilar flwo
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
    storeTitle: '',
    isDataLoading: false,
};

export function EditForm() {
    const [data, setData] = useState(INITIAL_DATA);
    const navigate = useNavigate();
    const { currentTheme } = useTheme();

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
        // {...data}
        // updateFields={updateFields}
        />,
    ]);
    function updateFields(fields: Partial<EditFormData>) {
        //* override all the old info with the new info
        setData(prev => ({ ...prev, ...fields }));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (isFirstStep) { // then its the select one
            if (data.selectedItem === null) {
                alert('select an item to continue');
                return;
            }
        }
        if (!isLastStep) {
            if (!isFirstStep) { // its the second step (at least in this case when only 3 steps)
                // if (data.selectedItem === null) {
                //     alert('select an item to continue');
                //     return;
                // }
                alert('placeholder for validating the fields');
                return;
            }
            return next();
        }
        if (isLastStep) {
            // addStoreItem({
            //     id: uuidv4(),
            //     name: data.storeTitle,
            //     price: +`${data.price.dollars}.${data.price.cents}`,
            //     imgUrl: data.selectedItem?.imgUrl || '',
            // }).then(() => {
            //     navigate('/store');
            //     // TODO naviagate themn to like a confirmation page/success page>..
            //     // * send it like ... const { state } = useLocation();
            // }).catch((err) => {
            //     alert(`something went wrong: ${err}`)
            // })
            alert('submitting last step')
        }
    }



    return (
        <Container style={{
            border: `1px solid ${currentTheme === 'dark' ? 'white' : 'black'}`,
            borderRadius: '5px',
            padding: '1rem',
            position: "relative",
            maxWidth: "max-content",
        }}>
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