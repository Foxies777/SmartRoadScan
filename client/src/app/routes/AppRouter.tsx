import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SmartRoadScanRoutes } from "shared/utils/const";
import { Home } from "pages/Home";
import { Points } from "pages/Points";
import { SignIn } from "pages/SignIn";
import { SignUp } from "pages/SignUp";
import { AnimatedLayout } from "./AnimatedLayout";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AnimatedLayout />}>
        <Route path={SmartRoadScanRoutes.HOME} element={<Home />} />
        <Route path={SmartRoadScanRoutes.POINTS} element={<Points />} />
      </Route>
      <Route path={SmartRoadScanRoutes.LOGIN} element={<SignIn />} />
      <Route path={SmartRoadScanRoutes.REGISTRATION} element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
