
const $ = s => document.querySelector(s);

/* ---------- Confetti ---------- */
const cv = $("#confetti"), cx = cv.getContext("2d");
let ps = [], raf = null;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
function confetti(n) {
  if (reduce) n = Math.min(n, 20);
  cv.width = innerWidth; cv.height = innerHeight;
  const cols = ["#A855F7", "#FF72C6", "#E9D5FF", "#FFD78A", "#FFFFFF"];
  for (let k = 0; k < n; k++) ps.push({ x: innerWidth / 2, y: innerHeight * 0.6, vx: (Math.random() - 0.5) * 12, vy: -Math.random() * 14 - 4, s: 5 + Math.random() * 5, c: cols[k % 5], r: Math.random() * 6 });
  if (!raf) raf = requestAnimationFrame(tick);
}
function tick() {
  cx.clearRect(0, 0, cv.width, cv.height);
  ps.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.r += 0.2;
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c; cx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.6); cx.restore();
  });
  ps = ps.filter(p => p.y < cv.height + 20);
  if (ps.length) raf = requestAnimationFrame(tick); else { cx.clearRect(0, 0, cv.width, cv.height); raf = null; }
}

/* ---------- Password gate ---------- */
$("#gq").textContent = CONFIG.question;
let tries = 0;
function tryGate() {
  const v = $("#ga").value.trim().toLowerCase();
  if (CONFIG.answers.includes(v)) { $("#gate").hidden = true; $("#app").hidden = false; window.scrollTo(0, 0); setTrack("welcome"); }
  else { tries++; $("#gmsg").textContent = tries >= 3 ? "Hint: " + CONFIG.hint : "Oops, ye nahi hai 😜 phir try kar!"; }
}
// password page pe pehli tap/key se hi gaana shuru (browser tap ke baad hi audio allow karta hai)
["pointerdown", "pointerup", "keydown"].forEach(ev => $("#gate").addEventListener(ev, () => setTrack("gate"), { once: true }));
$("#gbtn").onclick = tryGate;
$("#ga").addEventListener("keydown", e => { if (e.key === "Enter") tryGate(); });

/* ---------- Music: har stage ka gaana (content.js ke MUSIC mein) ---------- */
const audio = new Audio(); audio.loop = true; audio.volume = 0;
const mb = $("#mbtn");
let vol = 0.6, curTrack = null, held = false, fadeT;
function fade(to, cb) {
  clearInterval(fadeT);
  fadeT = setInterval(() => {
    const d = to - audio.volume;
    if (Math.abs(d) < 0.04) { audio.volume = to; clearInterval(fadeT); if (cb) cb(); }
    else audio.volume = Math.min(1, Math.max(0, audio.volume + Math.sign(d) * 0.04));
  }, 50);
}
function setTrack(k) {
  const src = MUSIC[k], prev = curTrack;
  if (!src || src === curTrack) return;
  curTrack = src;
  fade(0, () => {
    audio.src = src;
    if (held) return;
    if (bg) { wasPlaying = true; return; }   // site background mein hai to play nahi
    audio.play().then(() => { $("#music").hidden = false; fade(vol); })
      .catch(() => { curTrack = prev; if (prev) { audio.src = prev; audio.play().then(() => fade(vol)).catch(() => {}); } });
  });
}
mb.onclick = () => { held = !audio.paused; if (held) audio.pause(); else { audio.volume = vol; audio.play().catch(() => {}); } };
audio.onplay = () => mb.textContent = "⏸ Music";
audio.onpause = () => mb.textContent = "▶ Music";
$("#vol").oninput = e => { vol = +e.target.value; audio.volume = vol; };

/* ---------- Enter ---------- */
$("#enter").onclick = () => {
  $("#world").hidden = false;
  setTrack("hero"); confetti(70);
  $("#level").scrollIntoView();
};

