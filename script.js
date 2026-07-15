// ================= Page transition (on load) =================
window.addEventListener('load', ()=>{
  const pt = document.getElementById('pageTransition');
  setTimeout(()=>{
    pt.classList.add('reveal-transition');
    setTimeout(()=> pt.style.display='none', 800);
  }, 300);
  setTimeout(()=> document.getElementById('loader').classList.add('hide'), 1000);
});

// ================= Nav — premium blur on scroll =================
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 40){ nav.classList.add('scrolled'); }
  else{ nav.classList.remove('scrolled'); }
});

// ================= Glow + custom cursor =================
const glow = document.getElementById('glow');
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let ringX=0, ringY=0, mouseX=0, mouseY=0;

document.addEventListener('mousemove', e=>{
  mouseX = e.clientX; mouseY = e.clientY;
  glow.style.left = mouseX + 'px';
  glow.style.top = mouseY + 'px';
  if(cursorDot){
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  }
});

function animateRing(){
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;
  if(cursorRing){
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .btn, .project-card, .service-card, .skill-card, .testimonial-card, #themeToggle').forEach(el=>{
  el.addEventListener('mouseenter', ()=> cursorRing && cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', ()=> cursorRing && cursorRing.classList.remove('hover'));
});

// ================= Theme toggle =================
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', ()=>{
  const body = document.body;
  const isDark = body.getAttribute('data-theme') === 'dark';
  body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  toggle.textContent = isDark ? '☀️' : '🌙';
});

// ================= Role rotator (animated text) =================
const roles = ['Web Developer', 'AI Builder', 'Future Startup Founder'];
const roleEl = document.getElementById('roleText');
let rIdx=0, rChar=0, rDeleting=false;
function roleLoop(){
  const current = roles[rIdx];
  if(!rDeleting){
    rChar++;
    roleEl.textContent = current.slice(0,rChar);
    if(rChar === current.length){ rDeleting = true; setTimeout(roleLoop, 1300); return; }
  } else {
    rChar--;
    roleEl.textContent = current.slice(0,rChar);
    if(rChar === 0){ rDeleting = false; rIdx = (rIdx+1)%roles.length; }
  }
  setTimeout(roleLoop, rDeleting ? 35 : 60);
}
roleLoop();

// ================= Phone code lines animation =================
const codeSnippets = [
`<span class="code-tag">&lt;div</span> <span class="code-kw">class</span>=<span class="code-str">"shop"</span><span class="code-tag">&gt;</span>
  <span class="code-tag">&lt;h1&gt;</span>Suhag Churi<span class="code-tag">&lt;/h1&gt;</span>
  <span class="code-kw">const</span> cart = [];
  cart.push(<span class="code-str">"bangles"</span>);
<span class="code-tag">&lt;/div&gt;</span>`,
`<span class="code-kw">async function</span> sendWA() {
  <span class="code-kw">const</span> msg = <span class="code-str">"Order confirmed"</span>;
  <span class="code-kw">await</span> gemini.ask(msg);
}
<span class="code-kw">// building on mobile 📱</span>`,
`Sub AutoReply()
  <span class="code-kw">Dim</span> res <span class="code-kw">As String</span>
  res = CallGemini(prompt)
  Range(<span class="code-str">"A1"</span>).Value = res
End Sub`
];
const codeEl = document.getElementById('codeLines');
let sIdx = 0;
function typeCode(){
  codeEl.style.transition = 'opacity .6s';
  codeEl.style.opacity = 0;
  setTimeout(()=>{
    codeEl.innerHTML = codeSnippets[sIdx];
    codeEl.style.opacity = 1;
    sIdx = (sIdx+1) % codeSnippets.length;
  }, 400);
}
typeCode();
setInterval(typeCode, 3400);

// ================= Scroll reveal =================
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, {threshold:0.15});
revealEls.forEach(el=> io.observe(el));

// ================= Stats counter =================
const statEls = document.querySelectorAll('.stat-num[data-target]');
const counterIO = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      const el = en.target;
      const target = parseInt(el.dataset.target);
      if(target === 0){ counterIO.unobserve(el); return; }
      let cur = 0;
      const step = Math.max(1, Math.ceil(target/40));
      const timer = setInterval(()=>{
        cur += step;
        if(cur >= target){ cur = target; clearInterval(timer); }
        el.textContent = cur + (target===100 ? '' : '+');
      }, 30);
      counterIO.unobserve(el);
    }
  });
}, {threshold:0.5});
statEls.forEach(el=> counterIO.observe(el));

// ================= Floating particles (canvas) =================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function initParticles(){
  particles = [];
  const count = Math.min(60, Math.floor(window.innerWidth / 24));
  for(let i=0; i<count; i++){
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.15
    });
  }
}
initParticles();
window.addEventListener('resize', initParticles);

function drawParticles(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  particles.forEach(p=>{
    p.x += p.vx; p.y += p.vy;
    if(p.x < 0) p.x = canvas.width;
    if(p.x > canvas.width) p.x = 0;
    if(p.y < 0) p.y = canvas.height;
    if(p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(245,166,35,${p.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();
