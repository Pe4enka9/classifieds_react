import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "./Loader.jsx";

export default function EditClassified({API_URL, token}) {
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        document.title = 'Изменить объявление';
    }, []);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: null,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value, type, files} = e.target;

        if (type === 'file') {
            setFormData({...formData, [name]: files[0]});
        } else {
            setFormData({...formData, [name]: value});
        }

        setErrors({...errors, [name]: ''});
    };

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch(`${API_URL}/classifieds/${id}`)
            .then(res => res.json())
            .then(data => setFormData({
                title: data.title,
                description: data.description,
                price: data.price,
                image: null
            }))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [API_URL, id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('_method', 'PATCH');

        if (formData.image) {
            data.append('image', formData.image);
        }

        fetch(`${API_URL}/classifieds/${id}`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`},
            body: data,
        })
            .then(res => {
                if (res.ok) {
                    navigate('/user/classifieds');
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if (data.errors) {
                    setErrors(data.errors);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <h1 className="mb-2">Изменить объявление</h1>

            {loading ? (
                <Loader loading={loading}/>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="title">Название</label>
                        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange}/>
                        {errors.title && <p className="error">{errors.title}</p>}
                    </div>

                    <div className="input-container">
                        <label htmlFor="description">Описание</label>
                        <textarea name="description" id="description" value={formData.description}
                                  onChange={handleChange}></textarea>
                        {errors.description && <p className="error">{errors.description}</p>}
                    </div>

                    <div className="input-container">
                        <label htmlFor="price">Цена</label>
                        <input type="number" name="price" id="price" step="0.01" value={formData.price}
                               onChange={handleChange}/>
                        {errors.price && <p className="error">{errors.price}</p>}
                    </div>

                    <div className="input-container">
                        <label htmlFor="image">Изображение</label>
                        <input type="file" name="image" id="image" onChange={handleChange}/>
                        {errors.image && <p className="error">{errors.image}</p>}
                    </div>

                    <button type="submit" className={`btn ${loading ? 'disabled' : ''}`} disabled={loading}>Изменить
                    </button>
                </form>
            )}
        </>
    )
}