import { createEffect, createStore } from "effector";
import { getReports } from "../api/reports";
import { Reports } from "../types/model";


export const loadPitsFx = createEffect(getReports)

export const $pits = createStore<Reports[]>([]).on(loadPitsFx.doneData, (_, pits) => pits)