import { api, errorHandler } from "../api"
import  {Reports}  from "./model"
export const getReports = async() =>{
    try {
        const response = await api.get("/api/reports").json<Reports[]>()
        return response;
    } catch (error) {
            console.error(error);
            return await errorHandler(error)
    }
}