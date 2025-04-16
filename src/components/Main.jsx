import {useEffect, useState} from "react";
import Classified from "./Classified.jsx";
import Loader from "./Loader.jsx";

export default function Main({API_URL}) {
    useEffect(() => {
        document.title = 'Объявления';
    }, []);

    const [price, setPrice] = useState('');

    const handleChange = (e) => {
        setPrice(e.target.value);
    };

    const [classifieds, setClassifieds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`${API_URL}/classifieds?price=${price}`)
            .then(res => res.json())
            .then(data => setClassifieds(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [API_URL, price]);

    return (
        <>
            <h1 className="mb-2">Объявления</h1>

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
                    <Classified key={classified.id} id={classified.id} image={classified.image_url}
                                title={classified.title} description={classified.description} price={classified.price}/>
                ))}
            </section>
        </>
    )
}