/* ---------- Gallery + lightbox ---------- */
const items = [], grid = $("#grid"), lb = $("#lb");
let cur = 0;
const ORDER = typeof PHOTO_ORDER !== "undefined" ? PHOTO_ORDER : Array.from({ length: CONFIG.photoCount }, (_, k) => k + 1);
ORDER.forEach((n, idx) => {
  const i = idx + 1;   // "Yaad #" isi order se
  const it = { src: `assets/photos/photo${n}.jpg`, cap: CAPTIONS[n] || `Yaad #${i} 💜`, alt: `Suggu ki yaadon ki photo ${i}`, ok: true };
  const b = document.createElement("button");
  b.className = "ph"; b.setAttribute("aria-label", `Photo ${i} bada karke dekho`);
  const im = new Image();
  im.src = it.src; im.alt = it.alt; im.loading = "lazy";
  im.onerror = () => { it.ok = false; b.remove(); };   // missing photo: chup chaap hata do
  b.append(im);
  b.onclick = () => { showLb(items.indexOf(it)); lb.hidden = false; $("#lbclose").focus(); };
  grid.append(b); items.push(it);
});
function showLb(n) { cur = n; $("#lbimg").src = items[n].src; $("#lbimg").alt = items[n].alt; $("#lbcap").textContent = items[n].cap; }
function step(d) { let n = cur; do { n = (n + d + items.length) % items.length; } while (!items[n].ok && n !== cur); showLb(n); }
$("#prev").onclick = () => step(-1);
$("#next").onclick = () => step(1);
$("#lbclose").onclick = () => lb.hidden = true;
document.addEventListener("keydown", e => {
  if (!lb.hidden) { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }
  if (e.key === "Escape") { lb.hidden = true; $("#letter").hidden = true; }
});

/* ---------- 18 cards + secret ---------- */
const cg = $("#cards"), sec = $("#secret");
let opened = 0;
const cardEls = CARDS.map((t, i) => {
  const c = document.createElement("button");
  c.className = "card fc"; c.setAttribute("aria-label", `Surprise card ${i + 1}`);
  c.innerHTML = `<span class="in"><span class="f">${i + 1}</span><span class="bk">${t}</span></span>`;
  c.onclick = () => openCard(i);
  cg.append(c); return c;
});
function openCard(i) {
  const c = cardEls[i];
  if (c.classList.contains("open")) return;
  c.classList.add("open"); opened++;
  $("#count").textContent = `${opened}/18 khule`;
  if (opened === 1) toast("🏅 Achievement: pehla card khola!");
  if (opened === 9) toast("🔥 Aadhe cards khul gaye!");
  if (opened === CARDS.length) { sec.hidden = false; $("#lettersec").hidden = false; sec.disabled = false; sec.textContent = "🎁 Secret card unlock ho gaya! Tap kar"; confetti(80); toast("🎖️ Card Master! Neeche special letter unlock ho gaya ⬇️"); }
}
sec.onclick = () => { if (sec.disabled) return; sec.classList.add("open"); sec.textContent = SECRET; confetti(140); };
$("#openall").onclick = () => CARDS.forEach((_, i) => openCard(i));
$("#replayc").onclick = () => {
  cardEls.forEach(c => { c.className = "card fc"; });
  opened = 0; $("#count").textContent = "0/18 khule";
  sec.hidden = true; sec.disabled = true; sec.className = "card secret"; sec.textContent = "🔒 Secret card: pehle saare 18 kholo";
};

/* ---------- Stats ---------- */
$("#statbtn").onclick = () => {
  $("#statbtn").hidden = true;
  $("#statlist").innerHTML = STATS.map(([n, label, v, cls = ""], i) => `<div class="stat ${cls}"><span>${i + 1}. ${n}</span><b>${label}</b><i style="--w:${v}%"></i></div>`).join("");
  const L = $("#statlist"); L.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => L.classList.add("go")));
  $("#cakesec").hidden = false; toast("🎂 Neeche ek surprise aur baaki hai");
};

