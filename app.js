let userPlan = "free";

function $(id){ return document.getElementById(id); }

document.addEventListener("DOMContentLoaded",()=>{

const loginBtn=$("loginBtn");
const loginScreen=$("loginScreen");
const navBtns=document.querySelectorAll(".nav-btn");
const pages=document.querySelectorAll(".page");

const generateBtn=$("generateBtn");
const output=$("output");
const copyBtn=$("copyBtn");
const downloadBtn=$("downloadBtn");
const upgradeBtn=$("upgradeBtn");

const scoreNumber=$("scoreNumber");
const countDisplay=$("countDisplay");
const planStatus=$("planStatus");

loginBtn.onclick=()=>{
  if(!$("email").value||!$("password").value)return;
  loginScreen.remove();
};

navBtns.forEach(btn=>{
  btn.onclick=()=>{
    navBtns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    pages.forEach(p=>p.classList.add("hidden"));
    $(btn.dataset.page).classList.remove("hidden");
  };
});

generateBtn.onclick=()=>{
  if(userPlan!=="premium"){
    output.textContent="Upgrade to Premium to unlock generator.";
    document.querySelector('[data-page="billing"]').click();
    return;
  }

  const product=$("product").value;
  const buyer=$("buyer").value;
  const benefits=$("benefits").value.split("\n");

  let txt=`TITLE:\n${product} for ${buyer}\n\nDESCRIPTION:\nBenefits:\n`;
  benefits.forEach(b=>txt+=`• ${b}\n`);

  output.textContent=txt;

  const score=Math.floor(80+Math.random()*18);
  scoreNumber.textContent=score;
  countDisplay.textContent=parseInt(countDisplay.textContent)+1;
};

copyBtn.onclick=()=>{
  navigator.clipboard.writeText(output.textContent);
  alert("Copied!");
};

downloadBtn.onclick=()=>{
  const blob=new Blob([output.textContent],{type:"text/plain"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="listing-pack.txt";
  a.click();
};

upgradeBtn.onclick=()=>{
  userPlan="premium";
  planStatus.textContent="Premium";
  alert("Premium unlocked (Stripe placeholder)");
};

});
