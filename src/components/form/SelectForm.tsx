// import { FormWrapper } from "./FormWrapper";
// import { useState } from 'react';
import { TooltipWrapper } from '../../utilities/TooltipWrapper';
import { FiRefreshCcw } from 'react-icons/fi';
import { ResultItem } from '../../types';
import Row from 'react-bootstrap/Row';
import { SelectItem } from '../SelectItem';
import { useTheme } from '../../context/ThemeContext';

type SelectFormData = {
    selectOptions: ResultItem[];
    inputSearch: string;
    isDataLoading: boolean;
    refreshData: () => Promise<ResultItem[]>;
};

type SelectFormProps = SelectFormData & {
    updateFields: (fields: Partial<SelectFormData>) => void
}

// TODO : give each card an little check box to select it
// TODO: apply theme styling throughout
// TODO: tooltop over the refresh button


export function SelectForm({
    selectOptions,
    inputSearch,
    isDataLoading,
    refreshData,
    updateFields,
}: SelectFormProps) {

    const { currentTheme } = useTheme();
    // console.log(isDataLoading);

    function handleRefreshData() {
        refreshData().then((res: any) => {
            // console.log(res);
            updateFields({ selectOptions: res.data });
            // return next();
        });
        refreshData();
    }

    return (
        // <FormWrapper title="Select an Item">
        <>
            {/* TODO implement a spinnger or something that signals loading */}
            {isDataLoading === true ? (
                <div>
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    {/* <button onClick={handleRefreshData}> */}
                    {/* <FiRefreshCcw /> */}
                    <TooltipWrapper
                        placement='right'
                        overlayTitle='Refresh to get new results!'
                        children={<button onClick={handleRefreshData}>
                            <FiRefreshCcw />
                        </button>}
                    />
                    {/* </button> */}
                    {/*! they can go back if they want to do a new search.. thats intuitive enough
                    .. bc we are using logic like to hold those selecctItems...
                    */}
                    <h2 style={{
                        textAlign: "center",
                        margin: "0px 0px 2rem"
                    }}>Select a Card to Display "{inputSearch}" </h2>
                    <Row md={2} xs={1} lg={3} className="g-3">
                        {selectOptions?.map((item: ResultItem) => {
                            // TODO add click event for selected
                            return (
                                <SelectItem
                                    key={item.id}
                                    currentTheme={currentTheme}
                                    imgUrl={item.imgUrl}
                                    description={item.description}
                                />
                            )
                        }) || 'no results to display'}
                    </Row>
                </>
            )}

        </>
    )
}