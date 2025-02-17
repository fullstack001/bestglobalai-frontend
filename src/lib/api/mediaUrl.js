import axiosInstance from "./axios";

export const getLargeMediaUrl = async (formData) => {
  try {
    const res = await axiosInstance.post("/api/media-url", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch {
    return null;
  }
};
