import { useUnit } from "effector-react"
import { registerFx } from "./model"

export const useRegister = () => {
    const [register, loading] = useUnit([registerFx, registerFx.pending])
    return [register, loading] as const
}