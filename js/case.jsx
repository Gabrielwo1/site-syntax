/* global React, ReactDOM */
const { useEffect:useCEffect } = React;

function CaseMeta({ p }){
  const items=[["Atuação",p.role],["Duração",p.duration],["Time",p.team],["Ano",p.year]];
  return (
    <div className="case-meta reveal">
      {items.map(([k,v],i)=><div key={i}><div className="k">{k}</div><div className="v">{v}</div></div>)}
    </div>
  );
}

function Shot({ label, ratio }){
  return <div className="ph reveal" style={ratio?{aspectRatio:ratio}:null}><span className="ph-label">[ {label} ]</span></div>;
}

function CaseStudy({ p, others }){
  return (
    <div style={{['--card-accent']:p.accent}}>
      <nav className="case-nav">
        <a className="case-back" href="index.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
          Voltar
        </a>
        <a href="index.html"><img src="assets/syntax-logo.png" alt="SYNTAX"/></a>
        <span className="spacer"/>
        <a className="btn btn-primary" href="index.html#contato" style={{padding:'10px 18px',fontSize:14}}>Iniciar projeto</a>
      </nav>

      <main className="case">
        <div className="wrap">
          {/* hero */}
          <div className="case-hero">
            <span className="eyebrow">Case · {p.year}</span>
            <div className="case-tags" style={{marginTop:18}}>{p.tags.map((t,i)=><span className="case-tag" key={i}>{t}</span>)}</div>
            <h1 className="case-title">{p.title}</h1>
            <p className="case-titlesub">{p.subtitle}</p>
            <CaseMeta p={p}/>
          </div>

          {/* cover */}
          <Shot label={`capa do projeto — ${p.mock} hero shot`} ratio="16/8.2"/>

          {/* one-line intro */}
          <p className="case-lead reveal">{p.summary}</p>

          {/* image areas only */}
          <div className="case-shots">
            <Shot label={p.gallery[0]} ratio="16/8.5"/>
            <div className="shots-2">
              <Shot label={p.gallery[1]} ratio="4/3.4"/>
              <Shot label={p.gallery[2]} ratio="4/3.4"/>
            </div>
            <Shot label="detalhes de interface & componentes" ratio="16/7"/>
            <div className="shots-2">
              <Shot label="antes / depois" ratio="4/3.4"/>
              <Shot label="sistema de design" ratio="4/3.4"/>
            </div>
          </div>
        </div>

        {/* últimos projetos */}
        <section className="case-more">
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="col">
                <span className="eyebrow">Mais trabalho</span>
                <h2 className="section-title">Últimos projetos.</h2>
              </div>
              <a className="sec-index" href="index.html#projetos" style={{color:'var(--green)'}}>Ver todos →</a>
            </div>
            <div className="proj-grid">
              {others.map(({proj,idx})=><window.ProjectCard p={proj} i={idx} key={proj.slug}/>)}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function CasePage(){
  const params=new URLSearchParams(location.search);
  const slug=params.get('p');
  const list=window.PROJECTS||[];
  const idx=Math.max(0, list.findIndex(x=>x.slug===slug));
  const p=list[idx]||list[0];
  const others=list.map((proj,i)=>({proj,idx:i})).filter(o=>o.proj.slug!==p.slug).slice(0,3);

  useCEffect(()=>{
    document.title=`${p.title} — SYNTAX`;
    window.scrollTo(0,0);
    const io=new IntersectionObserver((es)=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }),{threshold:.1, rootMargin:'0px 0px -6% 0px'});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  },[]);

  return (
    <>
      <div className="page-bg"/>
      <CaseStudy p={p} others={others}/>
      {window.SiteFooter && <SiteFooter/>}
      <div className="grain"/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<CasePage/>);
