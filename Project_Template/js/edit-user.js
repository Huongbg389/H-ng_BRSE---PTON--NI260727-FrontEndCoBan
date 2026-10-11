// Lấy ô User code
const userCodeInput = document.getElementById("user-code");

// Lấy ô Username
const usernameInput = document.getElementById("username");

// Lấy ô Full Name
const fullnameInput = document.getElementById("fullname");

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

// Lấy form chỉnh sửa người dùng
const editUserForm = document.getElementById("edit-user-form");

// Lấy thông báo password tối thiểu 8 ký tự
const passwordMinLengthError = document.querySelector
(".password-min-length-error");

 
// Lấy mã người dùng từ URL để biết cần chỉnh sửa người dùng nào
const urlParams = new URLSearchParams(window.location.search);
const usercode = urlParams.get("usercode");

// Lấy danh sách người dùng từ Local Storage
// Nếu chưa có dữ liệu thì khởi tạo một mảng rỗng
let userList = JSON.parse(localStorage.getItem("userList")) || [];

// Tìm người dùng có mã trùng với mã lấy từ URL
const user = userList.find(function (item) {
    return item.usercode === usercode; 
}); //biến user đã chứa thông tin cần sửa

if (!user) {
    alert("Không tìm thấy người dùng!");
    window.location.href = "./dashboard.html";
}


// Hiển thị thông tin người dùng đã lưu lên form Edit User
// để người dùng xem thông tin cũ và chỉnh sửa khi cần thiết

// Hiển thị mã người dùng
userCodeInput.value = user.usercode;

// Hiển thị Username
usernameInput.value = user.username;

// Hiển thị Full Name
fullnameInput.value = user.fullname || "";

// Hiển thị Email
emailInput.value = user.email;

// Hiển thị Password
passwordInput.value = user.password;

// Hiển thị Role
roleInput.value = user.role;

// Hiển thị ngày sinh
birthdayInput.value = user.birthday;

// Hiển thị Description
DescriptionInput.value = user.description;

// Hiển thị trạng thái hiện tại của người dùng
statusActive.checked = user.status === "Active";
statusDeactive.checked = user.status === "Deactive";


// Xử lý sự kiện khi người dùng bấm nút Save
editUserForm.addEventListener("submit", function (event) {
    // Ngăn form tải lại trang để javascrip xử lý dữ liệu
    event.preventDefault();


    // Lấy giá trị Username và loại bỏ khoảng trắng ở đầu, cuối
    const username = usernameInput.value.trim();

    // Kiểm tra Username có bị để trống không
    if (username === "") {
        alert("Username không được để trống");
        return;
    }

    
    // Lấy giá trị Full Name và loại bỏ khoảng trắng ở đầu, cuối
    const fullname = fullnameInput.value.trim();

    // Kiểm tra Full Name có bị để trống không
    if (fullname === "") {
        alert("Full Name không được để trống");
        return;
    }

    // Lấy Email và loại bỏ khoảng trắng ở đầu, cuối
    const email = emailInput.value.trim();

    // Kiểm tra Email có bị để trống không
    if (email === "") {
        alert("Email không được để trống");
        return;
    }

    // Kiểm tra định dạng Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Email không đúng định dạng");
        return;
    }

    
    // Lấy giá trị Password
    const password = passwordInput.value;

    // Kiểm tra Password có bị để trống không
    if (password.trim() === "") {
        alert("Password không được để trống");
        return;
    }

    // Kiểm tra Password có ít nhất 8 ký tự không
    if (password.length < 8) {
        alert("Mật khẩu tối thiểu 8 ký tự");
        return;
    }

    // Kiểm tra Password có chứa ít nhất một chữ số không
    if (!/[0-9]/.test(password)) {
        alert("Mật khẩu phải bao gồm cả chữ số");
        return;
    }

    // Kiểm tra Password có cả chữ thường và chữ hoa không
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        alert("Mật khẩu phải có cả chữ thường và chữ hoa");
        return;
    }

    // Cập nhật Username mới
    user.username = username;

    // Cập nhật Full Name mới
    user.fullname = fullname;

    // Cập nhật Password mới
    user.password = password;

    // Cập nhật Role mới
    user.role = roleInput.value;

    // Cập nhật ngày sinh mới
    user.birthday = birthdayInput.value;

    // Cập nhật Description mới
    user.description = DescriptionInput.value;

    // Cập nhật trạng thái mới
    user.status = statusActive.checked ? "Active" : "Deactive";

    
    // Lưu danh sách người dùng đã cập nhật vào Local Storage
    localStorage.setItem("userList", JSON.stringify(userList));

    // Chuyển về trang Dashboard
    window.location.href = "./dashboard.html";

});

