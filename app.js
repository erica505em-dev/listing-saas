function forceLogin() {
  alert("Login button clicked");

  const loginScreen = document.getElementById("loginScreen");
  const app = document.getElementById("app");

  if (!loginScreen) {
    alert("loginScreen NOT found");
    return;
  }

  if (!app) {
    alert("app NOT found");
    return;
  }

  loginScreen.style.display = "none";
  app.style.display = "flex";

  alert("Login screen hidden. App shown.");
}
