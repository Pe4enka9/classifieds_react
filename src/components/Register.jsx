import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import checkUser from "../functions/checkUser.js";

export default function Register({API_URL, token}) {
    const navigate = useNavigate();

    useEffect(() => {
        checkUser(token, navigate);
    }, [navigate, token]);

    useEffect(() => {
        document.title = 'Регистрация';
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: ''});
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        fetch(`${API_URL}/registration`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setFormData({email: '', password: ''});
                    navigate('/auth');
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Регистрация</h1>

            <div className="input-container">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="your_email@example.com" value={formData.email}
                       onChange={handleChange}/>
                {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="input-container">
                <label htmlFor="password">Пароль</label>
                <input type="password" name="password" id="password" placeholder="Пароль" value={formData.password}
                       onChange={handleChange}/>
                {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <button type="submit" className={`btn ${loading ? 'disabled' : ''}`}
                    disabled={loading}>Зарегистрироваться
            </button>

            <p>Уже есть аккаунт? <Link to="/auth">Войти</Link></p>
        </form>
    )
}