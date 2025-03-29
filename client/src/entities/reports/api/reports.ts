
import { api, errorHandler } from "@shared/api/api";
import  {Reports}  from "../types/model"
export const getReports = async() =>{
    try {
        const response = await api.get("api/reports").json<Reports[]>()

        
        return response;
    } catch (error) {
            console.error(error);
            return await errorHandler(error)
    }
}

