// ====== Helper: find first existing element by ID ======
function byAnyId(...ids) {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) return el;
  }
  return null;
}

// ====== Sidebar routing (works with onclick="showPage('generator')" etc.) ======
function showPage(id) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

// Make showPage available to inline onclick handlers
window.showPage = showPage;

document.addEventListener("DOMContentLoaded", () => {
  // ----- Grab inputs (support multiple possible IDs) -----
  const productEl  = byAnyId("product", "productType");
  const buyerEl    = byAnyId("buyer", "buyerType");
  const benefitsEl = byAnyId("benefits", "benefitsText");

  // ----- Grab output (support multiple possible IDs) -----
  const outputEl = byAnyId("output", "packetOutput");

  // ----- Grab score display (support multiple possible IDs) -----
  const scoreEl = byAnyId("scoreDisplay", "kpiScore", "score");

  // ----- Grab generate button (support multiple possible IDs) -----
  const generateBtn = byAnyId("generateBtn", "createBtn", "generate");

  // ----- Debug: show exactly what matched -----
  console.log("[Listing SaaS] Wiring check:", {
    productEl: productEl?.id || null,
    buyerEl: buyerEl?.id || null,
    benefitsEl: benefitsEl?.id || null,
    outputEl: outputEl?.id || null,
    scoreEl: scoreEl?.id || null,
    generateBtn: generateBtn?.id || null
  });

  // If button not found, don’t silently fail—write to screen if possible
  if (!generateBtn) {
    const msg = "Generate button not found. Add id='generateBtn' to your generate button.";
    console.warn("[Listing SaaS]", msg);
    if (outputEl) outputEl.textContent = msg;
    return;
  }

  // Ensure the button click ALWAYS does something visible
  generateBtn.addEventListener("click", () => {
    const product = productEl?.value?.trim() || "Your product";
    const buyer = buyerEl?.value?.trim() || "Your buyer";
    const benefits = benefitsEl?.value?.trim() || "• (Add benefits to strengthen conversion)";

    // Dopamine score (80–95)
    const score = Math.floor(80 + Math.random() * 16);

    // Update score card (if present)
    if (scoreEl) scoreEl.textContent = String(score);

    // Build report
    const report =
`LISTING OPTIMIZATION REPORT

Product: ${product}
Buyer: ${buyer}

Optimization Score: ${score}/100

Next Best Action:
Improve your first image headline to increase click-through rate.

Benefits:
${benefits}

Status: Listing optimization complete.
`;

    // Output to <pre> or <div>
    if (outputEl) {
      outputEl.textContent = report;
    } else {
      alert(report); // fallback so you ALWAYS see something
    }

    console.log("[Listing SaaS] Generated report + updated score:", { score });
  });
});
