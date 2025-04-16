import Navigation from "./Navigation.jsx";

export default function Footer({API_URL, token, setToken}) {
    return (
        <footer>
            <Navigation API_URL={API_URL} token={token} setToken={setToken}/>
        </footer>
    )
}