import { QueryObserverResult } from '@tanstack/react-query';
import { FiRefreshCcw } from 'react-icons/fi';
import Row from 'react-bootstrap/Row';
import { Spinner } from 'react-bootstrap';
import { GrSelect } from 'react-icons/gr';
import { MdLibraryAddCheck } from 'react-icons/md';
// import { useRef } from 'react';

import { TooltipWrapper } from '../../utilities/TooltipWrapper';
import { ResultItem } from '../../types';
import { SelectItem } from './SelectItem';
import { useTheme } from '../../context/ThemeContext';
// TODO: apply theme styling throughout

// TODO: modulate this file.

// ! now just apply the same stuff to the last step of the form

type SelectFormData = {
    selectOptions: ResultItem[];
    selectedItem: ResultItem | null;
    inputSearch: string;
    isDataLoading: boolean;
    refreshData: () => Promise<QueryObserverResult<unknown, unknown>>;
};

type SelectFormProps = SelectFormData & {
    updateFields: (fields: Partial<SelectFormData>) => void
}

// // TODO : give each card an little check box to select it
// // TODO: tooltop over the refresh button


export function SelectForm({
    selectOptions,
    inputSearch,
    isDataLoading,
    refreshData,
    selectedItem,
    updateFields,
}: SelectFormProps) {

    const { currentTheme } = useTheme();


    function handleRefreshData() {
        refreshData().then((res: any) => {
            // console.log(res);
            updateFields({ selectOptions: res.data });
            // return next();
        });
        refreshData();
    }

    function handleCardSelection(e: any) {
        e.preventDefault();
        if (selectedItem == null) {
            // first time selecting a card
            updateFields({ selectedItem: findSelection(selectOptions, e.target.id) });
        } else {
            // we have a selected card already
            if (selectedItem.id === e.target.id) {
                updateFields({ selectedItem: null });
            } else {
                updateFields({ selectedItem: findSelection(selectOptions, e.target.id) });
            }
        }
    }

    function findSelection(list: ResultItem[], id: string) {
        for (let x = 0, max = list.length; x < max; x++) {
            let selectOption = list[x];
            if (selectOption.id === id) return selectOption;
        }
    }


    return (
        <>
            {isDataLoading === true ? (
                <div>
                    <Spinner animation="grow" variant="success" />
                    <p>Loading...</p>
                    <Spinner animation="grow" variant="success" />
                </div>
            ) : (
                <>
                    <TooltipWrapper
                        placement='right'
                        overlayTitle='Refresh to get new results!'
                        children={<button onClick={handleRefreshData}>
                            <FiRefreshCcw />
                        </button>}
                    />
                    <h2 style={{
                        textAlign: "center",
                        margin: "0px 0px 2rem"
                    }}>
                        Select a Card to Display "{inputSearch}"
                    </h2>
                    <Row md={2} xs={1} lg={3} className="g-3">
                        {selectOptions?.map((item: ResultItem) => {
                            // TODO add click event for selected                                                
                            return (
                                <SelectItem
                                    key={item.id}
                                    identifier={item.id}
                                    currentTheme={currentTheme}
                                    imgUrl={item.imgUrl}
                                    description={item.description}
                                    handleOnSelect={handleCardSelection}
                                    identifierSelected={selectedItem?.id || null}
                                />
                            )
                        }) || 'no results to display'}
                    </Row>
                </>
            )}
        </>
    )
}