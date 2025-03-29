import ky, { HTTPError } from "ky";

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export class ValidationError extends Error {
  constructor(massage: string) {
    super(massage)
    this.name = "ValidationError"
  }
}

export const errorHandler = async(error: unknown) =>{
    const httpError = error as HTTPError
    if (httpError.name = "HTTPError") {
        const serverMasssage = await httpError.response.text()
        throw new Error(serverMasssage)
    } else {
        if (error instanceof ValidationError) {
            throw error
        } else {
            throw new Error(httpError.message)
        }
    }
}