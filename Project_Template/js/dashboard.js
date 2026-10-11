// 1. LẤY DỮ LIỆU USER TỪ LOCAL STORAGE

// Lấy dữ liệu có key là "userList" từ Local Storage
// localStorage.getItem("userList")
// lấy dữ liệu user đã được lưu trước đó
// Dữ liệu trong Local Storage luôn được lưu dưới dạng chuỗi (string),
// nên cần dùng JSON.parse() để chuyển chuỗi JSON thành mảng JavaScript.
// Ví dụ dữ liệu trong Local Storage:
// '[{"usercode":"U001","username":"Huong"}]'
//
// Sau JSON.parse():
// [
//   { usercode: "U001", username: "Huong" }
// ]
// Nếu Local Storage chưa có "userList"
// thì getItem() sẽ trả về null.
// Khi đó:
// null || []
// → []
// Vì vậy userList luôn là một mảng.

let userList = JSON.parse(localStorage.getItem("userList")) || [];

// 2. LẤY PHẦN TỬ HTML CẦN SỬ DỤNG

// Lấy thẻ <tbody> trong bảng từ HTML
// id="table-body" được đặt trong HTML:
// <tbody id="table-body"></tbody>
// Sau khi lấy được phần tử này,
// JavaScript có thể thêm các hàng user vào trong tbody.

const tableBody = document.getElementById("table-body");

// 3. HIỂN THỊ USER RA BẢNG

// Tạo hàm renderUsers()
// Hàm này có nhiệm vụ:
// → lấy danh sách user trong userList
// → tạo các hàng <tr>
// → đưa thông tin từng user vào bảng
// render = hiển thị / vẽ dữ liệu lên giao diện

function renderUsers() {

  // Xóa toàn bộ dữ liệu cũ trong tbody
  // Việc này giúp tránh trường hợp dữ liệu bị hiển thị trùng
  // khi chúng ta gọi lại hàm renderUsers().

  tableBody.innerHTML = "";

   // KIỂM TRA DANH SÁCH USER
  // Kiểm tra xem mảng userList có user nào hay không.
  // userList.length
  // → trả về số lượng phần tử trong mảng.
  // Nếu length === 0
  // → mảng đang rỗng
  // → không có user để hiển thị.

  if (userList.length === 0) {

    // Nếu không có user,
    // hiển thị một hàng thông báo trong bảng.

    tableBody.innerHTML = `
      <tr>
        <td colspan="7">No users found</td>
      </tr>
    `;

    // return dùng để dừng hàm tại đây.
    // Vì không có user nên không cần chạy tiếp
    // phần forEach bên dưới.

    return;
  }

  // DUYỆT QUA TỪNG USER
  // forEach() dùng để duyệt qua từng phần tử trong mảng.
  //
  // Ví dụ:
  // userList có 3 user
  // → function sẽ chạy 3 lần.
  // Mỗi lần chạy, biến user đại diện cho 1 user.

  userList.forEach(function (user) {

    // TẠO MỘT HÀNG MỚI TRONG BẢNG
    // document.createElement("tr")
    // → tạo một thẻ <tr> bằng JavaScript.
    // <tr> là một hàng trong bảng HTML.

    const row = document.createElement("tr");

    // ĐƯA THÔNG TIN USER VÀO HÀNG
    // innerHTML cho phép đưa HTML vào bên trong thẻ row.
    // Mỗi <td> tương ứng với một ô trong bảng.
    // ${user.usercode}
    // → lấy giá trị usercode của user hiện tại.
    // ${user.username}
    // → lấy username.
    // ${user.email}
    // → lấy email.
    // ${user.role}
    // → lấy role.
    // ${user.birthday}
    // → lấy ngày sinh.
    // ${user.status}
    // → lấy trạng thái của user.

    row.innerHTML = `
      <td>${user.usercode}</td>

      <td>${user.username}</td>

      <td>${user.email}</td>

      <td class="uppercase">${user.role}</td>

      <td>${user.birthday || "-"}</td>

      <td>
        <span class="status-cell ${user.status.toLowerCase()}">
          <span class="dot"></span>
          ${user.status}
        </span>
      </td>

      <td>
        <!-- Nút Edit -->
        <i
           class="fa-solid fa-pen-to-square edit-user"
           data-usercode="${user.usercode}"
        ></i>

        <!-- Nút Delete -->
        <i
           class="fa-solid fa-trash delete-user"
           data-usercode="${user.usercode}"
        ></i>
      </td>
    `;

    // THÊM HÀNG VÀO BẢNG
    
    // appendChild()
    // → thêm phần tử row vào bên trong tableBody.
    // row là <tr>
    // tableBody là <tbody>
    // Kết quả:
    // <tbody>
    //   <tr>
    //      thông tin user
    //   </tr>
    // </tbody>

    tableBody.appendChild(row);
  });
}

