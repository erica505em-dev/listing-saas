document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("loginScreen");
  const loginBtn = document.getElementById("loginBtn");
  const app = document.getElementById("app");

  loginBtn.addEventListener("click", () => {
    loginScreen.remove();
    app.style.display = "flex";
  });
});
