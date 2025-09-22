import { NavLink } from 'react-router-dom'
import { appRoutes } from '../routes/AppRoutes'

export default function Navbar() {
    const cards = Object.values(appRoutes).filter(r => r.label !== 'Home')

    return (
        <nav className="flex gap-4 p-4 bg-gray-100 shadow-sm">
            <NavLink to={'/'} />
            {Object.entries(cards).map(([key, { path, label }]) => (
                <NavLink
                    key={key}
                    to={path.replace(':username', 'sohaib')}
                    className={({ isActive }) =>
                        `text-gray-700 hover:text-blue-600 transition ${isActive ? 'underline underline-offset-4 text-blue-600' : ''
                        }`
                    }
                >
                    {label}
                </NavLink>
            ))}
        </nav>
    )
}
