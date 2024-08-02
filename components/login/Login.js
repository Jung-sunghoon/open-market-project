import styles from "./login.module.css";

const Login = () => {
  const container = document.createElement("div");

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

  const form = document.createElement("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    const username = document.getElementById("id").value;
    const password = document.getElementById("password").value;

    try {
      const result = await loginUser(username, password);
      console.log("Login successful:", result);
      // 로그인 성공 시 추가 작업 (예: 리디렉션, 메시지 표시 등)
    } catch (error) {
      console.error("Login failed:", error);
      // 로그인 실패 시 처리 (예: 에러 메시지 표시 등)
    }
  });

  const idLabel = document.createElement("label");
  idLabel.setAttribute("for", "id");
  idLabel.textContent = "id:";

  const idInput = document.createElement("input");
  idInput.setAttribute("type", "text");
  idInput.setAttribute("id", "id");
  idInput.setAttribute("name", "id");
  idInput.setAttribute("autocomplete", "username");
  idInput.required = true;

  const passwordLabel = document.createElement("label");
  passwordLabel.setAttribute("for", "password");
  passwordLabel.textContent = "Password:";

  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("id", "password");
  passwordInput.setAttribute("name", "password");
  passwordInput.setAttribute("autocomplete", "new-password");
  passwordInput.required = true;

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "Login";

  form.appendChild(idLabel);
  form.appendChild(idInput);
  form.appendChild(passwordLabel);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);

  loginSection.appendChild(loginSectionTitle);
  loginSection.appendChild(form);

  container.appendChild(title);
  container.appendChild(loginSection);

  return container;
};

export default Login;
