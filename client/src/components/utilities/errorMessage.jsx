import React from "react";

export function ErrorMessage(props) {
    return (
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="alert alert-danger fade in">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="ion-ios-close"></i></button>
                    <i class="ion-android-alert"></i><strong>{props.error}</strong>
                </div>
            </div>
        </div>
    )
}
export default ErrorMessage;
