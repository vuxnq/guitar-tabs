import { Link, Outlet } from 'react-router'

export default function App() {
    return <>
        <h1>App</h1>

        <nav>
            <Link to="/">Home</Link>
            <br />
            <Link to="/tabs">Tabs</Link>
            <br />
            <Link to="/artists">Artists</Link>
        </nav>

        <Outlet />
    </>
}

