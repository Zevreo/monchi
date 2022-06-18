import React, { Component, useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { useParams } from "react-router";

export function ParamsTest(props) {
    let { id, page, search } = useParams();
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
            <Child params={{ id, page, search }} auth={props.auth} />
            <div class="pt60">
                <h3>Store {store ? store.Name : ''}</h3>
                <h3>User { user ? user.FirstName : ''}</h3>
                <h3>ID URL: {id ? id : ''}</h3>
                <h3>PAGE: {page ? page : ''}</h3>
                <h3>SEARCH: {search ? search : ''}</h3>
            </div>
        </div>
    );
};

class Child extends Component {
    constructor(props) {
        super(props);
        this.state = { store: null, updated: false };
    };
    async Request() {
        const { user } = this.props.auth;
        if (user && this.state.updated === false) {
            await axios.get(`/api/store/owner/${user._id}`)
                .then(res => this.setState({ store: res.data }));
            this.setState({ updated: true });
        }
    };
    componentDidMount() {
        this.Request();
    };
    render() {
        const { user } = this.props.auth;
        const { id, page, search } = this.props.params;
        return (
            <div class="pt60">
                <h3>Store {this.state.store ? this.state.store.Name : ''}</h3>
                <h3>User {user ? user.FirstName : ''}</h3>
                <h3>ID URL: {id ? id : ''}</h3>
                <h3>PAGE: {page ? page : ''}</h3>
                <h3>SEARCH: {search ? search : ''}</h3>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(ParamsTest);