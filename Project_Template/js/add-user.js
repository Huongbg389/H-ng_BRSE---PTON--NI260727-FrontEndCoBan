// Lấy ô User code
const userCodeInput = document.getElementById("user-code");

// Lấy ô Username
const usernameInput = document.getElementById("username");

//Lấy ô Email
const emailInput = document.getElementById("email");

//Lấy ô Password
const passwordInput = document.getElementById("password");

//lấy ô Role
const roleInput = document.getElementById("role");

//Lấy ô Birthday
const birthdayInput = document.getElementById("dob");

// Lấy trạng thái Active
const statusActive = document.getElementById("status-active");

// Lấy trạng thái Deactive
const statusDeactive = document.getElementById("status-deactive");

// Lấy ô Description
const DescriptionInput = document.querySelector(".description-text-input");

// Lấy thông báo password tối thiểu 8 ký tự
const passwordMinLengthError = document.querySelector
(".password-min-length-error");

// Lấy form Add User
const addUserForm = document.getElementById("add-new-user-form");
// Lấy khung thông báo lỗi
const addError = document.getElementById("add-error");
// Lấy thông báo khi thông tin bị để trống
const emptyError = document.querySelector(
    ".email-username-password-empty"
);
// Lấy danh sách user từ LocalStorage
let userList = JSON.parse(localStorage.getItem("userList")) || []

//Bắt sự kiện submit của form Add User
addUserForm.addEventListener("submit", function (e) {
// Ngăn chặn form thực hiện hành động mặc định
// để javascrip có thể xử lý dữ liệu
e.preventDefault();

// Lấy giá trị User người dùng nhập
const userName = usernameInput.value.trim();

// Lấy giá trị email người dùng nhập
const email = emailInput.value.trim();

// Lấy giá trị password người dùng nhập
const password = passwordInput.value;


 // Kiểm tra Username có để trống hay không
  if (userName === "") {

   // Hiện thông báo lỗi
addError.classList.remove("hidden");

   //Hiện thông báo không được để trống
emptyError.classList.remove("hidden")
    return;
}

//Kiểm tra Email có để trống hay không
if (email === "") {

    // Hiện khung thông báo lỗi
  addError.classList.remove("hidden");

  // Hiện thông báo không được để trống
  emptyError.classList.remove("hidden");
    return;
}

// Kiểm tra Password có để trống hay không
if (password === "") {

    // Hiện khung thông báo lỗi
  addError.classList.remove("hidden");

  // Hiện thông báo không được để trống
  emptyError.classList.remove("hidden");
    return;
}

//Kiểm tra password có ít hơn 8 ký tự hay không
if (password.length < 8) {
// Hiện khung thông báo lỗi
addError.classList.remove("hidden");
// Hiện thông báo password tối thiểu 8 ký tự
passwordMinLengthError.classList.remove("hidden")
    return;
}

// Tạo số thứ tự bắt đầu từ 1
let number = 1;

//Tạo User code
let userCode = "U" + String(number).padStart(3, "0");

//Kiểm tra User code đã tồn tại hay chưa
while (
    userList.some(function (user) {
        return user. usercode === userCode;
    })
) {
    // Tăng số thứ tự lên 1
    number++;
    // Tạo User Code mới
    userCode = "U" + String(number).padStart(3, "0");
}
// Tạo user mới
const newUser = {
    usercode: userCode,
    username: userName,
    email: email,
    password: password,
    role: roleInput.value,
    birthday: birthdayInput.value,
    status: statusActive.checked ? "Active" : "Deactive",
    description: DescriptionInput.value,
}


// Thêm user mới vào danh sách user
userList.push(newUser);

// Lưu danh sách user mới vào Local Storage
localStorage.setItem("userList", JSON.stringify(userList));

// Chuyển về trang User Management
window.location.href = "./dashboard.html";
});