document.addEventListener("DOMContentLoaded", () => {

  const loginScreen = document.getElementById("loginScreen");
  const loginBtn = document.getElementById("loginBtn");
  const pages = document.querySelectorAll(".page");
  const navButtons = document.querySelectorAll(".sidebar button");

  // LOGIN
  loginBtn.addEventListener("click", () => {
    loginScreen.remove();
    showPage("dashboard");
  });

  // NAVIGATION
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;
      showPage(page);
    });
  });

  // GENERATOR
  const generateBtn = document.getElementById("generateBtn");
  if (generateBtn) {
    generateBtn.addEventListener("click", generateListing);
  }

  function showPage(id) {
    pages.forEach(p => p.style.display = "none");
    const target = document.getElementById(id);
    if (target) target.style.display = "block";
  }

  function generateListing() {
    const product = document.getElementById("product").value.trim();
    const buyer = document.getElementById("buyer").value.trim();
    const benefits = document.getElementById("benefits").value.trim();
    const output = document.getElementById("output");

    if (!product || !buyer || !benefits) {
      output.textContent = "Please complete all fields before generating.";
      return;
    }

    const formattedBenefits = benefits
      .split("\n")
      .map(b => "• " + b.trim())
      .join("\n");

    output.textContent =
`LISTING GENERATED

TITLE:
${product} for ${buyer} | Instant Digital Download

DESCRIPTION:
This ${product} is designed for ${buyer}.

Benefits:
${formattedBenefits}

STATUS:
Ready to publish.
`;
  }

});
