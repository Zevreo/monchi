import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { useNavigate } from "react-router";

export function EditTags(props) {
    let navigate = useNavigate();
    const [tags, setTags] = useState();
    const [tag, setTag] = useState();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    useEffect(() => {
        Init();
    }, []);
    async function Init(e) {
        axios.get(`/api/product/tags/${props.id}`)
            .then(res => setTags(res.data));
    }
    async function Submit(e) {
        e.preventDefault();
        const body = {
            ProductID: props.id,
            tag: tag
        };
        await axios.post(`/api/product/tag`, body)
            .then(() => {
                Init();
                setTag('');
            })
            .catch(err => setError(err))
    };
    async function Delete(e) {
        await axios.delete(`/api/product/tag/${e}`)
            .then(() => Init())
            .catch(err => setError(err))
    }
    return (
        <section id="login" class="bg-grey-1">
            <h3 class="mb5">Editar tags</h3>
            <div class="login-form pt30 pb30">
                <form onSubmit={Submit} className="row">
                    <input class="input-text col-md-4 col-md-offset-4" type="text" placeholder="Agregar un tag" value={tag} onChange={e => setTag(e.target.value)} required />
                </form>
                {tags ? tags.map((d, i) => (
                    <button className="btn btn-ghost btn-md btn-red" type="button" onClick={() => Delete(d._id)} key={i}>{d.Tags}<i class="ion-ios-close"></i></button>
                )) : ""}
            </div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(EditTags);