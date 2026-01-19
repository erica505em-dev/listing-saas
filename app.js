document.getElementById("generateBtn").addEventListener("click", function() {

  const product = document.getElementById("product").value.trim();
  const buyer = document.getElementById("buyer").value.trim();
  const benefits = document.getElementById("benefits").value.trim();

  if (!product || !buyer || !benefits) {
    document.getElementById("output").textContent =
      "Please fill in all fields before generating your listing.";
    return;
  }

  // Create a strong title
  const title = `${product} for ${buyer} | High Quality Digital Download`;

  // Create a description
  const description = 
`This ${product} is designed specifically for ${buyer} who want better results with less effort.

With this product, you will:
${benefits.split("\n").map(b => "• " + b).join("\n")}

This is a digital product. No physical item will be shipped.

Download instantly and start using today.`;

  // Create SEO tags
  const tags = [
    product,
    buyer,
    "digital download",
    "printable",
    "instant download",
    "etsy seller tool",
    "business resource"
  ].join(", ");

  // Display output
  document.getElementById("output").textContent =
`LISTING GENERATED SUCCESSFULLY

TITLE:
${title}

----------------------------------

DESCRIPTION:
${description}

----------------------------------

TAGS:
${tags}

----------------------------------

STATUS:
Your listing is ready to publish.`;

});
