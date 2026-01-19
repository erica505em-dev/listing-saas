let listingCount = 0;

// LOGIN
function forceLogin(){
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

// LOGOUT
function logout(){
  document.getElementById("loginScreen").classList.remove("hidden");
  document.getElementById("app").classList.add("hidden");
}

// PAGE NAVIGATION
function showPage(page){
  document.querySelectorAll(".page").forEach(p=>{
    p.classList.remove("active");
  });
  document.getElementById(page).classList.add("active");
}

// GENERATE LISTING
document.addEventListener("DOMContentLoaded",()=>{

  const generateBtn = document.getElementById("generateBtn");

  if(generateBtn){
    generateBtn.addEventListener("click",()=>{

      const product = document.getElementById("product").value || "Your Product";
      const buyer = document.getElementById("buyer").value || "Your Buyer";
      const benefits = document.getElementById("benefits").value.split("\n");

      let output = `TITLE:\n${product} for ${buyer}\n\nDESCRIPTION:\n`;

      benefits.forEach(b=>{
        if(b.trim()!=="") output+=`• ${b}\n`;
      });

      output += `\nSTATUS: Optimization complete.`;

      document.getElementById("output").textContent = output;

      const score = Math.floor(80 + Math.random()*18);
      document.getElementById("scoreDisplay").textContent = score;

      listingCount++;
      document.getElementById("countDisplay").textContent = listingCount;
    });
  }

});
