export default function Loader({loading, deleting = false}) {
    return (
        <div className={`loader-container ${loading && 'active'}`}>
            <div className={`loader ${deleting && 'deleting'}`}></div>
        </div>
    )
}