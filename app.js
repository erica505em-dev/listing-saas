document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const loginScreen = document.getElementById("loginScreen");
  const app = document.getElementById("app");

  const pages = document.querySelectorAll(".page");

  // Force startup state
  app.style.display = "none";
  loginScreen.style.display = "flex";

  loginBtn.addEventListener("click", () => {
    loginScreen.style.display = "none";
    app.style.display = "flex";

    // SHOW DASHBOARD AFTER LOGIN
    showPage("dashboard");
  });

});

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  const page = document.getElementById(id);
  if (page) page.style.display = "block";
}
