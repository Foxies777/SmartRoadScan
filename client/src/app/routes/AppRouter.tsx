import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SmartRoadScanRoutes } from "shared/utils/const";
import { Home } from "pages/Home";
import { Points } from "pages/Points";
import { SignIn } from "pages/SignIn";
import { SignUp } from "pages/SignUp";
import { AnimatedLayout } from "./AnimatedLayout";
import { PrivateRoute } from "./PrivateRoute";
import { Profile } from "@pages/Profile";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* 👇 Приватные маршруты */}
      <Route element={<PrivateRoute />}>
        <Route path={SmartRoadScanRoutes.PROFILE} element={<Profile/>}/>

        
      </Route>
      <Route element={<AnimatedLayout />}>
      <Route path={SmartRoadScanRoutes.POINTS} element={<Points />} />
      <Route path={SmartRoadScanRoutes.HOME} element={<Home />} />
      </Route>
      <Route path={SmartRoadScanRoutes.LOGIN} element={<SignIn />} />
      <Route path={SmartRoadScanRoutes.REGISTRATION} element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
