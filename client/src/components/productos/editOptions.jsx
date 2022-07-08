import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";

export function EditOptions(props) {
    const [options, setOptions] = useState();
    const [OptionName, setOptionName] = useState();
    const [OptionTypes, setOptionTypes] = useState();
    const [error, setError] = useState(null);
    useEffect(() => {
        Init();
    }, []);
    function Init() {
        axios.get(`/api/product/options/${props.id}`)
            .then(res => setOptions(res.data));
    }
    async function Submit(e) {
        e.preventDefault();
        const body = { OptionName, OptionTypes };
        await axios.put(`/api/product/addOption/${props.id}`, body)
            .then(() => {
                Init();
                setOptionName('');
                setOptionTypes('');
            })
            .catch(err => setError(err))
    };
    async function DeleteParent(e) {
        const body = { optionIndex: e };
        await axios.put(`/api/product/removeOption/${props.id}`, body)
            .then(() => Init())
            .catch(err => setError(err))
    }
    async function DeleteChild(e) {
        const body = { parentIndex: e, childIndex: e };
        await axios.put(`/api/product/removeOptionSingle/${props.id}`, body)
            .then(() => Init())
            .catch(err => setError(err))
    }
    return (
        <div class="bg-grey-1">
            <h3 class="mb5">Editar variantes</h3>
            <div class="login-form pt30 pb30">
                <form onSubmit={Submit} className="row">
                    <input class="input-text col-md-4 col-md-offset-4" type="text" placeholder="Nombre de la opcion" value={OptionName} onChange={e => setOptionName(e.target.value)} required />
                    <input class="input-text col-md-4 col-md-offset-4" type="text" placeholder="Opciones separadas por comas" value={OptionTypes} onChange={e => setOptionTypes(e.target.value)} required />
                    <input className="btn btn-sm btn-login" type="submit" value="Agregar" />
                </form>
                {options ? options.map((PD, PI) => (
                    <button className="btn btn-ghost btn-md btn-red" type="button" onClick={() => DeleteParent(PI)} key={PI}>{PD.OptionName} - {PD.OptionTypes}<i class="ion-ios-close"></i></button>
                )) : ''}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(EditOptions);