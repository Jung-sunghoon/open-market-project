import axios from "axios";
import styles from "./signup.module.css";
import { navigateTo } from "../../router";

const API_URL = import.meta.env.VITE_API_URL;

// label 요소를 생성하는 헬퍼 함수
const createLabel = (text, htmlFor, className = "") => {
  const label = document.createElement("label");
  label.textContent = text;
  label.htmlFor = htmlFor;
  if (className) label.className = className;
  return label;
};

// input 요소를 생성하는 헬퍼 함수
const createInput = (type, id, name, className = "", autocomplete = "") => {
  const input = document.createElement("input");
  input.setAttribute("type", type);
  input.id = id;
  input.setAttribute("name", name);
  if (className) input.className = className;
  if (autocomplete) input.setAttribute("autocomplete", autocomplete);
  return input;
};

// 메시지 요소를 생성하는 헬퍼 함수
const createMessageElement = (className = "") => {
  const message = document.createElement("p");
  if (className) message.className = className;
  return message;
};

const checkPreviousFields = (currentField, fields) => {
  const currentIndex = fields.indexOf(currentField);
  for (let i = 0; i < currentIndex; i++) {
    if (!fields[i].value.trim()) {
      return false;
    }
  }
  return true;
};

// 아이디 유효성 검사 함수
const validateId = (idInput, loginMessage) => {
  const id = idInput.value.trim();
  const hasEnglish = /[a-zA-Z]/.test(id);
  const hasNumber = /[0-9]/.test(id);
  const isValid = id.length >= 1 && id.length <= 20 && hasEnglish && hasNumber;

  if (isValid) {
    loginMessage.textContent = "멋진 아이디네요 :)";
    loginMessage.classList.add(styles.view);
    loginMessage.classList.remove(styles.errorMessage);
  } else {
    loginMessage.classList.add(styles.view);
    loginMessage.textContent =
      "ID는 20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다.";
    loginMessage.classList.add(styles.errorMessage);
  }
};

// 비밀번호 유효성 검사 함수
const validatePassword = (passwordInput, pwMessage) => {
  const password = passwordInput.value.trim();
  const hasEnglish = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isValid =
    password.length >= 8 && hasEnglish && hasNumber && hasSpecialChar;

  if (isValid) {
    passwordInput.classList.add(styles.checked);
    pwMessage.textContent = ""; // 유효성 검사 통과 시 메시지 초기화
  } else {
    passwordInput.classList.remove(styles.checked);
    pwMessage.textContent =
      "8자 이상, 영어 대소문자, 숫자, 특수문자를 사용하세요.";
  }
};

// 비밀번호 확인 유효성 검사 함수
const validatePasswordMatch = (
  passwordInput,
  passwordCheckInput,
  pwCheckMessage
) => {
  const password = passwordInput.value.trim();
  const passwordCheck = passwordCheckInput.value.trim();

  if (passwordCheck.length > 0) {
    if (passwordCheck === password) {
      pwCheckMessage.textContent = "";
      passwordCheckInput.classList.add(styles.checked);
    } else {
      pwCheckMessage.textContent = "비밀번호가 일치하지 않습니다.";
      passwordCheckInput.classList.remove(styles.checked);
      pwCheckMessage.classList.add(styles.view);
    }
  } else {
    pwCheckMessage.textContent = "";
    passwordCheckInput.classList.remove(styles.checked);
  }
};

// 전화번호 유효성 검사 함수
const validatePhoneNumber = (
  telInput2,
  telInput3,
  telBtn,
  telMessage,
  updateSubmitButtonState
) => {
  const tel1 = telInput2.value.trim();
  const tel2 = telInput3.value.trim();
  const telPrefix = telBtn.textContent;
  const phoneNumber = `${telPrefix}${tel1}${tel2}`;
  const isValidPhoneNumber = /^01[0-9]\d{7,8}$/.test(phoneNumber);

  if (isValidPhoneNumber) {
    telMessage.textContent = "";
    telMessage.classList.remove(styles.errorMessage);
  } else {
    telMessage.textContent =
      "올바른 전화번호 형식을 입력하세요. (예: 01012345678)";
    telMessage.classList.add(styles.errorMessage);
  }

  updateSubmitButtonState();
};

