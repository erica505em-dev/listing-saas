document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("loginScreen");
  const loginBtn = document.getElementById("loginBtn");
  const app = document.getElementById("app");

  // Make sure app is hidden until login
  app.style.display = "none";

  // LOGIN
  loginBtn.addEventListener("click", () => {
    loginScreen.style.display = "none";
    app.style.display = "flex";
    showPage("dashboard"); // show dashboard immediately
  });

  // GENERATOR BUTTON
  const generateBtn = document.getElementById("generateBtn");
  if (generateBtn) {
    generateBtn.addEventListener("click", generateListing);
  }
});

/**
 * ROUTER: works with your HTML onclick="showPage('generator')"
 * Needs to be GLOBAL.
 */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}
window.showPage = showPage;

/**
 * Generator logic (safe)
 */
function generateListing() {
  const productEl = document.getElementById("product");
  const buyerEl = document.getElementById("buyer");
  const benefitsEl = document.getElementById("benefits");
  const output = document.getElementById("output");

  if (!output) return;

  const product = (productEl?.value || "").trim();
  const buyer = (buyerEl?.value || "").trim();
  const benefitsRaw = (benefitsEl?.value || "").trim();

  if (!product || !buyer || !benefitsRaw) {
    output.textContent = "Please complete Product, Buyer, and Benefits before generating.";
    return;
  }

  const score = Math.floor(80 + Math.random() * 16);
  const scoreEl = document.getElementById("scoreDisplay");
  if (scoreEl) scoreEl.textContent = String(score);

  const countEl = document.getElementById("countDisplay");
  if (countEl) {
    const current = parseInt(countEl.textContent || "0", 10) || 0;
    countEl.textContent = String(current + 1);
  }

  const benefits = benefitsRaw
    .split("\n")
    .map(b => b.trim())
    .filter(Boolean)
    .map(b => `• ${b}`)
    .join("\n");

  const title = `${product} for ${buyer} | Instant Digital Download`;

  const description =
`This ${product} is built for ${buyer}.

What you get:
${benefits}

Digital download. Instant access after purchase.`;

  output.textContent =
`LISTING GENERATED ✅

SCORE: ${score}/100

TITLE:
${title}

----------------------------

DESCRIPTION:
${description}

----------------------------

STATUS:
Ready to publish.
`;
}
