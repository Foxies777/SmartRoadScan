import { useUnit } from "effector-react"
import { signInFx } from "./model"

export const useLogin = () => {
    const [login, loading] = useUnit([signInFx, signInFx.pending])
    return [login, loading] as const
}