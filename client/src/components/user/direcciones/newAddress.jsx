import React, { useState, useEffect } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';

export function NewAddress(props) {
    let navigate = useNavigate();
    const [Street, setStreet] = useState();
    const [Ext, setExt] = useState();
    const [Int, setInt] = useState();
    const [Country, setCountry] = useState();
    const [State, setState] = useState();
    const [City, setCity] = useState();
    const [Postcode, sePostcode] = useState();
    const [References, setReferences] = useState();
    const [Surname, setSurname] = useState();

    async function onSubmit(e) {
        e.preventDefault();
        const { user, token } = props.auth;
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (token) config.headers['x-auth-token'] = token;
        if (user) {
            const address = {
                UserId: user._id,
                Street: Street,
                ExternalNum: Ext,
                InternalNum: Int,
                Country: Country,
                State: State,
                City: City,
                Postcode: Postcode,
                References: References,
                Surname: Surname
            };
            await axios.post('/api/address', address, config)
                .then(() => {
                    Swal.fire({
                        title: 'Direccion agregada',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        navigate('/address');
                    }, 1600);
                });
        }
    }

    return (
        <section class="bg-grey-1">
            <div class="container mt80 mb80">
                <div class="checkout">
                    <form class="row text-center" onSubmit={onSubmit}>
                        <div class="half-left col-sm-6">
                            <label for="exampleFormControlSelect1">Sobrenombre</label>
                            <input type="text" class="input-text" onChange={e => setSurname(e.target.value)} value={Surname} name="Surname" required />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div class="half-left col-sm-6">
                            <label for="exampleFormControlSelect1">Calle</label>
                            <input type="text" class="input-text" onChange={e => setStreet(e.target.value)} value={Street} name="Street" required />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div class="half-left col-sm-6">
                            <label for="exampleFormControlSelect1">Numero exterior</label>
                            <input type="number" class="input-text" onChange={e => setExt(e.target.value)} value={Ext} name="ExternalNum" required />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div class="half-right col-sm-6">
                            <label for="exampleFormControlSelect1">Numero interior</label>
                            <input type="number" class="input-text" onChange={e => setInt(e.target.value)} value={Int} name="InternalNum" required />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div class="half-left col-sm-6">
                            <label for="exampleFormControlSelect1">Codigo postal</label>
                            <input type="number" class="input-text" onChange={e => sePostcode(e.target.value)} value={Postcode} name="Postcode" required />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div class="half-right col-sm-6">
                            <label for="exampleFormControlSelect1">Pais</label>
                            <input type="text" class="input-text" onChange={e => setCountry(e.target.value)} value={Country} name="Country" required />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div class="half-left col-sm-6">
                            <label for="exampleFormControlSelect1">Estado</label>
                            <input type="text" class="input-text" onChange={e => setState(e.target.value)} value={State} name="State" required />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div class="half-right col-sm-6">
                            <label for="exampleFormControlSelect1">Ciudad</label>
                            <input type="text" class="input-text" onChange={e => setCity(e.target.value)} value={City} name="City" required />
                            <p className="help-block text-danger"></p>
                        </div>
                        <label for="exampleFormControlSelect1">Referencias</label>
                        <textarea type="text" class="input-text bg-grey" onChange={e => setReferences(e.target.value)} value={References} name="References" />
                        <p className="help-block text-danger"></p>
                        <input class="btn btn-md btn-primary" type="submit" value="Registrar" />
                    </form>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(NewAddress);
