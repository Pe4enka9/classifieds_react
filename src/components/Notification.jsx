export default function Notification({notification}) {
    return <p className={`notification ${notification && 'active'}`}>Создано новое объявление</p>
}