let listingCount = 0;

// LOGIN
function forceLogin(){
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "flex";
}

// LOGOUT
function logout(){
  document.getElementById("login").style.display = "flex";
  document.getElementById("app").style.display = "none";
}

// PAGE NAVIGATION
function showPage(page){
  ["dash","gen","bill","set"].forEach(id=>{
    document.getElementById(id).classList.add("hidden");
  });
  document.getElementById(page).classList.remove("hidden");
}

// GENERATE LISTING
document.addEventListener("DOMContentLoaded",()=>{

  const generateBtn = document.getElementById("generate");

  if(generateBtn){
    generateBtn.addEventListener("click",()=>{

      const product = document.getElementById("product").value || "Your Product";
      const buyer = document.getElementById("buyer").value || "Your Buyer";
      const benefits = document.getElementById("benefits").value.split("\n");

      let outputText = `TITLE:\n${product} for ${buyer}\n\nDESCRIPTION:\n`;

      benefits.forEach(b=>{
        if(b.trim()!=="") outputText+=`• ${b}\n`;
      });

      outputText += `\nSTATUS: Optimization complete.`;

      document.getElementById("out").textContent = outputText;

      const score = Math.floor(80 + Math.random()*18);
      document.getElementById("score").textContent = score;

      listingCount++;
      document.getElementById("count").textContent = listingCount;
    });
  }

});
