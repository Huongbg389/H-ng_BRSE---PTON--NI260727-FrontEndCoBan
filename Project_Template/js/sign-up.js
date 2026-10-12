// Lấy form đăng ký từ HTML
const signUpForm = document.getElementById("sign-up-form");

// Lấy các ô input để nhận dữ liệu người dùng nhập
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Lấy các khu vực hiển thị thông báo
const signUpValidation = document.getElementById("sign-up-validation");
const signUpError = document.getElementById("sign-up-error");

// Lấy các thông báo khi người dùng bỏ trống trong input
const emailCannotBlank = document.querySelector(".email-cannot-blank");
const usernameCannotBlank = document.querySelector(".username-cannot-blank");
const passwordCannotBlank = document.querySelector(".password-cannot-blank");

// Lấy các thông báo lỗi khi dữ liệu không hợp lệ
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

// Lắng nghe sự kiện submit khi người dùng nhấn nút đăng ký
signUpForm.addEventListener("submit", function (e) {
  // Ngăn chặn web tự động tải lại khi submit form
  e.preventDefault();

  // Lấy giá trị người dùng nhập từ các ô input
  // trim() dùng để loại bỏ khoảng trắng ở đầu và cuối
  const email = emailInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  // Ẩn tất cả các thông báo cũ trước khi kiểm tra dữ liệu mới
  signUpValidation.classList.add("hidden");
  signUpError.classList.add("hidden");

  emailCannotBlank.classList.add("hidden");
  usernameCannotBlank.classList.add("hidden");
  passwordCannotBlank.classList.add("hidden");

  emailError.classList.add("hidden");
  passwordMinLengthError.classList.add("hidden");
  passwordNumberRequiredError.classList.add("hidden");
  passwordUppercaseLowercaseError.classList.add("hidden");

  // 1. Kiểm tra email có bị bỏ trống hay không
  if (email === "") {
    signUpValidation.classList.remove("hidden");
    emailCannotBlank.classList.remove("hidden");
    return; // Dừng hàm nếu email để trống
  }

  // 2. Kiểm tra username có bị bỏ trống hay không
  if (username === "") {
    signUpValidation.classList.remove("hidden");
    usernameCannotBlank.classList.remove("hidden");
    return;
  }

  // 3. Kiểm tra email có dùng định dạng hay không bằng Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    signUpError.classList.remove("hidden");
    emailError.classList.remove("hidden");
    return;
  }

  // 4. Kiểm tra mật khẩu có bị bỏ trống hay không
  if (password === "") {
    signUpValidation.classList.remove("hidden");
    passwordCannotBlank.classList.remove("hidden");
    return;
  }

  // 5. Kiểm tra độ dài mật khẩu tối thiểu 8 ký tự
  if (password.length < 8 ) {
    signUpError.classList.remove("hidden");
    passwordMinLengthError.classList.remove("hidden");
    return;
  }

  // 6. Kiểm tra mật khẩu có ít nhất một chữ số hay không
  if (!/\d/.test(password)) {
    signUpError.classList.remove("hidden");
    passwordNumberRequiredError.classList.remove("hidden");
    return;
  }

  // 7. Kiểm tra mật khẩu có cả chữ thường và chữ hoa hay không
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    signUpError.classList.remove("hidden");
    passwordUppercaseLowercaseError.classList.remove("hidden");
    return;
  }

  // Lấy danh sách tài khoản đã đăng ký từ Localstorage
  // Nếu chưa có dữ liệu thì khởi tạo mảng rỗng
  let userList = JSON.parse(localStorage.getItem("userList")) || [];

  // Tạo đối tượng tài khoản mới với các thông tin mặc định
  const newUser = {
    //Tạo mã user tự động theo số lượng tài khoản hiện có
    usercode: "U" + String(userList.length + 1).padStart(3, "0"),
    username: username,
    email: email,
    password: password,
    role: "user",
    birthday: "",
    status: "Active",
    description: "",
  };

  // Thêm tài khoản mới vào mảng userList
  userList.push(newUser);

  // Chuyển mảng userList thành JSON và lưu vào Local Storage
  localStorage.setItem("userList", JSON.stringify(userList));

  // Lưu thông báo đăng ký thành công vào Local Storage
  localStorage.setItem(
    "signupMessage",
    "Đăng ký tài khoản thành công"
  );

  // Chuyển người dùng sang trang đăng nhập sau khi đăng ký thành công
  window.location.href = "./sign-in.html";
});