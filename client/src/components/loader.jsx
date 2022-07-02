import React from "react";
import { connect } from 'react-redux';

export function Loader(props) {
    return (
        <img src="/loader.gif" />
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(Loader);