import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // API 엔드포인트 URL

export const loginUser = async (id, password) => {
  try {
    const response = await axios.post(`${API_URL}/accounts/login`, {
      username,
      password,
      login_type,
    });
    return response.data; // 서버에서 받은 데이터 반환
  } catch (error) {
    console.error("Login error:", error);
    throw error; // 에러를 상위로 던져서 처리
  }
};
