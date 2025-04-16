import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Loader from "./Loader.jsx";

export default function ShowClassified({API_URL}) {
    useEffect(() => {
        document.title = 'Загрузка...';
    }, []);

    const {id} = useParams();

    const [classified, setClassified] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch(`${API_URL}/classifieds/${id}`)
            .then(res => res.json())
            .then(data => {
                document.title = data.title;
                setClassified(data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [API_URL, id]);

    const handleClick = (e) => {
        e.target.textContent = classified.user.email;
        e.target.classList.toggle('active');
    };

    return (
        <section className="show">
            {loading ? (
                <Loader loading={loading}/>
            ) : (
                <>
                    <h1>{classified.title}</h1>

                    <div className="img-container">
                        <img src={classified.image_url || null} alt="Фото объявления"/>
                    </div>

                    <p className="description">{classified.description}</p>
                    <p className="price">{classified.price} &#8381;</p>
                    <p className="contact" onClick={handleClick}>Контакт пользователя</p>
                </>
            )}
        </section>
    )
}