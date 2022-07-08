import React from "react";

export function Pagination(props) {
    function Paginate(int) {
        props.setDisable(true);
        if (int === "plus") {
            props.setPage(props.Page + 1);
        }
        else {
            if (int === "minus") {
                props.setPage(props.Page - 1);
            }
            else {
                props.setPage(int);
            }
        }
    }
    return (
        <ul class="pagination">
            {props.Page > 1 ? <li>
                <a type="button" onClick={(e) => Paginate(1)} hidden={props.disable}>
                    <span aria-hidden="true"><i class="ion-chevron-left"></i></span>
                </a>
            </li> : ''}
            {props.Page > 1 ? <li>
                <a type="button" onClick={(e) => Paginate("minus")} aria-label="Previous" hidden={props.disable}>
                    <span aria-hidden="true"><i class="ion-ios-arrow-back"></i></span>
                </a>
            </li> : ''}
            {props.Page > 2 ?
                <li>
                    <a type="button" onClick={(e) => Paginate(props.Page - 2)} hidden={props.disable}>{props.Page ? props.Page - 2 : "loading"}</a>
                </li> : ''}
            {props.Page > 1 ?
                <li>
                    <a type="button" onClick={(e) => Paginate(props.Page - 1)} hidden={props.disable}>{props.Page ? props.Page - 1 : "loading"}</a>
                </li> : ''}
            <li class="active">
                <a type="button" disabled>{props.Page ? props.Page : "loading"}</a>
            </li>
            {props.Page < props.maxPage ?
                <li>
                    <a type="button" onClick={(e) => Paginate(props.Page + 1)} hidden={props.disable}>{props.Page ? props.Page + 1 : "loading"}</a>
                </li> : ''}
            {props.Page < (props.maxPage - 1) ?
                <li>
                    <a type="button" onClick={(e) => Paginate(props.Page + 2)} hidden={props.disable}>{props.Page ? props.Page + 2 : "loading"}</a>
                </li> : ''}
            {props.Page < props.maxPage ? <li>
                <a type="button" onClick={(e) => Paginate("plus")} aria-label="Next" hidden={props.disable}>
                    <span aria-hidden="true"><i class="ion-ios-arrow-forward"></i></span>
                </a>
            </li> : ''}

            {props.Page < props.maxPage ? <li>
                <a type="button" onClick={(e) => Paginate(props.maxPage)} aria-label="Next" hidden={props.disable}>
                    <span aria-hidden="true"><i class="ion-chevron-right"></i></span>
                </a>
            </li> : ''}

        </ul>
    )
}
export default Pagination;