/* ---------- Letter ---------- */
let ty, follow = false;
const lt = $("#lettertext"), lc = document.querySelector(".lettercard"), lta = document.createElement("span"), ltr = document.createElement("span");
ltr.className = "rest"; lt.append(lta, ltr);          // baaki letter invisible, taaki jagah fix rahe
function typeLetter(n) {
  lta.textContent = LETTER.slice(0, n); ltr.textContent = LETTER.slice(n);
  if (follow) {                                       // likha hua text hamesha screen pe rahe (upar se neeche)
    const c = lc.getBoundingClientRect(), r = lta.getBoundingClientRect(), over = r.bottom - (c.bottom - 70);
    if (over > 0) lc.scrollTop += over;
  }
}
typeLetter(LETTER.length);
["touchstart", "wheel"].forEach(ev => lc.addEventListener(ev, () => follow = false, { passive: true }));   // tu khud scroll kare to ruk jaye
lt.onclick = () => { clearInterval(ty); follow = false; typeLetter(LETTER.length); lc.scrollTop = 0; };   // tap = poora letter turant
$("#openLetter").onclick = () => {
  $("#letter").hidden = false; clearInterval(ty); setTrack("letter"); $("#statsec").hidden = false;
  $("#lx").focus({ preventScroll: true }); lc.scrollTop = 0;
  if (reduce) { follow = false; typeLetter(LETTER.length); return; }
  follow = true; let k = 0; const step = Math.max(2, Math.ceil(LETTER.length / 380));   // lamba letter bhi ~12 second mein
  typeLetter(0);
  ty = setInterval(() => { k += step; typeLetter(k); if (k >= LETTER.length) { clearInterval(ty); follow = false; } }, 30);
};
$("#lx").onclick = () => $("#lclose").click();
$("#lclose").onclick = () => { $("#letter").hidden = true; $("#statsec").scrollIntoView(); };

/* ---------- Cake ---------- */
let ct = [];
$("#cakeyes").onclick = () => { $("#cakeyes").hidden = true; $("#cakewrap").hidden = false; setTrack("cake"); };
$("#blow").onclick = () => {
  $("#cake").classList.add("out", "gobar"); $("#blow").hidden = true; confetti(200);
  $("#bday").hidden = false; $("#bmsg").textContent = CAKE.joke; $("#bmsg2").textContent = ""; $("#bmsg3").textContent = "";
  ct = [setTimeout(() => { $("#bmsg2").textContent = CAKE.wish; confetti(60); }, reduce ? 0 : 3000),
        setTimeout(() => { $("#bmsg3").textContent = CAKE.final; $("#replay").hidden = false; $("#giftsec").hidden = false; confetti(120); }, reduce ? 0 : 6500)];
};
$("#replay").onclick = () => { ct.forEach(clearTimeout); $("#cake").classList.remove("out", "gobar"); $("#bday").hidden = true; $("#blow").hidden = false; $("#replay").hidden = true; };

/* ================= UPGRADES: stars, reveal, level, toast ================= */
const sc = $("#stars"), sx = sc.getContext("2d");
let S = [], sh = [], py = 0, lw = innerWidth;
function sizeStars() {
  sc.width = innerWidth; sc.height = innerHeight;
  S = Array.from({ length: Math.min(150, innerWidth / 6) }, () => ({ x: Math.random() * sc.width, y: Math.random() * sc.height, r: Math.random() * 1.5 + 0.3, p: Math.random() * 6, d: Math.random() * 0.4 + 0.1 }));
}
sizeStars();
addEventListener("resize", () => { if (innerWidth !== lw) { lw = innerWidth; sizeStars(); } });
addEventListener("scroll", () => py = scrollY, { passive: true });
function drawStars(t) {
  sx.clearRect(0, 0, sc.width, sc.height);
  S.forEach(s => {
    const y = ((s.y - py * s.d) % sc.height + sc.height) % sc.height;
    sx.globalAlpha = reduce ? 0.8 : 0.4 + 0.6 * Math.abs(Math.sin(t / 1200 + s.p));
    sx.fillStyle = s.r > 1.2 ? "#FFD78A" : "#fff";
    sx.beginPath(); sx.arc(s.x, y, s.r, 0, 6.28); sx.fill();
  });
  if (!reduce && Math.random() < 0.004 && sh.length < 2) sh.push({ x: Math.random() * sc.width * 0.7, y: Math.random() * sc.height * 0.4, l: 0 });
  sh.forEach(m => {
    m.l += 14; m.x += 9; m.y += 5;
    sx.globalAlpha = Math.max(0, 1 - m.l / 260);
    const g = sx.createLinearGradient(m.x, m.y, m.x - 70, m.y - 40);
    g.addColorStop(0, "#fff"); g.addColorStop(1, "transparent");
    sx.strokeStyle = g; sx.lineWidth = 2; sx.beginPath(); sx.moveTo(m.x, m.y); sx.lineTo(m.x - 70, m.y - 40); sx.stroke();
  });
  sh = sh.filter(m => m.l < 260); sx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}
