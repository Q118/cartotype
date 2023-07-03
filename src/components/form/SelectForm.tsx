import { QueryObserverResult } from '@tanstack/react-query';
import { FiRefreshCcw } from 'react-icons/fi';
import Row from 'react-bootstrap/Row';
import { Spinner } from 'react-bootstrap';
import { TooltipWrapper } from '../../utilities/TooltipWrapper';
import { ResultItem } from '../../types';
import { SelectItem } from './SelectItem';
import { useTheme } from '../../context/ThemeContext';


type SelectFormData = {
    /** mode for edit, if false its in add mode */
    editMode?: boolean;
    price?: number;
    selectOptions: ResultItem[];
    selectedItem: ResultItem | null;
    inputSearch?: string;
    isDataLoading: () => boolean;
    storeTitle?: string;
    refreshData: () => Promise<QueryObserverResult<unknown, unknown>>;
};

type SelectFormProps = SelectFormData & {
    updateFields: (fields: Partial<SelectFormData>) => void
}


export function SelectForm({
    editMode = false,
    selectOptions,
    inputSearch = '',
    isDataLoading,
    refreshData,
    selectedItem,
    updateFields,
    // storeTitle = '',
}: SelectFormProps) {

    const { currentTheme } = useTheme();


    function handleRefreshData(e: any) {
        e.preventDefault();
        refreshData().then((res: any) => {
            //* this ensures we dont have any stale data
            updateFields({ selectOptions: res.data, selectedItem: null });
        });
    }

    function handleCardSelection(e: any) {
        e.preventDefault();
        if (selectedItem == null) { // first time selecting a card
            updateWithSelection(e.target.id);
        } else { // we have a selected card already
            if (selectedItem.id === e.target.id) {
                updateFields({ selectedItem: null });
            } else {
                updateWithSelection(e.target.id);
            }
        }
    }

    function updateWithSelection(identifier: string) {
        const selectedItem: any = findSelection(selectOptions, identifier);
        updateFields({
            selectedItem: selectedItem,
            ...(selectedItem && selectedItem.notes && selectedItem.notes.length > 0) && { attachedNoteIds: selectedItem.notes },
            ...editMode && { price: selectedItem?.price },
            ...editMode && { storeTitle: selectedItem?.name },
        });
    }

    function findSelection(list: ResultItem[], id: string) {
        for (let x = 0, max = list.length; x < max; x++) {
            let selectOption = list[ x ];
            if (selectOption && selectOption.id === id) return selectOption;
        }
    }


    // TODO change this for in edit mode
    if (selectOptions?.length === 0) return (
        <p style={{ textAlign: "center", padding: "20px" }}>
            <strong>No results found for "{inputSearch}"</strong>
        </p>
    );

    return (
        <>
            {isDataLoading() === true && (
                <div>
                    <Spinner animation="grow" variant="success" />
                    <p>Loading...</p>
                    <Spinner animation="grow" variant="success" />
                </div>
            )}
            {isDataLoading() === false && (
                <div className="admin-scroll-wrapper">
                    {!editMode && (
                        <TooltipWrapper
                            placement='right'
                            overlayTitle='Refresh to get new results!'
                            children={<button onClick={handleRefreshData}>
                                <FiRefreshCcw />
                            </button>}
                        />
                    )}
                    <h2 style={{
                        textAlign: "center",
                        margin: "0px 0px 2rem"
                    }}>
                        Select a Card to {editMode ? "Edit" : "Display"} {inputSearch ? `"${inputSearch}"` : 'the item'}
                    </h2>
                    <Row md={2} xs={1} lg={3} className="g-3 admin-inner-scroll">
                        {selectOptions?.map((item: ResultItem) => {
                            return (
                                <SelectItem
                                    editMode={editMode}
                                    key={item.id}
                                    identifier={item.id}
                                    currentTheme={currentTheme}
                                    imgUrl={item.imgUrl}
                                    description={item.description}
                                    // creditorName={item.name}
                                    creditorDisplayName={item.creditorDisplayName || ''}
                                    handleOnSelect={handleCardSelection}
                                    identifierSelected={selectedItem?.id || null}
                                />
                            )
                        }) || 'no results to display'}
                    </Row>



                </div>
            )}
        </>
    )
}