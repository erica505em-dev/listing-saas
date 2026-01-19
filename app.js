document.addEventListener("DOMContentLoaded", function () {

  const loginBtn = document.getElementById("loginBtn");
  const loginScreen = document.getElementById("loginScreen");
  const app = document.getElementById("app");

  // LOGIN FLOW
  loginBtn.addEventListener("click", function () {
    loginScreen.classList.add("hidden");
    app.classList.remove("hidden");
  });

});

// PAGE ROUTING
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });

  const page = document.getElementById(id);
  if (page) {
    page.classList.add("active");
  }
}