requestAnimationFrame(drawStars);

// sections scroll karne pe aate hain
const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); } }), { threshold: 0.12 });
document.querySelectorAll(".block").forEach(b => rv.observe(b));

// achievement popup
let tt;
function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2800); }

// Level 1 -> 19 count-up
new IntersectionObserver((es, o) => es.forEach(e => {
  if (!e.isIntersecting) return;
  o.unobserve(e.target);
  let n = 1;
  const t = setInterval(() => { $("#lvnum").textContent = ++n; if (n >= 19) { clearInterval(t); confetti(90); toast("🏆 Level 19 unlocked!"); } }, reduce ? 10 : 110);
}), { threshold: 0.5 }).observe($("#level"));

// har section pe uska gaana (data-track): screen ke beech mein aate hi
const trackObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setTrack(e.target.dataset.track); }), { rootMargin: "-45% 0px -45% 0px" });
document.querySelectorAll("[data-track]").forEach(el => trackObs.observe(el));

/* ================= GIFT + ENDING ================= */
$("#gtitle").textContent = GIFT.title; $("#ghint").textContent = GIFT.hint; $("#giftcap").textContent = GIFT.caption;
const gi = $("#giftimg"); gi.src = GIFT.image;
gi.onerror = () => { gi.hidden = true; $("#giftfb").hidden = false; };   // image na ho toh 🚗 dikhega
$("#gift").onclick = () => {
  $("#gift").classList.add("open"); confetti(120);
  setTimeout(() => { $("#giftshow").hidden = false; $("#giftshow").scrollIntoView({ block: "center" }); }, reduce ? 0 : 700);
};
$("#giftnext").onclick = () => { $("#endsec").hidden = false; $("#endsec").scrollIntoView(); };
$("#etitle").textContent = END.title; $("#emsg").textContent = END.msg; $("#ecredit").textContent = END.credit;
// "Experience it again": page reload, password dobara nahi poochhega
$("#again").onclick = () => { try { sessionStorage.setItem("replay", "1"); } catch (e) {} location.reload(); };
try { if (sessionStorage.getItem("replay")) { sessionStorage.removeItem("replay"); $("#gate").hidden = true; $("#app").hidden = false; } } catch (e) {}

/* ===== Gaana tabhi chale jab site screen pe ho (app/tab badalne pe ruk jaye, wapas aane pe chale) ===== */
let bg = false, wasPlaying = false;
function toBackground() { bg = true; if (!audio.paused) { wasPlaying = true; clearInterval(fadeT); audio.pause(); } }
function toForeground() {
  if (!bg) return; bg = false;
  if (wasPlaying && !held) { audio.volume = 0; audio.play().then(() => fade(vol)).catch(() => {}); }
  wasPlaying = false;
}
document.addEventListener("visibilitychange", () => document.hidden ? toBackground() : toForeground());
addEventListener("pagehide", toBackground);
addEventListener("pageshow", () => { if (!document.hidden) toForeground(); });
addEventListener("blur", toBackground);
addEventListener("focus", () => { if (!document.hidden) toForeground(); });
document.addEventListener("pointerdown", () => { if (bg && !document.hidden) toForeground(); }, true);   // safety: tap karte hi wapas
