import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";

export function EditOptions(props) {
    const [options, setOptions] = useState();
    const [OptionName, setOptionName] = useState();
    const [OptionTypes, setOptionTypes] = useState();
    const [newOption, setNewOption] = useState();
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
    async function DeleteChild(a, b) {
        const body = { indexParent: b, indexChild: a };
        await axios.put(`/api/product/removeOptionSingle/${props.id}`, body)
            .then(() => Init())
            .catch(err => setError(err))
    }
    async function AddChild(e) {
        e.preventDefault();
        const body = { indexParent: e.target[0].value, newChild: e.target[1].value };
        console.log(body);
        await axios.put(`/api/product/addToParent/${props.id}`, body)
            .then(() => {
                Init();
                e.target[1].value = '';
            })
            .catch(err => setError(err))
    }
    return (
        <div class="bg-grey-1">
            <h3 class="mb20">Gestionar opciones</h3>
            <form onSubmit={Submit} className="row">
                <div className="col-md-6">
                    <input class="input-text col-md-6" type="text" placeholder="Nombre de la opcion"
                        value={OptionName} onChange={e => setOptionName(e.target.value)} required />
                </div>
                <div className="col-md-6">
                    <input class="input-text col-md-6" type="text" placeholder="Opciones separadas por comas"
                        value={OptionTypes} onChange={e => setOptionTypes(e.target.value)} required />
                </div>
                <input className="btn btn-sm btn-login" type="submit" value="Agregar" />
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre de la opcion</th>
                        <th>Tipos de la opcion</th>
                        <th>Agregar</th>
                    </tr>
                </thead>
                <tbody>
                    {options ? options.map((PD, PI) => (
                        <tr>
                            <td>
                                <button className="btn btn-ghost btn-md btn-red" type="button"
                                    onClick={() => DeleteParent(PI)} key={PI}>{PD.OptionName}
                                    <i class="ion-ios-close"></i>
                                </button>
                            </td>
                            <td>{PD.OptionTypes.map((CD, CI) => (
                                <button className="btn btn-ghost btn-md btn-red" type="button"
                                    onClick={() => DeleteChild(CI, PI)} key={CI}>{CD}
                                    <i class="ion-ios-close"></i>
                                </button>
                            ))}
                            </td>
                            <td>
                                <form onSubmit={AddChild}>
                                    <input type="text" name="indexParent" value={PI} hidden />
                                    <input class="input-text" type="text" placeholder="Nueva opcion" name="newOption" required />
                                    <input className="btn btn-sm btn-login" type="submit" value="Agregar" />
                                </form>
                            </td>
                        </tr>
                    )) : ''}

                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(EditOptions);