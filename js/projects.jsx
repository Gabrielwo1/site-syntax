/* global React */
const { useState:usePState } = React;

function Mock({ type }){
  switch(type){
    case "dashboard": return (
      <div className="mk">
        <div className="mk-side">
          <div className="mk-row" style={{alignItems:'center',gap:7}}><span className="mk-dot"/><span className="mk-pill acc" style={{width:46}}/></div>
          {[60,80,52,72,44].map((w,i)=><span className="mk-pill" key={i} style={{width:w+'%'}}/>)}
        </div>
        <div className="mk-main">
          <div className="mk-row">
            {[0,1,2].map(i=><div className="mk-card" key={i} style={{flex:1,height:40,padding:8,display:'flex',flexDirection:'column',gap:5}}><span className="mk-pill" style={{width:'40%',height:5}}/><span className="mk-pill acc" style={{width:'70%',height:8}}/></div>)}
          </div>
          <div className="mk-card" style={{flex:1}}><div className="mk-bars">{[.5,.8,.6,.95,.7,.85,.55,.9].map((h,i)=><i key={i} style={{height:(h*100)+'%',animationDelay:(i*.12)+'s'}}/>)}</div></div>
        </div>
      </div>
    );
    case "web": return (
      <div className="mk" style={{flexDirection:'column'}}>
        <div className="mk-card" style={{flex:1.3,padding:14,display:'flex',flexDirection:'column',justifyContent:'center',gap:8,background:'radial-gradient(120% 120% at 80% 0%, color-mix(in oklch,var(--card-accent) 22%,transparent), transparent 60%)'}}>
          <span className="mk-pill acc" style={{width:60,height:7}}/>
          <span className="mk-pill" style={{width:'72%',height:13,background:'rgba(255,255,255,.85)'}}/>
          <span className="mk-pill" style={{width:'55%',height:13,background:'rgba(255,255,255,.85)'}}/>
          <span className="mk-pill" style={{width:90,height:18,borderRadius:9,marginTop:4}}/>
        </div>
        <div className="mk-row" style={{flex:1}}>
          {[0,1,2].map(i=><div className="mk-card" key={i} style={{flex:1,padding:8,display:'flex',flexDirection:'column',gap:5}}><span className="mk-pill" style={{width:'100%',height:18,borderRadius:5}}/><span className="mk-pill" style={{width:'80%',height:5}}/><span className="mk-pill" style={{width:'50%',height:5}}/></div>)}
        </div>
      </div>
    );
    case "checkout": return (
      <div className="mk">
        <div className="mk-main" style={{flex:1.4,justifyContent:'space-between'}}>
          {['E-mail','Cartão de crédito','Endereço'].map((_,i)=><div className="mk-card" key={i} style={{padding:8,display:'flex',flexDirection:'column',gap:6}}><span className="mk-pill" style={{width:'30%',height:5}}/><span className="mk-pill" style={{width:'100%',height:13,borderRadius:5,background:'var(--bg-3)'}}/></div>)}
          <div className="mk-row">{[0,1,2].map(i=><span className="mk-pill" key={i} style={{flex:1,height:22,borderRadius:6,background:i===0?'color-mix(in oklch,var(--card-accent) 35%,var(--bg-3))':'var(--bg-3)'}}/>)}</div>
        </div>
        <div className="mk-card" style={{width:'40%',padding:10,display:'flex',flexDirection:'column',gap:8,background:'color-mix(in oklch,var(--card-accent) 12%, var(--bg-2))'}}>
          <span className="mk-pill" style={{width:'55%',height:6}}/>
          {[0,1,2].map(i=><div className="mk-row" key={i} style={{justifyContent:'space-between'}}><span className="mk-pill" style={{width:'45%',height:5}}/><span className="mk-pill" style={{width:'25%',height:5}}/></div>)}
          <div style={{height:1,background:'var(--line-soft)',margin:'2px 0'}}/>
          <div className="mk-row" style={{justifyContent:'space-between'}}><span className="mk-pill" style={{width:'30%',height:7}}/><span className="mk-pill acc" style={{width:'35%',height:9}}/></div>
          <span className="mk-pill acc" style={{width:'100%',height:24,borderRadius:7,marginTop:4}}/>
        </div>
      </div>
    );
    case "app": return (
      <div className="mk" style={{justifyContent:'center'}}>
        <div className="mk-phone">
          <div className="mk-row" style={{justifyContent:'space-between',alignItems:'center'}}><span className="mk-pill" style={{width:40,height:6}}/><span className="mk-dot" style={{borderRadius:'50%'}}/></div>
          <div className="mk-card" style={{padding:10,display:'flex',gap:10,alignItems:'center',background:'color-mix(in oklch,var(--card-accent) 14%,var(--bg-2))'}}>
            <div className="mk-donut"/>
            <div style={{display:'flex',flexDirection:'column',gap:5,flex:1}}><span className="mk-pill" style={{width:'60%',height:5}}/><span className="mk-pill acc" style={{width:'85%',height:11}}/><span className="mk-pill" style={{width:'40%',height:5}}/></div>
          </div>
          {[0,1,2].map(i=><div className="mk-row" key={i} style={{alignItems:'center',gap:8}}><span className="mk-dot" style={{width:20,height:20,opacity:.5}}/><div style={{flex:1,display:'flex',flexDirection:'column',gap:4}}><span className="mk-pill" style={{width:'70%',height:5}}/><span className="mk-pill" style={{width:'40%',height:4}}/></div><span className="mk-pill" style={{width:30,height:7}}/></div>)}
        </div>
      </div>
    );
    case "health": return (
      <div className="mk">
        <div className="mk-side" style={{width:'30%'}}>
          {[0,1,2,3].map(i=><div className="mk-row" key={i} style={{alignItems:'center',gap:7}}><span className="mk-dot" style={{width:16,height:16,borderRadius:'50%',opacity:i===0?1:.4}}/><span className="mk-pill" style={{flex:1,height:6}}/></div>)}
        </div>
        <div className="mk-main">
          <div className="mk-card" style={{flex:1.4,background:'radial-gradient(100% 100% at 50% 30%, color-mix(in oklch,var(--card-accent) 28%,transparent), var(--bg-2))',display:'grid',placeItems:'center'}}>
            <div style={{width:30,height:30,borderRadius:'50%',background:'rgba(255,255,255,.9)',display:'grid',placeItems:'center'}}><span style={{borderLeft:'8px solid var(--card-accent)',borderTop:'5px solid transparent',borderBottom:'5px solid transparent',marginLeft:2}}/></div>
          </div>
          <div className="mk-row"><div className="mk-card" style={{flex:1,height:24}}/><div className="mk-card" style={{flex:1,height:24,background:'color-mix(in oklch,var(--card-accent) 18%,var(--bg-2))'}}/></div>
        </div>
      </div>
    );
    case "portfolio": return (
      <div className="mk" style={{flexDirection:'column',justifyContent:'center'}}>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          <span className="mk-pill" style={{width:'85%',height:20,borderRadius:5,background:'rgba(255,255,255,.9)'}}/>
          <span className="mk-pill acc" style={{width:'55%',height:20,borderRadius:5}}/>
        </div>
        <div className="mk-row" style={{marginTop:12}}>
          {[0,1,2].map(i=><div className="mk-card" key={i} style={{flex:1,aspectRatio:'1',background:i===1?'color-mix(in oklch,var(--card-accent) 22%,var(--bg-2))':'var(--bg-2)'}}/>)}
        </div>
      </div>
    );
    default: return null;
  }
}

