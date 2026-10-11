// Lấy form đăng nhập

const signInForm = document.getElementById("sign-in-form");

// Lấy các ô input

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

// Lấy các khu vực hiển thị thông báo

const loginValidation = document.getElementById("login-validation");

const loginToast = document.getElementById("login-toast");

const loginError = document.getElementById("login-error");

// Lấy các thông báo khi input bị bỏ trống

const emailCannotBlank = document.querySelector(".email-cannot-blank");

const passwordCannotBlank = document.querySelector(".password-cannot-blank");

// Lấy phần tử hiển thị thông báo

const msg = document.getElementById("msg");

// Bắt sự kiện submit form

signInForm.addEventListener("submit", function (e) {

  // Ngăn chặn form tự động reload trang

  e.preventDefault();

  // Lấy dữ liệu người dùng nhập

  const email = emailInput.value.trim();

  const password = passwordInput.value;

  // Ẩn các thông báo cũ trước khi kiểm tra dữ liệu mới

  loginValidation.classList.add("hidden");

  loginToast.classList.add("hidden");

  loginError.classList.add("hidden");

  emailCannotBlank.classList.add("hidden");

  passwordCannotBlank.classList.add("hidden");

  // 1. Kiểm tra email có bị bỏ trống hay không

  if (email === "") {

    loginValidation.classList.remove("hidden");

    emailCannotBlank.classList.remove("hidden");

    msg.classList.add("show");

    return;
  }

  // 2. Kiểm tra mật khẩu có bị bỏ trống hay không

  if (password === "") {

    loginValidation.classList.remove("hidden");

    passwordCannotBlank.classList.remove("hidden");

    msg.classList.add("show");

    return; // Dừng hàm nếu mật khẩu để trống
  }

  // Lấy danh sách tài khoản từ Local Storage 
  // Nếu chưa có dữ liệu thì tạo một mảng rỗng

  const userList = JSON.parse(localStorage.getItem("userList")) || [];

  //Tìm tài khoản có email và mật khẩu trùng với dữ liệu người dùng nhập

  const user = userList.find(function (user) {

    return user.email === email && user.password === password;

  });

  // 3. Kiểm tra tài khoản có tồn tại hay không

  if (!user) {

    loginError.classList.remove("hidden");

    msg.classList.add("show");

    return;
  }

  // 4. Đăng nhập thành công

  loginToast.classList.remove("hidden");

  msg.classList.add("show");

  // Chuyển người dùng sang trang Dashboard

    window.location.href = "./dashboard.html";
})
