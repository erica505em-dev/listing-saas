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
console.log("APP JS LOADED");

// Safety wiring
document.querySelectorAll("button").forEach(btn => {
  btn.style.pointerEvents = "auto";
});

// Make sure sidebar buttons always work
window.showPage = function(id){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(id);
  if(target) target.classList.add("active");
};
