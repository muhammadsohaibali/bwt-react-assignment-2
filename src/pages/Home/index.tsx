import { useNavigate } from 'react-router-dom'
import { appRoutes } from '../../routes/AppRoutes'

export default function Home() {
    const navigate = useNavigate()
    const cards = Object.values(appRoutes).filter(r => r.label !== 'Home')

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-8">Choose a Page</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl justify-center">
                {cards.map(route => (
                    <div
                        key={route.path}
                        onClick={() => navigate(route.path)}
                        className="cursor-pointer rounded-xl bg-white shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center"
                    >
                        <h2 className="text-xl font-semibold mb-2">{route.label}</h2>
                        <p className="text-gray-600">Go to {route.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
