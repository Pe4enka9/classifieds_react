import {NavLink, useNavigate} from "react-router-dom";

export default function Navigation({API_URL, token, setToken}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + token}
        })
            .then(res => {
                if (res.ok) {
                    setToken('');
                    localStorage.removeItem('token');
                    navigate('/auth');
                }
            })
            .catch(err => console.error(err))
    };

    return (
        <nav>
            <NavLink to="/">Все объявления</NavLink>

            {!token ? (
                <>
                    <NavLink to="/register">Регистрация</NavLink>
                    <NavLink to="/auth">Вход</NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/user/classifieds">Ваши объявления</NavLink>
                    <a onClick={handleLogout}>Выйти</a>
                </>
            )}
        </nav>
    )
}