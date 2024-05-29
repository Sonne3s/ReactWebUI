import React, { useState, useEffect } from "react"
import Constants from "../../utilities/Constants"

export default function PricesList(props) {
    const [prices, setPrices] = useState([]);
    useEffect(() => {
        const url = Constants.URLS.API_URL_GET_PRICES_LIST;

        fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.status === 401 ? response : response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
                setPrices(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }, []);

    function handleItem(id, e) {
        e.preventDefault();
        props.setItemId(id)
        props.setShowingPageType(1);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        props.setShowingPageType(2);
    };

    return (
        <div className="prices-list">
            <h1>Прайсы</h1>
            <button type="button" className="btn btn-primary" onClick={handleEdit}>Создать прайс</button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Название</th>
                    </tr>
                </thead>
                <tbody>
                    {prices.map((price, index) => {
                        return (
                            <tr>
                                <th scope="row">{price.id}</th>
                                <td><a href="#" onClick={(e) => handleItem(price.id, e)}>{price.name}</a></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}