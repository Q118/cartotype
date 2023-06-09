import { QueryObserverResult } from '@tanstack/react-query';
import { FiRefreshCcw } from 'react-icons/fi';
import Row from 'react-bootstrap/Row';
import { Spinner } from 'react-bootstrap';
import { TooltipWrapper } from '../../utilities/TooltipWrapper';
import { ResultItem, StorePrice } from '../../types';
import { SelectItem } from './SelectItem';
import { useTheme } from '../../context/ThemeContext';


type SelectFormData = {
    /** mode for edit, if false its in add mode */
    editMode?: boolean;
    price?: StorePrice;
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
        // console.log('selectedItem:', selectedItem)
        const itemPrice: StorePrice = parseStorePrice(selectedItem?.price);
        updateFields({
            selectedItem: selectedItem,
            // !! get thisg ogining.. need to parse out price or have it saved somewhere
            ...editMode && { price: { dollars: itemPrice?.dollars, cents: itemPrice?.cents } },
            ...editMode && { storeTitle: selectedItem?.name },
        });
    }

    function findSelection(list: ResultItem[], id: string) {
        for (let x = 0, max = list.length; x < max; x++) {
            let selectOption = list[ x ];
            if (selectOption.id === id) return selectOption;
        }
    }

    /**
     * 
     * @function parseStorePrice - parses the price from the store into dollars and cents
     * @returns {StorePrice}
     */
    function parseStorePrice(price: number): StorePrice {
        const dollars = Math.floor(price);
        const cents = +(price - dollars).toFixed(2).split('0.')[ 1 ];
        return { dollars, cents };
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
                <div className="edit-select-items-wrapper">
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
                    <Row md={2} xs={1} lg={3} className="g-3 edit-select-items">
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
                                    creditorDisplayName={item.displayName}
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