// 4. XÓA USER

// Bắt sự kiện click trong khu vực tbody.
// Khi người dùng click vào một vị trí bên trong tbody,
// function này sẽ được thực hiện.
// Ở đây sử dụng event delegation.
// Vì nút Delete được tạo bằng JavaScript bên trong
// hàm renderUsers(), nên ta bắt sự kiện ở tableBody.

tableBody.addEventListener("click", function (e) {

  // KIỂM TRA CÓ PHẢI CLICK VÀO NÚT EDIT KHÔNG
  // e.target
  // → phần tử HTML mà người dùng thực sự click vào.
  // classList.contains("delete-user")
  // → kiểm tra phần tử đó có class "delete-user" hay không.
  // Nếu có:
  // → người dùng đang click vào nút Delete.
  // Nếu không:
  // → không thực hiện chức năng xóa.

  if (e.target.classList.contains("edit-user")) {

    // LẤY USER CODE CỦA USER CẦN XÓA
    // Trong HTML chúng ta có:
    // data-usercode="${user.usercode}"
    // Đây là một custom data attribute.
    // dataset.usercode
    // → lấy giá trị của data-usercode.
    // Ví dụ:
    // data-usercode="U001"
    // thì:
    // e.target.dataset.usercode
    // → "U001"

    const usercode = e.target.dataset.usercode;

    // HIỂN THỊ HỘP THOẠI XÁC NHẬN
    
    // confirm()
    // → hiển thị hộp thoại xác nhận cho người dùng.
    // Nếu chọn OK:
    // → confirmDelete = true
    // Nếu chọn Cancel:
    // → confirmDelete = false

    // Chuyển sang trang Edit User
    window.location.href = `./edit-user.html?usercode=${usercode}`;
    return;
  };

  // Nếu bấm nút Delete
  if (e.target.classList.contains("delete-user")) {
    const usercode = e.target.dataset.usercode;


    const confirmDelete = confirm(
      "Bạn có chắc chắn muốn xóa user này?"
    );

    // KIỂM TRA NGƯỜI DÙNG CÓ XÁC NHẬN XÓA HAY KHÔNG

    // Nếu người dùng chọn Cancel
    // → confirmDelete có giá trị false.
    // !false
    // → true
    // Vì vậy return sẽ được thực hiện
    // và chức năng xóa sẽ dừng lại.

    if (!confirmDelete) {
      return;
    }
    // XÓA USER KHỎI MẢNG
    // filter() tạo ra một mảng mới.
    // Ở đây:
    // return user.usercode !== usercode;
    // Nghĩa là:
    // → giữ lại những user có usercode KHÁC usercode cần xóa.
    // User có usercode giống usercode cần xóa
    // sẽ không được giữ lại.
    // Vì vậy user đó bị loại khỏi mảng.

    userList = userList.filter(function (user) {
      return user.usercode !== usercode;
    });

    // CẬP NHẬT LẠI LOCAL STORAGE
    // Sau khi xóa user khỏi mảng userList,
    // cần lưu mảng mới vào Local Storage.
    // JSON.stringify()
    // → chuyển mảng JavaScript thành chuỗi JSON
    // để có thể lưu vào Local Storage.
    // Ví dụ:
    // Mảng JavaScript:
    // [{ usercode: "U001" }]
    // JSON.stringify()
    // → '[{"usercode":"U001"}]'

    localStorage.setItem(
      "userList",
      JSON.stringify(userList)
    );

    // HIỂN THỊ LẠI DANH SÁCH USER
    // Sau khi xóa user,
    // gọi lại renderUsers()
    // để cập nhật giao diện bảng.
    // Nếu không gọi renderUsers(),
    // dữ liệu trên giao diện có thể vẫn còn user vừa xóa.

    renderUsers();
  }
});

// 5. HIỂN THỊ DỮ LIỆU KHI MỞ DASHBOARD

// Khi JavaScript chạy,
// gọi renderUsers() để lấy userList
// và hiển thị danh sách user lên bảng.
// Đây là lần gọi đầu tiên của hàm renderUsers().

renderUsers();
