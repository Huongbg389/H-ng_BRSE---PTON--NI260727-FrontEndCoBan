// Lay form dang nhap

const signInForm = document.getElementById("sign-in-form");

// Lay cac o input

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

// Lay cac thong bao

const loginValidation = document.getElementById("login-validation");

const loginToast = document.getElementById("login-toast");

const loginError = document.getElementById("login-error");

// Thong bao input bi bo trong

const emailCannotBlank = document.querySelector(".email-cannot-blank");

const passwordCannotBlank = document.querySelector(".password-cannot-blank");

// Lay phan msg

const msg = document.getElementById("msg");

// Bat su kien submit form

signInForm.addEventListener("submit", function (e) {

  // Khong cho form reload trang

  e.preventDefault();

  // Lay du lieu nguoi dung nhap

  const email = emailInput.value.trim();

  const password = passwordInput.value;

  // An thong bao cu

  loginValidation.classList.add("hidden");

  loginToast.classList.add("hidden");

  loginError.classList.add("hidden");

  emailCannotBlank.classList.add("hidden");

  passwordCannotBlank.classList.add("hidden");

  // 1. Email khong duoc de trong

  if (email === "") {

    loginValidation.classList.remove("hidden");

    emailCannotBlank.classList.remove("hidden");

    msg.classList.add("show");

    return;
  }

  // 2. Mat khau khong duoc de trong

  if (password === "") {

    loginValidation.classList.remove("hidden");

    passwordCannotBlank.classList.remove("hidden");

    msg.classList.add("show");

    return;
  }

  // Lay danh sach user tu localStorage

  const userList = JSON.parse(localStorage.getItem("userList")) || [];

  // Tim user co email va password dung

  const user = userList.find(function (user) {

    return user.email === email && user.password === password;

  });

  // 3. Kiem tra tai khoan

  if (!user) {

    loginError.classList.remove("hidden");

    msg.classList.add("show");

    return;
  }

  // 4. Dang nhap thanh cong

  loginToast.classList.remove("hidden");

  msg.classList.add("show");

  // Chuyen sang Dashboard

  setTimeout(function () {

    window.location.href = "./dashboard.html";

  }, 1000);

});
```
