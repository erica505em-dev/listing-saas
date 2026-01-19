document.addEventListener("DOMContentLoaded", () => {
  alert("JS loaded");

  const loginBtn = document.getElementById("loginBtn");
  const loginScreen = document.getElementById("loginScreen");
  const app = document.getElementById("app");

  if (!loginBtn) {
    alert("loginBtn not found");
    return;
  }

  if (!loginScreen) {
    alert("loginScreen not found");
    return;
  }

  if (!app) {
    alert("app not found");
    return;
  }

  loginBtn.addEventListener("click", () => {
    alert("Login clicked");

    loginScreen.style.display = "none";
    app.style.display = "flex";

    alert("App should now be visible");
  });
});
