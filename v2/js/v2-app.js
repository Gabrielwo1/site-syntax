/* ============================================================
   SYNTAX v2 — main JS
   ============================================================ */

/* ── Custom cursor ─────────────────────────────────────── */
(function(){
  const el = document.getElementById('cursor');
  if(!el || window.matchMedia('(pointer:coarse)').matches) return;
  let rx=0, ry=0, tx=0, ty=0;
  document.addEventListener('mousemove', e => { tx=e.clientX; ty=e.clientY; });
  document.addEventListener('mouseleave', () => el.classList.add('hidden'));
  document.addEventListener('mouseenter', () => el.classList.remove('hidden'));

  document.addEventListener('mouseover', e => {
    const t = e.target.closest('a,button,[data-cursor]');
    el.classList.toggle('grow', !!t);
  });

  (function raf(){
    rx += (tx-rx) * .18;
    ry += (ty-ry) * .18;
    el.style.left = rx + 'px';
    el.style.top  = ry + 'px';
    requestAnimationFrame(raf);
  })();
})();

/* ── Page transition wipe ──────────────────────────────── */
const wipe = document.getElementById('wipe');

function navigateTo(url){
  if(!wipe) { location.href = url; return; }
  wipe.className = 'enter';
  wipe.addEventListener('animationend', () => { location.href = url; }, { once:true });
}

document.querySelectorAll('a[data-wipe]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if(!href || href.startsWith('#') || href.startsWith('http')) return;
    e.preventDefault();
    navigateTo(href);
  });
});

/* wipe out on page load */
if(wipe){
  wipe.className = 'leave';
  wipe.addEventListener('animationend', () => { wipe.className = ''; }, { once:true });
}

/* ── Menu overlay ──────────────────────────────────────── */
const menuOverlay = document.getElementById('menu-overlay');
const menuBtn     = document.getElementById('menu-btn');
const menuClose   = document.getElementById('menu-close');

if(menuBtn) menuBtn.addEventListener('click', () => menuOverlay.classList.add('open'));
if(menuClose) menuClose.addEventListener('click', () => menuOverlay.classList.remove('open'));
document.addEventListener('keydown', e => { if(e.key==='Escape') menuOverlay?.classList.remove('open'); });

/* ── Scroll reveal ─────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('.v2-reveal').forEach(el => revealObserver.observe(el));

/* ── Parallax images on scroll ─────────────────────────── */
function initParallax(){
  const imgs = document.querySelectorAll('[data-parallax]');
  if(!imgs.length) return;
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  function update(){
    imgs.forEach(img => {
      const rect = img.closest('[data-parallax-wrap]')?.getBoundingClientRect() || img.getBoundingClientRect();
      const vy   = window.innerHeight;
      const pct  = (vy/2 - (rect.top + rect.height/2)) / (vy + rect.height);
      const shift = pct * 80 * parseFloat(img.dataset.parallax || '1');
      img.style.transform = `translateY(${shift}px)`;
    });
  }
  window.addEventListener('scroll', update, { passive:true });
  update();
}
initParallax();

/* ── Project list accordion ────────────────────────────── */
async function loadProjects(){
  if(typeof window.__v2db === 'undefined') return;
  const list = document.getElementById('proj-list');
  if(!list) return;

  const projects = await window.__v2db.fetchProjects();
  if(!projects.length){
    list.innerHTML = '<p style="padding:40px 80px;opacity:.4;font-size:14px">Nenhum projeto encontrado.</p>';
    return;
  }

  list.innerHTML = '';

  const countEl = document.getElementById('proj-count');
  if(countEl) countEl.textContent = String(projects.length).padStart(2,'0');

  projects.forEach((p, i) => {
    const tags = (p.tags || []).slice(0,3);
    const coverUrl = p.cover_image ? window.__v2db.imgUrl(p.cover_image) : '';
    const slug = p.slug || p.id;

    const item = document.createElement('div');
    item.className = 'v2-proj-item v2-reveal';
    item.style.transitionDelay = (i * 0.06) + 's';
    item.innerHTML = `
      <div class="v2-proj-header" data-cursor>
        <div class="v2-proj-name">${p.title || p.client || 'Projeto'}</div>
        <div class="v2-proj-tags">
          ${tags.map(t => `<span class="v2-proj-tag">${t}</span>`).join('')}
        </div>
        <div class="v2-proj-meta">${p.year || ''}</div>
      </div>
      <div class="v2-proj-body">
        <p class="v2-proj-desc">${p.description || p.short_desc || ''}</p>
        <div>
          ${coverUrl ? `<div class="v2-proj-image-wrap" data-parallax-wrap>
            <img src="${coverUrl}" alt="${p.title||''}" loading="lazy" data-parallax="0.5"/>
          </div>` : ''}
          <a class="v2-proj-cta" href="case.html?s=${encodeURIComponent(slug)}" data-wipe>
            Ver case completo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </div>
    `;

    const header = item.querySelector('.v2-proj-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.v2-proj-item.open').forEach(el => el.classList.remove('open'));
      if(!isOpen) item.classList.add('open');
      initParallax();
    });

    // wire transition links
    item.querySelectorAll('a[data-wipe]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        navigateTo(a.getAttribute('href'));
      });
    });

    list.appendChild(item);
    revealObserver.observe(item);
  });
}

loadProjects();

/* ── Horizontal drag scroll ────────────────────────────── */
document.querySelectorAll('.case-gallery-h').forEach(el => {
  let down=false, sx=0, sl=0;
  el.addEventListener('mousedown',  e => { down=true; sx=e.pageX-el.offsetLeft; sl=el.scrollLeft; });
  el.addEventListener('mouseleave', () => down=false);
  el.addEventListener('mouseup',    () => down=false);
  el.addEventListener('mousemove',  e => {
    if(!down) return;
    e.preventDefault();
    el.scrollLeft = sl - (e.pageX - el.offsetLeft - sx);
  });
});
