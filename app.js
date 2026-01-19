let plan = "free";

// ---------- LOGIN ----------
document.getElementById("loginBtn").addEventListener("click", () => {
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "flex";
});

// ---------- NAVIGATION ----------
document.querySelectorAll(".nav").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    show(btn.getAttribute("data"));
  });
});

function show(id){
  ["dash","gen","bill","set"].forEach(x=>{
    document.getElementById(x).classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

// ---------- GENERATOR ----------
document.getElementById("generate").addEventListener("click", () => {

  if(plan !== "premium"){
    document.getElementById("out").textContent =
      "Upgrade to Premium to use generator.";
    show("bill");
    return;
  }

  const product = document.getElementById("product").value || "Your Product";
  const buyer = document.getElementById("buyer").value || "Your Buyer";
  const benefits = document.getElementById("benefits").value.split("\n");

  let text =
`AI STRATEGIC OUTPUT

TITLE:
${product} for ${buyer}

DESCRIPTION:
`;

  benefits.forEach(b=>{
    if(b.trim() !== "") text += "• " + b + "\n";
  });

  text += "\nSTATUS: Strategic optimization complete.";

  document.getElementById("out").textContent = text;

  // Update dashboard metrics
  const score = Math.floor(80 + Math.random()*18);
  document.getElementById("score").textContent = score;

  const countEl = document.getElementById("count");
  countEl.textContent = parseInt(countEl.textContent) + 1;
});

// ---------- COPY ----------
document.getElementById("copy").addEventListener("click", () => {
  navigator.clipboard.writeText(
    document.getElementById("out").textContent
  );
  alert("Copied to clipboard");
});

// ---------- DOWNLOAD ----------
document.getElementById("download").addEventListener("click", () => {
  const text = document.getElementById("out").textContent;
  const blob = new Blob([text], { type:"text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "listing-pack.txt";
  a.click();
});

// ---------- BILLING ----------
document.getElementById("upgrade").addEventListener("click", () => {
  plan = "premium";
  document.getElementById("plan").textContent = "Premium";
  alert("Premium unlocked");
});
