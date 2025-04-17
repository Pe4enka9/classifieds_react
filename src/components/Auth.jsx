import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import checkUser from "../functions/checkUser.js";

export default function Auth({API_URL, token, setToken}) {
    const navigate = useNavigate();

    useEffect(() => {
        checkUser(token, navigate);
    }, [navigate, token]);

    useEffect(() => {
        document.title = 'Авторизация';
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
    const [failAuth, setFailAuth] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setFailAuth(false);

        fetch(`${API_URL}/auth`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (res.status === 401) {
                    setFailAuth(true);
                    setFormData({...formData, password: ''});
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setFormData({email: '', password: ''});
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                    navigate('/');
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Авторизация</h1>

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

            {failAuth && <p className="error">Неверный логин или пароль</p>}

            <button type="submit" className={`btn ${loading ? 'disabled' : ''}`} disabled={loading}>Войти</button>

            <p>Ещё нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        </form>
    )
}