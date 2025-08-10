import { Outlet, Link } from 'react-router-dom';

const Admin = () => {
    return (
        <>
            <Link to="/admin" >Admin Panel</Link>
            <nav>
                <Link to="account">Dashboard</Link>
            </nav>

            <Outlet />
        </>
    )
}

export default Admin