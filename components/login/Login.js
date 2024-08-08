import styles from "./login.module.css";
import { handleLinkClick, navigateTo } from "../../router";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // API 엔드포인트 URL

const Login = () => {
  const loginContainer = document.createElement("div");
  loginContainer.className = styles.loginContainer;

  const title = document.createElement("h1");
  const logo = document.createElement("img");
  logo.src = "assets/Logo-hodu.png";
  title.className = styles.title;
  logo.className = styles.logo;
  title.appendChild(logo);

  const loginSection = document.createElement("section");
  const loginSectionTitle = document.createElement("h2");
  loginSectionTitle.textContent = "로그인 섹션";
  loginSectionTitle.className = "sr-only";
  loginSection.className = styles.loginSection;

  const loginTypeContainer = document.createElement("div");
  loginTypeContainer.className = styles.loginTypeContainer;

  const buyLogin = document.createElement("input");
  buyLogin.type = "radio";
  buyLogin.id = "buyer";
  buyLogin.name = "loginType";
  buyLogin.checked = true;
  const buyLoginLabel = document.createElement("label");
  buyLoginLabel.className = styles.buyerLabel;
  buyLoginLabel.htmlFor = "buyer";
  buyLoginLabel.textContent = "구매회원 로그인";

  const sellLogin = document.createElement("input");
  sellLogin.type = "radio";
  sellLogin.id = "seller";
  sellLogin.name = "loginType";
  const sellLoginLabel = document.createElement("label");
  sellLoginLabel.className = styles.sellerLabel;
  sellLoginLabel.htmlFor = "seller";
  sellLoginLabel.textContent = "판매회원 로그인";

  loginTypeContainer.appendChild(buyLogin);
  loginTypeContainer.appendChild(buyLoginLabel);
  loginTypeContainer.appendChild(sellLogin);
  loginTypeContainer.appendChild(sellLoginLabel);

  const loginForm = document.createElement("form");
  loginForm.className = styles.loginForm;

  const idLabel = document.createElement("label");
  idLabel.setAttribute("for", "id");

  const idInput = document.createElement("input");
  idInput.setAttribute("type", "text");
  idInput.setAttribute("id", "id");
  idInput.setAttribute("name", "id");
  idInput.setAttribute("autocomplete", "id");
  idInput.setAttribute("placeholder", "아이디");

  const passwordLabel = document.createElement("label");
  passwordLabel.setAttribute("for", "password");

  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("id", "password");
  passwordInput.setAttribute("name", "password");
  passwordInput.setAttribute("autocomplete", "new-password");
  passwordInput.setAttribute("placeholder", "비밀번호");

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "로그인";

  const linkContainer = document.createElement("nav");
  linkContainer.className = styles.linkContainer;

  const signUp = document.createElement("a");
  signUp.href = "/open-market-project/signup";
  signUp.textContent = "회원가입";
  signUp.addEventListener("click", (event) =>
    handleLinkClick(event, "/open-market-project/signup")
  );

  const findPw = document.createElement("a");
  findPw.href = "";
  findPw.textContent = "비밀번호 찾기";
  findPw.addEventListener("click", (event) => handleLinkClick(event, ""));

  linkContainer.append(signUp, document.createTextNode("|"), findPw);

  const errorMessage = document.createElement("p");
  errorMessage.className = styles.errorMessage;

  loginForm.appendChild(idLabel);
  loginForm.appendChild(idInput);
  loginForm.appendChild(passwordLabel);
  loginForm.appendChild(passwordInput);
  loginForm.appendChild(errorMessage);
  loginForm.appendChild(submitButton);
  loginForm.appendChild(linkContainer);

  loginSection.appendChild(loginSectionTitle);
  loginSection.appendChild(loginTypeContainer);
  loginSection.appendChild(loginForm);

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    const username = idInput.value.trim();
    const password = passwordInput.value.trim();
    const login_type = document
      .querySelector('input[name="loginType"]:checked')
      .id.toUpperCase();

    if (!username) {
      errorMessage.textContent = "아이디를 입력해주세요.";
      errorMessage.classList.add(`${styles.view}`);
      idInput.focus();
      return;
    }

    if (!password) {
      errorMessage.textContent = "비밀번호를 입력해주세요.";
      errorMessage.classList.add(`${styles.view}`);
      passwordInput.focus();
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/accounts/login/`, {
        username,
        password,
        login_type,
      });

      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("token", token);

        if (login_type === "BUYER") {
          console.log("Buyer login successful:", res.data);
        } else if (login_type === "SELLER") {
          console.log("Seller login successful:", res.data);
        }

        // navigateTo 함수가 호출되는지 확인하는 로그 추가
        console.log("Navigating to home page");
        navigateTo("/open-market-project/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      errorMessage.textContent = "아이디 또는 비밀번호가 일치하지 않습니다.";
      errorMessage.classList.add(`${styles.view}`);
      console.error(`${login_type} login failed:`, error);
    }
  });

  loginContainer.appendChild(title);
  loginContainer.appendChild(loginSection);
  loginContainer.appendChild(linkContainer);

  return loginContainer;
};

export default Login;
