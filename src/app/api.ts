import axios from "axios";

axios.defaults.withCredentials = true; // ✅ Allow cookies to be sent

export const loginAdmin = async (username: string, password: string) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    await axios.post("http://127.0.0.1:8000/admins/admin-login", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      withCredentials: true, // ✅ Send cookies with the request
    });

    console.log("✅ Login successful!");
    return true;
  } catch (error: any) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    return false;
  }
};

export const logoutAdmin = async () => {
  try {
    await axios.post("http://127.0.0.1:8000/admins/logout");
    console.log("✅ Logged out successfully!");
  } catch (error: any) {
    console.error("❌ Logout failed:", error.response?.data || error.message);
  }
};

export const checkAuth = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/admins/me", {
      withCredentials: true, // 🔥 important for cookies
    });
    return response.data;
  } catch (error) {
    console.error("❌ checkAuth failed:", error);
    return null;
  }
};
