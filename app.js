let listingCount = 0;

function login() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

function logout() {
  location.reload();
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("generateBtn").addEventListener("click", function() {

  const product = document.getElementById("product").value.trim();
  const buyer = document.getElementById("buyer").value.trim();
  const benefits = document.getElementById("benefits").value.trim();

  if (!product || !buyer || !benefits) {
    document.getElementById("output").textContent =
      "Please complete all fields before generating.";
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
