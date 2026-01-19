document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded");

  const generateBtn = document.getElementById("generateBtn");
  const packetOutput = document.getElementById("packetOutput");

  if (generateBtn) {
    generateBtn.addEventListener("click", () => {
      const product = document.getElementById("productType").value;
      const buyer = document.getElementById("buyerType").value;
      const keywords = document.getElementById("keywords").value;
      const benefits = document.getElementById("benefits").value;

      packetOutput.textContent = `
LISTING PACKET

Product: ${product}
Buyer: ${buyer}
Keywords: ${keywords}

Benefits:
${benefits}

Status: Generator working 🎉
      `;
    });
  } else {
    console.log("Generate button not found");
  }
});
