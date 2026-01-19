const Auth = {
  init() {
    const loginBtn = document.getElementById("loginBtn");

    if(loginBtn){
      loginBtn.addEventListener("click", () => {
        const email = document.getElementById("email").value;

        localStorage.setItem("session", JSON.stringify({
          email,
          name: email.split("@")[0]
        }));

        this.checkSession();
      });
    }

    this.checkSession();
  },

  checkSession() {
    const session = JSON.parse(localStorage.getItem("session"));

    const loginScreen = document.getElementById("login");
    const appShell = document.getElementById("app");

    if(loginScreen && appShell){
      loginScreen.style.display = session ? "none" : "flex";
      appShell.style.display = session ? "flex" : "none";
    }

    if(session){
      const nameBox = document.getElementById("user-name");
      if(nameBox) nameBox.textContent = session.name;
    }
  }
};

document.addEventListener("DOMContentLoaded", () => Auth.init());
