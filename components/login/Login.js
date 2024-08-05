import styles from "./login.module.css";
import loginUser from "../../api/loginApi";
import { handleLinkClick, navigateTo } from "../../router";

const Login = () => {
  const loginContainer = document.createElement("div");
  loginContainer.className = styles.loginContainer;

  const title = document.createElement("h1");
  const logo = document.createElement("img");
  logo.src = "../assets/Logo-hodu.png";
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
  idInput.setAttribute("autocomplete", "username");
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
  signUp.href = "/signup";
  signUp.textContent = "회원가입";
  signUp.addEventListener("click", (event) =>
    handleLinkClick(event, "/signup")
  );

  const findPw = document.createElement("a");
  findPw.href = "/";
  findPw.textContent = "비밀번호 찾기";
  findPw.addEventListener("click", (event) => handleLinkClick(event, "/"));

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
      errorMessage.classList.toggle(`${styles.view}`);
      idInput.focus();
      return;
    }

    if (!password) {
      errorMessage.textContent = "비밀번호를 입력해주세요.";
      errorMessage.classList.toggle(`${styles.view}`);
      passwordInput.focus();
      return;
    }

    try {
      const result = await loginUser(username, password, login_type);
      console.log(`${login_type} login successful:`, result);
      navigateTo("/");
    } catch (error) {
      errorMessage.textContent = "아이디 또는 비밀번호가 일치하지 않습니다.";
      errorMessage.classList.toggle(`${styles.view}`);
      console.error(`${login_type} login failed:`, error);
    }
  });

  loginContainer.appendChild(title);
  loginContainer.appendChild(loginSection);
  loginContainer.appendChild(linkContainer);

  return loginContainer;
};

export default Login;
