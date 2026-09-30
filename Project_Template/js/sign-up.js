// Lay form dang ky
const signUpForm = document.getElementById("sign-up-form");

// Lay cac o input
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Lay cac thong bao
const signUpValidation = document.getElementById("sign-up-validation");
const signUpError = document.getElementById("sign-up-error");

// Thong bao input bi bo trong
const emailCannotBlank = document.querySelector(".email-cannot-blank");
const usernameCannotBlank = document.querySelector(".username-cannot-blank");
const passwordCannotBlank = document.querySelector(".password-cannot-blank");

// Thong bao loi
const emailExist = document.querySelector(".email-exist");
const emailError = document.querySelector(".email-error");
const passwordMinLengthError = document.querySelector(
  ".password-min-length-error"
);
const passwordNumberRequiredError = document.querySelector(
  ".password-number-required-error"
);
const passwordUppercaseLowercaseError = document.querySelector(
  ".password-uppercase-lowercase-error"
);

// Bat su kien submit form
signUpForm.addEventListener("submit", function (e) {
  // Khong cho form dowload trang
  e.preventDefault();

  // Lay du lieu nguoi dung nhap
  const email = emailInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  // An thong bao cu
  signUpValidation.classList.add("hidden");
  signUpError.classList.add("hidden");

  emailCannotBlank.classList.add("hidden");
  usernameCannotBlank.classList.add("hidden");
  passwordCannotBlank.classList.add("hidden");

  emailExist.classList.add("hidden");
  emailError.classList.add("hidden");
  passwordMinLengthError.classList.add("hidden");
  passwordNumberRequiredError.classList.add("hidden");
  passwordUppercaseLowercaseError.classList.add("hidden");

  // 1. Email khong duoc de trong
  if (email === "") {
    signUpValidation.classList.remove("hidden");
    emailCannotBlank.classList.remove("hidden");
    return;
  }

  // 2. Username khong duoc de trong
  if (username === "") {
    signUpValidation.classList.remove("hidden");
    usernameCannotBlank.classList.remove("hidden");
    return;
  }

  // 3. Email phai dung dinh dang
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    signUpError.classList.remove("hidden");
    emailError.classList.remove("hidden");
    return;
  }

  // 4. Mat khau khong duoc de trong
  if (password === "") {
    signUpValidation.classList.remove("hidden");
    passwordCannotBlank.classList.remove("hidden");
    return;
  }

  // 5. Mat khau toi thieu 8 ki tu
  if (password.length < 8) {
    signUpError.classList.remove("hidden");
    passwordMinLengthError.classList.remove("hidden");
    return;
  }

  // 6. Mat khau phai co chu so
  if (!/\d/.test(password)) {
    signUpError.classList.remove("hidden");
    passwordNumberRequiredError.classList.remove("hidden");
    return;
  }

  // 7. Mat khau phai co chu thuong va chu hoa
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    signUpError.classList.remove("hidden");
    passwordUppercaseLowercaseError.classList.remove("hidden");
    return;
  }

  // Lay danh sach user tu localStorage
  let userList = JSON.parse(localStorage.getItem("userList")) || [];

  // Kiem email da ton tai hay chua
  const emailExists = userList.some(function (user) {
    return user.email === email;
  });

  if (emailExists) {
    signUpError.classList.remove("hidden");
    emailExist.classList.remove("hidden");
    return;
  }

  // Tao user moi
  const newUser = {
    usercode: "U" + String(userList.length + 1).padStart(3, "0"),
    username: username,
    email: email,
    password: password,
    role: "user",
    birthday: "",
    status: "Active",
    description: "",
  };

  // Them user moi vao danh sach
  userList.push(newUser);

  // Luu lai localStorage
  localStorage.setItem("userList", JSON.stringify(userList));

  // Luu thong bao dang ky thanh cong
  localStorage.setItem(
    "signupMessage",
    "Dang ky tai khoan thanh cong"
  );

  // Chuyen sang trang thai dang nhap
  window.location.href = "./sign-in.html";
});