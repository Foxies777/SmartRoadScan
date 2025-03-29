
import { $pits, loadPitsFx } from "@entities/reports"
import { useUnit } from "effector-react"
import { useEffect } from "react"

export const useLoadPits = () => {
    const [pits, loadPits] = useUnit([$pits, loadPitsFx.pending])
    useEffect(() => {
        loadPitsFx()
    }, [])
    return [pits, loadPits] as const
}