// 회원가입 컴포넌트 생성 함수
const Signup = () => {
  const signupContainer = document.createElement("div");
  signupContainer.className = styles.signupContainer;

  // 타이틀 생성
  const title = document.createElement("h1");
  const logo = document.createElement("img");
  logo.src = "assets/Logo-hodu.png";
  title.className = styles.title;
  logo.className = styles.logo;
  title.appendChild(logo);

  // 회원가입 섹션 생성
  const signupSection = document.createElement("section");
  const signupSectionTitle = document.createElement("h2");
  signupSectionTitle.textContent = "회원가입 섹션";
  signupSectionTitle.className = "sr-only";
  signupSection.className = styles.signupSection;

  // 회원가입 유형 컨테이너 생성
  const signupTypeContainer = document.createElement("div");
  signupTypeContainer.className = styles.signupTypeContainer;

  // 회원가입 유형 input 및 label 생성 헬퍼 함수
  const createSignupTypeInput = (id, labelClass, labelText) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.id = id;
    input.name = "signupType";

    const label = document.createElement("label");
    label.className = labelClass;
    label.htmlFor = id;
    label.textContent = labelText;

    return { input, label };
  };

  // 구매회원가입 라디오 버튼 생성
  const { input: buysignup, label: buysignupLabel } = createSignupTypeInput(
    "BUYER",
    styles.buyerLabel,
    "구매회원가입"
  );
  buysignup.checked = true;

  // 판매회원가입 라디오 버튼 생성
  const { input: sellsignup, label: sellsignupLabel } = createSignupTypeInput(
    "SELLER",
    styles.sellerLabel,
    "판매회원가입"
  );

  signupTypeContainer.append(
    buysignup,
    buysignupLabel,
    sellsignup,
    sellsignupLabel
  );

  // 회원가입 폼 생성
  const signupForm = document.createElement("form");
  signupForm.className = styles.signupForm;

  // 메시지 요소들 생성
  const loginMessage = createMessageElement(styles.normalMessage);
  const pwMessage = createMessageElement(styles.errorMessage);
  const pwCheckMessage = createMessageElement(styles.errorMessage);
  const usernameMessage = createMessageElement(styles.errorMessage);
  const telMessage = createMessageElement(styles.errorMessage);

  // 아이디 입력 컨테이너 생성
  const idContainer = document.createElement("div");
  idContainer.className = styles.idContainer;

  const idLabel = createLabel("아이디", styles.id);
  const idInput = createInput("text", styles.id, "id", "", "id");

  idInput.addEventListener("blur", () => validateId(idInput, loginMessage));

  // 중복확인 버튼 생성
  const validBtn = document.createElement("button");
  validBtn.className = styles.validBtn;
  validBtn.textContent = "중복확인";

  // 중복확인 버튼 클릭 이벤트 핸들러
  validBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const id = idInput.value.trim();

    if (!id) {
      loginMessage.textContent = "아이디를 입력하세요.";
      loginMessage.classList.add(styles.view);
      loginMessage.classList.add(styles.errorMessage);
      return;
    }

    try {
      await axios.post(`${API_URL}/accounts/signup/valid/username/`, {
        username: id,
      });
      loginMessage.textContent = "사용 가능한 아이디입니다.";
      loginMessage.classList.add(styles.view);
      loginMessage.classList.remove(styles.errorMessage);
    } catch (error) {
      console.error("Error checking ID:", error);
      loginMessage.textContent = error.response.data.FAIL_Message;
      loginMessage.classList.add(styles.view);
      loginMessage.classList.add(styles.errorMessage);
    }
  });

  idContainer.append(idInput, validBtn);

  // 비밀번호 입력 필드 및 유효성 검사 이벤트 리스너 생성
  const passwordLabel = createLabel("비밀번호", styles.password);
  const passwordInput = createInput(
    "password",
    styles.password,
    "password",
    "",
    "new-password"
  );
  passwordInput.addEventListener("blur", () =>
    validatePassword(passwordInput, pwMessage)
  );

  // 비밀번호 확인 입력 필드 및 유효성 검사 이벤트 리스너 생성
  const passwordCheckLabel = createLabel("비밀번호 확인", styles.passwordCheck);
  const passwordCheckInput = createInput(
    "password",
    styles.passwordCheck,
    "password-check",
    "",
    "new-password"
  );
  passwordCheckInput.addEventListener("blur", () =>
    validatePasswordMatch(passwordInput, passwordCheckInput, pwCheckMessage)
  );

  // 사용자 이름 입력 필드 생성
  const usernameLabel = createLabel("이름", styles.username);
  const usernameInput = createInput("text", styles.username, "username");

  // 전화번호 입력 섹션 생성
  const telLabel = createLabel("전화번호");
  const telSection = document.createElement("div");
  telSection.className = styles.telSection;

  const telListSection = document.createElement("div");
  telListSection.className = styles.telListSection;

  const telBtn = document.createElement("button");
  telBtn.className = styles.telBtn;
  telBtn.textContent = "010";

  const telList = document.createElement("ul");
  telList.className = styles.telList;

  const phoneNumbers = ["010", "011", "016", "017", "018", "019"];

  phoneNumbers.forEach((number) => {
    const li = document.createElement("li");
    li.textContent = number;
    telList.appendChild(li);
  });

  telBtn.addEventListener("click", (e) => {
    e.preventDefault();
    telList.classList.toggle(styles.view);
  });

  telList.addEventListener("click", (e) => {
    if (e.target.nodeName === "LI") {
      telBtn.textContent = e.target.textContent;
      telList.classList.toggle(styles.view);
    }
  });

  telListSection.append(telBtn, telList);

  const telInput1 = createInput("text", styles.telInput1, "telInput2");
  const telInput2 = createInput("text", styles.telInput2, "telInput3");

  telSection.append(telListSection, telInput1, telInput2);

  telInput1.addEventListener("blur", () =>
    validatePhoneNumber(
      telInput1,
      telInput2,
      telBtn,
      telMessage,
      updateSubmitButtonState
    )
  );
  telInput2.addEventListener("blur", () =>
    validatePhoneNumber(
      telInput1,
      telInput2,
      telBtn,
      telMessage,
      updateSubmitButtonState
    )
  );

  // 이용약관 체크박스 섹션 생성
  const checkSection = document.createElement("div");
  checkSection.className = styles.checkSection;

  const checkbox = createInput("checkbox", styles.checkbox, "agreement");
  const customCheckbox = createLabel("", styles.checkbox);
  customCheckbox.className = styles.customCheckbox;

  const checkText = document.createElement("p");
  checkText.innerHTML = `호두샵의 이용약관 및 개인정보처리방침에 대한 내용을 확인하였고 동의합니다.`;

  checkSection.append(checkbox, customCheckbox, checkText);

  // 제출 버튼 생성 및 상태 업데이트 함수
  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "가입하기";
  submitButton.className = styles.submitButton;
  submitButton.disabled = true;

  const updateSubmitButtonState = () => {
    const isIdValid =
      idInput.value.trim().length >= 1 &&
      /[a-zA-Z]/.test(idInput.value) &&
      /[0-9]/.test(idInput.value);
    const isPasswordValid =
      passwordInput.value.trim().length >= 8 &&
      /[a-zA-Z]/.test(passwordInput.value) &&
      /[0-9]/.test(passwordInput.value) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(passwordInput.value);
    const isPasswordMatch =
      passwordCheckInput.value.trim() === passwordInput.value.trim();
    const isCheckboxChecked = checkbox.checked;
    const isValidPhoneNumber = /^01[0-9]\d{7,8}$/.test(
      `${telBtn.textContent}${telInput1.value.trim()}${telInput2.value.trim()}`
    );

    submitButton.disabled = !(
      isIdValid &&
      isPasswordValid &&
      isPasswordMatch &&
      isCheckboxChecked &&
      isValidPhoneNumber
    );
  };

  checkbox.addEventListener("change", updateSubmitButtonState);

  // 회원가입 폼 제출 이벤트 핸들러
  submitButton.addEventListener("click", async function (e) {
    e.preventDefault();

    const username = idInput.value.trim();
    const password = passwordInput.value.trim();
    const password2 = passwordCheckInput.value.trim();
    const phone_number = `${
      telBtn.textContent
    }${telInput1.value.trim()}${telInput2.value.trim()}`;
    const name = usernameInput.value.trim();

    if (!username || !password || !password2 || !phone_number || !name) {
      loginMessage.textContent = "모든 필드를 작성해야 합니다.";
      loginMessage.classList.add(styles.view);
      loginMessage.classList.add(styles.errorMessage);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/accounts/signup/`, {
        username,
        password,
        password2,
        phone_number,
        name,
      });

      if (res.status == 201) {
        navigateTo("/open-market-project/");
      }
    } catch (error) {
      console.error("Error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.phone_number
      ) {
        telMessage.classList.add(styles.view);
        telMessage.textContent = error.response.data.phone_number;
        telMessage.classList.add(styles.errorMessage);
      } else {
        telMessage.classList.add(styles.view);
        telMessage.textContent =
          "예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.";
        telMessage.classList.add(styles.errorMessage);
      }
    }
  });

  const inputFields = [
    idInput,
    passwordInput,
    passwordCheckInput,
    usernameInput,
    telBtn,
    telInput1,
    telInput2,
  ];
  const messageElements = [
    loginMessage,
    pwMessage,
    pwCheckMessage,
    usernameMessage,
  ];

  // 입력 필드에 이벤트 리스너 추가
  inputFields.forEach((field, index) => {
    field.addEventListener("blur", () => {
      if (!checkPreviousFields(field, inputFields)) {
        field.blur();
        for (let i = 0; i < index; i++) {
          if (!inputFields[i].value.trim()) {
            messageElements[i].textContent = "필수 정보입니다.";
            messageElements[i].classList.add(styles.errorMessage);
            messageElements[i].classList.add(styles.view);
          }
        }
      }
    });

    field.addEventListener("input", () => {
      if (field.value.trim()) {
        messageElements[index].textContent = "";
        messageElements[index].classList.remove(styles.view);
        messageElements[index].classList.remove(styles.errorMessage);
      }
    });

    field.addEventListener("blur", () => {
      if (!field.value.trim()) {
        messageElements[index].textContent = "필수 정보입니다.";
        messageElements[index].classList.add(styles.errorMessage);
        messageElements[index].classList.add(styles.view);
      }
    });
  });

  // 폼 요소들 폼에 추가
  signupForm.append(
    idLabel,
    idContainer,
    loginMessage,
    passwordLabel,
    passwordInput,
    pwMessage,
    passwordCheckLabel,
    passwordCheckInput,
    pwCheckMessage,
    usernameLabel,
    usernameInput,
    usernameMessage,
    telLabel,
    telSection,
    telMessage
  );

  // 회원가입 섹션에 폼 추가
  signupSection.append(signupSectionTitle, signupTypeContainer, signupForm);
  signupContainer.append(title, signupSection, checkSection, submitButton);

  return signupContainer;
};

export default Signup;
