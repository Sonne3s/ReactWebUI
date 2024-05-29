import React, { useState } from "react"

import PricesList from "./prices/List"
import PricesItem from "./prices/Item"
import PricesEdit from "./prices/Edit"
import PricesItemElement from "./prices/ItemElement"

export default function PricesPage(props) {
    const [colsNum, setColsNum] = useState(0);
    const [itemId, setItemId] = useState(0);
    const [showingPageType, setShowingPageType] = useState(0);

    function renderSwitch(param) {
        switch (param) {
            case 1:
                return <PricesItem setShowingPageType={setShowingPageType} itemId={itemId} setColsNum={setColsNum} />;
            case 2:
                return <PricesEdit setShowingPageType={setShowingPageType} />;
            case 3:
                return <PricesItemElement setShowingPageType={setShowingPageType} itemId={itemId} colsNum={colsNum} />;
            case 0:
            default:
                return <PricesList setShowingPageType={setShowingPageType} setItemId={setItemId} />;
        }
    }

    return (
        <div className="prices-page container-xxl bd-gutter mt-3 my-md-4 bd-layout">
            {renderSwitch(showingPageType)}
        </div>
    );
}