/* global React */
const { useState:useTState, useEffect:useTEffect } = React;

/* ── Logos oficiais (em peças, para a animação de "explodir") ── */
function FigmaLogo({ className }){
  return (
    <svg className={className} viewBox="0 0 38 57" aria-hidden="true">
      <path className="pc pc-1" fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
      <path className="pc pc-2" fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
      <path className="pc pc-3" fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
      <path className="pc pc-4" fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
      <path className="pc pc-5" fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
    </svg>
  );
}

function FramerLogo({ className }){
  return (
    <svg className={className} viewBox="0 0 16 24" aria-hidden="true" fill="currentColor">
      <path className="pc pc-1" d="M0 0h16v8H8z"/>
      <path className="pc pc-2" d="M0 8h8l8 8H0z"/>
      <path className="pc pc-3" d="M0 16h8v8z"/>
    </svg>
  );
}

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
);

/* ── Seção: especialistas em Figma + Framer ───────────────── */
function Toolkit(){
  const bps = [
    { id:'desktop', label:'Desktop', w:'100%' },
    { id:'tablet',  label:'Tablet',  w:'64%'  },
    { id:'phone',   label:'Phone',   w:'36%'  },
  ];
  const [bp, setBp] = useTState(0);
  const [auto, setAuto] = useTState(true);

  // alterna os breakpoints sozinho até o usuário clicar em um
  useTEffect(()=>{
    if(!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(()=>setBp(i=>(i+1)%bps.length), 2600);
    return ()=>clearInterval(t);
  },[auto]);

  const figmaSkills  = ['Design systems com Variables','Auto layout e componentes','Protótipos de alta fidelidade','Handoff no Dev Mode'];
  const framerSkills = ['Sites responsivos de verdade','Animações e interações','CMS, SEO e localização','Publicação e domínio próprio'];
  // [recurso, ferramenta] — intercalados para a faixa alternar os logos
  const caps = [
    ['Components','fig'],['Breakpoints','fr'],['Variables','fig'],['Scroll Effects','fr'],
    ['Auto Layout','fig'],['Framer CMS','fr'],['Prototyping','fig'],['Code Components','fr'],
    ['Dev Mode','fig'],['Localization','fr'],['Smart Animate','fig'],['SEO','fr'],
  ];
  const row = [...caps, ...caps];

  return (
    <section className="toolkit" id="ferramentas">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="col">
            <span className="eyebrow">Stack de design</span>
            <h2 className="section-title tk-title">
              Especialistas em <span className="tk-word"><FigmaLogo className="tk-inline"/>Figma</span> e <span className="tk-word"><FramerLogo className="tk-inline tk-inline-fr"/>Framer</span>.
            </h2>
            <p>Desenhamos no Figma, publicamos no Framer. O mesmo time do primeiro frame ao site no ar — sem handoff perdido, sem pixel fora do lugar.</p>
          </div>
        </div>

        <div className="tk-stage">
          {/* ── Figma ── */}
          <article className="tk-card tk-figma reveal">
            <header className="tk-head">
              <div className="tk-tile"><FigmaLogo className="tk-logo"/></div>
              <div>
                <h3>Figma</h3>
                <p>Produto, UX e design systems</p>
              </div>
              <span className="tk-badge">Expert</span>
            </header>

            <div className="tk-canvas">
              <aside className="tk-layers" aria-hidden="true">
                <span className="tk-layers-h">Layers</span>
                <span className="on"><i className="ic-frame"/>App / Home</span>
                <span><i className="ic-comp"/>Button / Primary</span>
                <span><i className="ic-comp"/>Card / Project</span>
                <span><i className="ic-var"/>color / brand</span>
                <span><i className="ic-text"/>Display / H1</span>
              </aside>

              <div className="tk-board" aria-hidden="true">
                <div className="tk-sel">
                  <FigmaLogo className="tk-hero-logo"/>
                  <i className="h tl"/><i className="h tr"/><i className="h bl"/><i className="h br"/>
                  <span className="tk-size">Logo · 38 × 57</span>
                </div>
                <span className="tk-chip c1">⌗ Auto layout</span>
                <span className="tk-chip c2">◆ Component</span>
                <span className="tk-chip c3">{'{ }'} Variables</span>
                <div className="tk-cursor cur-a"><svg viewBox="0 0 24 24"><path d="M5 3l6 17 2.4-6.9L20.5 11 5 3z"/></svg><b>Syntax</b></div>
                <div className="tk-cursor cur-b"><svg viewBox="0 0 24 24"><path d="M5 3l6 17 2.4-6.9L20.5 11 5 3z"/></svg><b>Você</b></div>
              </div>
            </div>

            <ul className="tk-skills">
              {figmaSkills.map(s=><li key={s}><Check/>{s}</li>)}
            </ul>
          </article>

          {/* ── ponte ── */}
          <div className="tk-bridge" aria-hidden="true">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none">
              <path className="tk-wire" d="M0 20 C 35 20, 65 20, 100 20"/>
            </svg>
            <span className="tk-pixel"/>
            <span className="tk-bridge-label">pixel<br/>perfect</span>
          </div>

          {/* ── Framer ── */}
          <article className="tk-card tk-framer reveal d1">
            <header className="tk-head">
              <div className="tk-tile tk-tile-fr"><FramerLogo className="tk-logo tk-logo-fr"/></div>
              <div>
                <h3>Framer</h3>
                <p>Sites rápidos, animados e no ar</p>
              </div>
              <span className="tk-badge">Expert</span>
            </header>

            <div className="tk-browser">
              <div className="tk-bar">
                <span className="tk-dots"><i/><i/><i/></span>
                <div className="tk-bps" role="tablist" aria-label="Breakpoints">
                  {bps.map((b,i)=>(
                    <button key={b.id} role="tab" aria-selected={bp===i}
                      className={bp===i?'on':''} onClick={()=>{ setAuto(false); setBp(i); }}>{b.label}</button>
                  ))}
                </div>
                <span className="tk-publish"><i/>Publicado</span>
              </div>
              <div className="tk-viewport">
                <div className={`tk-site bp-${bps[bp].id}`} style={{width:bps[bp].w}}>
                  <div className="tk-site-nav"><b/><span><i/><i/><i/></span></div>
                  <div className="tk-site-hero">
                    <i className="l1"/><i className="l2"/><i className="l3"/>
                    <em/>
                  </div>
                  <div className="tk-site-grid"><i/><i/><i/></div>
                </div>
                <span className="tk-url">syntax.framer.website</span>
              </div>
            </div>

            <ul className="tk-skills">
              {framerSkills.map(s=><li key={s}><Check/>{s}</li>)}
            </ul>
          </article>
        </div>

        <div className="tk-marquee reveal" aria-label="Recursos que dominamos">
          <div className="tk-track">
            {row.map(([c,tool],i)=>(
              <span key={i} className="tk-cap">
                {tool==='fr' ? <FramerLogo className="tk-cap-ic tk-inline-fr"/> : <FigmaLogo className="tk-cap-ic"/>}
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Toolkit = Toolkit;
