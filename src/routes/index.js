import Login from '../pages/Login';
import Admin from '../pages/Admin';
import Employee from '../pages/Employee';
import NotFoundPage from '../pages/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import ProtectedAdminRoute from '../pages/ProtectedAdminRoute';
import ProtectedEmployeeRoute from "../pages/ProtectedEmployeeRoute";
import { useSelector } from "react-redux";

export default function RoutesComponent() {

    const username = useSelector((state) => state.user.username);

    return (
        <Routes>
            <Route path='/' exact element={<Login />} />
            <Route path='admin' element={
                <ProtectedAdminRoute username={username}>
                    <Admin />
                </ProtectedAdminRoute>
            } />
            <Route path='employee/:id' element={
                <ProtectedEmployeeRoute username={username}>
                    <Employee />
                </ProtectedEmployeeRoute>
            } />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
} 