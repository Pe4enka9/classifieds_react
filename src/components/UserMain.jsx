import {useEffect, useState} from "react";
import Classified from "./Classified.jsx";
import {Link} from "react-router-dom";
import Loader from "./Loader.jsx";

export default function UserMain({API_URL, token}) {
    useEffect(() => {
        document.title = 'Ваши объявления';
    }, []);

    const [classifieds, setClassifieds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState('');

    const handleChange = (e) => {
        setPrice(e.target.value);
    };

    const fetchClassifieds = () => {
        setLoading(true);

        fetch(`${API_URL}/user/classifieds?price=${price}`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
            .then(res => res.json())
            .then(data => setClassifieds(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchClassifieds();
    }, [price]);

    return (
        <>
            <h1 className="mb-2">Ваши объявления</h1>

            <Link to="/classifieds/create" className="btn mb-2">Создать</Link>

            <form className="sort mb-5">
                <h2>Сортировка</h2>

                <div className="input-container">
                    <label htmlFor="price">Цена</label>
                    <select name="price" id="price" value={price} onChange={handleChange}>
                        <option value="">Все</option>
                        <option value="desc">Сначала дорогие</option>
                        <option value="asc">Сначала дешевые</option>
                    </select>
                </div>
            </form>

            <section className="classifieds-container">
                {loading ? (
                    <Loader loading={loading}/>
                ) : classifieds.map(classified => (
                    <Classified key={classified.id} API_URL={API_URL} token={token} id={classified.id}
                                image={classified.image_url} title={classified.title}
                                description={classified.description} price={classified.price} forUser={true}
                                onDeleted={fetchClassifieds}/>
                ))}
            </section>
        </>
    )
}