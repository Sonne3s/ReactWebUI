import React, { useState } from "react"

export default function EditRow(props) {

    return (
        <tr>
            <th>Колонка {props.data.id + 1}</th>
            <td><input className="form-control" type="text" defaultValue={props.data.column} disabled={(props.data.disabled) ? "disabled" : ""} onChange={(e) => props.updateInputValue(props.data.id, e)} /></td>
            <td>
                <select className="form-select" defaultValue={props.data.typeId} disabled={(props.data.disabled) ? "disabled" : ""} onChange={(e) => props.updateSelectValue(props.data.id, e)}>
                    <option value="0">Число </option>
                    <option value="1">Однострочный текст</option>
                    <option value="2">Многострочный текст</option>
                </select>
            </td>
            {
                !props.data.disabled && <td><button type="button" className="btn btn-danger" onClick={(e) => props.removeCol(props.data.id, e)}>Удалить</button></td>
            }
        </tr>
    );
}