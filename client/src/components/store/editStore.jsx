import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

export class EditStore extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);

        this.state = {
            Name: '',
            Country: '',
            Description: '',
            ImageUrl: '',
            StoreImage: ''
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStoreImage = this.onChangeStoreImage.bind(this);
        this.onChangeImageUrl = this.onChangeImageUrl.bind(this);
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
            StoreImage: e.target.files[0]
        });
    }
    onChangeImageUrl(e) {
        this.setState({
            ImageUrl: e.target.value
        })
    }
    componentDidMount() {
        const { user } = this.props.auth;
        const { token } = this.props.auth;
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        if (user) {
            axios.get(`/api/store/owner/${user._id}`, config)
                .then(res => this.setState({
                    StoreId: res.data._id,
                    Name: res.data.Name,
                    Country: res.data.Country,
                    Description: res.data.Description,
                    ImageUrl: res.data.StoreImage
                }))
        }
    }
    async onSubmit(e) {
        e.preventDefault();
        let image = this.state.StoreImage;

        if (image !== '') {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "monchi"); // Replace the preset name with your own
            formData.append("api_key", "876895554677544"); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            await axios.post('https://api.cloudinary.com/v1_1/dvticou1l/image/upload', formData)
                .then(res => {
                    this.state.ImageUrl = res.data.url;
                })
                .catch(err => console.log('Error: ' + err));

        }
        const { user } = this.props.auth;
        const { token } = this.props.auth;
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        if (user) {
            const store = {
                OwnerId: user._id,
                Name: this.state.Name,
                Country: this.state.Country,
                Description: this.state.Description,
                StoreImage: this.state.ImageUrl
            };
            await axios.put(`/api/store/${this.state.StoreId}`, store, config)
                .then(res => {
                    Swal.fire({
                        title: 'Enviado',
                        text: 'Se edito la tienda con exito',
                        icon: 'success',
                        showConfirmButton: false,
                        toast: true,
                        position: "bottom-right",
                        timer: 900
                    });
                    setTimeout(() => {
                        window.location = '/myStore';
                    }, 1000);
                });
        }
    }
    render() {
        return (
            <section id="login" class="bg-grey-1">
                <div class="sign-up-container">
                    <div class="container text-center">
                        <div class="col-md-12">
                            <h3 class="mb5">Cree su tienda</h3>
                            <p class="subheading">Bienvenido a Monchi</p>
                            <div class="sign-up-form pt30 pb30">
                                <form class="row" onSubmit={this.onSubmit}>
                                    <div className="col-md-6">
                                        <input class="sign-up-first-name bg-white" type="text" placeholder="Nombre" value={this.state.Name} onChange={this.onChangeName} required feedbackToolTip />
                                        <p className="help-block text-danger"></p>
                                        <input className="sign-up-email bg-white" type="file" name="file" accept="image/png, image/jpeg"
                                            onChange={this.onChangeStoreImage} id="imageUpload" title="La imagen cargada toma prioridad" />
                                        <p className="help-block text-danger"></p>
                                        <input class="sign-up-first-name bg-white" type="text" placeholder="URL de la imagen" value={this.state.ImageUrl}
                                            onChange={this.onChangeImageUrl} tooltip="La imagen cargada toma prioridad" />
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
                                    <input class="btn btn-sm btn-sign-up" type="submit" value="Enviar" />
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
export default connect(mapStateToProps, null)(EditStore);