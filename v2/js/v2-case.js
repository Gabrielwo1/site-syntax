/* ============================================================
   SYNTAX v2 — case page JS
   ============================================================ */

async function loadCase(){
  const params = new URLSearchParams(location.search);
  const slug   = params.get('s');
  if(!slug || typeof window.__v2db === 'undefined') return;

  const p = await window.__v2db.fetchProject(slug);
  if(!p){
    document.getElementById('case-content').innerHTML =
      '<p style="padding:120px 80px;opacity:.4">Projeto não encontrado.</p>';
    return;
  }

  document.title = `${p.title || p.client} — SYNTAX`;

  // hero
  document.getElementById('case-client').textContent  = p.client || '';
  document.getElementById('case-category').textContent = (p.tags||[]).join(' · ') || '';
  document.getElementById('case-year').textContent    = p.year || '';
  document.getElementById('case-title').textContent   = p.title || p.client || '';
  document.getElementById('case-sub').textContent     = p.short_desc || p.description || '';

  // cover
  if(p.cover_image){
    const ci = document.getElementById('case-cover-img');
    if(ci) ci.src = window.__v2db.imgUrl(p.cover_image);
  }

  // specs
  const specs = [
    ['Cliente',   p.client   || '—'],
    ['Ano',       p.year     || '—'],
    ['Categoria', (p.tags||[]).join(', ') || '—'],
    ['Plataforma', p.platform || '—'],
  ];
  const specWrap = document.getElementById('case-specs');
  if(specWrap){
    specWrap.innerHTML = specs.map(([k,v]) =>
      `<div class="case-spec"><dt>${k}</dt><dd>${v}</dd></div>`
    ).join('');
  }

  // intro text
  const introEl = document.getElementById('case-intro-text');
  if(introEl) introEl.textContent = p.description || '';

  // gallery images
  const gallery = p.gallery_images || [];
  const galleryH = document.getElementById('case-gallery-h');
  if(galleryH && gallery.length){
    galleryH.innerHTML = gallery.map(img =>
      `<div class="case-gallery-h-item">
        <img src="${window.__v2db.imgUrl(img)}" alt="" loading="lazy"/>
      </div>`
    ).join('');

    // drag scroll
    let down=false, sx=0, sl=0;
    galleryH.addEventListener('mousedown',  e => { down=true; sx=e.pageX-galleryH.offsetLeft; sl=galleryH.scrollLeft; });
    galleryH.addEventListener('mouseleave', () => down=false);
    galleryH.addEventListener('mouseup',    () => down=false);
    galleryH.addEventListener('mousemove',  e => {
      if(!down) return; e.preventDefault();
      galleryH.scrollLeft = sl - (e.pageX - galleryH.offsetLeft - sx);
    });
  } else if(galleryH){
    galleryH.style.display = 'none';
  }

  // shots (remaining gallery as vertical shots)
  const shotsWrap = document.getElementById('case-shots');
  if(shotsWrap && gallery.length > 3){
    shotsWrap.innerHTML = gallery.slice(3).map(img =>
      `<div class="case-shot" data-parallax-wrap>
        <img src="${window.__v2db.imgUrl(img)}" alt="" loading="lazy" data-parallax="0.4"/>
      </div>`
    ).join('');
  }

  // reveal
  document.querySelectorAll('.v2-reveal').forEach(el => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold:0.08 });
    io.observe(el);
  });

  // parallax
  const imgs = document.querySelectorAll('[data-parallax]');
  if(imgs.length && !window.matchMedia('(prefers-reduced-motion:reduce)').matches){
    function update(){
      imgs.forEach(img => {
        const wrap = img.closest('[data-parallax-wrap]');
        const rect = (wrap||img).getBoundingClientRect();
        const vy   = window.innerHeight;
        const pct  = (vy/2 - (rect.top + rect.height/2)) / (vy + rect.height);
        img.style.transform = `translateY(${pct * 80 * parseFloat(img.dataset.parallax||'1')}px)`;
      });
    }
    window.addEventListener('scroll', update, { passive:true });
    update();
  }
}

loadCase();
