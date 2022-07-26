import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

export function EditImages(props) {
    const [UploadImage, setUploadImage] = useState();
    const [ProductImage, setProductImage] = useState();
    const [ProductImages, setProductImages] = useState([]);
    var formData = new FormData();
    const [dataform, setDataForm] = useState();
    useEffect(() => {
        formData.append("upload_preset", "thumbnail"); // Replace the preset name with your own
        formData.append("api_key", "876895554677544"); // Replace API key with your own Cloudinary key
        formData.append("timestamp", (Date.now() / 1000) | 0);
        formData.append("file", UploadImage);
        setDataForm(formData);
    }, [UploadImage]);
    async function Upload() {
        await axios.post('https://api.cloudinary.com/v1_1/dvticou1l/image/upload', dataform)
            .then(res => {
                setProductImage(res.data.url);
                setUploadImage('');
                Swal.fire({
                    title: 'Imagen cargada correctamente',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 900,
                    imageUrl: res.data.url
                });
            })
            .catch(err => Swal.fire({
                title: 'Hubo un error',
                icon: 'error',
                text: err,
                showConfirmButton: false,
                timer: 900
            }));
    };
    useEffect(() => {
        Init();
    }, []);
    function Init() {
        axios.get(`/api/product/images/${props.id}`)
            .then(res => setProductImages(res.data));
    }
    async function Submit(e) {
        e.preventDefault();
        const body = { ProductImage: ProductImage };
        await axios.put(`/api/product/addImage/${props.id}`, body)
            .then(() => {
                Init();
                setProductImage('');
            })
            .catch(err => Swal.fire({
                title: 'Hubo un error',
                icon: 'error',
                text: err,
                showConfirmButton: false,
                timer: 900
            }));
        const imageInput = document.getElementById('imageUpload');
        imageInput.value = '';
    };
    async function Delete(e) {
        const body = { imageIndex: e };
        await axios.put(`/api/product/removeImage/${props.id}`, body)
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
        <div id="login" class="bg-grey-1">
            <h3 class="mb20">Gestionar imagenes</h3>
            <form onSubmit={Submit} className="row">
                <div className="col-md-6">
                    <input className="sign-up-email bg-white" type="file" name="file" accept="image/png, image/jpeg"
                        onChange={e => setUploadImage(e.target.files[0])} id="imageUpload" title="La imagen cargada toma prioridad" />
                </div>
                <div className="col-md-6">
                    {UploadImage ?
                        <button className="btn btn-sm btn-login mb10" type="button" onClick={Upload}>Cargar</button>
                        :
                        <input className="sign-up-first-name bg-white" type="text" placeholder="URL de la imagen" value={ProductImage}
                            onChange={e => setProductImage(e.target.value)} tooltip="La imagen cargada toma prioridad" />}
                </div>
                <div className="col-md-12">
                    <input class="btn btn-sm btn-login" type="submit" value="Enviar" />
                </div>
            </form>
            <ul class="shop-items portfolioContainer col-md-12 height-auto margin row">
                {ProductImages.map((d, i) => (
                    <li class="relative col-lg-3 col-md-4 col-sm-6" style={{ padding: '15px' }} key={i}>
                        <Link to={"#"}>
                            <div class="item">
                                <img src={d} alt="#" class="contain" />
                                <div class="info hover-bottom">
                                    <button className="btn btn-ghost btn-md" type="button" onClick={() => Delete(i)}>Eliminar</button>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(EditImages);