import React, { useState } from "react"
import Constants from "../../utilities/Constants"

export default function ItemModal(props) {
    const handleCancel = (e) => {
        e.preventDefault();
        props.setShowModal(false);
    };

    const handleRemove = (e) => {
        e.preventDefault();

        const url = Constants.URLS.API_URL_GET_PRICES_ITEM_ELEMENT_DELETE + "/" + props.itemId + "-" + props.colId;

        fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.status === 401 ? response : response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
                props.reload();
                props.setShowModal(false);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
                props.setShowModal(false);
            });
    }

    return (
        <div>
            <div class="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: 'block' }} aria-modal="true" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>Вы действительно хотите удалить позицию?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Отмена</button>
                            <button type="button" className="btn btn-danger" onClick={handleRemove}>Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}