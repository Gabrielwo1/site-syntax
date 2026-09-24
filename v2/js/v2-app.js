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
    el.classList.toggle('grow', !!e.target.closest('a,button,[data-cursor]'));
  });
  (function raf(){
    rx += (tx-rx) * .18; ry += (ty-ry) * .18;
    el.style.left = rx + 'px'; el.style.top = ry + 'px';
    requestAnimationFrame(raf);
  })();
})();

/* ── Page transition wipe ──────────────────────────────── */
const wipe = document.getElementById('wipe');

function navigateTo(url){
  if(!wipe){ location.href=url; return; }
  wipe.className = 'enter';
  wipe.addEventListener('animationend', ()=>{ location.href=url; }, { once:true });
}

if(wipe){
  wipe.className = 'leave';
  wipe.addEventListener('animationend', ()=>{ wipe.className=''; }, { once:true });
}

/* ── Menu overlay ──────────────────────────────────────── */
const menuOverlay = document.getElementById('menu-overlay');
document.getElementById('menu-btn')?.addEventListener('click', ()=> menuOverlay.classList.add('open'));
document.getElementById('menu-close')?.addEventListener('click', ()=> menuOverlay.classList.remove('open'));
document.addEventListener('keydown', e=>{ if(e.key==='Escape') menuOverlay?.classList.remove('open'); });

/* ── Scroll reveal ─────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
}, { threshold:0.08, rootMargin:'0px 0px -6% 0px' });

document.querySelectorAll('.v2-reveal').forEach(el => revealObserver.observe(el));

/* ── Parallax ──────────────────────────────────────────── */
function refreshParallax(){
  const imgs = document.querySelectorAll('[data-parallax]');
  if(!imgs.length || window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  function update(){
    imgs.forEach(img=>{
      const wrap = img.closest('[data-parallax-wrap]');
      const rect = (wrap||img).getBoundingClientRect();
      const pct  = (window.innerHeight/2 - (rect.top + rect.height/2)) / (window.innerHeight + rect.height);
      img.style.transform = `translateY(${pct * 80 * parseFloat(img.dataset.parallax||'1')}px)`;
    });
  }
  window.removeEventListener('scroll', update);
  window.addEventListener('scroll', update, { passive:true });
  update();
}
refreshParallax();

/* ── Project list accordion ────────────────────────────── */
async function loadProjects(){
  if(typeof window.__v2db === 'undefined') return;
  const list = document.getElementById('proj-list');
  if(!list) return;

  const projects = await window.__v2db.fetchProjects();
  if(!projects.length){
    list.innerHTML = '<p style="padding:40px clamp(20px,5vw,80px);opacity:.4;font-size:14px;font-family:var(--mono)">Nenhum projeto encontrado.</p>';
    return;
  }

  const countEl = document.getElementById('proj-count');
  if(countEl) countEl.textContent = String(projects.length).padStart(2,'0');

  list.innerHTML = '';

  projects.forEach((p, i) => {
    const tags = (p.tags || []).slice(0,4);
    const slug = p.slug || p.id;
    // cover_url e gallery_urls já são URLs completas
    const coverUrl = p.cover_url || '';

    const item = document.createElement('div');
    item.className = 'v2-proj-item v2-reveal';
    item.style.transitionDelay = (i * 0.05) + 's';

    const cleanTitle = (p.title || '').replace(/^SITE\s*-\s*/i,'').replace(/^APP\s*-\s*/i,'');

    item.innerHTML = `
      <div class="v2-proj-header" data-cursor>
        <div class="v2-proj-name">${cleanTitle}</div>
        <div class="v2-proj-tags">
          ${tags.map(t=>`<span class="v2-proj-tag">${t.replace(/^#/,'')}</span>`).join('')}
        </div>
        <div class="v2-proj-meta">${p.year||''}</div>
      </div>
      <div class="v2-proj-body">
        <div>
          <p class="v2-proj-desc">${p.summary||p.subtitle||''}</p>
          ${p.role ? `<p class="v2-proj-desc" style="margin-top:8px;font-size:13px;opacity:.5">${p.role}${p.duration?' · '+p.duration:''}</p>` : ''}
          <a class="v2-proj-cta" href="case.html?s=${encodeURIComponent(slug)}" data-wipe>
            Ver case completo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
        ${coverUrl ? `<div class="v2-proj-image-wrap" data-parallax-wrap>
          <img src="${coverUrl}" alt="${cleanTitle}" loading="lazy" data-parallax="0.5"/>
        </div>` : ''}
      </div>
    `;

    item.querySelector('.v2-proj-header').addEventListener('click', ()=>{
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.v2-proj-item.open').forEach(el=>el.classList.remove('open'));
      if(!isOpen){ item.classList.add('open'); refreshParallax(); }
    });

    item.querySelectorAll('a[data-wipe]').forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault(); navigateTo(a.getAttribute('href'));
      });
    });

    list.appendChild(item);
    revealObserver.observe(item);
  });
}

loadProjects();

/* ── Horizontal drag scroll ────────────────────────────── */
document.querySelectorAll('.case-gallery-h').forEach(el=>{
  let down=false, sx=0, sl=0;
  el.addEventListener('mousedown',  e=>{ down=true; sx=e.pageX-el.offsetLeft; sl=el.scrollLeft; });
  el.addEventListener('mouseleave', ()=>down=false);
  el.addEventListener('mouseup',    ()=>down=false);
  el.addEventListener('mousemove',  e=>{ if(!down) return; e.preventDefault(); el.scrollLeft=sl-(e.pageX-el.offsetLeft-sx); });
});
