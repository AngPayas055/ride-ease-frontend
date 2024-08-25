import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { server } from "@/app/utils/constants";

export const userSignIn = async (email: string, password: string) => {
  try {
    const data = { email, password };
    const options: AxiosRequestConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data,
    };
    const resp = await axios(`${server}/api/auth/login`, options);
    return {
      message: resp.data.message,
      data: resp.data
    };
  } catch (error:any) {
    return {error}
  }
};