function ProjectCard({ p, i }){
  return (
    <a className={`proj-card reveal d${(i%3)+1}`} href={`case.html?p=${p.slug}`} style={{['--card-accent']:p.accent}}>
      <div className="proj-preview">
        <div className="browser-bar"><i/><i/><i/><span className="url">syntax.studio/{p.slug}</span></div>
        <div className="mock-wrap"><Mock type={p.mock}/></div>
      </div>
      <div className="proj-meta">
        <div className="top">
          <span className="proj-num">0{i+1}</span>
          <span className="proj-year">{p.year}</span>
        </div>
        <div className="proj-title">{p.title}
          <span className="proj-arrow" style={{marginLeft:'auto'}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></span>
        </div>
        <div className="proj-sub">{p.subtitle}</div>
        <div className="proj-tags">{p.tags.map((t,j)=><span className="proj-tag" key={j}>{t}</span>)}</div>
      </div>
    </a>
  );
}

function Projects(){
  const list = window.PROJECTS || [];
  return (
    <section className="projects" id="projetos">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="col">
            <span className="eyebrow">Trabalhos selecionados</span>
            <h2 className="section-title">Projetos que viraram produto.</h2>
            <p>Da estratégia ao handoff. Cada projeto começa numa pergunta de negócio e termina numa experiência que as pessoas usam de verdade.</p>
          </div>
          <span className="sec-index"><b>{list.length}</b> / {list.length} cases</span>
        </div>
        <div className="proj-grid">
          {list.map((p,i)=><ProjectCard p={p} i={i} key={p.slug}/>)}
        </div>
      </div>
    </section>
  );
}

Object.assign(window,{ Projects, Mock, ProjectCard });
