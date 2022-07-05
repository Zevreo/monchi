import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import PropTypes from 'prop-types';

export class CreateProduct extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);

        this.state = {
            ProductName: '', ProductPrice: null, PriceCoin: null, ProductDescription: '',
            UploadImage: null, ProductImage: null, tags: '', updated: false, store: null,
            error: null, success: null, cloudinaryForm: null, Currency: null
        }
        this.onChange = this.onChange.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.Submit = this.Submit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onChangeFile(e) {
        this.setState({
            UploadImage: e.target.files[0]
        });
        var formData = new FormData();
        formData.append("upload_preset", "thumbnail"); // Replace the preset name with your own
        formData.append("api_key", "876895554677544"); // Replace API key with your own Cloudinary key
        formData.append("timestamp", (Date.now() / 1000) | 0);
        formData.append("file", e.target.files[0]);
        this.setState({
            cloudinaryForm: formData
        });
    }
    async Submit(e) {
        e.preventDefault();
        if (this.state.UploadImage !== null) {
            await axios.post('https://api.cloudinary.com/v1_1/dvticou1l/image/upload', this.state.cloudinaryForm)
                .then(res => { this.state.ProductImage = res.data.url })
                .catch(err => this.setState({ error: err }));
        }

        const { token } = this.props.auth;
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        const body = {
            StoreId: this.state.store._id,
            ProductName: this.state.ProductName,
            ProductPrice: this.state.ProductPrice,
            PriceCoin: this.state.PriceCoin,
            ProductDescription: this.state.ProductDescription,
            ProductImage: this.state.ProductImage,
            tags: this.state.tags
        };
        await axios.post('/api/product', body, config)
            .then(res => this.setState({ success: `Producto "${this.state.ProductName}" agregado exitosamente` }))
            .catch(err => this.setState({ error: err }))
    };
    componentDidUpdate() {
        const { user } = this.props.auth;
        if (user && this.state.updated === false) {
            axios.get('/api/fixed/currency')
                .then(res => {
                    this.setState({ Currency: res.data });
                });
            axios.get(`/api/store/owner/${user._id}`)
                .then(res => {
                    this.state.store = res.data;
                    this.state.updated = true;
                });
        }
    };
    render() {
        const errorMessage = (
            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <div class="alert alert-danger fade in">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="ion-ios-close"></i></button>
                        <i class="ion-android-alert"></i><strong>{this.state.error}</strong>
                    </div>
                </div>
            </div>
        )
        const successMessage = (
            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <div class="alert alert-success fade in">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="ion-ios-close"></i></button>
                        <i class="ion-android-alert"></i><strong>{this.state.success}</strong>
                    </div>
                </div>
            </div>
        )
        return (
            <section id="login" class="bg-grey-1 mt60">
                <div class="login-container">
                    {this.state.error !== null ? errorMessage : ''}
                    {this.state.success !== null ? successMessage : ''}
                    <div class="container text-center">
                        <div class="col-md-12">
                            <h3 class="mb5">Crear producto</h3>
                            <p class="subheading">Agregue su producto a su tienda</p>
                            <div class="login-form pt30 pb30" style={{ maxWidth: "100%" }}>
                                <form onSubmit={this.Submit} className="row w100">
                                    <div className="col-md-6">
                                        <input class="input-text half-left" type="text" placeholder="Nombre del producto" value={this.state.ProductName} onChange={this.onChange} name="ProductName" required />
                                        <p className="help-block text-danger"></p>
                                        <input class="input-text half-left" type="number" placeholder="Precio" value={this.state.ProductPrice} onChange={this.onChange} name="ProductPrice" required />
                                        <p className="help-block text-danger"></p>
                                        <select class="bg-white half-left" type="text" placeholder="Moneda" value={this.state.PriceCoin} onChange={this.onChange} name="PriceCoin" required>
                                            <option default value='USD'>Elija la moneda (predeterminado: USD)</option>
                                            {this.state.updated === true ? this.state.Currency.map((d, i) => (
                                                <option key={i} value={d.CodeName}>{d.Name}</option>
                                            )) : ''}
                                        </select>
                                        <p className="help-block text-danger"></p>
                                    </div>

                                    <div className="col-md-6">
                                        <input class="input-text half-right" type="text" placeholder="Tags separados por commas" value={this.state.tags} onChange={this.onChange} name="tags" required />
                                        <p className="help-block text-danger"></p>

                                        <input className="input-text half-right" type="text" placeholder="URL de la imagen" value={this.state.ProductImage}
                                            onChange={this.onChange} tooltip="La imagen cargada toma prioridad" name="ProductImage" />
                                        <p className="help-block text-danger"></p>

                                        <input className="input-text bg-white half-right" type="file" name="file" accept="image/png, image/jpeg"
                                            onChange={this.onChangeFile} id="imageUpload" title="La imagen cargada toma prioridad" />
                                        <p className="help-block text-danger"></p>
                                    </div>

                                    <textarea class="input-text bg-white col-md-12" type="text" placeholder="Descripcion"
                                        value={this.state.ProductDescription} onChange={this.onChange} name="ProductDescription" required></textarea>
                                    <p className="help-block text-danger"></p>

                                    <input class="btn btn-sm btn-login" type="submit" value="Enviar" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(CreateProduct);