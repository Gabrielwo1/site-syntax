/* global React */
const { useState, useEffect, useRef } = React;

/* ---------- tiny icon set ---------- */
const I = {
  move:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M5 3l6 18 2.5-7.5L21 11 5 3z"/></svg>,
  frame:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M8 3v18M16 3v18M3 8h18M3 16h18"/></svg>,
  pen:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
  text:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>,
  comp:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M12 2l3 3-3 3-3-3 3-3zM5 9l3 3-3 3-3-3 3-3zM19 9l3 3-3 3-3-3 3-3zM12 16l3 3-3 3-3-3 3-3z"/></svg>,
  layers:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/></svg>,
  eye:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="2.5"/></svg>,
  code:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>,
  swatch:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22a10 10 0 0 1 0-20"/></svg>,
  ruler:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M16 2l6 6L8 22l-6-6L16 2zM7 9l2 2M10 6l2 2M13 12l2 2M16 9l2 2"/></svg>,
  share:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>,
  arrow:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  play:(p)=><svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M8 5v14l11-7z"/></svg>,
};

/* ---------- multiplayer cursor ---------- */
function Cursor({ color }){
  return (
    <svg viewBox="0 0 24 24" fill={color} stroke="#fff" strokeWidth="1" style={{filter:`drop-shadow(0 0 6px ${color}66)`}}>
      <path d="M5 3l6 17 2.4-6.9L20.5 11 5 3z"/>
    </svg>
  );
}

const CURSORS = [
  { name:'Marina',  color:'oklch(0.70 0.165 292)', path:[[18,30],[34,22],[30,52],[12,46]], dur:13 },
  { name:'Théo',    color:'oklch(0.74 0.155 52)',  path:[[78,24],[62,40],[82,58],[88,34]], dur:15 },
  { name:'Yuki',    color:'oklch(0.72 0.150 244)', path:[[44,66],[58,72],[40,80],[28,70]], dur:12 },
  { name:'Bea',     color:'oklch(0.73 0.170 352)', path:[[70,70],[84,62],[76,82],[60,78]], dur:16 },
];

function MultiCursors(){
  const refs = useRef([]);
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf, t0=performance.now();
    const ease=(x)=> x<.5 ? 2*x*x : 1-Math.pow(-2*x+2,2)/2;
    const loop=(now)=>{
      const el=now-t0;
      CURSORS.forEach((c,i)=>{
        const node=refs.current[i]; if(!node) return;
        const seg=c.path.length, total=c.dur*1000;
        const p=((el/total)%1)*seg;
        const a=Math.floor(p), f=ease(p-a);
        const A=c.path[a], B=c.path[(a+1)%seg];
        const x=A[0]+(B[0]-A[0])*f, y=A[1]+(B[1]-A[1])*f;
        node.style.transform=`translate(${x}vw, ${y}vh)`;
      });
      raf=requestAnimationFrame(loop);
    };
    raf=requestAnimationFrame(loop);
    return ()=>cancelAnimationFrame(raf);
  },[]);
  return CURSORS.map((c,i)=>(
    <div className="mp-cursor" key={i} ref={el=>refs.current[i]=el} style={{transform:`translate(${c.path[0][0]}vw,${c.path[0][1]}vh)`}}>
      <Cursor color={c.color}/>
      <span className="mp-tag" style={{background:c.color}}>{c.name}</span>
    </div>
  ));
}

/* ---------- typing code panel ---------- */
const CODE = [
  [['c','// ux flow → component']],
  [['k','export'],['',' const '],['n','Onboarding'],['',' = () => {']],
  [['','  return '],['k','<'],['n','Stack'],['',' gap='],['s','"16"'],['k','>']],
  [['','    '],['k','<'],['n','Field'],['',' label='],['s','"E-mail"'],['k','/>']],
  [['','    '],['k','<'],['n','Button'],['',' variant='],['s','"primary"'],['k','/>']],
  [['','  '],['k','</'],['n','Stack'],['k','>']],
  [['','}']],
];
function CodePanel(){
  const [n,setN]=useState(0);
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ setN(CODE.length); return; }
    if(n>=CODE.length) return;
    const t=setTimeout(()=>setN(n+1), n===0?500:360);
    return ()=>clearTimeout(t);
  },[n]);
  return (
    <>
      {CODE.slice(0,n).map((line,i)=>(
        <div className="code-line" key={i}>
          {line.map((tok,j)=><span className={tok[0]} key={j}>{tok[1]}</span>)}
          {i===n-1 && n<CODE.length && <span className="code-caret"/>}
        </div>
      ))}
      {n>=CODE.length && <div className="code-line"><span className="c">// shipped ✓</span><span className="code-caret"/></div>}
    </>
  );
}

/* ---------- floating panel with parallax ---------- */
function Panel({ depth, float, phase, className, style, children, paraRef }){
  const ref=useRef();
  useEffect(()=>{ paraRef.current.push({ el:ref.current, depth, float, phase }); },[]);
  return <div ref={ref} className={`panel ${className}`} style={style}>{children}</div>;
}

