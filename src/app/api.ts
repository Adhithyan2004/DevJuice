import axios from "axios";

export const loginAdmin = async (username: string, password: string) => {
  try {
    // ✅ Use URLSearchParams for form-encoded data
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    console.log("Sending login request with:", formData.toString());

    const response = await axios.post("http://127.0.0.1:8000/admins/admin-login", 
      formData, 
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } } // ✅ Correct content type
    );

    console.log("Login successful:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};
// ✅ Add setAuthToken function
export const setAuthToken = (token: string | null) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };