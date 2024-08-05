import axios from "axios";
import styles from "./signup.module.css";

const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const signupContainer = document.createElement("div");
  signupContainer.className = styles.signupContainer;

  const title = document.createElement("h1");
  const logo = document.createElement("img");
  logo.src = "../assets/Logo-hodu.png";
  title.className = styles.title;
  logo.className = styles.logo;
  title.appendChild(logo);

  const signupSection = document.createElement("section");
  const signupSectionTitle = document.createElement("h2");
  signupSectionTitle.textContent = "회원가입 섹션";
  signupSectionTitle.className = "sr-only";
  signupSection.className = styles.signupSection;

  const signupTypeContainer = document.createElement("div");
  signupTypeContainer.className = styles.signupTypeContainer;

  const buysignup = document.createElement("input");
  buysignup.type = "radio";
  buysignup.id = "BUYER";
  buysignup.name = "signupType";
  buysignup.checked = true;
  const buysignupLabel = document.createElement("label");
  buysignupLabel.className = styles.buyerLabel;
  buysignupLabel.htmlFor = "BUYER";
  buysignupLabel.textContent = "구매회원가입";

  const sellsignup = document.createElement("input");
  sellsignup.type = "radio";
  sellsignup.id = "SELLER";
  sellsignup.name = "signupType";
  const sellsignupLabel = document.createElement("label");
  sellsignupLabel.className = styles.sellerLabel;
  sellsignupLabel.htmlFor = "SELLER";
  sellsignupLabel.textContent = "판매회원가입";

  signupTypeContainer.appendChild(buysignup);
  signupTypeContainer.appendChild(buysignupLabel);
  signupTypeContainer.appendChild(sellsignup);
  signupTypeContainer.appendChild(sellsignupLabel);

  const signupForm = document.createElement("form");
  signupForm.className = styles.signupForm;

  const loginMessage = document.createElement("p");
  loginMessage.className = styles.normalMessage;

  const pwCheckMessage = document.createElement("p");

  const idLabel = document.createElement("label");
  idLabel.textContent = "아이디";
  idLabel.setAttribute("for", "id");

  const idInput = document.createElement("input");
  idInput.setAttribute("type", "text");
  idInput.setAttribute("id", "id");
  idInput.setAttribute("name", "id");
  idInput.setAttribute("autocomplete", "username");

  const validBtn = document.createElement("button");
  validBtn.className = "validBtn";
  validBtn.textContent = "중복확인";
  validBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const username = idInput.value;

    try {
      const res = await axios.post(
        `${API_URL}/accounts/signup/valid/username/`,
        {
          username,
        }
      );

      // 성공적인 응답 처리
      console.log(res.data.Success);
      loginMessage.textContent = res.data.Success;
      loginMessage.classList.remove(`${styles.errorMessage}`);
      idInput.classList.remove(`${styles.inputError}`);
    } catch (error) {
      console.error("Error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.FAIL_Message
      ) {
        loginMessage.textContent = error.response.data.FAIL_Message;
        loginMessage.classList.add(`${styles.errorMessage}`);
        idInput.classList.add(`${styles.inputError}`);
      } else {
        console.error("An unexpected error occurred. Please try again.");
      }
    }
  });

  const passwordLabel = document.createElement("label");
  passwordLabel.textContent = "비밀번호";
  passwordLabel.setAttribute("for", "password");

  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("id", "password");
  passwordInput.setAttribute("name", "password");
  passwordInput.setAttribute("autocomplete", "new-password");

  const passwordCheckLabel = document.createElement("label");
  passwordCheckLabel.textContent = "비밀번호 재확인";
  passwordCheckLabel.setAttribute("for", "passwordCheck");

  const passwordCheckInput = document.createElement("input");
  passwordCheckInput.setAttribute("type", "password");
  passwordCheckInput.setAttribute("id", "passwordCheck");
  passwordCheckInput.setAttribute("name", "passwordCheck");
  passwordCheckInput.setAttribute("autocomplete", "new-password");

  const usernameLabel = document.createElement("label");
  usernameLabel.textContent = "이름";
  usernameLabel.setAttribute("for", "username");

  const usernameInput = document.createElement("input");
  usernameInput.setAttribute("type", "text");
  usernameInput.setAttribute("id", "username");
  usernameInput.setAttribute("name", "username");

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "로그인";

  signupForm.appendChild(idLabel);
  signupForm.appendChild(idInput);
  signupForm.appendChild(loginMessage);
  signupForm.appendChild(validBtn);

  signupForm.appendChild(passwordLabel);
  signupForm.appendChild(passwordInput);

  signupForm.appendChild(passwordCheckLabel);
  signupForm.appendChild(passwordCheckInput);
  signupForm.appendChild(pwCheckMessage);

  signupForm.appendChild(usernameLabel);
  signupForm.appendChild(usernameInput);

  signupForm.appendChild(submitButton);

  signupSection.appendChild(signupSectionTitle);
  signupSection.appendChild(signupTypeContainer);
  signupSection.appendChild(signupForm);

  signupContainer.appendChild(title);
  signupContainer.appendChild(signupSection);

  return signupContainer;
};

export default Signup;
