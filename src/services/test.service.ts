import { api } from "@/configs/axios";
import toast from "react-hot-toast";

export const getTestData = async () => {
  const data = api.get("/echo/get/json");

  toast.promise(data, {
    loading: "Loading...",
    success: "Data fetched successfully!",
    error: "Failed to fetch data.",
  });

  return data;
};
