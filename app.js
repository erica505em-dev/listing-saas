let listingCount = 0;

// LOGIN
function login() {
  const loginScreen = document.getElementById("loginScreen");
  const app = document.getElementById("app");

  if (!loginScreen || !app) {
    alert("Login elements not found in HTML.");
    return;
  }

  loginScreen.classList.add("hidden");
  app.classList.remove("hidden");
}

// LOGOUT
function logout() {
  location.reload();
}

// PAGE ROUTING
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

// MAKE FUNCTIONS AVAILABLE TO HTML BUTTONS
window.login = login;
window.logout = logout;
window.showPage = showPage;

// WAIT FOR PAGE LOAD BEFORE WIRING BUTTONS
document.addEventListener("DOMContentLoaded", () => {

  const generateBtn = document.getElementById("generateBtn");

  if (!generateBtn) {
    console.log("Generate button not found");
    return;
  }

  generateBtn.addEventListener("click", () => {

    const product = document.getElementById("product").value.trim();
    const buyer = document.getElementById("buyer").value.trim();
    const benefits = document.getElementById("benefits").value.trim();
    const output = document.getElementById("output");

    if (!product || !buyer || !benefits) {
      output.textContent = "Please complete all fields before generating.";
      return;
    }

    listingCount++;
    document.getElementById("countDisplay").textContent = listingCount;

    const score = Math.floor(80 + Math.random() * 15);
    document.getElementById("scoreDisplay").textContent = score;

    const title = `${product} for ${buyer} | Instant Digital Download`;

    const description =
`This ${product} is designed for ${buyer}.

Benefits:
${benefits.split("\n").map(b => "• " + b).join("\n")}

Instant digital access.`;

    output.textContent =
`LISTING GENERATED

TITLE:
${title}

----------------------------

DESCRIPTION:
${description}

----------------------------

STATUS:
Optimization complete.
`;

  });

});

  listingCount++;
  document.getElementById("countDisplay").textContent = listingCount;

  const score = Math.floor(80 + Math.random() * 15);
  document.getElementById("scoreDisplay").textContent = score;

  const title = `${product} for ${buyer} | Instant Digital Download`;

  const description =
`This ${product} is designed for ${buyer}.

Benefits:
${benefits.split("\n").map(b => "• " + b).join("\n")}

Instant digital access.`;

  document.getElementById("output").textContent =
`LISTING GENERATED

TITLE:
${title}

----------------------------

DESCRIPTION:
${description}

----------------------------

STATUS:
Optimization complete.
`;

});
