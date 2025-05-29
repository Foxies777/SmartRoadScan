import { createBrowserRouter } from "react-router-dom";
import { SmartRoadScanRoutes } from "shared/utils/const";
import { SignIn } from "pages/SignIn";
import { SignUp } from "pages/SignUp";
import { Home } from "pages/Home";
import Points from "pages/Points/ui/Points";
import { Profile } from "@pages/Profile";


export const router = createBrowserRouter([
    {
        path: SmartRoadScanRoutes.HOME,
        element: <Home />,
    },
    {
        path: SmartRoadScanRoutes.POINTS,
        element: <Points/>
    },
    {
        path: SmartRoadScanRoutes.LOGIN,
        element: <SignIn />,
    },
    {
        path: SmartRoadScanRoutes.REGISTRATION,
        element: <SignUp />
    },
    {
        path: SmartRoadScanRoutes.PROFILE,
        element: <Profile/>
    }
]);