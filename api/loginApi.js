import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // API 엔드포인트 URL

const loginUser = async (username, password, login_type) => {
  try {
    const res = await axios.post(`${API_URL}/accounts/login/`, {
      username,
      password,
      login_type,
    });

    if (res.status === 200) {
      if (login_type === "BUYER") {
        const token = res.data.token;
        localStorage.setItem("token", token);
        return { message: "Buyer login successful", data: res.data };
      } else if (login_type === "SELLER") {
        const token = res.data.token;
        localStorage.setItem("token", token);
        return { message: "Seller login successful", data: res.data };
      }
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed");
  }
};

export default loginUser;
