import { notification } from "antd";
import { createEffect } from "effector";

export const showErrorMassage = createEffect((error: Error) => notification.error({message: error.message}))

export const showSuccessMassage = createEffect((massage: string) => notification.success({message: massage}))