// ---------- PAGE ROUTING ----------
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });

  const page = document.getElementById(id);
  if (page) page.classList.add("active");
}

// ---------- GENERATOR LOGIC ----------
document.addEventListener("DOMContentLoaded", () => {

  const generateBtn = document.getElementById("generateBtn");
  const output = document.getElementById("output");
  const scoreDisplay = document.getElementById("scoreDisplay");

  if (!generateBtn) return;

  generateBtn.addEventListener("click", () => {

    const product = document.getElementById("product").value || "Your product";
    const buyer = document.getElementById("buyer").value || "Your buyer";
    const benefits = document.getElementById("benefits").value || "No benefits entered";

    // Dopamine score
    const score = Math.floor(80 + Math.random() * 15);

    // Update dashboard score
    if (scoreDisplay) {
      scoreDisplay.textContent = score;
    }

    // Output report
    output.textContent = `
LISTING OPTIMIZATION REPORT

Product: ${product}
Buyer: ${buyer}

Optimization Score: ${score}/100

Next Best Action:
Improve your first image headline to increase click-through rate.

Benefits:
${benefits}

Status: Listing optimization complete.
`;

  });

});
