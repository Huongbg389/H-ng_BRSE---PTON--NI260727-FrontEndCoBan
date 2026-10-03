// 1. LAY DU LIEU USER TU LOCAL STORAGE

let userList = JSON.parse(localStorage.getItem("userList")) || [];

// 2. LAY CAC PHAN TU HTML CAN SU DUNG

// Lay phan tu tbody de hien th danh sach user
const tableBody = document.getElementById("table-body");

// Lay o tim kiem
const searchBox = document.getElementById("search-box");

// Lay phan hien thi so trang
const paginationList = document.getElementById("pagination-list");

// Lay nut trang truoc
const arrowLeft = document.querySelector(".arrow-left");

// Lay nut trang sau
const arrowRight = document.querySelector(".arrow-right");

// 3. CAI DAT PHAN TRANG

// Moi trang hien thi 5 user
const usersPerPage = 5;

// Trang hien tai
let currentPage = 1;

// Danh sach user sau khi tim kiem
let filteredUsers = userList;

// 4. HIEN THI USER RA BANG

function renderUsers() {
  // Xoa du lieu cu trong bang
  tableBody.innerHTML = "";

  // Tinh vi tri bat dau
  const startIndex = (currentPage - 1) * usersPerPage;

  // Tinh vi tri ket thuc
  const endIndex = startIndex + usersPerPage;

  // Lay 5 user cua trang hien tai
  const usersToDisplay = filteredUsers.slice(
    startIndex,
    endIndex
  );

  // Neu khong co user
  if (usersToDisplay.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7">No users found</td>
      </tr>
    `;

    return;
  }

  // Duyet tung user
  usersToDisplay.forEach(function (user) {

    // Tao mot hang moi
    const row = document.createElement("tr");

    // Dua du lieu user vao hang
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
        <i
          class="fa-solid fa-trash delete-user"
          data-usercode="${user.usercode}"
        ></i>

        <i
          class="fa-solid fa-pen edit-user"
          data-usercode="${user.usercode}"
        ></i>
      </td>
    `;

    // Dua hang vao bang
    tableBody.appendChild(row);
  });
}

// 5. HIEN THI SO TRANG

function renderPagination() {

  // Xoa so trang cu
  paginationList.innerHTML = "";

  // Tinh tong so trang
  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  // Neu khong co user nao
  if (totalPages === 0) {
    arrowLeft.classList.add("hidden");
    arrowRight.classList.add("hidden");

    return;
  }

  // Tao tung so trang
  for (let i = 1; i <= totalPages; i++) {

    // Tao the li
    const li = document.createElement("li");

    // Dua so trang vao li
    li.innerHTML = `
      <div class="pagination-element ${
        i === currentPage ? "highlight" : ""
      }">
        ${i}
      </div>
    `;

    // Khi click vao so trang
    li.addEventListener("click", function () {

      // Chuyen sang trang duoc click
      currentPage = i;

      // Hien thi user cua trang do
      renderUsers();

      // Cap nhat giao dien phan trang
      renderPagination();
    });

    // Dua so trang vao danh sach pagination
    paginationList.appendChild(li);
  }

  // 6. AN / HIEN NUT TRANG TRUOC
 
  if (currentPage === 1) {
    arrowLeft.classList.add("hidden");
  } else {
    arrowLeft.classList.remove("hidden");
  }

  // 7. AN / HIEN NUT TRANG SAU

  if (currentPage === totalPages) {
    arrowRight.classList.add("hidden");
  } else {
    arrowRight.classList.remove("hidden");
  }
}

// 8. TIM KIEM USER THEO USERNAME

searchBox.addEventListener("input", function () {

  // Lay noi dung nguoi dung nhap
  const searchValue = searchBox.value
    .trim()
    .toLowerCase();

  // Tim user co username chua noi dung tim kiem
  filteredUsers = userList.filter(function (user) {
    return user.username
      .toLowerCase()
      .includes(searchValue);
  });

  // Sau khi tim kiem thi quay ve trang 1
  currentPage = 1;

  // Hien thi ket qua tim kiem
  renderUsers();

  // Cap nhat so trang
  renderPagination();
});

// 9. NUT CHUYEN SANG TRANG TRUOC

arrowLeft.addEventListener("click", function () {

  // Neu khong phai trang dau tien
  if (currentPage > 1) {

    // Lui lai mot trang
    currentPage--;

    // Hien thi user
    renderUsers();

    // Cap nhat phan trang
    renderPagination();
  }
});

// 10. NUT CHUYEN SANG TRANG SAU

arrowRight.addEventListener("click", function () {

  // Tinh tong so trang
  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  // Neu chua phai trang cuoi
  if (currentPage < totalPages) {

    // Tang them mot trang
    currentPage++;

    // Hien thi user
    renderUsers();

    // Cap nhat phan trang
    renderPagination();
  }
});

// 11. XOA USER

tableBody.addEventListener("click", function (e) {

  // Kiem tra co click vao nut xoa hay khong
  if (e.target.classList.contains("delete-user")) {

    // Lay usercode cua user can xoa
    const usercode = e.target.dataset.usercode;

    // Hoi xac nhan truoc khi xoa
    const confirmDelete = confirm(
      "Ban co chac chan muon xoa user nay?"
    );

    // Neu nguoi dung chon Cancel
    if (!confirmDelete) {
      return;
    }

    // Xoa user khoi danh sach
    userList = userList.filter(function (user) {
      return user.usercode !== usercode;
    });

    // Cap nhat lai Local Storage
    localStorage.setItem(
      "userList",
      JSON.stringify(userList)
    );

    // Cap nhat lai danh sach tim kiem
    filteredUsers = userList;

    // Tinh lai tong so trang
    const totalPages = Math.ceil(
      filteredUsers.length / usersPerPage
    );

    // Neu trang hien tai khong con ton tai
    if (
      currentPage > totalPages &&
      totalPages > 0
    ) {
      currentPage = totalPages;
    }

    // Hien thi lai bang
    renderUsers();

    // Hien thi lai phan trang
    renderPagination();
  }
});

// 12. DIEU HUONG SANG TRANG EDIT USER

tableBody.addEventListener("click", function (e) {

  // Kiem tra co click vao nut edit hay khong
  if (e.target.classList.contains("edit-user")) {

    // Lay usercode cua user can chinh sua
    const usercode = e.target.dataset.usercode;

    // Chuyen sang trang edit
    window.location.href =
      "./edit-user.html?usercode=" + usercode;
  }
});

// 13. HIEN THI DU LIEU KHI MO DASHBOARD

renderUsers();

renderPagination();