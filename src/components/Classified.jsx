import {Link} from "react-router-dom";
import {useState} from "react";
import Loader from "./Loader.jsx";

export default function Classified({
                                       id,
                                       image,
                                       title,
                                       description,
                                       price,
                                       forUser = false,
                                       API_URL = null,
                                       token = null,
                                       onDeleted = null,
                                   }) {

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);

        fetch(`${API_URL}/classifieds/${id}`, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${token}`},
        })
            .then(res => {
                if (res.ok) {
                    onDeleted && onDeleted();
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <div className="classified">
            <div className="img-container">
                {image && <img src={image} alt="Фото объявления" loading="lazy"/>}
            </div>

            <h3>{title}</h3>
            <p className="description">{description}</p>
            <p className="price">{price} &#8381;</p>

            <Link to={`/classifieds/${id}`} className="btn">Посмотреть</Link>

            {forUser && (
                <div className="buttons">
                    <Link to={`/classifieds/${id}/edit`} className="btn">Изменить</Link>
                    <button type="button" className="btn danger" onClick={handleDelete}>{loading ?
                        <Loader loading={loading} deleting={true}/> : 'Удалить'}</button>
                </div>
            )}
        </div>
    )
}