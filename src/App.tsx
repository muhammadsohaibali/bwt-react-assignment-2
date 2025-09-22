import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { appRoutes } from './routes/AppRoutes'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {Object.entries(appRoutes).map(([key, { path, element: Element }]) => (
          <Route key={key} path={path} element={<Element />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
