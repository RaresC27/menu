// page.jsx
"use client";
import { useState, useRef, useEffect } from "react";
import { C, MENU_DATA, TAG_S, EVENTS, PROGRAM } from "./data";
import { glass, Sheen, BohoMark, SectionTitle, IconPin, IconPhone, IconMail, IconInsta } from "./ui";

export default function BohoSite() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuTab,       setMenuTab]       = useState("starters");
  const [cart,          setCart]          = useState([]);
  const [cartOpen,      setCartOpen]      = useState(false);
const [menuModal,     setMenuModal]     = useState<any>(null);
const [addedAnim,     setAddedAnim]     = useState<any>(null);
  const [cartAnim,      setCartAnim]      = useState(false); 
  const [rezForm,       setRezForm]       = useState({name:"",phone:"",date:"",time:"19:00",guests:"2",notes:""});
  const [rezSent,       setRezSent]       = useState(false);
  const [rezErrors,     setRezErrors]     = useState({}); 
  
  const [contactForm,   setContactForm]   = useState({name:"",email:"",msg:""});
  const [contactSent,   setContactSent]   = useState(false);
  const [isMobile,      setIsMobile]      = useState(false);

  // LOGICĂ NOUĂ PENTRU COMANDĂ LA MASĂ
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [orderFlow, setOrderFlow]     = useState("cart"); 
  const [manualTable, setManualTable] = useState(""); 

  const sectionRefs    = useRef({});
  const menuCatRefs    = useRef({});
  const isManualScroll = useRef(false);

  // Detectăm mobilul
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Detectăm numărul mesei din URL (QR Code) la încărcarea paginii
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const masa = params.get("masa");
      if (masa) setTableNumber(masa);
    }
  }, []);

  // intersection observer for nav
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (isManualScroll.current) return; 
      entries.forEach(e => {
        if (e.isIntersecting) {
          setActiveSection(e.target.dataset.section);
        }
      });
    }, {threshold: 0.3, rootMargin: "-80px 0px -20% 0px"});
    
    Object.values(sectionRefs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    isManualScroll.current = true; 
    setActiveSection(id); 
    sectionRefs.current[id]?.scrollIntoView({behavior:"smooth"});

    setTimeout(() => {
      isManualScroll.current = false;
    }, 800);
  };

  const scrollToMenuCat = (id) => {
    setMenuTab(id);
    menuCatRefs.current[id]?.scrollIntoView({behavior:"smooth", block:"start"});
  };

  const totalQty   = cart.reduce((s,i) => s+i.qty, 0);
  const totalPrice = cart.reduce((s,i) => s+i.price*i.qty, 0);

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id===item.id);
      return ex ? prev.map(c => c.id===item.id ? {...c,qty:c.qty+1} : c) : [...prev, {...item,qty:1}];
    });
    setAddedAnim(item.id);
    setCartAnim(true);
    setTimeout(() => setAddedAnim(null), 700);
    setTimeout(() => setCartAnim(false), 400); 
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const ex = prev.find(c => c.id===id);
      return ex?.qty===1 ? prev.filter(c => c.id!==id) : prev.map(c => c.id===id ? {...c,qty:c.qty-1} : c);
    });
  };

  const handleCheckoutClick = () => {
    if (tableNumber) {
      setOrderFlow("success");
    } else {
      setOrderFlow("table_input");
    }
  };

  const closeCartAndReset = () => {
    setCartOpen(false);
    setTimeout(() => {
      if (orderFlow === "success") setCart([]); 
      setOrderFlow("cart");
      setManualTable("");
    }, 300); 
  };

  const NAV = [
    {id:"hero",    label:"Acasă",      glyph:"⌂"},
    {id:"about",   label:"Povestea",   glyph:"◈"},
    {id:"menu",    label:"Meniu",      glyph:"◉"},
    {id:"events",  label:"Evenimente", glyph:"◎"},
    {id:"reserve", label:"Rezervare",  glyph:"◇"},
    {id:"contact", label:"Contact",    glyph:"◈"},
  ];

  const BOTTOM_NAV = [
    {id:"hero",    label:"Acasă",    glyph:"⌂"},
    {id:"menu",    label:"Meniu",    glyph:"◉"},
    {id:"reserve", label:"Rezervare",glyph:"◇"},
    {id:"contact", label:"Contact",  glyph:"◎"},
  ];

  const showBottomNav = isMobile; 
  const bottomNavH = showBottomNav ? 72 : 0;
  const contentPb  = showBottomNav ? bottomNavH + 16 : 60;
  const errorColor = "#d46b6b";

  return (
    <div style={{minHeight:"100vh",background:C.dark1,fontFamily:"'Cormorant Garamond','Didot',Georgia,serif",color:C.text}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Cormorant+SC:wght@300;400;500;600&display=swap');

        *{box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none;}
        ::-webkit-scrollbar{display:none;}
        html{scroll-behavior:smooth;}
        body{margin:0; overflow-x: hidden;}

        @keyframes drift1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(28px,45px) scale(1.14)}}
        @keyframes drift2{0%,100%{transform:translate(0,0)}50%{transform:translate(-28px,-35px) scale(1.18)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes heroReveal{from{opacity:0;transform:translateY(36px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes shimmer{0%,100%{opacity:0.45}50%{opacity:1}}
        @keyframes addPop{0%{transform:scale(1)}40%{transform:scale(1.32)}70%{transform:scale(0.9)}100%{transform:scale(1)}}
        @keyframes sheetUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes slideRight{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes badgePop{0%{transform:scale(0)}65%{transform:scale(1.28)}100%{transform:scale(1)}}
        @keyframes orbPulse{0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
        
        @keyframes cartBump {
          0% { transform: scale(1); box-shadow: none; }
          50% { transform: scale(1.06); box-shadow: 0 0 24px rgba(122,138,46,0.6); background: rgba(122,138,46,0.22); }
          100% { transform: scale(1); box-shadow: none; }
        }

        section[data-section] { scroll-margin-top: 80px; }

        .hover-lift{transition:transform 0.22s ease,box-shadow 0.22s ease;}
        .hover-lift:hover{transform:translateY(-2px);}
        .item-card{transition:transform 0.2s ease;cursor:pointer;}
        .item-card:active{transform:scale(0.97);}
        .pill{transition:all 0.24s cubic-bezier(0.34,1.56,0.64,1);}
        .pill:active{transform:scale(0.91);}
        .btn-press:active{transform:scale(0.95);}
        input,textarea,select{outline:none;font-family:'Cormorant Garamond',serif;}
        input:focus,textarea:focus,select:focus{border-color:rgba(122,138,46,0.5)!important;box-shadow:0 0 0 3px rgba(122,138,46,0.08)!important;}

        @media(max-width:767px){
          section[data-section] { scroll-margin-top: 60px; }
          .desktop-only{display:none!important;}
          .about-grid{grid-template-columns:1fr!important;}
          .contact-grid{grid-template-columns:1fr!important;}
          .gallery-grid{grid-template-columns:1fr 1fr!important;grid-template-rows:auto!important;}
          .gallery-wide{grid-column:span 1!important;}
          .events-grid{grid-template-columns:1fr!important;}
          .stats-row{gap:16px!important;}
          .values-grid{grid-template-columns:1fr 1fr!important;}
          .rez-grid{grid-template-columns:1fr!important; gap: 24px!important;}
        }
        @media(min-width:768px){
          .mobile-only{display:none!important;}
        }
      `}</style>

      {/* ── Ambient orbs ── */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        <div style={{position:"absolute",width:700,height:700,background:"radial-gradient(circle,rgba(122,138,46,0.1) 0%,transparent 60%)",top:-200,right:-200,borderRadius:"50%",animation:"drift1 16s ease-in-out infinite"}}/>
        <div style={{position:"absolute",width:500,height:500,background:"radial-gradient(circle,rgba(200,169,110,0.07) 0%,transparent 60%)",bottom:100,left:-150,borderRadius:"50%",animation:"drift2 20s ease-in-out infinite"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,backgroundSize:"200px",opacity:0.3}}/>
      </div>

      {/* ════════════════════════════════════════════════════════
         DESKTOP NAV 
      ════════════════════════════════════════════════════════ */}
      <nav className="desktop-only" style={{
        position:"fixed",top:0,left:0,right:0,zIndex:200,
        background:"rgba(10,10,6,0.52)",
        backdropFilter:"blur(44px) saturate(1.9) brightness(0.88)",
        WebkitBackdropFilter:"blur(44px) saturate(1.9) brightness(0.88)",
        borderBottom:"1px solid rgba(122,138,46,0.14)",
        height:64,padding:"0 28px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        boxShadow:"0 8px 32px rgba(0,0,0,0.4),inset 0 -1px 0 rgba(255,255,255,0.03)",
      }}>
        <button onClick={()=>scrollTo("hero")} style={{background:"none",border:"none",display:"flex",alignItems:"center",gap:12,padding:0,cursor:"pointer"}}>
          <BohoMark size={34} color={C.oliveLight}/>
          <div>
            <div style={{fontSize:18,fontFamily:"'Cormorant SC',serif",fontWeight:500,letterSpacing:"0.2em",color:C.text,lineHeight:1}}>BÖHO</div>
            <div style={{fontSize:9,letterSpacing:"0.26em",color:C.olive,marginTop:2,fontFamily:"'Cormorant SC',serif"}}>BRASSERIE · BAIA MARE</div>
          </div>
        </button>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          {NAV.map(l=>(
            <button key={l.id} onClick={()=>scrollTo(l.id)} style={{
              background:activeSection===l.id?"rgba(122,138,46,0.12)":"transparent",
              backdropFilter:activeSection===l.id?"blur(12px)":"none",
              border:activeSection===l.id?"1px solid rgba(122,138,46,0.22)":"1px solid transparent",
              borderRadius:50,padding:"6px 14px",
              color:activeSection===l.id?C.oliveLight:C.textMuted,
              fontSize:13,fontFamily:"'Cormorant SC',serif",
              fontWeight:activeSection===l.id?500:400,letterSpacing:"0.13em",cursor:"pointer",
              transition:"all 0.2s ease",
            }}>{l.label}</button>
          ))}
          {totalQty>0&&(
            <button onClick={()=>setCartOpen(true)} style={{
              background:"rgba(200,169,110,0.12)",backdropFilter:"blur(20px)",
              border:"1px solid rgba(200,169,110,0.25)",borderRadius:50,
              padding:"7px 18px",color:C.gold,fontSize:13,
              fontFamily:"'Cormorant SC',serif",letterSpacing:"0.13em",
              display:"flex",alignItems:"center",gap:6,cursor:"pointer",
              transition: "all 0.3s ease",
              animation: cartAnim ? "cartBump 0.4s ease-in-out" : "none", 
            }}>
              <span>◈</span>{totalQty} · {totalPrice} lei
            </button>
          )}
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════
         MOBILE HEADER
      ════════════════════════════════════════════════════════ */}
      <div className="mobile-only" style={{
        position:"fixed",top:0,left:0,right:0,zIndex:200,
        background:"rgba(10,10,6,0.6)",
        backdropFilter:"blur(40px) saturate(1.8)",
        WebkitBackdropFilter:"blur(40px) saturate(1.8)",
        borderBottom:"1px solid rgba(122,138,46,0.14)",
        height:56,padding:"0 16px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        boxShadow:"0 4px 20px rgba(0,0,0,0.4)",
      }}>
        <button onClick={()=>scrollTo("hero")} style={{background:"none",border:"none",display:"flex",alignItems:"center",gap:10,padding:0,cursor:"pointer"}}>
          <BohoMark size={28} color={C.oliveLight}/>
          <div>
            <div style={{fontSize:16,fontFamily:"'Cormorant SC',serif",fontWeight:500,letterSpacing:"0.18em",color:C.text,lineHeight:1}}>BÖHO</div>
            <div style={{fontSize:8,letterSpacing:"0.22em",color:C.olive,marginTop:2,fontFamily:"'Cormorant SC',serif"}}>BRASSERIE</div>
          </div>
        </button>
        {totalQty>0&&(
          <button onClick={()=>setCartOpen(true)} style={{
            background:"rgba(200,169,110,0.15)",backdropFilter:"blur(20px)",
            border:"1px solid rgba(200,169,110,0.28)",borderRadius:50,
            padding:"7px 16px",color:C.gold,fontSize:13,
            fontFamily:"'Cormorant SC',serif",letterSpacing:"0.1em",
            display:"flex",alignItems:"center",gap:5,cursor:"pointer",
            transition: "all 0.3s ease",
            animation: cartAnim ? "cartBump 0.4s ease-in-out" : "none", 
          }}>
            ◈ {totalQty}
          </button>
        )}
      </div>

      <div style={{paddingTop:isMobile?56:64, paddingBottom:contentPb, position:"relative",zIndex:1}}>

        {/* ── HERO ── */}
        <section ref={el=>sectionRefs.current.hero=el} data-section="hero"
          style={{minHeight:"100svh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"80px 20px 24px",position:"relative",textAlign:"center"}}
        >
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"min(600px,90vw)",height:"min(600px,90vw)",background:"radial-gradient(circle,rgba(122,138,46,0.09) 0%,transparent 65%)",pointerEvents:"none"}}/>

          <div style={{flex: 1}}></div> 

          <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 1}}>
            <div style={{animation:"heroReveal 1s cubic-bezier(0.34,1.1,0.64,1) both"}}>
              <BohoMark size={isMobile?64:80} color={C.olive}/>
            </div>
            <div style={{animation:"heroReveal 1s 0.12s cubic-bezier(0.34,1.1,0.64,1) both"}}>
              <div style={{fontSize:"clamp(54px,14vw,100px)",fontFamily:"'Cormorant SC',serif",fontWeight:300,letterSpacing:"0.22em",color:C.text,lineHeight:1,marginTop:24,marginBottom:6}}>
                BÖHO
              </div>
              <div style={{fontSize:"clamp(10px,2.5vw,14px)",letterSpacing:"0.32em",color:C.olive,fontFamily:"'Cormorant SC',serif",marginBottom:28}}>
                BRASSERIE · BAIA MARE
              </div>
            </div>

            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28,animation:"heroReveal 1s 0.22s both"}}>
              <div style={{height:1,width:48,background:`linear-gradient(90deg,transparent,${C.olive})`}}/>
              <span style={{color:C.olive,fontFamily:"'Cormorant SC',serif"}}>◈</span>
              <div style={{height:1,width:48,background:`linear-gradient(90deg,${C.olive},transparent)`}}/>
            </div>

            <p style={{fontSize:"clamp(16px,4vw,20px)",fontWeight:300,fontStyle:"italic",color:C.textMuted,lineHeight:1.85,maxWidth:"min(520px,88vw)",marginBottom:40,animation:"heroReveal 1s 0.3s both"}}>
              O brasserie cu suflet local, ingrediente selectate și atmosferă unică în inima Băii Mari.
            </p>

            <div style={{display:"flex",flexDirection:isMobile?"column":"row",gap:14,width:isMobile?"min(320px,88vw)":"auto",animation:"heroReveal 1s 0.38s both"}}>
              <button className="btn-press" onClick={()=>scrollTo("menu")} style={{
                background:"linear-gradient(135deg,rgba(122,138,46,0.88),rgba(80,94,28,0.85))",
                backdropFilter:"blur(20px)",border:"1px solid rgba(122,138,46,0.4)",
                borderRadius:50,padding:isMobile?"16px 0":"16px 38px",
                width:isMobile?"100%":"auto",
                color:C.text,fontSize:13,fontFamily:"'Cormorant SC',serif",
                fontWeight:500,letterSpacing:"0.2em",
                boxShadow:"0 8px 28px rgba(122,138,46,0.35),inset 0 1px 0 rgba(255,255,255,0.12)",
              }}>EXPLOREAZĂ MENIUL</button>
              <button className="btn-press" onClick={()=>scrollTo("reserve")} style={{
                background:"rgba(255,255,255,0.04)",backdropFilter:"blur(20px)",
                border:"1px solid rgba(255,255,255,0.12)",borderRadius:50,
                padding:isMobile?"16px 0":"16px 38px",
                width:isMobile?"100%":"auto",
                color:C.textMuted,fontSize:13,fontFamily:"'Cormorant SC',serif",
                letterSpacing:"0.2em",
                boxShadow:"inset 0 1px 0 rgba(255,255,255,0.08)",
              }}>REZERVARE MASĂ</button>
            </div>
          </div>

          <div style={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", zIndex: 1, marginTop: 40}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,animation:"fadeUp 1s 1s both"}}>
              <div style={{fontSize:10,letterSpacing:"0.22em",color:C.textDim,fontFamily:"'Cormorant SC',serif"}}>SCROLL</div>
              <div style={{width:1,height:36,background:`linear-gradient(180deg,${C.olive}60,transparent)`,animation:"shimmer 2s ease-in-out infinite"}}/>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section ref={el=>sectionRefs.current.about=el} data-section="about"
          style={{padding:isMobile?"64px 16px":"100px 24px",maxWidth:1100,margin:"0 auto"}}
        >
          <SectionTitle glyph="◈" label="POVESTEA" subtitle="Böho Brasserie"/>

          <div className="about-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:44}}>
            <div style={{...glass({padding:"32px 28px"})}}>
              <Sheen/>
              <div style={{color:C.olive,fontSize:10,letterSpacing:"0.25em",fontFamily:"'Cormorant SC',serif",marginBottom:14}}>DESPRE NOI</div>
              <h3 style={{fontSize:"clamp(20px,4.5vw,28px)",fontWeight:300,fontStyle:"italic",color:C.text,lineHeight:1.45,marginBottom:18}}>
                Un loc unde fiecare masă devine o poveste
              </h3>
              <p style={{fontSize:"clamp(15px,3vw,17px)",fontWeight:300,color:C.textMuted,lineHeight:1.8,marginBottom:14}}>
                Böho s-a născut din dragostea pentru gastronomia autentică și dorința de a crea un spațiu unde oamenii se simt acasă. Situată pe str. Culturii din Baia Mare, brasseria noastră îmbină tradiția europeană cu influențele culinare globale.
              </p>
              <p style={{fontSize:"clamp(15px,3vw,17px)",fontWeight:300,color:C.textMuted,lineHeight:1.8}}>
                Ingredientele noastre sunt selectate zilnic de la producători locali din Maramureș — fiecare preparat spune o poveste despre locul de unde vine.
              </p>
              <div className="stats-row" style={{marginTop:24,paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",gap:24,flexWrap:"wrap"}}>
                {[["2019","Deschidere"],["4.8★","Google"],["60","Locuri"],["∞","Pasiune"]].map(([v,l])=>(
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{fontSize:"clamp(18px,4.5vw,22px)",fontWeight:300,color:C.gold,fontFamily:"'Cormorant Garamond',serif"}}>{v}</div>
                    <div style={{fontSize:9,letterSpacing:"0.16em",color:C.textDim,fontFamily:"'Cormorant SC',serif",marginTop:3}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="values-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                {glyph:"◈",title:"Ingrediente Locale",  desc:"Fermieri din Maramureș, produse de sezon"},
                {glyph:"◉",title:"Bucătărie Deschisă",  desc:"Transparență totală în preparare"},
                {glyph:"◎",title:"Vinuri Românești",     desc:"Selecție din cramele locale de top"},
                {glyph:"◇",title:"Sustenabilitate",      desc:"Zero waste, energie verde"},
              ].map(v=>(
                <div key={v.title} className="hover-lift" style={{...glass({padding:"20px 18px"})}}>
                  <Sheen/>
                  <div style={{fontSize:22,color:C.olive,marginBottom:10,fontFamily:"'Cormorant SC',serif"}}>{v.glyph}</div>
                  <div style={{fontSize:"clamp(13px,3vw,15px)",fontWeight:500,color:C.text,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.07em",marginBottom:6}}>{v.title}</div>
                  <div style={{fontSize:"clamp(13px,2.5vw,14px)",color:C.textMuted,lineHeight:1.65,fontWeight:300,fontStyle:"italic"}}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{...glass({padding:"28px 24px",marginTop:16,display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"})}}>
            <Sheen/>
            <div style={{width:64,height:64,borderRadius:16,flexShrink:0,background:"rgba(122,138,46,0.1)",border:"1px solid rgba(122,138,46,0.22)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,color:C.olive,fontFamily:"'Cormorant SC',serif"}}>◉</div>
            <div style={{flex:1,minWidth:200}}>
              <div style={{fontSize:9,letterSpacing:"0.24em",color:C.olive,fontFamily:"'Cormorant SC',serif",marginBottom:5}}>CHEF EXECUTIV</div>
              <div style={{fontSize:"clamp(18px,4vw,22px)",fontWeight:400,fontStyle:"italic",color:C.text,marginBottom:5}}>Alexandru Mureșan</div>
              <div style={{fontSize:"clamp(14px,3vw,15px)",color:C.textMuted,fontWeight:300,fontStyle:"italic",lineHeight:1.7}}>
                Format la Paris și Lyon, 15 ani în restaurante europene de top. Aduce în Baia Mare o viziune culinară rafinată, ancorată în ingredientele locale.
              </div>
            </div>
          </div>
        </section>

        {/* ── MENU ── */}
        <section ref={el=>sectionRefs.current.menu=el} data-section="menu"
          style={{padding:isMobile?"64px 0 0":"100px 0 0",position:"relative"}}
        >
          <div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px"}}>
            <SectionTitle glyph="◉" label="MENIU" subtitle="Preparatele Noastre"/>
          </div>

          <div style={{
            position:"sticky",top:isMobile?56:64,zIndex:100,
            background:"rgba(10,10,6,0.6)",
            backdropFilter:"blur(40px) saturate(2)",
            WebkitBackdropFilter:"blur(40px) saturate(2)",
            borderBottom:"1px solid rgba(122,138,46,0.12)",
            padding:"10px 0",marginTop:32,
          }}>
            <div style={{display:"flex",gap:8,overflowX:"auto",padding:`0 ${isMobile?14:24}px`}}>
              {MENU_DATA.map(cat => {
                const active = menuTab===cat.id;
                return (
                  <button key={cat.id} className="pill" onClick={()=>scrollToMenuCat(cat.id)} style={{
                    flexShrink:0,padding:isMobile?"10px 16px":"11px 22px",borderRadius:50,
                    background:active?"linear-gradient(135deg, rgba(122,138,46,0.85), rgba(80,94,28,0.75))":"rgba(255,255,255,0.04)",
                    backdropFilter:"blur(20px)",
                    border:active?"1px solid rgba(122,138,46,0.5)":"1px solid rgba(255,255,255,0.07)",
                    color:active?"#fff":C.textMuted,
                    fontSize:isMobile?12:13,fontFamily:"'Cormorant SC',serif",
                    fontWeight:active?500:400,letterSpacing:"0.13em",
                    whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:7,
                    boxShadow:active?"0 4px 14px rgba(122,138,46,0.3),inset 0 1px 0 rgba(255,255,255,0.1)":"inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}>
                    <span style={{fontSize:11}}>{cat.glyph}</span>
                    {cat.label.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{maxWidth:1100,margin:"0 auto",padding:`0 ${isMobile?12:24}px 32px`}}>
            {MENU_DATA.map(cat => (
              <div key={cat.id} ref={el=>menuCatRefs.current[cat.id]=el} style={{paddingTop:32, scrollMarginTop: isMobile ? 120 : 140 }}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
                  <span style={{fontSize:20,color:C.olive,fontFamily:"'Cormorant SC',serif"}}>{cat.glyph}</span>
                  <span style={{fontSize:"clamp(18px,4.5vw,22px)",fontFamily:"'Cormorant SC',serif",fontWeight:500,letterSpacing:"0.16em",color:C.text}}>{cat.label.toUpperCase()}</span>
                  <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(122,138,46,0.28) 0%,transparent 80%)"}}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>
                  {cat.items.map(item => {
                    const inCart = cart.find(c=>c.id===item.id);
                    const tStyle = TAG_S[item.tag]||TAG_S.Clasic;
                    const popping = addedAnim===item.id;
                    return (
                      <div key={item.id} className="item-card" onClick={()=>setMenuModal(item)}
                        style={{
                          background:inCart?"rgba(122,138,46,0.08)":"rgba(255,255,255,0.03)",
                          backdropFilter:"blur(48px) saturate(2)",
                          WebkitBackdropFilter:"blur(48px) saturate(2)",
                          border:inCart?"1px solid rgba(122,138,46,0.28)":"1px solid rgba(255,255,255,0.07)",
                          borderRadius:18,padding:"18px 18px 16px",
                          display:"flex",gap:16,alignItems:"flex-start",
                          position:"relative",overflow:"hidden",
                          boxShadow:inCart?"0 6px 32px rgba(0,0,0,0.4),inset 0 1px 0 rgba(122,138,46,0.12)":"0 4px 24px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.05)",
                        }}
                      >
                        <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent 5%,rgba(255,255,255,0.12) 40%,rgba(255,255,255,0.2) 50%,rgba(255,255,255,0.12) 60%,transparent 95%)"}}/>
                        <div style={{width:52,height:52,flexShrink:0,background:"rgba(122,138,46,0.08)",border:"1px solid rgba(122,138,46,0.16)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:C.olive,fontFamily:"'Cormorant SC',serif"}}>
                          {cat.glyph}
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8,marginBottom:6}}>
                            <div style={{fontSize:"clamp(16px,4vw,18px)",fontWeight:500,color:C.text,fontFamily:"'Cormorant Garamond',serif",lineHeight:1.2}}>{item.name}</div>
                            <div style={{fontSize:"clamp(17px,4vw,20px)",fontWeight:300,color:C.gold,flexShrink:0,fontFamily:"'Cormorant Garamond',serif"}}>{item.price}<span style={{fontSize:12}}> lei</span></div>
                          </div>
                          <div style={{fontSize:"clamp(13px,3vw,15px)",color:C.textMuted,lineHeight:1.6,marginBottom:12,fontWeight:300,fontStyle:"italic"}}>{item.desc}</div>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <span style={{fontSize:10,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.14em",background:tStyle.bg,color:tStyle.color,border:`1px solid ${tStyle.border}`,borderRadius:20,padding:"4px 10px"}}>{item.tag.toUpperCase()}</span>
                            <button
                              className="btn-press"
                              onClick={e=>{e.stopPropagation();addToCart(item);}}
                              style={{
                                width:38,height:38,borderRadius:50,
                                background:inCart?"linear-gradient(135deg,rgba(122,138,46,0.85),rgba(80,94,28,0.75))":"rgba(255,255,255,0.07)",
                                backdropFilter:"blur(20px)",
                                border:inCart?"1px solid rgba(122,138,46,0.5)":"1px solid rgba(255,255,255,0.1)",
                                display:"flex",alignItems:"center",justifyContent:"center",
                                color:inCart?"#fff":C.textMuted,
                                fontSize:inCart?14:22,fontWeight:"bold",
                                animation:popping?"addPop 0.6s cubic-bezier(0.34,1.56,0.64,1)":"none",
                                boxShadow:inCart?"0 4px 14px rgba(122,138,46,0.4),inset 0 1px 0 rgba(255,255,255,0.14)":"inset 0 1px 0 rgba(255,255,255,0.07)",
                                fontFamily:"sans-serif",
                              }}
                            >{inCart?inCart.qty:"+"}</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {totalQty>0&&(
              <div style={{marginTop:32,...glass({padding:"18px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,animation:"fadeUp 0.4s ease"})}}>
                <Sheen/>
                <div>
                  <span style={{fontSize:13,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.1em",color:C.text}}>{totalQty} PREPARATE</span>
                  <span style={{marginLeft:12,fontSize:"clamp(18px,4.5vw,22px)",fontWeight:300,color:C.gold,fontFamily:"'Cormorant Garamond',serif"}}>{totalPrice} lei</span>
                </div>
                <button className="btn-press" onClick={()=>setCartOpen(true)} style={{
                  background:"linear-gradient(135deg,rgba(122,138,46,0.85),rgba(80,94,28,0.8))",
                  border:"1px solid rgba(122,138,46,0.4)",borderRadius:50,padding:"12px 26px",
                  color:C.text,fontSize:11,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.16em",
                  boxShadow:"0 4px 18px rgba(122,138,46,0.3),inset 0 1px 0 rgba(255,255,255,0.1)",
                }}>FINALIZEAZĂ COMANDA</button>
              </div>
            )}
          </div>
        </section>

        {/* ── EVENTS ── */}
        <section ref={el=>sectionRefs.current.events=el} data-section="events"
          style={{padding:isMobile?"64px 16px":"100px 24px",maxWidth:1100,margin:"0 auto"}}
        >
          <SectionTitle glyph="◎" label="EVENIMENTE" subtitle="Experiențe Speciale"/>
          <div className="events-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:14,marginTop:44}}>
            {EVENTS.map(ev=>(
              <div key={ev.title} className="hover-lift" style={{...glass({padding:"26px 22px"})}}>
                <Sheen/>
                <div style={{fontSize:24,color:C.olive,marginBottom:14,fontFamily:"'Cormorant SC',serif"}}>{ev.glyph}</div>
                <div style={{fontSize:9,letterSpacing:"0.22em",color:C.olive,fontFamily:"'Cormorant SC',serif",marginBottom:8}}>EVENIMENT</div>
                <h3 style={{fontSize:"clamp(18px,4.5vw,22px)",fontWeight:400,fontStyle:"italic",color:C.text,marginBottom:10,lineHeight:1.3}}>{ev.title}</h3>
                <p style={{fontSize:"clamp(14px,3vw,16px)",color:C.textMuted,lineHeight:1.8,fontWeight:300,marginBottom:14}}>{ev.desc}</p>
                <div style={{fontSize:11,color:C.gold,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.08em",marginBottom:18,padding:"8px 0",borderTop:"1px solid rgba(255,255,255,0.06)",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>{ev.detail}</div>
                <button className="btn-press" onClick={()=>scrollTo("reserve")} style={{
                  width:"100%",padding:"12px",background:"rgba(122,138,46,0.12)",backdropFilter:"blur(20px)",
                  border:"1px solid rgba(122,138,46,0.25)",borderRadius:50,color:C.oliveLight,
                  fontSize:10,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.18em",
                }}>{ev.cta.toUpperCase()}</button>
              </div>
            ))}
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section ref={el=>sectionRefs.current.gallery=el} data-section="gallery"
          style={{padding:isMobile?"64px 16px":"100px 24px",maxWidth:1100,margin:"0 auto"}}
        >
          <SectionTitle glyph="◇" label="GALERIE" subtitle="Atmosfera Böho"/>
          <div className="gallery-grid" style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gridAutoRows:"200px",
            gap:12,marginTop:44,
          }}>
            {[
              {label:"Interior Böho",     color:"rgba(122,138,46,0.28)", wide:true},
              {label:"Cocktail Bar",      color:"rgba(200,169,110,0.22)"},
              {label:"Risotto Trufe",     color:"rgba(122,138,46,0.2)"},
              {label:"Terasa de Vară",    color:"rgba(200,169,110,0.25)", wide:true},
              {label:"Chef la Lucru",     color:"rgba(90,102,32,0.3)"},
            ].map((g,i)=>(
              <div key={i} className={`hover-lift${g.wide?" gallery-wide":""}`}
                style={{
                  ...glass({padding:0}),
                  gridColumn:g.wide?"span 2":"span 1",
                  background:`linear-gradient(145deg,${g.color},rgba(10,10,6,0.8))`,
                  cursor:"pointer",minHeight:200,
                }}
              >
                <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,padding:20}}>
                  <div style={{fontSize:10,letterSpacing:"0.22em",color:"rgba(255,255,255,0.4)",fontFamily:"'Cormorant SC',serif",textAlign:"center"}}>{g.label.toUpperCase()}</div>
                  <div style={{fontSize:9,letterSpacing:"0.18em",color:"rgba(255,255,255,0.2)",fontFamily:"'Cormorant SC',serif"}}>@BOHO.BAIMARE</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── REZERVARE ── */}
        <section ref={el=>sectionRefs.current.reserve=el} data-section="reserve"
          style={{padding:isMobile?"64px 16px":"100px 24px",maxWidth:800,margin:"0 auto"}}
        >
          <SectionTitle glyph="◈" label="REZERVARE" subtitle="Rezervă Masa Ta"/>

          {rezSent ? (
            <div style={{...glass({padding:"50px 32px",textAlign:"center",marginTop:40})}}>
              <Sheen/>
              <div style={{fontSize:36,color:C.olive,marginBottom:18,fontFamily:"'Cormorant SC',serif"}}>◈</div>
              <div style={{fontSize:"clamp(20px,4.5vw,26px)",fontWeight:300,fontStyle:"italic",color:C.text,marginBottom:10}}>Rezervare Confirmată</div>
              <p style={{fontSize:15,color:C.textMuted,lineHeight:1.8,fontWeight:300}}>Vă mulțumim! Veți fi contactat pe numărul furnizat pentru confirmare. Ne vedem la Böho!</p>
              <button onClick={()=>setRezSent(false)} style={{marginTop:24,background:"rgba(122,138,46,0.12)",border:"1px solid rgba(122,138,46,0.25)",borderRadius:50,padding:"12px 30px",color:C.oliveLight,fontSize:11,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.15em"}}>REZERVARE NOUĂ</button>
            </div>
          ) : (
            <div style={{...glass({padding:isMobile?"24px 16px":"40px 36px",marginTop:40})}}>
              <Sheen/>
              <div className="rez-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                {[
                  {label:"NUME COMPLET",       key:"name",  ph:"Alexandru Popescu", type:"text"},
                  {label:"TELEFON",            key:"phone", ph:"0736 385 167",       type:"tel"},
                ].map(f=>(
                  <div key={f.key}>
                    <label style={{fontSize:10,letterSpacing:"0.22em",color: rezErrors[f.key] ? errorColor : C.olive,fontFamily:"'Cormorant SC',serif",display:"block",marginBottom:8, transition: "color 0.3s"}}>{f.label}</label>
                    <input type={f.type} value={rezForm[f.key]} onChange={e=>{
                        setRezForm(p=>({...p,[f.key]:e.target.value}));
                        if(rezErrors[f.key]) setRezErrors(p=>({...p, [f.key]: false}));
                      }} placeholder={f.ph}
                      style={{width:"100%",height:"52px",padding:"12px 16px",boxSizing:"border-box",background:"rgba(255,255,255,0.04)",border: rezErrors[f.key] ? `1px solid rgba(212, 107, 107, 0.6)` : "1px solid rgba(255,255,255,0.1)",borderRadius:11,color:C.text,fontSize:16,fontStyle:"italic",transition:"border-color 0.3s,box-shadow 0.3s"}}
                    />
                  </div>
                ))}
                <div>
                  <label style={{fontSize:10,letterSpacing:"0.22em",color: rezErrors.date ? errorColor : C.olive,fontFamily:"'Cormorant SC',serif",display:"block",marginBottom:8, transition: "color 0.3s"}}>DATA</label>
                  <input type="date" value={rezForm.date} onChange={e=>{
                      setRezForm(p=>({...p,date:e.target.value}));
                      if(rezErrors.date) setRezErrors(p=>({...p, date: false}));
                    }}
                    style={{width:"100%",height:"52px",display:"block",padding:"10px 16px",boxSizing:"border-box",background:"rgba(255,255,255,0.04)",border: rezErrors.date ? `1px solid rgba(212, 107, 107, 0.6)` : "1px solid rgba(255,255,255,0.1)",borderRadius:11,color:C.text,fontSize:16,colorScheme:"dark",WebkitAppearance:"none", transition:"border-color 0.3s"}}
                  />
                </div>
                <div>
                  <label style={{fontSize:10,letterSpacing:"0.22em",color:C.olive,fontFamily:"'Cormorant SC',serif",display:"block",marginBottom:8}}>ORA</label>
                  <select value={rezForm.time} onChange={e=>setRezForm(p=>({...p,time:e.target.value}))}
                    style={{width:"100%",height:"52px",padding:"12px 16px",boxSizing:"border-box",background:"rgba(20,20,16,0.9)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:11,color:C.text,fontSize:16,appearance:"none",WebkitAppearance:"none"}}
                  >
                    {["11:00","12:00","13:00","14:00","15:00","18:00","19:00","20:00","21:00","22:00","23:00"].map(t=>(
                      <option key={t} value={t} style={{background:C.dark2}}>{t}</option>
                    ))}
                  </select>
                </div>
                <div style={{gridColumn:"span 2"}}>
                  <label style={{fontSize:10,letterSpacing:"0.22em",color:C.olive,fontFamily:"'Cormorant SC',serif",display:"block",marginBottom:8}}>NR. PERSOANE</label>
                  <select value={rezForm.guests} onChange={e=>setRezForm(p=>({...p,guests:e.target.value}))}
                    style={{width:"100%",height:"52px",padding:"12px 16px",boxSizing:"border-box",background:"rgba(20,20,16,0.9)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:11,color:C.text,fontSize:16,appearance:"none",WebkitAppearance:"none"}}
                  >
                    {[1,2,3,4,5,6,7,8,10,12,15,20].map(n=>(
                      <option key={n} value={n} style={{background:C.dark2}}>{n} {n===1?"persoană":"persoane"}</option>
                    ))}
                  </select>
                </div>
                <div style={{gridColumn:"span 2"}}>
                  <label style={{fontSize:10,letterSpacing:"0.22em",color:C.olive,fontFamily:"'Cormorant SC',serif",display:"block",marginBottom:8}}>MENȚIUNI SPECIALE</label>
                  <textarea rows={3} value={rezForm.notes} onChange={e=>setRezForm(p=>({...p,notes:e.target.value}))} placeholder="Alergii, ocazie specială, preferințe masă..."
                    style={{width:"100%",padding:"12px 16px",boxSizing:"border-box",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:11,color:C.text,fontSize:16,resize:"none",fontStyle:"italic"}}
                  />
                </div>
              </div>

              {Object.keys(rezErrors).length > 0 && (
                <div style={{color: errorColor, fontSize: 11, fontFamily: "'Cormorant SC',serif", letterSpacing: "0.1em", textAlign: "center", marginTop: 22, animation: "fadeUp 0.3s ease"}}>
                  ◈ VĂ RUGĂM SĂ COMPLETAȚI CÂMPURILE MARCATE ◈
                </div>
              )}

              <button className="btn-press" onClick={()=>{
                const errs = {};
                if(!rezForm.name.trim()) errs.name = true;
                if(!rezForm.phone.trim()) errs.phone = true;
                if(!rezForm.date) errs.date = true;
                
                if(Object.keys(errs).length > 0) {
                  setRezErrors(errs);
                } else {
                  setRezErrors({});
                  setRezSent(true);
                }
              }} style={{
                width:"100%",marginTop: Object.keys(rezErrors).length > 0 ? 14 : 24,padding:"18px",
                background:"linear-gradient(135deg,rgba(122,138,46,0.88),rgba(80,94,28,0.85))",
                backdropFilter:"blur(20px)",border:"1px solid rgba(122,138,46,0.4)",borderRadius:13,
                color:C.text,fontSize:13,fontFamily:"'Cormorant SC',serif",fontWeight:500,letterSpacing:"0.2em",
                boxShadow:"0 8px 28px rgba(122,138,46,0.35),inset 0 1px 0 rgba(255,255,255,0.1)",
              }}>CONFIRMĂ REZERVAREA</button>
              <p style={{textAlign:"center",marginTop:12,fontSize:12,color:C.textDim,fontStyle:"italic"}}>
                Rezervările sunt confirmate telefonic în max. 2 ore
              </p>
            </div>
          )}
        </section>

        {/* ── CONTACT ── */}
        <section ref={el=>sectionRefs.current.contact=el} data-section="contact"
          style={{padding:isMobile?"64px 16px":"100px 24px",maxWidth:1100,margin:"0 auto"}}
        >
          <SectionTitle glyph="◎" label="CONTACT" subtitle="Găsește-ne"/>

          <div className="contact-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:44}}>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>

              {/* Program */}
              <div style={{...glass({padding:"24px 22px"})}}>
                <Sheen/>
                <div style={{fontSize:10,letterSpacing:"0.22em",color:C.olive,fontFamily:"'Cormorant SC',serif",marginBottom:14}}>◷ PROGRAM</div>
                {PROGRAM.map(({zi,ore})=>(
                  <div key={zi} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                    <span style={{fontSize:"clamp(14px,3vw,16px)",color:C.textMuted,fontWeight:300}}>{zi}</span>
                    <span style={{fontSize:"clamp(14px,3vw,16px)",color:C.text,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.06em"}}>{ore}</span>
                  </div>
                ))}
              </div>

              {/* Info cu iconite noi */}
              <div style={{...glass({padding:"22px"})}}>
                <Sheen/>
                <div style={{fontSize:10,letterSpacing:"0.22em",color:C.olive,fontFamily:"'Cormorant SC',serif",marginBottom:14}}>◎ INFO</div>
                {[
                  {icon: <IconPin />, text:"Culturii Nr. 1, Baia Mare, România"},
                  {icon: <IconPhone />, text:"0736 385 167"},
                  {icon: <IconMail />, text:"contact@boho.ro"},
                  {icon: <IconInsta />, text:"@boho.baimare"},
                ].map(({icon,text}, i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                    <div style={{width: 20, display: "flex", justifyContent: "center", flexShrink:0}}>{icon}</div>
                    <span style={{fontSize:"clamp(14px,2.8vw,16px)",color:C.textMuted,fontWeight:300}}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Message form */}
              <div style={{...glass({padding:"24px 22px"})}}>
                <Sheen/>
                <div style={{fontSize:10,letterSpacing:"0.22em",color:C.olive,fontFamily:"'Cormorant SC',serif",marginBottom:16}}>◈ TRIMITE MESAJ</div>
                {contactSent ? (
                  <p style={{fontSize:15,color:C.oliveLight,fontStyle:"italic",textAlign:"center",padding:"14px 0"}}>Mesaj trimis! Vă răspundem în 24h. ◈</p>
                ) : (
                  <>
                    <div style={{display:"flex",flexDirection:"column",gap:12}}>
                      {[{k:"name",ph:"Numele tău"},{k:"email",ph:"email@exemplu.ro"}].map(f=>(
                        <input key={f.k} placeholder={f.ph} value={contactForm[f.k]} onChange={e=>setContactForm(p=>({...p,[f.k]:e.target.value}))}
                          style={{width:"100%",padding:"12px 16px",height:"48px",boxSizing:"border-box",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:10,color:C.text,fontSize:16,fontStyle:"italic"}}
                        />
                      ))}
                      <textarea rows={3} placeholder="Mesajul tău..." value={contactForm.msg} onChange={e=>setContactForm(p=>({...p,msg:e.target.value}))}
                        style={{width:"100%",padding:"12px 16px",boxSizing:"border-box",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:10,color:C.text,fontSize:16,resize:"none",fontStyle:"italic"}}
                      />
                    </div>
                    <button className="btn-press" onClick={()=>{if(contactForm.name&&contactForm.email)setContactSent(true);}} style={{
                      width:"100%",marginTop:16,padding:"16px",
                      background:"rgba(122,138,46,0.14)",backdropFilter:"blur(20px)",
                      border:"1px solid rgba(122,138,46,0.28)",borderRadius:10,
                      color:C.oliveLight,fontSize:11,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.18em",
                    }}>TRIMITE MESAJUL</button>
                  </>
                )}
              </div>
            </div>

            {/* Map */}
            <div style={{...glass({padding:0,minHeight:400,overflow:"hidden"})}}>
              <div style={{width:"100%",height:"100%",minHeight:400,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,background:"linear-gradient(145deg,rgba(122,138,46,0.07),rgba(10,10,6,0.95))",position:"relative"}}>
                {/* grid lines */}
                <div style={{position:"absolute",inset:0,opacity:0.05}}>
                  {Array.from({length:10}).map((_,i)=><div key={i} style={{position:"absolute",left:0,right:0,top:`${i*11}%`,height:1,background:C.olive}}/>)}
                  {Array.from({length:8}).map((_,i)=><div key={i} style={{position:"absolute",top:0,bottom:0,left:`${i*14.3}%`,width:1,background:C.olive}}/>)}
                </div>
                <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(122,138,46,0.18)",border:"2px solid rgba(122,138,46,0.5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,color:C.oliveLight,boxShadow:"0 0 36px rgba(122,138,46,0.28)",animation:"orbPulse 2.5s ease-in-out infinite",fontFamily:"'Cormorant SC',serif"}}>◎</div>
                <div style={{textAlign:"center",padding:"0 24px",zIndex:1}}>
                  <div style={{fontSize:"clamp(17px,3.5vw,19px)",fontWeight:400,fontStyle:"italic",color:C.text,marginBottom:5}}>Böho Brasserie</div>
                  <div style={{fontSize:"clamp(13px,2.5vw,15px)",color:C.textMuted,fontWeight:300}}>Culturii Nr. 1, Baia Mare</div>
                  <a href="https://maps.google.com/?q=Strada+Culturii+1,+Baia+Mare" target="_blank" rel="noopener noreferrer"
                    style={{display:"inline-block",marginTop:16,background:"rgba(122,138,46,0.14)",border:"1px solid rgba(122,138,46,0.28)",borderRadius:50,padding:"12px 24px",color:C.oliveLight,fontSize:10,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.16em",textDecoration:"none"}}
                  >DESCHIDE ÎN MAPS</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{borderTop:"1px solid rgba(122,138,46,0.1)",padding:"44px 24px",textAlign:"center",position:"relative",zIndex:1}}>
          <BohoMark size={36} color={C.oliveDim}/>
          <div style={{fontSize:16,fontFamily:"'Cormorant SC',serif",fontWeight:300,letterSpacing:"0.2em",color:C.textDim,marginTop:12}}>BÖHO BRASSERIE</div>
          <div style={{fontSize:9,letterSpacing:"0.24em",color:"rgba(122,138,46,0.35)",marginTop:6,fontFamily:"'Cormorant SC',serif"}}>BAIA MARE · MARAMUREȘ · ROMÂNIA</div>
          <div style={{marginTop:20,display:"flex",justifyContent:"center",gap:20}}>
            {["Instagram","Facebook","TripAdvisor"].map(s=>(
              <span key={s} style={{fontSize:10,letterSpacing:"0.16em",color:C.textDim,fontFamily:"'Cormorant SC',serif",cursor:"pointer"}}>{s.toUpperCase()}</span>
            ))}
          </div>
          <div style={{marginTop:20,fontSize:11,color:"rgba(255,255,255,0.08)",fontStyle:"italic"}}>
            © {new Date().getFullYear()} Böho Brasserie
          </div>
        </footer>
      </div>

      {/* ════════════════════════════════════════════════════════
         MOBILE BOTTOM NAV
      ════════════════════════════════════════════════════════ */}
      {showBottomNav && (
        <div style={{
          position:"fixed",bottom:0,left:0,right:0,zIndex:300,
          padding:"0 12px 10px",
          background:`linear-gradient(to top, rgba(8,8,4,0.98) 55%, transparent)`,
        }}>
          <div style={{
            background:"rgba(18,18,12,0.62)",
            backdropFilter:"blur(60px) saturate(2.4) brightness(1.14)",
            WebkitBackdropFilter:"blur(60px) saturate(2.4) brightness(1.14)",
            borderRadius:28,
            border:"1px solid rgba(255,255,255,0.11)",
            padding:"10px 6px",
            display:"flex",justifyContent:"space-around",
            boxShadow:"0 16px 60px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.14)",
            position:"relative",overflow:"hidden",
          }}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent 3%,rgba(255,255,255,0.2) 30%,rgba(255,255,255,0.35) 50%,rgba(255,255,255,0.2) 70%,transparent 97%)"}}/>
            <div style={{position:"absolute",top:0,left:0,bottom:0,width:1,background:"linear-gradient(180deg,rgba(255,255,255,0.1),transparent 50%)"}}/>
            <div style={{position:"absolute",top:0,right:0,bottom:0,width:1,background:"linear-gradient(180deg,rgba(255,255,255,0.1),transparent 50%)"}}/>

            {BOTTOM_NAV.map(item => {
              const isActive = activeSection===item.id;
              return (
                <button
                  key={item.id}
                  className="btn-press"
                  onClick={()=>scrollTo(item.id)}
                  style={{
                    flex:1,
                    display:"flex",flexDirection:"column",alignItems:"center",gap:4,
                    padding:"8px 2px",
                    background:isActive?"rgba(122,138,46,0.16)":"transparent",
                    backdropFilter:isActive?"blur(20px)":"none",
                    borderRadius:20,
                    border:isActive?"1px solid rgba(122,138,46,0.3)":"1px solid transparent",
                    cursor:"pointer",position:"relative",
                    boxShadow:isActive?"0 2px 18px rgba(122,138,46,0.2), inset 0 1px 0 rgba(255,255,255,0.1)":"none",
                    transition:"all 0.22s cubic-bezier(0.34,1.3,0.64,1)",
                  }}
                >
                  <span style={{
                    fontSize:isActive?22:19,
                    color:isActive?C.oliveLight:C.textDim,
                    transition:"all 0.2s ease",
                    fontFamily:"'Cormorant SC',serif",
                    display:"block",
                    filter:isActive?`drop-shadow(0 0 5px rgba(122,138,46,0.55))`:"none",
                    transform:isActive?"scale(1.1)":"scale(1)",
                  }}>{item.glyph}</span>
                  <span style={{
                    fontSize:10, // Font mai vizibil pe mobile nav
                    color:isActive?C.oliveLight:C.textDim,
                    fontWeight:isActive?500:400,
                    letterSpacing:"0.12em",
                    fontFamily:"'Cormorant SC',serif",
                    transition:"color 0.2s ease",
                  }}>{item.label.toUpperCase()}</span>
                </button>
              );
            })}

            {/* Cart tab */}
            {totalQty>0&&(
              <button
                className="btn-press"
                onClick={()=>setCartOpen(true)}
                style={{
                  flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,
                  padding:"8px 2px",
                  background:"rgba(200,169,110,0.14)",
                  backdropFilter:"blur(20px)",
                  borderRadius:20,
                  border:"1px solid rgba(200,169,110,0.28)",
                  cursor:"pointer",position:"relative",
                  transition: "all 0.3s ease",
                  animation: cartAnim ? "cartBump 0.4s ease-in-out" : "none",
                }}
              >
                <span style={{fontSize:19,color:C.gold,fontFamily:"'Cormorant SC',serif"}}>◈</span>
                <span style={{fontSize:10,color:C.gold,letterSpacing:"0.1em",fontFamily:"'Cormorant SC',serif"}}>{totalQty} · {totalPrice}L</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
         CART DRAWER (CU LOGICA DE MASA QR)
      ════════════════════════════════════════════════════════ */}
      {cartOpen&&(
        <div onClick={closeCartAndReset} style={{position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,0.72)",backdropFilter:"blur(14px)",display:"flex",justifyContent:"flex-end"}}>
          <div onClick={e=>e.stopPropagation()} style={{
            width:"min(420px,100vw)",height:"100%",
            background:"rgba(12,12,8,0.78)",
            backdropFilter:"blur(60px) saturate(2.2) brightness(1.1)",
            WebkitBackdropFilter:"blur(60px) saturate(2.2) brightness(1.1)",
            borderLeft:"1px solid rgba(255,255,255,0.1)",
            padding:"28px 22px",
            display:"flex",flexDirection:"column",overflowY:"auto",
            animation:"slideRight 0.38s cubic-bezier(0.34,1.2,0.64,1)",
            boxShadow:"-16px 0 60px rgba(0,0,0,0.6)",
            position:"relative",
          }}>
            <div style={{position:"absolute",top:0,left:0,bottom:0,width:1,background:"linear-gradient(180deg,rgba(255,255,255,0.1),transparent 60%)"}}/>
            
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
              <div>
                <div style={{fontSize:20,fontFamily:"'Cormorant SC',serif",fontWeight:400,letterSpacing:"0.15em",color:C.text}}>
                  {orderFlow === "cart" ? "COMANDA MEA" : "FINALIZARE"}
                </div>
                {orderFlow === "cart" && <div style={{fontSize:13,color:C.textDim,marginTop:3,fontStyle:"italic"}}>{totalQty} preparate selectate</div>}
              </div>
              <button onClick={closeCartAndReset} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:50,width:38,height:38,color:C.textMuted,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
            </div>

            {/* FLOW 1: COȘUL NORMAL */}
            {orderFlow === "cart" && (
              <>
                <div style={{flex:1}}>
                  {cart.length===0 ? (
                    <div style={{textAlign:"center",padding:"50px 0",color:C.textDim,fontStyle:"italic",fontSize:16}}>Coșul este gol</div>
                  ) : cart.map(item=>(
                    <div key={item.id} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:12,position:"relative",overflow:"hidden"}}>
                      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)"}}/>
                      <div style={{flex:1}}>
                        <div style={{fontSize:16,fontWeight:500,color:C.text,fontFamily:"'Cormorant Garamond',serif"}}>{item.name}</div>
                        <div style={{fontSize:15,color:C.gold,marginTop:4,fontWeight:300,fontFamily:"'Cormorant Garamond',serif"}}>{item.price*item.qty} lei</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <button onClick={()=>removeFromCart(item.id)} style={{width:28,height:28,borderRadius:50,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:C.textMuted,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"sans-serif"}}>−</button>
                        <span style={{fontSize:16,fontWeight:600,color:C.text,minWidth:16,textAlign:"center",fontFamily:"sans-serif"}}>{item.qty}</span>
                        <button onClick={()=>addToCart(item)} style={{width:28,height:28,borderRadius:50,background:"rgba(122,138,46,0.14)",border:"1px solid rgba(122,138,46,0.28)",color:C.oliveLight,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",fontFamily:"sans-serif"}}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
                {cart.length>0&&(
                  <div style={{paddingTop:18,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                    {[["Subtotal",`${totalPrice} lei`],["Taxă serviciu 10%",`${Math.round(totalPrice*0.1)} lei`]].map(([k,v])=>(
                      <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                        <span style={{fontSize:14,color:C.textMuted,fontStyle:"italic",fontWeight:300}}>{k}</span>
                        <span style={{fontSize:14,color:C.text}}>{v}</span>
                      </div>
                    ))}
                    <div style={{display:"flex",justifyContent:"space-between",margin:"16px 0 24px",padding:"14px 0",borderTop:"1px solid rgba(122,138,46,0.18)"}}>
                      <span style={{fontSize:16,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.1em"}}>TOTAL</span>
                      <span style={{fontSize:22,fontWeight:300,color:C.gold,fontFamily:"'Cormorant Garamond',serif"}}>{Math.round(totalPrice*1.1)} lei</span>
                    </div>
                    <button className="btn-press" onClick={handleCheckoutClick} style={{width:"100%",padding:"16px",background:"linear-gradient(135deg,rgba(122,138,46,0.88),rgba(80,94,28,0.85))",backdropFilter:"blur(20px)",border:"1px solid rgba(122,138,46,0.4)",borderRadius:13,color:C.text,fontSize:13,fontFamily:"'Cormorant SC',serif",fontWeight:500,letterSpacing:"0.2em",boxShadow:"0 8px 28px rgba(122,138,46,0.35),inset 0 1px 0 rgba(255,255,255,0.1)"}}>
                      TRIMITE COMANDA
                    </button>
                  </div>
                )}
              </>
            )}

            {/* FLOW 2: ÎNTREABĂ MASA (Dacă n-a scanat QR-ul) */}
            {orderFlow === "table_input" && (
              <div style={{flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", animation:"fadeUp 0.3s ease"}}>
                <div style={{...glass({padding:"32px 24px", width:"100%", textAlign:"center"})}}>
                  <Sheen/>
                  <div style={{fontSize:28,color:C.olive,marginBottom:12,fontFamily:"'Cormorant SC',serif"}}>◈</div>
                  <h3 style={{fontSize:"clamp(20px,4.5vw,24px)",fontWeight:300,fontStyle:"italic",color:C.text,marginBottom:16}}>Unde vă aflați?</h3>
                  <p style={{fontSize:15,color:C.textMuted,lineHeight:1.6,marginBottom:24,fontWeight:300}}>
                    Nu am putut detecta numărul mesei. Vă rugăm să îl introduceți manual.
                  </p>
                  
                  <input type="number" value={manualTable} onChange={e=>setManualTable(e.target.value)} placeholder="Ex: 5"
                    style={{width:"100%",height:"56px",textAlign:"center",padding:"12px",boxSizing:"border-box",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:11,color:C.text,fontSize:20,fontFamily:"sans-serif",marginBottom:24}}
                  />

                  <button className="btn-press" onClick={()=>{
                    if(manualTable) {
                      setTableNumber(manualTable);
                      setOrderFlow("success");
                    }
                  }} style={{width:"100%",padding:"16px",background:"linear-gradient(135deg,rgba(122,138,46,0.88),rgba(80,94,28,0.85))",border:"1px solid rgba(122,138,46,0.4)",borderRadius:13,color:C.text,fontSize:12,fontFamily:"'Cormorant SC',serif",fontWeight:500,letterSpacing:"0.2em"}}>
                    CONFIRMĂ MASA
                  </button>
                </div>
              </div>
            )}

            {/* FLOW 3: SUCCES */}
            {orderFlow === "success" && (
              <div style={{flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", animation:"fadeUp 0.3s ease"}}>
                <div style={{textAlign:"center", padding: "0 20px"}}>
                  <div style={{width:80,height:80,margin:"0 auto 24px",background:"rgba(122,138,46,0.1)",border:"1px solid rgba(122,138,46,0.3)",borderRadius:50,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,color:C.oliveLight,boxShadow:"0 0 40px rgba(122,138,46,0.2)"}}>✓</div>
                  <h3 style={{fontSize:"clamp(24px,5vw,28px)",fontWeight:300,fontStyle:"italic",color:C.text,marginBottom:12}}>Comandă Trimisă!</h3>
                  <p style={{fontSize:16,color:C.textMuted,lineHeight:1.7,fontWeight:300, marginBottom: 8}}>
                    Bucătăria a preluat comanda.
                  </p>
                  <div style={{fontSize:14,color:C.gold,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.1em", padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", margin: "20px 0 30px"}}>
                    PENTRU MASA {tableNumber}
                  </div>
                  <button className="btn-press" onClick={closeCartAndReset} style={{width:"100%",padding:"16px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:50,color:C.text,fontSize:12,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.15em"}}>
                    ÎNCHIDE COȘUL
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
         MENU ITEM MODAL
      ════════════════════════════════════════════════════════ */}
      {menuModal&&(()=>{
        const cat=MENU_DATA.find(c=>c.items.some(i=>i.id===menuModal.id));
        return(
          <div onClick={()=>setMenuModal(null)} style={{position:"fixed",inset:0,zIndex:500,background:"rgba(0,0,0,0.76)",backdropFilter:"blur(16px)",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
            <div onClick={e=>e.stopPropagation()} style={{
              width:"min(560px,100vw)",
              background:"rgba(14,14,8,0.82)",
              backdropFilter:"blur(60px) saturate(2.2) brightness(1.12)",
              WebkitBackdropFilter:"blur(60px) saturate(2.2) brightness(1.12)",
              border:"1px solid rgba(255,255,255,0.11)",
              borderTopLeftRadius:34,borderTopRightRadius:34,
              padding: `26px 28px ${showBottomNav ? bottomNavH + 28 : 48}px`,
              animation:"sheetUp 0.38s cubic-bezier(0.34,1.4,0.64,1)",
              boxShadow:"0 -24px 80px rgba(0,0,0,0.7),inset 0 1px 0 rgba(255,255,255,0.12)",
              position:"relative",overflow:"hidden",
            }}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent 5%,rgba(255,255,255,0.22) 30%,rgba(255,255,255,0.34) 50%,rgba(255,255,255,0.22) 70%,transparent 95%)"}}/>
              <div style={{width:42,height:4,background:"rgba(255,255,255,0.15)",borderRadius:2,margin:"0 auto 26px"}}/>
              <div style={{textAlign:"center",marginBottom:28}}>
                <div style={{width:68,height:68,margin:"0 auto 20px",background:"rgba(122,138,46,0.1)",border:"1px solid rgba(122,138,46,0.22)",borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,color:C.olive,fontFamily:"'Cormorant SC',serif"}}>{cat?.glyph||"◉"}</div>
                <div style={{fontSize:"clamp(20px,5vw,26px)",fontWeight:400,color:C.text,fontFamily:"'Cormorant Garamond',serif",letterSpacing:"0.03em",marginBottom:10}}>{menuModal.name}</div>
                <div style={{fontSize:"clamp(14px,3vw,16px)",color:C.textMuted,lineHeight:1.8,maxWidth:340,margin:"0 auto 16px",fontWeight:300,fontStyle:"italic"}}>{menuModal.desc}</div>
                <div style={{fontSize:"clamp(24px,6vw,30px)",fontWeight:300,color:C.gold,fontFamily:"'Cormorant Garamond',serif"}}>{menuModal.price} <span style={{fontSize:16}}>lei</span></div>
              </div>
              <button className="btn-press" onClick={()=>{addToCart(menuModal);setMenuModal(null);}} style={{
                width:"100%",padding:"18px",
                background:"linear-gradient(135deg,rgba(122,138,46,0.88),rgba(80,94,28,0.85))",
                backdropFilter:"blur(20px)",border:"1px solid rgba(122,138,46,0.4)",borderRadius:15,
                color:C.text,fontSize:13,fontFamily:"'Cormorant SC',serif",fontWeight:500,letterSpacing:"0.18em",
                boxShadow:"0 8px 28px rgba(122,138,46,0.4),inset 0 1px 0 rgba(255,255,255,0.12)",
              }}>ADAUGĂ ÎN COMANDĂ — {menuModal.price} LEI</button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}