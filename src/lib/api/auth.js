import axiosInstance from "./axios";

export function logout() {
  // Remove the token from localStorage
  localStorage.removeItem("token");

  // Redirect to the landing page
  window.location.href = "/";
}

export async function resendVerificationCode(email) {
  const response = await axiosInstance.post(`api/auth/resend`, {
    email,
  });
  return response.data;
}

export async function verifyCode(email, validationCode) {
  try {
    const response = await axiosInstance.post(`/api/auth/verify`, {
      email,
      validationCode,
    });
    return { status: 200, data: response.data };
  } catch (error) {
    return {
      status: 500,
      msg: error.response.data.msg || "An error occurred during verification",
    };
  }
}
