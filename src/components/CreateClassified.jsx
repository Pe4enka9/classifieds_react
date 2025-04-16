import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function CreateClassified({API_URL, token}) {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Создать объявление';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('image', formData.image);

        fetch(`${API_URL}/classifieds`, {
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
            <h1 className="mb-2">Создать объявление</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="title">Название</label>
                    <input type="text" name="title" id="title" placeholder="Название" value={formData.title}
                           onChange={handleChange}/>
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>

                <div className="input-container">
                    <label htmlFor="description">Описание</label>
                    <textarea name="description" id="description" placeholder="Описание" value={formData.description}
                              onChange={handleChange}></textarea>
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>

                <div className="input-container">
                    <label htmlFor="price">Цена</label>
                    <input type="number" name="price" id="price" step="0.01" placeholder="59.99" value={formData.price}
                           onChange={handleChange}/>
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>

                <div className="input-container">
                    <label htmlFor="image">Изображение</label>
                    <input type="file" name="image" id="image" onChange={handleChange}/>
                    {errors.image && <p className="error">{errors.image}</p>}
                </div>

                <button type="submit" className={`btn ${loading ? 'disabled' : ''}`} disabled={loading}>Создать</button>
            </form>
        </>
    )
}