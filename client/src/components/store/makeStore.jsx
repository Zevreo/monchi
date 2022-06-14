import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class MakeStore extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);

        this.state = {
            Name: '',
            Country: '',
            Description: '',
            StoreImage: ''
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStoreImage = this.onChangeStoreImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeName(e) {
        this.setState({
            Name: e.target.value
        });
    }
    onChangeCountry(e) {
        this.setState({
            Country: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            Description: e.target.value
        });
    }
    onChangeStoreImage(e) {
        this.setState({
            StoreImage: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const { user } = this.props.auth;
        if(user){
            const store = {
                OwnerId: user._id,
                Name: this.state.Name,
                Country: this.state.Country,
                Description: this.state.Description,
                StoreImage: this.state.StoreImage
            };
            console.log(store);
            axios.post('/api/store', store)
                .then(res => console.log(res.data));
            window.location = '/myStore';
        }
    }
    render() {
        return (
            <section id="sign-up" class="bg-grey-1">
                <div class="sign-up-container">
                    <div class="container text-center">
                        <div class="col-md-12">
                            <h3 class="mb5">Cree su tienda</h3>
                            <p class="subheading">Bienvenido a Monchi</p>
                            <div class="sign-up-form pt30 pb30">
                                <form class="row" onSubmit={this.onSubmit}>
                                    <div class="col-md-6">
                                        <input class="sign-up-first-name bg-white" type="text" placeholder="Nombre" value={this.state.Name} onChange={this.onChangeName} required />
                                        <p className="help-block text-danger"></p>
                                        <input class="sign-up-email bg-white" type="text" placeholder="URL Imagen" value={this.state.StoreImage} onChange={this.onChangeStoreImage} />
                                        <p className="help-block text-danger"></p>
                                        <select class="bg-white" type="text" value={this.state.Country} onChange={this.onChangeCountry} required>
                                            <option default disabled value=''>Seleccione su pais</option>
                                            <option value='Estados Unidos de América'>Estados Unidos de América</option>
                                            <option value='Europa'>Europa</option>
                                            <option value='Inglaterra'>Inglaterra</option>
                                            <option value='India'>India</option>
                                            <option value='Australia'>Australia</option>
                                            <option value='Canada'>Canada</option>
                                            <option value='Singapur'>Singapur</option>
                                            <option value='Suiza'>Suiza</option>
                                            <option value='Malasia'>Malasia</option>
                                            <option value='Japón'>Japón</option>
                                            <option value='China'>China</option>
                                            <option value='México'>México</option>
                                            <option value='Other'>Otro</option>
                                        </select>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div class="col-md-6">
                                        <textarea class="sign-up-last-name bg-white" type="text" placeholder="Descripcion" value={this.state.Description} onChange={this.onChangeDescription}></textarea>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div class="actions">
                                        <p class="dark-grey">Al crear una tienda accedes a nuestros <a href="#">Terminos de Servicio</a>.</p>
                                    </div>
                                    <input class="btn btn-sm btn-sign-up" type="submit" value="Registrar" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(MakeStore);