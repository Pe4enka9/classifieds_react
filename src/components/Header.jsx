import Navigation from "./Navigation.jsx";

export default function Header({API_URL, token, setToken}) {

    return (
        <header className="mb-5">
            <Navigation API_URL={API_URL} token={token} setToken={setToken}/>
        </header>
    )
}