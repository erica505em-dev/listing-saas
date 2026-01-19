function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generateBtn");
  const output = document.getElementById("output");

  btn.addEventListener("click", () => {
    const product = document.getElementById("product").value;
    const buyer = document.getElementById("buyer").value;
    const benefits = document.getElementById("benefits").value;

    output.textContent = `
LISTING GENERATED

Product: ${product}
Buyer: ${buyer}
Benefits:
${benefits}

Status: SaaS generator works.
`;
  });
});
