import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const container = document.createElement("div");

  const title = document.createElement("h1");
  title.textContent = "Home Page";

  const loginText = document.querySelector(".navItemLogin");
  const token = localStorage.getItem("token");
  if (token) {
    loginText.textContent = "로그아웃";
    loginText.href = "/";
  }

  if (token) {
    loginText.addEventListener("click", async function (e) {
      e.preventDefault();

      await axios.post(`${API_URL}/accounts/logout/`, {});

      localStorage.removeItem("token");

      loginText.textContent = "로그인";

      loginText.href = "/login";
    });
  }

  container.appendChild(title);

  return container;
};

export default Home;
