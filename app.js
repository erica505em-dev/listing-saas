/* =========================
   Ericassetapartstudio SaaS
   Locked Layout + Full Functionality
   ========================= */

function $(id){ return document.getElementById(id); }

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const loginScreen = $("loginScreen");
  const loginBtn = $("loginBtn");
  const app = $("app");

  const navButtons = document.querySelectorAll(".nav-btn");
  const pages = ["dashboard","generator","billing","settings"].map(id => $(id));

  const headerBadge = $("headerBadge");

  // Dashboard elements
  const scoreNumber = $("scoreNumber");
  const scoreLabel = $("scoreLabel");
  const gaugeArc = $("gaugeArc");
  const lastRun = $("lastRun");
  const confidence = $("confidence");
  const countDisplay = $("countDisplay");

  // Generator elements
  const generateBtn = $("generateBtn");
  const output = $("output");
  const statusChip = $("statusChip");
  const loadingBox = $("loadingBox");
  const loadingText = $("loadingText");
  const loadingPct = $("loadingPct");
  const shimmerFill = $("shimmerFill");
  const loadingStep = $("loadingStep");

  // Ensure app is visible behind login overlay; login overlay blocks it.
  app.style.display = "flex";

  // INIT state
  showPage("dashboard");
  setActiveNav("dashboard");
  setBadge("Ready", "muted");
  setStatus("Idle", "muted");

  // Login (demo)
  loginBtn.addEventListener("click", () => {
    // Minimal demo validation: require something typed
    const email = ($("email").value || "").trim();
    const pass = ($("password").value || "").trim();

    if(!email || !pass){
      flashBadge("Enter email + password", "warn");
      return;
    }

    // Remove overlay cleanly
    loginScreen.remove();
    flashBadge("Welcome back", "success");
    showPage("dashboard");
    setActiveNav("dashboard");
  });

  // Sidebar routing
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;
      showPage(page);
      setActiveNav(page);
    });
  });

  // Generator action
  generateBtn.addEventListener("click", async () => {
    const payload = readInputs();
    const selected = readOptions();

    if(!payload.product || !payload.buyer || !payload.benefits.length){
      output.textContent = "Please complete Product name, Target buyer, and Benefits (one per line).";
      flashBadge("Missing required inputs", "warn");
      return;
    }

    setStatus("Working", "purple");
    setBadge("Optimizing…", "purple");

    // Loading animation (locked)
    await runLoadingSequence();

    // Build outputs
    const pack = buildListingPack(payload, selected);

    // Render
    output.textContent = pack;

    // Update scoreboard + confetti
    const score = scoreFromInputs(payload, selected);
    animateScore(score);
    incrementCount();
    setLastRun();
    setConfidence(score);

    setStatus("Complete", "gold");
    setBadge("Optimization Complete", "gold");
    burstConfetti();
  });

  // ---------- Helpers ----------

  function showPage(id){
    pages.forEach(p => p.classList.add("hidden"));
    const target = $(id);
    if(target) target.classList.remove("hidden");
  }

  function setActiveNav(pageId){
    navButtons.forEach(b => b.classList.remove("active"));
    const active = Array.from(navButtons).find(b => b.dataset.page === pageId);
    if(active) active.classList.add("active");
  }

  function setBadge(text, mode){
    headerBadge.textContent = text;
    headerBadge.style.borderColor = "rgba(30,41,59,.85)";
    headerBadge.style.color = "#E5E7EB";
    headerBadge.style.background = "rgba(2,6,23,.6)";

    if(mode === "gold"){
      headerBadge.style.borderColor = "rgba(245,199,122,.35)";
      headerBadge.style.background = "rgba(245,199,122,.08)";
      headerBadge.style.color = "#F5C77A";
    }
    if(mode === "purple"){
      headerBadge.style.borderColor = "rgba(99,102,241,.35)";
      headerBadge.style.background = "rgba(99,102,241,.10)";
      headerBadge.style.color = "#c7c8ff";
    }
    if(mode === "success"){
      headerBadge.style.borderColor = "rgba(34,197,94,.35)";
      headerBadge.style.background = "rgba(34,197,94,.10)";
      headerBadge.style.color = "#22C55E";
    }
    if(mode === "warn"){
      headerBadge.style.borderColor = "rgba(245,199,122,.35)";
      headerBadge.style.background = "rgba(245,199,122,.08)";
      headerBadge.style.color = "#F5C77A";
    }
  }

  function flashBadge(text, mode){
    const prev = headerBadge.textContent;
    setBadge(text, mode);
    setTimeout(() => setBadge(prev || "Ready", "muted"), 1400);
  }

  function setStatus(text, mode){
    statusChip.textContent = text;
    statusChip.classList.remove("chip-gold","chip-purple","chip-muted");
    if(mode === "gold") statusChip.classList.add("chip-gold");
    else if(mode === "purple") statusChip.classList.add("chip-purple");
    else statusChip.classList.add("chip-muted");
  }

  function readInputs(){
    const product = ($("product").value || "").trim();
    const buyer = ($("buyer").value || "").trim();
    const benefits = ($("benefits").value || "")
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean);

    const keywords = ($("keywords").value || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const tone = $("tone").value;
    const platform = $("platform").value;

    return { product, buyer, benefits, keywords, tone, platform };
  }

  function readOptions(){
    return {
      title: $("optTitle").checked,
      desc: $("optDesc").checked,
      tags: $("optTags").checked,
      alt: $("optAlt").checked,
      access: $("optAccess").checked,
      social: $("optSocial").checked
    };
  }

  async function runLoadingSequence(){
    loadingBox.classList.remove("hidden");
    shimmerFill.style.width = "0%";

    const steps = [
      "Analyzing keywords…",
      "Checking buyer psychology…",
      "Structuring for clarity & conversion…",
      "Optimizing for scan-readers…",
      "Finalizing output pack…"
    ];

    loadingText.textContent = "Optimizing your listing…";
    for(let pct = 0; pct <= 100; pct += 4){
      loadingPct.textContent = `${pct}%`;
      shimmerFill.style.width = `${pct}%`;

      const stepIndex = Math.min(steps.length - 1, Math.floor((pct/100) * steps.length));
      loadingStep.textContent = steps[stepIndex];

      await sleep(40);
    }

    await sleep(200);
    loadingBox.classList.add("hidden");
  }

  function buildListingPack(p, opt){
    const toneLine = toneVoice(p.tone);
    const kw = p.keywords.length ? p.keywords : inferKeywords(p);

    const title = makeTitle(p, kw);
    const desc = makeDescription(p, toneLine, kw);
    const tags = makeTags(kw);
    const alt = makeAltText(p);
    const access = makeAccessFile(p);
    const social = makeSocial(p, title);

    const parts = [];
    parts.push(`ERICASSETAPARTSTUDIO — LISTING PACK\n`);

    parts.push(`Platform: ${p.platform.toUpperCase()} | Tone: ${p.tone.toUpperCase()}`);
    parts.push(`Buyer: ${p.buyer}`);
    parts.push(`\n==================================================\n`);

    if(opt.title){
      parts.push(`TITLE\n${title}\n`);
      parts.push(`--------------------------------------------------\n`);
    }
    if(opt.desc){
      parts.push(`DESCRIPTION\n${desc}\n`);
      parts.push(`--------------------------------------------------\n`);
    }
    if(opt.tags){
      parts.push(`TAGS (comma-separated)\n${tags}\n`);
      parts.push(`--------------------------------------------------\n`);
    }
    if(opt.alt){
      parts.push(`IMAGE ALT TEXT (3 options)\n${alt}\n`);
      parts.push(`--------------------------------------------------\n`);
    }
    if(opt.access){
      parts.push(`ACCESS FILE COPY (Copy/Paste)\n${access}\n`);
      parts.push(`--------------------------------------------------\n`);
    }
    if(opt.social){
      parts.push(`SOCIAL CAPTIONS (3)\n${social}\n`);
      parts.push(`--------------------------------------------------\n`);
    }

    parts.push(`STATUS\nOptimization complete. Ready to publish.\n`);
    return parts.join("\n");
  }

  function toneVoice(tone){
    if(tone === "luxury") return "premium, confident, clean, high-trust";
    if(tone === "bold") return "punchy, direct, benefit-led, high energy";
    return "warm, friendly, reassuring, beginner-safe";
  }

  function inferKeywords(p){
    const base = [
      p.product,
      "digital download",
      "instant download",
      "printable",
      "gift idea"
    ];

    if(p.product.toLowerCase().includes("portrait")) base.push("custom portrait", "couple gift");
    if(p.buyer.toLowerCase().includes("mom")) base.push("gift for mom", "busy mom");

    return base.map(x => x.toLowerCase());
  }

  function makeTitle(p, kw){
    const core = kw.slice(0, 2).join(" | ");
    const buyer = p.buyer.split(",")[0].trim();
    return `${p.product} for ${buyer} | ${core} | Instant Digital Download`;
  }

  function makeDescription(p, toneLine, kw){
    const benefits = p.benefits.map(b => `• ${b}`).join("\n");
    const keywordLine = kw.slice(0, 6).join(", ");

    return (
`Designed for ${p.buyer} who want a result that feels effortless — and looks premium.

What you get:
${benefits}

Why it converts:
• Clear promise + fast win
• Buyer-led language (${toneLine})
• Keyword-smart without sounding spammy

Keywords:
${keywordLine}

Digital download. No physical item shipped.`
    );
  }

  function makeTags(kw){
    // Simple Etsy-friendly tags (short-ish). You can refine later.
    const cleaned = kw
      .map(k => k.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim())
      .filter(Boolean);

    // Keep unique, limit to 13-ish
    const uniq = [];
    for(const t of cleaned){
      if(!uniq.includes(t)) uniq.push(t);
      if(uniq.length >= 13) break;
    }
    return uniq.join(", ");
  }

  function makeAltText(p){
    return (
`1) ${p.product} digital download listing image, designed for ${p.buyer}
2) Premium ${p.product} printable, instant download file for ${p.buyer}
3) High-quality ${p.product} digital file, easy to download and use`
    );
  }

  function makeAccessFile(p){
    return (
`THANK YOU FOR YOUR PURCHASE!
Thank you for supporting Ericassetapartstudio — your download is ready.

HOW TO ACCESS YOUR FILES
• Open your order confirmation and select “Download Files”
• If you checked out as a guest, use the receipt email link
• Save the files to your device for easy access

HOW TO USE THE FILE
• This is a digital product (no physical item shipped)
• Use for personal use or as described in the listing terms
• If you need help, message us — we’ve got you

QUESTIONS & SUPPORT
If anything looks off, send a message with your order number and we’ll help fast.

REVIEW REQUEST
If you loved it, a quick review helps our small business grow — thank you!`
    );
  }

  function makeSocial(p, title){
    const hook = p.tone === "bold"
      ? "Hot take:"
      : p.tone === "luxury"
      ? "Premium move:"
      : "Quick tip:";

    return (
`1) ${hook} Your listing shouldn’t “look nice” — it should convert. I just generated a full listing pack for: ${p.product}. ✅
2) If your buyer can’t understand it in 3 seconds, they won’t buy. This listing is now optimized for ${p.buyer}. 💡
3) New listing drop: ${title}\nBuilt for clarity, keywords, and buyer psychology.`
    );
  }

  function scoreFromInputs(p, opt){
    // Deterministic-ish scoring so it feels consistent
    let score = 70;

    // Inputs
    if(p.product.length >= 6) score += 6;
    if(p.buyer.length >= 6) score += 6;
    if(p.benefits.length >= 3) score += 8;
    else if(p.benefits.length >= 1) score += 4;

    if(p.keywords.length >= 5) score += 6;
    else if(p.keywords.length >= 2) score += 3;

    // Options chosen = more complete pack
    const optCount = Object.values(opt).filter(Boolean).length;
    score += Math.min(10, optCount * 2);

    // Tone + platform minor bump
    if(p.tone === "luxury") score += 2;
    if(p.platform === "etsy") score += 2;

    // clamp
    score = Math.max(60, Math.min(98, score));
    return score;
  }

  function animateScore(targetScore){
    const r = 46;
    const circumference = 2 * Math.PI * r; // ~289
    gaugeArc.style.strokeDasharray = `${circumference.toFixed(0)}`;

    const start = parseInt(scoreNumber.textContent.replace(/\D/g,""), 10);
    const from = Number.isFinite(start) ? start : 0;

    const duration = 900;
    const startTime = performance.now();

    function tick(now){
      const t = Math.min(1, (now - startTime) / duration);
      const eased = easeOutCubic(t);
      const val = Math.round(from + (targetScore - from) * eased);

      scoreNumber.textContent = String(val);
      scoreLabel.textContent = val >= 90 ? "Optimized" : (val >= 80 ? "Strong" : "Needs polish");

      const progress = val / 100;
      const offset = circumference * (1 - progress);
      gaugeArc.style.strokeDashoffset = `${offset.toFixed(0)}`;

      if(t < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function incrementCount(){
    const current = parseInt(countDisplay.textContent || "0", 10) || 0;
    countDisplay.textContent = String(current + 1);
  }

  function setLastRun(){
    const d = new Date();
    lastRun.textContent = d.toLocaleString();
  }

  function setConfidence(score){
    if(score >= 90) confidence.textContent = "High";
    else if(score >= 80) confidence.textContent = "Medium";
    else confidence.textContent = "Low";
  }

  function sleep(ms){ return new Promise(res => setTimeout(res, ms)); }
  function easeOutCubic(x){ return 1 - Math.pow(1 - x, 3); }

  // ---------- Confetti (luxury gold + white) ----------
  function burstConfetti(){
    const canvas = $("confettiCanvas");
    const ctx = canvas.getContext("2d");
    resizeCanvas(canvas);

    const w = canvas.width, h = canvas.height;

    const colors = ["#F5C77A", "#FFFFFF", "#E5E7EB"];
    const particles = [];

    const count = 140;
    for(let i=0;i<count;i++){
      particles.push({
        x: w/2,
        y: h/3,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.9) * 10,
        g: 0.18 + Math.random() * 0.22,
        size: 2 + Math.random() * 3,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.2,
        alpha: 1,
        color: colors[Math.floor(Math.random()*colors.length)]
      });
    }

    let frames = 0;
    function animate(){
      frames++;
      ctx.clearRect(0,0,w,h);

      for(const p of particles){
        p.vy += p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.alpha *= 0.992;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size, -p.size/2, p.size*2, p.size);
        ctx.restore();
      }

      if(frames < 140){
        requestAnimationFrame(animate);
      }else{
        ctx.clearRect(0,0,w,h);
      }
    }

    requestAnimationFrame(animate);
  }

  function resizeCanvas(canvas){
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  window.addEventListener("resize", () => {
    const canvas = $("confettiCanvas");
    if(canvas) resizeCanvas(canvas);
  });
});
