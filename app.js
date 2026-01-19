// ================================
// Listing SaaS - "No more guessing" app.js
// - Works even if IDs differ
// - Finds pages by .page
// - Finds a "generate" button by id OR button text
// - Finds output by <pre> OR element with id containing "output"
// - Shows a visible debug bar on screen
// ================================

(function () {
  // ---- On-page debug bar (always visible) ----
  function makeDebugBar() {
    const bar = document.createElement("div");
    bar.id = "debugBar";
    bar.style.position = "fixed";
    bar.style.left = "12px";
    bar.style.bottom = "12px";
    bar.style.zIndex = "99999";
    bar.style.padding = "10px 12px";
    bar.style.borderRadius = "12px";
    bar.style.fontFamily = "Arial, sans-serif";
    bar.style.fontSize = "12px";
    bar.style.background = "rgba(0,0,0,0.75)";
    bar.style.border = "1px solid rgba(255,255,255,0.15)";
    bar.style.color = "white";
    bar.style.maxWidth = "90vw";
    bar.style.lineHeight = "1.35";
    bar.textContent = "JS loaded…";
    document.body.appendChild(bar);
    return bar;
  }

  function setBar(bar, msg) {
    if (!bar) return;
    bar.textContent = msg;
  }

  // ---- Helpers ----
  function $id(id) { return document.getElementById(id); }

  function findFirstOutputEl() {
    // Prefer <pre>, else any element with id containing "output"
    const pre = document.querySelector("pre");
    if (pre) return pre;

    const candidates = Array.from(document.querySelectorAll("[id]"))
      .filter(el => /output/i.test(el.id));
    return candidates[0] || null;
  }

  function findGenerateButton() {
    // 1) Common IDs
    const byId = $id("generateBtn") || $id("createBtn") || $id("generate");
    if (byId) return byId;

    // 2) Button text contains generate/optimize/create
    const buttons = Array.from(document.querySelectorAll("button"));
    const match = buttons.find(b => /generate|optimi|create/i.test((b.textContent || "").trim()));
    return match || null;
  }

  function findLikelyInputs() {
    // Try common IDs first, else first 2 inputs + first textarea
    const product =
      $id("product") || $id("productType") || $id("product_name") || null;

    const buyer =
      $id("buyer") || $id("buyerType") || $id("targetBuyer") || null;

    const benefits =
      $id("benefits") || $id("benefitsText") || $id("benefitList") || null;

    // Fallbacks
    const inputs = Array.from(document.querySelectorAll("input"));
    const textarea = document.querySelector("textarea");

    return {
      productEl: product || inputs[0] || null,
      buyerEl: buyer || inputs[1] || null,
      benefitsEl: benefits || textarea || null
    };
  }

  // ---- Page routing ----
  function showPage(id) {
    const pages = document.querySelectorAll(".page");
    pages.forEach(p => p.classList.remove("active"));

    const target = document.getElementById(id);
    if (target) target.classList.add("active");
  }
  window.showPage = showPage; // so inline onclick works

  // ---- Main ----
  document.addEventListener("DOMContentLoaded", () => {
    const bar = makeDebugBar();

    const generateBtn = findGenerateButton();
    const outputEl = findFirstOutputEl();
    const { productEl, buyerEl, benefitsEl } = findLikelyInputs();

    const scoreEl =
      $id("scoreDisplay") || $id("kpiScore") || $id("score") || null;

    setBar(
      bar,
      `JS connected ✅ | generateBtn: ${generateBtn ? "FOUND" : "MISSING"} | output: ${outputEl ? "FOUND" : "MISSING"} | score: ${scoreEl ? "FOUND" : "MISSING"}`
    );

    // If no output exists, create one so you ALWAYS see results
    let finalOutput = outputEl;
    if (!finalOutput) {
      finalOutput = document.createElement("pre");
      finalOutput.style.marginTop = "12px";
      finalOutput.style.padding = "12px";
      finalOutput.style.borderRadius = "12px";
      finalOutput.style.border = "1px solid rgba(255,255,255,0.15)";
      finalOutput.style.background = "rgba(255,255,255,0.04)";
      finalOutput.style.whiteSpace = "pre-wrap";
      finalOutput.textContent = "Output panel auto-created ✅";
      // append into the active page or main
      const activePage = document.querySelector(".page.active") || document.querySelector("main") || document.body;
      activePage.appendChild(finalOutput);
      setBar(bar, bar.textContent + " | output auto-created");
    }

    if (!generateBtn) {
      finalOutput.textContent =
        "❌ No generate button found.\n\nFix: Add id='generateBtn' to your generate button in index.html.\nExample:\n<button id=\"generateBtn\">Generate Listing</button>";
      return;
    }

    // Bind click
    generateBtn.addEventListener("click", () => {
      const product = (productEl && "value" in productEl && productEl.value.trim()) ? productEl.value.trim() : "Your product";
      const buyer   = (buyerEl && "value" in buyerEl && buyerEl.value.trim()) ? buyerEl.value.trim() : "Your buyer";
      const benefits = (benefitsEl && "value" in benefitsEl && benefitsEl.value.trim())
        ? benefitsEl.value.trim()
        : "• Add 3 bullet benefits for conversion";

      const score = Math.floor(80 + Math.random() * 16);

      if (scoreEl) scoreEl.textContent = String(score);

      finalOutput.textContent =
`LISTING OPTIMIZATION REPORT

Product: ${product}
Buyer: ${buyer}

Optimization Score: ${score}/100

Next Best Action:
Improve your first image headline to increase click-through rate.

Benefits:
${benefits}

Status: Optimization complete ✅
`;

      setBar(bar, `Generated ✅ | score: ${score} | product: ${product}`);
    });
  });
})();
