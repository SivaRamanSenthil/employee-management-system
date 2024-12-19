const adminCredentials = {
  username: "admin",
  password: "password123",
};

// Authentication Logic
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (
        username === adminCredentials.username &&
        password === adminCredentials.password
      ) {
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "admin.html";
      } else {
        errorMessage.classList.remove("hidden");
      }
    });
  }

  // Logout
  const logoutButton = document.getElementById("logout-btn");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("isAuthenticated");
      window.location.href = "index.html";
    });
  }

  // Redirect to login if not authenticated
  if (
    !localStorage.getItem("isAuthenticated") &&
    window.location.pathname.includes("admin.html")
  ) {
    window.location.href = "index.html";
  }
});

// Employee Management
const employees = [];
const employeeForm = document.getElementById("employee-form");
const employeeList = document.getElementById("employee-list");

if (employeeForm) {
  employeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const position = document.getElementById("position").value.trim();
    const department = document.getElementById("department").value.trim();

    if (name && position && department) {
      employees.push({ name, position, department });
      renderEmployees();
      employeeForm.reset();
    } else {
      alert("All fields are required.");
    }
  });
}

function renderEmployees() {
  employeeList.innerHTML = "";
  employees.forEach((employee, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.position}</td>
      <td>${employee.department}</td>
      <td>
        <button onclick="editEmployee(${index})">Edit</button>
        <button onclick="deleteEmployee(${index})">Delete</button>
      </td>
    `;
    employeeList.appendChild(row);
  });
}

function editEmployee(index) {
  const employee = employees[index];
  document.getElementById("name").value = employee.name;
  document.getElementById("position").value = employee.position;
  document.getElementById("department").value = employee.department;
  employees.splice(index, 1);
  renderEmployees();
}

function deleteEmployee(index) {
  employees.splice(index, 1);
  renderEmployees();
}