function Hero(){
  const paraRef=useRef([]);
  const mouse=useRef({x:0,y:0});
  const [tog,setTog]=useState(true);

  useEffect(()=>{
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onMove=(e)=>{ mouse.current={ x:(e.clientX/innerWidth-.5), y:(e.clientY/innerHeight-.5) }; };
    window.addEventListener('mousemove',onMove);
    let raf, t0=performance.now();
    const loop=(now)=>{
      const t=(now-t0)/1000;
      paraRef.current.forEach(p=>{
        if(!p.el) return;
        const px=-mouse.current.x*p.depth*40;
        const py=-mouse.current.y*p.depth*40;
        const fy=reduce?0:Math.sin(t*p.float[1]+p.phase)*p.float[0];
        const fx=reduce?0:Math.cos(t*p.float[1]*0.8+p.phase)*p.float[0]*0.5;
        p.el.style.transform=`translate(${px+fx}px, ${py+fy}px)`;
      });
      raf=requestAnimationFrame(loop);
    };
    raf=requestAnimationFrame(loop);
    return ()=>{ window.removeEventListener('mousemove',onMove); cancelAnimationFrame(raf); };
  },[]);

  return (
    <header className="hero" id="top">
      <div className="hero-canvas"/>
      <div className="hero-glow"/>

      <div className="stage">
        {/* layers */}
        <Panel paraRef={paraRef} depth={1.4} float={[7,0.6]} phase={0} className="p-layers" style={{left:'4.5%',top:'17%'}}>
          <div className="panel-head"><I.layers className="ic"/>Camadas</div>
          <div className="panel-body">
            {[['Hero',true,'var(--green)'],['Headline',false,'var(--blue)'],['Sub-copy',false,'var(--violet)'],['CTA / Button',false,'var(--orange)'],['Nav bar',false,'var(--pink)']].map((r,i)=>(
              <div className={`layer-row ${r[1]?'on':''}`} key={i}>
                {i>0&&i<3&&<span className="indent"/>}
                <span className="dot" style={{background:r[2]}}/>{r[0]}
                <I.eye className="vis"/>
              </div>
            ))}
          </div>
        </Panel>

        {/* color tokens */}
        <Panel paraRef={paraRef} depth={2.0} float={[9,0.5]} phase={1.5} className="p-tokens" style={{left:'5.5%',top:'60%'}}>
          <div className="panel-head"><I.swatch className="ic"/>Tokens</div>
          <div className="panel-body">
            <div className="token-grid">
              {[['var(--green)','green'],['var(--green-mid)','500'],['var(--violet)','vio'],['var(--blue)','blu'],['var(--orange)','org'],['var(--pink)','pnk'],['var(--bg-2)','bg2'],['var(--fg)','fg']].map((s,i)=>(
                <div className="swatch" style={{background:s[0]}} key={i}><span>{s[1]}</span></div>
              ))}
            </div>
            <div className="token-row"><span>radius</span><span>14px</span></div>
            <div className="token-row"><span>font</span><span>Grotesk</span></div>
          </div>
        </Panel>

        {/* ui components */}
        <Panel paraRef={paraRef} depth={1.7} float={[8,0.55]} phase={3} className="p-comp" style={{right:'5%',top:'15%'}}>
          <div className="panel-head"><I.comp className="ic"/>Componentes</div>
          <div className="panel-body comp-demo">
            <button className="demo-btn" onClick={()=>setTog(t=>!t)}>Começar projeto</button>
            <div className="demo-row"><span>Notificações</span><span className={`toggle ${tog?'on':''}`} onClick={()=>setTog(t=>!t)}/></div>
            <div className="demo-slider"><i/><b/></div>
          </div>
        </Panel>

        {/* code window */}
        <Panel paraRef={paraRef} depth={2.3} float={[10,0.45]} phase={4.2} className="p-code" style={{right:'6.5%',top:'56%'}}>
          <div className="panel-head"><I.code className="ic"/>onboarding.tsx<span style={{marginLeft:'auto',color:'var(--green)'}}>●</span></div>
          <div className="panel-body"><CodePanel/></div>
        </Panel>

        {/* spacing spec */}
        <Panel paraRef={paraRef} depth={2.6} float={[11,0.5]} phase={5.5} className="p-spec" style={{left:'25%',top:'71%'}}>
          <div className="panel-head"><I.ruler className="ic"/>Spacing</div>
          <div className="panel-body">
            <div className="spec-box">
              <div className="spec-measure"/>
              <span className="spec-dim spec-w">320 × 60</span>
            </div>
          </div>
        </Panel>

        <MultiCursors/>
      </div>

      {/* headline as selected text layer */}
      <div className="hero-core">
        <span className="eyebrow">Agência de UX · Product Design</span>
        <div className="layer-frame sel">
          <span className="layer-tag">Headline / Display</span>
          <span className="handle tl"/><span className="handle tr"/><span className="handle bl"/><span className="handle br"/>
          <h1>Produtos digitais que <span className="accent">movem marcas</span> adiante.</h1>
        </div>
        <p className="hero-sub">A SYNTAX desenha sites, apps e dashboards para marcas que querem clareza. Transformamos sistemas complexos em experiências simples, consistentes e de alto impacto.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projetos">Ver projetos <I.arrow/></a>
          <a className="btn btn-ghost" href="#contato"><I.play style={{width:13,height:13}}/> Iniciar um projeto</a>
        </div>
      </div>

      <a className="scroll-cue" href="#projetos">
        <div className="mouse"/>
        Role para explorar
      </a>
    </header>
  );
}

Object.assign(window,{ Hero, Icons:I });
