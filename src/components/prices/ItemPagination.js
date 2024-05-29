import React, { useState } from "react"

export default function ItemPagination(props) {
    const getItems = () => {
        let content = [];
        for (let i = 0; i <= props.pageCount; i++) {
            content.push(<li className={props.currentPage == i ? "page-item active" : "page-item"} ><a class="page-link" href="#" data-id={i} onClick={getData}>{i + 1}</a></li>);
        }

        return content;
    }

    const getData = (e) => {
        props.getData(props.itemId, 0, 0, parseInt(e.currentTarget.getAttribute('data-id')));
    }

    return (
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                {props.currentPage > 0 &&
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous" data-id={props.currentPage - 1} onClick={getData}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>}
                {getItems()}
                {props.currentPage < (props.pageCount) &&
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next" data-id={props.currentPage + 1} onClick={getData}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>}
            </ul>
        </nav>
    );
}