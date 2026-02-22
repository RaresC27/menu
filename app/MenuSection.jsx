// MenuSection.jsx
"use client";
import { useState } from "react";
import { C, MENU_DATA, TAG_S } from "./data";
import { SectionTitle, glass, Sheen } from "./ui";

export default function MenuSection({ isMobile, cart, addToCart, setMenuModal, addedAnim, menuRef, setCartOpen }) {
  const [menuTab, setMenuTab] = useState(MENU_DATA[0].id);

  const activeCategory = MENU_DATA.find(c => c.id === menuTab);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <section ref={menuRef} data-section="menu" style={{padding:isMobile?"64px 0 0":"100px 0 0",position:"relative"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px"}}>
        <SectionTitle glyph="◉" label="MENIU" subtitle="Preparatele Noastre"/>
      </div>

      {/* Tabs Menu */}
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
            const active = menuTab === cat.id;
            return (
              <button 
                key={cat.id} 
                className="pill" 
                onClick={() => setMenuTab(cat.id)}
                style={{
                  flexShrink:0,padding:isMobile?"8px 14px":"9px 20px",borderRadius:50,
                  background:active?"rgba(122,138,46,0.18)":"rgba(255,255,255,0.04)",
                  backdropFilter:"blur(20px)",
                  border:active?"1px solid rgba(122,138,46,0.4)":"1px solid rgba(255,255,255,0.07)",
                  color:active?C.oliveLight:C.textMuted,
                  fontSize:isMobile?11:12,fontFamily:"'Cormorant SC',serif",
                  fontWeight:active?500:400,letterSpacing:"0.13em",
                  whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:7,
                  boxShadow:active?"0 0 18px rgba(122,138,46,0.2),inset 0 1px 0 rgba(255,255,255,0.08)":"inset 0 1px 0 rgba(255,255,255,0.04)",
              }}>
                <span style={{fontSize:10}}>{cat.glyph}</span>
                {cat.label.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preparatele Categoriei Active */}
      <div style={{maxWidth:1100, margin:"0 auto", padding:`0 ${isMobile ? 12 : 24}px 32px`, minHeight:"400px"}}>
        <div style={{paddingTop:32, animation: "fadeUp 0.3s ease"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
            <span style={{fontSize:18,color:C.olive,fontFamily:"'Cormorant SC',serif"}}>{activeCategory.glyph}</span>
            <span style={{fontSize:"clamp(16px,4vw,20px)",fontFamily:"'Cormorant SC',serif",fontWeight:500,letterSpacing:"0.16em",color:C.text}}>{activeCategory.label.toUpperCase()}</span>
            <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(122,138,46,0.28) 0%,transparent 80%)"}}/>
          </div>
          
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>
            {activeCategory.items.map(item => {
              const inCart = cart.find(c=>c.id===item.id);
              const tStyle = TAG_S[item.tag]||TAG_S.Clasic;
              const popping = addedAnim===item.id;
              
              return (
                <div key={item.id} className="item-card" onClick={()=>setMenuModal(item)}
                  style={{
                    background:inCart?"rgba(122,138,46,0.08)":"rgba(255,255,255,0.03)",
                    backdropFilter:"blur(48px) saturate(2)",
                    border:inCart?"1px solid rgba(122,138,46,0.28)":"1px solid rgba(255,255,255,0.07)",
                    borderRadius:18,padding:"16px 16px 14px",
                    display:"flex",gap:14,alignItems:"flex-start",
                    position:"relative",overflow:"hidden",
                    boxShadow:inCart?"0 6px 32px rgba(0,0,0,0.4),inset 0 1px 0 rgba(122,138,46,0.12)":"0 4px 24px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent 5%,rgba(255,255,255,0.12) 40%,rgba(255,255,255,0.2) 50%,rgba(255,255,255,0.12) 60%,transparent 95%)"}}/>
                  <div style={{width:48,height:48,flexShrink:0,background:"rgba(122,138,46,0.08)",border:"1px solid rgba(122,138,46,0.16)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:C.olive,fontFamily:"'Cormorant SC',serif"}}>
                    {activeCategory.glyph}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8,marginBottom:4}}>
                      <div style={{fontSize:"clamp(14px,3.5vw,16px)",fontWeight:500,color:C.text,fontFamily:"'Cormorant Garamond',serif",lineHeight:1.2}}>{item.name}</div>
                      <div style={{fontSize:"clamp(15px,3.5vw,18px)",fontWeight:300,color:C.gold,flexShrink:0,fontFamily:"'Cormorant Garamond',serif"}}>{item.price}<span style={{fontSize:11}}> lei</span></div>
                    </div>
                    <div style={{fontSize:"clamp(11px,2.5vw,12px)",color:C.textMuted,lineHeight:1.6,marginBottom:10,fontWeight:300,fontStyle:"italic"}}>{item.desc}</div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{fontSize:9,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.14em",background:tStyle.bg,color:tStyle.color,border:`1px solid ${tStyle.border}`,borderRadius:20,padding:"3px 9px"}}>{item.tag.toUpperCase()}</span>
                      <button
                        className="btn-press"
                        onClick={e=>{e.stopPropagation();addToCart(item);}}
                        style={{
                          width:40,height:40,borderRadius:50,
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

        {totalQty > 0 && (
          <div style={{marginTop:28,...glass({padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,animation:"fadeUp 0.4s ease"})}}>
            <Sheen/>
            <div>
              <span style={{fontSize:12,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.1em",color:C.text}}>{totalQty} PREPARATE</span>
              <span style={{marginLeft:12,fontSize:"clamp(16px,4vw,18px)",fontWeight:300,color:C.gold,fontFamily:"'Cormorant Garamond',serif"}}>{totalPrice} lei</span>
            </div>
            <button className="btn-press" onClick={()=>setCartOpen(true)} style={{
              background:"linear-gradient(135deg,rgba(122,138,46,0.85),rgba(80,94,28,0.8))",
              border:"1px solid rgba(122,138,46,0.4)",borderRadius:50,padding:"10px 22px",
              color:C.text,fontSize:10,fontFamily:"'Cormorant SC',serif",letterSpacing:"0.16em",
              boxShadow:"0 4px 18px rgba(122,138,46,0.3),inset 0 1px 0 rgba(255,255,255,0.1)",
            }}>FINALIZEAZĂ COMANDA</button>
          </div>
        )}
      </div>
    </section>
  );
}