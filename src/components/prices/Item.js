import React, { useState, useEffect } from "react"
import Constants from "../../utilities/Constants"
import ItemPagination from "./ItemPagination"
import ItemModal from "./ItemModal"

export default function PricesItem(props) {
    const [delecteId, setDeleteId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isDesc, setIsDesc] = useState(false);
    const [sortId, setSortId] = useState(0);
    const [response, setResponse] = useState({ currentPageNum: null, pageCount: null, price: { id: null, name: null, priceRows: [], priceCols: [] } });
    const [cells, setCells] = useState([]);

    function getData(itemId, sort, desc, page) {
        setSortId(sort);
        setIsDesc(desc);
        const url = Constants.URLS.API_URL_GET_PRICES_ITEM + "/" + itemId + "-" + sort + "-" + desc + "-" + page;

        fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.status === 401 ? response : response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
                setResponse(responseFromServer);
                setCells(responseFromServer.cells);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    useEffect(() => { getData(props.itemId, 0, 0, 0) }, []);

    const handleList = (e) => {
        e.preventDefault();
        props.setShowingPageType(0);
    };

    const handleItemElement = (e) => {
        e.preventDefault();
        props.setColsNum(0)//;
        props.setShowingPageType(3);
    };

    const sort = (e) => {
        e.preventDefault();
        let dataId = parseInt(e.target.getAttribute('data-id')) + 1;
        dataId = dataId === sortId ? getData(props.itemId, dataId, isDesc ? 0 : 1, 0) : getData(props.itemId, dataId, 0, 0);
    }

    const reload = () => {
        getData(props.itemId, sortId, isDesc, response.currentPageNum);
    }

    function removeCol(id, e) {
        e.preventDefault();
        setDeleteId(id);
        setShowModal(true);
    }

    return (
        <div className="prices-item">
            <h1>{response.price.name}</h1>
            <div className="btn-group">
                <button type="button" class="btn btn-success" onClick={handleItemElement}>+ Добавить позицию</button>
                <button type="button" class="btn btn-secondary" onClick={handleList}>Назад к списку</button>
            </div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        {response.price.priceRows.map((cell, index) => {
                            return (
                                <th scope="col" className={(sortId - 1) == index ? isDesc ? "table-danger" : "table-primary" : ""} data-id={index} onClick={sort}>{cell}</th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {response?.price?.priceCols != null && response.price.priceCols.map((col, colIndex) => {
                        return (
                            <tr scope="col">
                                {col.map((cell, rowIndex) => {
                                    return (
                                        <td className={(sortId - 1) == cell.rowId ? "table-secondary" : ""}>{cell.typeId === 0 ? cell.valueInt : cell.valueString}</td>
                                    )
                                })}
                                <td><button type="button" className="btn btn-danger" onClick={(e) => removeCol(col[0].colId, e)}>Удалить</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {response?.price?.priceCols != null && <ItemPagination itemId={props.itemId} currentPage={response.currentPageNum ?? 0} pageCount={response.pageCount} getData={getData} />}
            {showModal && <ItemModal itemId={props.itemId} setShowModal={setShowModal} reload={reload} colId={delecteId} />}
        </div>
    );
}