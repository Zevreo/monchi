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
            {props.Page > 1 && <li>
                <button type="button" onClick={(e) => Paginate(1)} disabled={props.disable}>
                    <span aria-hidden="true"><i class="ion-chevron-left"></i></span>
                </button>
            </li> }
            {props.Page > 1 && <li>
                <button type="button" onClick={(e) => Paginate("minus")} aria-label="Previous" disabled={props.disable}>
                    <span aria-hidden="true"><i class="ion-ios-arrow-back"></i></span>
                </button>
            </li> }
            {props.Page > 2 &&
                <li>
                    <button type="button" onClick={(e) => Paginate(props.Page - 2)} disabled={props.disable}>{props.Page && props.Page - 2 }</button>
                </li> }
            {props.Page > 1 &&
                <li>
                    <button type="button" onClick={(e) => Paginate(props.Page - 1)} disabled={props.disable}>{props.Page && props.Page - 1 }</button>
                </li> }
            <li class="active">
                <button type="button" onClick={(e) => Paginate(props.Page)} disabled={props.disable}>{props.Page && props.Page }</button>
            </li>
            {props.Page < props.maxPage &&
                <li>
                    <button type="button" onClick={(e) => Paginate(props.Page + 1)} disabled={props.disable}>{props.Page && props.Page + 1 }</button>
                </li> }
            {props.Page < (props.maxPage - 1) &&
                <li>
                    <button type="button" onClick={(e) => Paginate(props.Page + 2)} disabled={props.disable}>{props.Page && props.Page + 2 }</button>
                </li> }
            {props.Page < props.maxPage && <li>
                <button type="button" onClick={(e) => Paginate("plus")} aria-label="Next" disabled={props.disable}>
                    <span aria-hidden="true"><i class="ion-ios-arrow-forward"></i></span>
                </button>
            </li> }

            {props.Page < props.maxPage && <li>
                <button type="button" onClick={(e) => Paginate(props.maxPage)} aria-label="Next" disabled={props.disable}>
                    <span aria-hidden="true"><i class="ion-chevron-right"></i></span>
                </button>
            </li> }

        </ul>
    )
}
export default Pagination;
