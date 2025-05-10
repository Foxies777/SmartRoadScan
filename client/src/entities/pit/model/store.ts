import { createEffect, createStore } from "effector";
import { Pit } from "../types/pit";
import { getPits } from "../api/pit";

export const loadPitsFx = createEffect(getPits)

export const $pits = createStore<Pit[]>([]).on(loadPitsFx.doneData, (_, pits) => pits)