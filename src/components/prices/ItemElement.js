import React, { useState, useEffect } from "react"
import Constants from "../../utilities/Constants"

export default function PricesItemElement(props) {
    const [inputs, setInputs] = useState([]);
    var otherInputs = inputs.slice(2, (inputs.length));
    var name = inputs[0]?.name;
    var nameId = inputs[0]?.orderNum;
    var vendorCode = inputs[1]?.name;
    var vendorCodeId = inputs[1]?.orderNum;

    useEffect(() => {
        const url = Constants.URLS.API_URL_GET_PRICES_ITEM_ELEMENT + "/" + props.itemId;


        fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.status === 401 ? response : response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
                setInputs(
                    [
                        ...responseFromServer
                    ]
                );
                otherInputs = inputs.slice(2, (inputs.length));
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }, []);

    const handleItem = (e) => {
        e.preventDefault();
        props.setShowingPageType(1);
    };

    function updateInputValue(id, e) {
        e.preventDefault();
        inputs[id].value = e.target.value;
        setInputs([...inputs]);
    }

    const handlePricesItemElement = (e) => {
        e.preventDefault();

        const data = {
            priceId: props.itemId,
            name: name,
            colNum: props.colsNum,
            values: inputs.map((input, index) => { return { rowNum: inputs.indexOf(input), value: input.value, typeId: input.typeId } })
        };

        const url = Constants.URLS.API_URL_GET_PRICES_ITEM_ELEMENT;

        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                props.setShowingPageType(1);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };

    function renderSwitch(cell) {
        switch (cell.typeId) {
            case 1:
                return <tr>
                    <td>{cell.name}</td>
                    <td><input className="form-control p-3" type="text" onChange={(e) => updateInputValue(cell.orderNum, e)} /></td>
                </tr>
            case 2:
                return <tr>
                    <td>{cell.name}</td>
                    <textarea className="form-control p-3" id="textarea" rows="3" onChange={(e) => updateInputValue(cell.orderNum, e)}></textarea>
                </tr>
            case 0:
            default:
                return <tr>
                    <td>{cell.name}</td>
                    <td><input className="form-control p-3" type="number" onChange={(e) => updateInputValue(cell.orderNum, e)} /></td>
                </tr>
        }
    }

    return (
        <div className="prices-item-element">
            <h1>Добавление товара</h1>

            <form>
                <div className="mb-3">
                    <label for="name" className="form-label">{name} *</label>
                    <input type="text" className="form-control" id="name" onChange={(e) => updateInputValue(nameId, e)} />
                </div>
                <div className="mb-3">
                    <label for="vendor-code" className="form-label">{vendorCode} *</label>
                    <input type="number" className="form-control" id="vendor-code" onChange={(e) => updateInputValue(vendorCodeId, e)} />
                </div>
                <table className="table table-bordered">
                    <tbody>
                        {
                            otherInputs.map((cell, index) => {
                                return (
                                    renderSwitch(cell)
                                );
                            })
                        }
                    </tbody>
                </table>
            </form>

            <div className="btn-group">
                <button type="button" className="btn btn-secondary" onClick={handleItem}>Закрыть</button>
                <button type="button" className="btn btn-success" onClick={handlePricesItemElement}>Сохранить</button>
            </div>
        </div>
    );
}