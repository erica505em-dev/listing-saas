document.addEventListener("DOMContentLoaded", function () {

  const loginBtn = document.getElementById("loginBtn");
  const loginScreen = document.getElementById("loginScreen");
  const app = document.getElementById("app");

  if (!loginBtn || !loginScreen || !app) {
    alert("Login elements missing in HTML");
    return;
  }

  loginBtn.addEventListener("click", function () {
    loginScreen.style.display = "none";
    app.style.display = "flex";
  });

});
