
export function logout() {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the landing page
    window.location.href = "/";
}
