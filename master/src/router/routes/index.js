import { privateRoutes } from './privateRoutes'
import MainLayout from '../../layout/MainLayout'
import ProtectRoute from './ProtectRoute.jsx'

export const getRoutes = () => {
    const allRoute = []
    privateRoutes.map(r => {
        r.element = <ProtectRoute route={r} >{r.element}</ProtectRoute>
    })

    return {
        path: '/',
        element: <MainLayout />,
        children: privateRoutes
    }
}