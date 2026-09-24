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

  const cleanTitle = (p.title||'').replace(/^SITE\s*-\s*/i,'').replace(/^APP\s*-\s*/i,'');
  document.title = `${cleanTitle} — SYNTAX`;

  document.getElementById('case-client').textContent   = cleanTitle;
  document.getElementById('case-category').textContent = (p.tags||[]).map(t=>t.replace(/^#/,'')).join(' · ');
  document.getElementById('case-year').textContent     = p.year || '';
  document.getElementById('case-title').textContent    = cleanTitle;
  document.getElementById('case-sub').textContent      = p.subtitle || p.summary || '';

  // cover — já é URL completa
  if(p.cover_url){
    const ci = document.getElementById('case-cover-img');
    if(ci){ ci.src = p.cover_url; ci.alt = cleanTitle; }
  }

  // specs
  const specs = [
    ['Cliente',   p.subtitle || cleanTitle],
    ['Ano',       p.year     || '—'],
    ['Serviço',   p.role     || '—'],
    ['Duração',   p.duration || '—'],
  ];
  const specWrap = document.getElementById('case-specs');
  if(specWrap)
    specWrap.innerHTML = specs.map(([k,v])=>`<div class="case-spec"><dt>${k}</dt><dd>${v}</dd></div>`).join('');

  // intro
  const introEl = document.getElementById('case-intro-text');
  if(introEl) introEl.textContent = p.summary || p.subtitle || '';

  // gallery_urls — já URLs completas
  const gallery = p.gallery_urls || [];
  const galleryH = document.getElementById('case-gallery-h');

  if(galleryH && gallery.length){
    galleryH.innerHTML = gallery.map(url=>
      `<div class="case-gallery-h-item">
        <img src="${url}" alt="" loading="lazy"/>
      </div>`
    ).join('');

    let down=false, sx=0, sl=0;
    galleryH.addEventListener('mousedown',  e=>{ down=true; sx=e.pageX-galleryH.offsetLeft; sl=galleryH.scrollLeft; });
    galleryH.addEventListener('mouseleave', ()=>down=false);
    galleryH.addEventListener('mouseup',    ()=>down=false);
    galleryH.addEventListener('mousemove',  e=>{ if(!down) return; e.preventDefault(); galleryH.scrollLeft=sl-(e.pageX-galleryH.offsetLeft-sx); });
  } else if(galleryH){
    galleryH.style.display='none';
  }

  // vertical shots (a partir do 4º)
  const shotsWrap = document.getElementById('case-shots');
  if(shotsWrap && gallery.length > 3){
    shotsWrap.innerHTML = gallery.slice(3).map(url=>
      `<div class="case-shot" data-parallax-wrap>
        <img src="${url}" alt="" loading="lazy" data-parallax="0.4"/>
      </div>`
    ).join('');
  }

  // reveal
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:0.08 });
  document.querySelectorAll('.v2-reveal').forEach(el=>io.observe(el));

  // parallax
  const pImgs = document.querySelectorAll('[data-parallax]');
  if(pImgs.length && !window.matchMedia('(prefers-reduced-motion:reduce)').matches){
    function update(){
      pImgs.forEach(img=>{
        const wrap = img.closest('[data-parallax-wrap]');
        const rect = (wrap||img).getBoundingClientRect();
        const pct  = (window.innerHeight/2-(rect.top+rect.height/2))/(window.innerHeight+rect.height);
        img.style.transform = `translateY(${pct*80*parseFloat(img.dataset.parallax||'1')}px)`;
      });
    }
    window.addEventListener('scroll', update, { passive:true });
    update();
  }
}

loadCase();
