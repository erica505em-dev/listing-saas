document.addEventListener("DOMContentLoaded", () => {

  const loginScreen = document.getElementById("loginScreen");
  const app = document.getElementById("app");
  const loginBtn = document.getElementById("loginBtn");

  const pages = document.querySelectorAll(".page");
  const navButtons = document.querySelectorAll(".sidebar button");

  // LOGIN
  loginBtn.addEventListener("click", () => {
    loginScreen.style.display = "none";
    app.style.display = "flex";
    showPage("dashboard");
  });

  // NAVIGATION
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(btn.dataset.page);
    });
  });

  function showPage(id) {
    pages.forEach(p => p.style.display = "none");
    const target = document.getElementById(id);
    if (target) target.style.display = "block";
  }

});
