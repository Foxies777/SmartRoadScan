import { useUnit } from "effector-react"
import { signInFx } from "./model"
import { $isAuth } from "@entities/user/model"
import { useEffect } from "react"
import { SmartRoadScanRoutes } from "@shared/utils/const"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
    const [login, loading, isAuth] = useUnit([signInFx, signInFx.pending, $isAuth])
    const navigate = useNavigate();
    useEffect(() =>{
        if (isAuth) {
            navigate(SmartRoadScanRoutes.HOME)
        }
    }, [isAuth, navigate])
    return [login, loading] as const
}