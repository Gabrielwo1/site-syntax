/* global React, ReactDOM, Hero, Icons, Projects, Manifesto, Clients, Contact, SiteFooter */
const { useState, useEffect } = React;

function Nav(){
  const [scrolled,setScrolled]=useState(false);
  const [tool,setTool]=useState('text');
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>40);
    window.addEventListener('scroll',onScroll); return ()=>window.removeEventListener('scroll',onScroll);
  },[]);
  const tools=[['move',Icons.move],['frame',Icons.frame],['pen',Icons.pen],['text',Icons.text],['comp',Icons.comp]];
  const avatars=[['M','oklch(0.70 0.165 292)'],['T','oklch(0.74 0.155 52)'],['Y','oklch(0.72 0.150 244)']];
  return (
    <nav className="nav" style={scrolled?{top:'10px',boxShadow:'0 20px 55px -22px #000'}:null}>
      <a href="#top"><img className="nav-logo" src="assets/syntax-logo.png" alt="SYNTAX"/></a>
      <div className="nav-tools">
        {tools.map(([id,Ico])=>(
          <button key={id} className={`nav-tool ${tool===id?'active':''}`} onClick={()=>setTool(id)} aria-label={id}><Ico/></button>
        ))}
      </div>
      <div className="nav-links">
        <a className="nav-link" href="#projetos">Projetos</a>
        <a className="nav-link" href="#sobre">Sobre</a>
        <a className="nav-link" href="#clientes">Clientes</a>
        <a className="btn btn-primary nav-cta" href="#contato">Vamos conversar</a>
        <div className="nav-avatars">
          {avatars.map(([l,c],i)=><span className="nav-av" key={i} style={{background:c}}>{l}</span>)}
        </div>
      </div>
    </nav>
  );
}

function App(){
  const [ready, setReady] = useState(false);

  useEffect(()=>{
    // aguarda o fetch do Supabase antes de renderizar os projetos
    (window.__dbReady || Promise.resolve()).then(()=>setReady(true));
  },[]);

  useEffect(()=>{
    if(!ready) return;
    const io=new IntersectionObserver((es)=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }),{threshold:.12, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  },[ready]);

  return (
    <>
      <div className="page-bg"/>
      <Nav/>
      <Hero/>
      {ready && typeof Projects!=='undefined'      && <Projects/>}
      {ready && typeof Manifesto!=='undefined'    && <Manifesto/>}
      {ready && typeof AboutFounder!=='undefined' && <AboutFounder/>}
      {ready && typeof Clients!=='undefined'      && <Clients/>}
      {ready && typeof Contact!=='undefined'    && <Contact/>}
      {ready && typeof SiteFooter!=='undefined' && <SiteFooter/>}
      <div className="grain"/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
