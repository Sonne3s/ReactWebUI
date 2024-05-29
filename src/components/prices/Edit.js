import React, { useState, useEffect } from "react"
import Constants from "../../utilities/Constants"

import EditRow from "./EditRow"

export default function PricesEdit(props) {
    const [name, setName] = useState([]);
    const [inputs, setInputs] = useState([]);
    useEffect(() => {
        setInputs(
            [
                { key: 0, column: "Название товара", typeId: 1, disabled: true },
                { key: 1, column: "Код товара", typeId: 0, disabled: true },
            ]
        );
    }, []);

    const handleList = (e) => {
        e.preventDefault();
        props.setShowingPageType(0);
    };

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const addCol = (e) => {
        setInputs( // Replace the state
            [ // with a new array
                ...inputs, // that contains all the old items
                { key: inputs.length, column: "", typeId: 0, disabled: false },
            ]
        );
    }

    function removeCol(id, e) {
        e.preventDefault();
        let reduced = inputs.filter((item, itemIndex) => {
            return itemIndex !== id
        });
        setInputs([...reduced]);
    }

    function updateInputValue(id, e) {
        e.preventDefault();
        inputs[id].column = e.target.value;
        setInputs([...inputs]);
    }

    function updateSelectValue(id, e) {
        e.preventDefault();
        inputs[id].typeId = e.target.value;
        setInputs([...inputs]);
    }

    const handlePricesEdit = (e) => {
        e.preventDefault();

        const data = {
            name: name,
            rows: inputs.map((input, index) => { return { id: inputs.indexOf(input), value: input.column, typeId: input.typeId } })
        };

        const url = Constants.URLS.API_URL_GET_PRICES_EDIT;

        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                props.setShowingPageType(0)
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };

    return (
        <div className="prices-edit">
            <h1>Добавление прайс-листа</h1>
            <div className="btn-group">
                <button type="button" className="btn btn-success" onClick={handlePricesEdit}>Продолжить</button>
                <button type="button" className="btn btn-secondary" onClick={handleList}>Отмена</button>
            </div>

            <form>
                <div class="form-group">
                    <label htmlFor="name" className="form-label">Название прайс-листа *</label>
                    <input type="text" className="form-control" id="name" onChange={handleChangeName} />
                </div>
                <div class="form-group">
                    <table className="table">
                        <tbody>
                            {inputs.map((input, index) => {
                                return (
                                    <EditRow key={input.key} data={{ id: inputs.indexOf(input), column: input.column, typeId: input.typeId, disabled: input.disabled }} removeCol={removeCol} updateInputValue={updateInputValue} updateSelectValue={updateSelectValue} />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </form>

            <button type="button" className="btn btn-warning" onClick={addCol}>Добавить колонку</button>
        </div>
    );
}