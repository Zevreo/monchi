import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import Swal from 'sweetalert2';

export function EditTags(props) {
    const [tags, setTags] = useState();
    const [tag, setTag] = useState();
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
            .catch(err => Swal.fire({
                title: 'Hubo un error',
                icon: 'error',
                text: err,
                showConfirmButton: false,
                timer: 900
            }))
    };
    async function Delete(e) {
        const body = { tagIndex: e };
        await axios.put(`/api/product/removeTag/${props.id}`, body)
            .then(() => Init())
            .catch(err => Swal.fire({
                title: 'Hubo un error',
                icon: 'error',
                text: err,
                showConfirmButton: false,
                timer: 900
            }))
    }
    return (
        <div class="bg-grey-1">
            <h3 class="mb20">Gestionar etiquetas</h3>
            <form onSubmit={Submit} className="row">
                <div className="col-md-4 col-md-offset-4">
                    <input class="input-text" type="text" placeholder="Agregar un tag" value={tag} onChange={e => setTag(e.target.value)} required />
                </div>
            </form>
            {tags ? tags.map((d, i) => (
                <button className="btn btn-ghost btn-md btn-red" type="button" onClick={() => Delete(i)} key={i}>{d} <i class="ion-ios-close"></i></button>
            )) : ''}
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(EditTags);