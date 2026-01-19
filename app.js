let listingCount = 0;

// LOGIN
function forceLogin() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

// LOGOUT
function logout() {
  location.reload();
}

// PAGE NAVIGATION
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

// EXPOSE TO HTML
window.forceLogin = forceLogin;
window.showPage = showPage;
window.logout = logout;

// GENERATOR
document.addEventListener("DOMContentLoaded", () => {

  const generateBtn = document.getElementById("generateBtn");

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
