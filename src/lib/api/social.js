import axiosInstance from "./axios";

export const createUserProfile = async (title) => {
  try {
    const res = await axiosInstance.post(
      "/api/social/create-user-profile",
      title
    );
    return res.data;
  } catch {
    return null;
  }
};

export const socialLinkManage = async () => {
  try {
    const res = await axiosInstance.post("/api/social/social-link-manage");
    return res.data;
  } catch {
    return null;
  }
};
