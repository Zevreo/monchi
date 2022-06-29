import React, { Component, useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { useParams } from "react-router";

export function ParamsTest(props) {
    let { id, page, search } = useParams();
    const [ Page, setPage] = useState(page)
    if (Page === undefined) {
        setPage(1);
    }
    const [store, setStore] = useState();
    async function Request() {
        const { user } = props.auth;
        if (user) {
            await axios.get(`/api/store/owner/${user._id}`)
                .then(res => setStore(res.data));
        }
    }
    useEffect(() => {
        Request();
    }, []);
    const { user } = props.auth;
    return (
        <div>
            <div class="pt60">
                <h3>Store {store ? store.Name : ''}</h3>
                <h3>User { user ? user.FirstName : ''}</h3>
                <h3>ID URL: {id ? id : ''}</h3>
                <h3>PAGE: { Page ? Page : ''}</h3>
                <h3>SEARCH: {search ? search : ''}</h3>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(ParamsTest);