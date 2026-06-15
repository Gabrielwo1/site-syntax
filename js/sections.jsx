/* global React, Icons */

function Manifesto(){
  const principles=[
    {n:"01",t:"Clareza",d:"Tiramos o ruído. Cada tela responde a uma pergunta e cada interação tem um propósito claro.",
      ic:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>},
    {n:"02",t:"Sistema",d:"Desenhamos em componentes, não em telas. Design systems que escalam do protótipo ao produto.",
      ic:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>},
    {n:"03",t:"Impacto",d:"Bonito não basta. Medimos cada decisão pelo efeito no negócio e na vida de quem usa.",
      ic:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 17l5-5 4 4 8-8M21 8v5M21 8h-5"/></svg>},
  ];
  const stats=[["8+","anos de estúdio"],["60+","produtos no ar"],["12","países atendidos"],["4,9","NPS médio"]];
  return (
    <section className="manifesto" id="sobre">
      <div className="wrap">
        <span className="eyebrow" style={{marginBottom:24,display:'inline-flex'}}>A agência</span>
        <p className="mani-statement reveal">
          Somos um estúdio de <span className="hl">UX e product design</span> que transforma sistemas complexos em <span className="hl">experiências simples</span>. <span className="dim">Estratégia, design e código no mesmo time.</span>
        </p>
        <div className="principles">
          {principles.map((p,i)=>(
            <div className={`principle reveal d${i+1}`} key={p.n}>
              <div className="pico">{p.ic}</div>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
        <div className="stats reveal">
          {stats.map(([n,l],i)=>(
            <div className="stat" key={i}><div className="num">{n}</div><div className="lbl">{l}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Sobre o fundador ─────────────────────────────────────── */
function AboutFounder(){
  const highlights=[
    {ic:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, v:"7+", l:"anos de experiência"},
    {ic:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>, v:"60+", l:"projetos entregues"},
    {ic:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, v:"12", l:"países atendidos"},
  ];
  return (
    <section className="about-founder reveal" id="fundador">
      <div className="wrap">
        <div className="af-inner">
          {/* foto */}
          <div className="af-photo-wrap">
            <div className="af-photo">
              <img src="assets/gabriel.png" alt="Gabriel Oliveira — UX Designer Senior"/>
              <div className="af-photo-ring"/>
            </div>
          </div>

          {/* bio */}
          <div className="af-bio">
            <span className="eyebrow">Quem está por trás</span>
            <h2 className="af-name">Gabriel Oliveira</h2>
            <p className="af-role">UX Designer Senior · Fundador da SYNTAX</p>
            <p className="af-text">
              Com mais de <strong>7 anos desenhando produtos digitais</strong>, ajudei marcas de saúde, fintech, educação e e-commerce a transformar complexidade em experiências que as pessoas realmente usam. Meu trabalho une estratégia, pesquisa e execução visual — do discovery ao handoff.
            </p>
            <p className="af-text">
              Fundei a SYNTAX para reunir num só time tudo que um produto digital precisa: <strong>clareza de UX, sistema de design e entrega de código</strong>. Sem ruído, sem retrabalho.
            </p>
            <div className="af-highlights">
              {highlights.map((h,i)=>(
                <div className="af-hl" key={i}>
                  <div className="af-hl-ic">{h.ic}</div>
                  <div className="af-hl-v">{h.v}</div>
                  <div className="af-hl-l">{h.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Clientes marquee ─────────────────────────────────────── */
function Clients(){
  // logos: { name, src } — src aponta para assets/clients/
  const logos=[
    { name:"Releva",           src:"assets/clients/releva.png" },
    { name:"Flakes",           src:"assets/clients/flakes.png" },
    { name:"Dica de Mestre",   src:"assets/clients/dica-de-mestre.png" },
    { name:"Hospedagem Brasil",src:"assets/clients/hospedagem-brasil.png" },
    { name:"Carrefour",        src:"assets/clients/carrefour.png" },
    { name:"Roger",            src:null },
    { name:"Human Academy",    src:null },
    { name:"Zouti",            src:null },
    { name:"Fundsy",           src:null },
    { name:"Atlas Health",     src:null },
  ];
  const row=[...logos,...logos];

  return (
    <section className="clients" id="clientes">
      <p className="lead">Marcas que confiam na SYNTAX</p>
      <div className="marquee">
        <div className="marquee-track">
          {row.map((c,i)=>(
            <span className="client-logo" key={i}>
              {c.src
                ? <img src={c.src} alt={c.name} className="client-img"/>
                : <><span className="cmark"/>{c.name}</>
              }
            </span>
          ))}
        </div>
        <div className="marquee-track" aria-hidden="true">
          {row.map((c,i)=>(
            <span className="client-logo" key={i}>
              {c.src
                ? <img src={c.src} alt={c.name} className="client-img"/>
                : <><span className="cmark"/>{c.name}</>
              }
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact(){
  return (
    <section className="contact" id="contato">
      <div className="wrap">
        <div className="cta-card reveal">
          <span className="eyebrow">Próximo projeto</span>
          <h2>Vamos construir algo que move sua marca.</h2>
          <p>Conte o desafio. Em até 48h respondemos com um diagnóstico inicial e os próximos passos — sem compromisso.</p>
          <div className="cta-actions">
            <a className="btn btn-primary" href="mailto:ola@syntax.studio">Iniciar conversa <Icons.arrow/></a>
            <a className="btn btn-ghost" href="#projetos">Ver projetos</a>
          </div>
          <div className="cta-meta">
            <div>E-mail<b>ola@syntax.studio</b></div>
            <div>Resposta<b>em até 48h</b></div>
            <div>Onde<b>Remoto · Brasil</b></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter(){
  const cols=[
    ["Estúdio",[["Sobre","#sobre"],["Projetos","#projetos"],["Clientes","#clientes"],["Contato","#contato"]]],
    ["Serviços",[["UX Research",""],["Product Design",""],["Design System",""],["Web & CMS",""]]],
    ["Social",[["Instagram",""],["Dribbble",""],["LinkedIn",""],["Behance",""]]],
  ];
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <img src="assets/syntax-logo.png" alt="SYNTAX"/>
            <p>Agência de UX e product design. Desenhamos produtos digitais que movem marcas adiante.</p>
          </div>
          <div className="foot-cols">
            {cols.map(([h,links])=>(
              <div className="foot-col" key={h}>
                <h4>{h}</h4>
                {links.map(([l,href],i)=><a href={href||"#"} key={i}>{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 SYNTAX Studio. Todos os direitos reservados.</span>
          <span className="made">Desenhado no Figma · Construído com <b>código</b></span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window,{ Manifesto, AboutFounder, Clients, Contact, SiteFooter });
