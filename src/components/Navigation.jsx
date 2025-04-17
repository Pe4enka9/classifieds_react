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
            {!token ? (
                <>
                    <div>
                        <NavLink to="/">Все объявления</NavLink>
                    </div>

                    <div>
                        <NavLink to="/register">Регистрация</NavLink>
                        <NavLink to="/auth">Вход</NavLink>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <NavLink to="/">Все объявления</NavLink>
                        <NavLink to="/user/classifieds">Ваши объявления</NavLink>
                    </div>

                    <div>
                        <a onClick={handleLogout}>Выйти</a>
                    </div>
                </>
            )}
        </nav>
    )
}