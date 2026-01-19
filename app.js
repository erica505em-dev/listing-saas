document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("loginScreen");
  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", () => {
    loginScreen.remove();
  });
});
