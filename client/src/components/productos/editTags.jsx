import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";

export function EditTags(props) {
    const [tags, setTags] = useState();
    const [tag, setTag] = useState();
    const [error, setError] = useState(null);
    useEffect(() => {
        Init();
    }, []);
    function Init() {
        axios.get(`/api/product/tags/${props.id}`)
            .then(res => setTags(res.data));
    }
    async function Submit(e) {
        e.preventDefault();
        const body = { tag: tag };
        await axios.put(`/api/product/addTag/${props.id}`, body)
            .then(() => {
                Init();
                setTag('');
            })
            .catch(err => setError(err))
    };
    async function Delete(e) {
        const body = { tagIndex: e };
        await axios.put(`/api/product/removeTag/${props.id}`, body)
            .then(() => Init())
            .catch(err => setError(err))
    }
    return (
        <div class="bg-grey-1">
            <h3 class="mb5">Editar tags</h3>
            <div class="login-form pt30 pb30">
                <form onSubmit={Submit} className="row">
                    <input class="input-text col-md-4 col-md-offset-4" type="text" placeholder="Agregar un tag" value={tag} onChange={e => setTag(e.target.value)} required />
                </form>
                { tags ? tags.map((d, i) => (
                    <button className="btn btn-ghost btn-md btn-red" type="button" onClick={() => Delete(i)} key={i}>{d} <i class="ion-ios-close"></i></button>
                )) : ''}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(EditTags);