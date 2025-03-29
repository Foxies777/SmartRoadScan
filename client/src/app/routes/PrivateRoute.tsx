import { Navigate, Outlet } from "react-router-dom";
import { useUnit } from "effector-react";
import { $isAuth } from "../../entities/user/model";
import { SmartRoadScanRoutes } from "../../shared/utils/const";

export const PrivateRoute = () => {
    const isAuth = useUnit($isAuth);
    return isAuth ? <Outlet /> : <Navigate to={SmartRoadScanRoutes.LOGIN} replace />;
};
