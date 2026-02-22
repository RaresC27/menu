// ui.jsx
import { C } from "./data";

export const glass = (extra={}) => ({
  background:"rgba(255,255,255,0.035)",
  backdropFilter:"blur(48px) saturate(2) brightness(1.06)",
  WebkitBackdropFilter:"blur(48px) saturate(2) brightness(1.06)",
  border:"1px solid rgba(255,255,255,0.08)",
  borderRadius:20,
  position:"relative",
  overflow:"hidden",
  boxShadow:"0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.09)",
  ...extra,
});

export const Sheen = () => (
  <>
    <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent 5%,rgba(255,255,255,0.16) 40%,rgba(255,255,255,0.26) 50%,rgba(255,255,255,0.16) 60%,transparent 95%)",pointerEvents:"none"}}/>
    <div style={{position:"absolute",top:0,left:0,bottom:0,width:1,background:"linear-gradient(180deg,rgba(255,255,255,0.09),transparent 55%)",pointerEvents:"none"}}/>
  </>
);

export const BohoMark = ({size=32, color=C.oliveLight}) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <rect x="6"  y="10" width="14" height="20" rx="2" stroke={color} strokeWidth="2.5" fill="none"/>
    <rect x="9"  y="13" width="5"  height="8"  rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="15" cy="12" r="1.5" fill={color}/><circle cx="17" cy="12" r="1.5" fill={color}/>
    <rect x="24" y="6"  width="14" height="24" rx="2" stroke={color} strokeWidth="2.5" fill="none"/>
    <circle cx="31" cy="14" r="3" stroke={color} strokeWidth="1.8" fill="none"/>
    <circle cx="29" cy="8" r="1.2" fill={color}/><circle cx="31" cy="8" r="1.2" fill={color}/><circle cx="33" cy="8" r="1.2" fill={color}/>
    <rect x="34" y="22" width="14" height="18" rx="2" stroke={color} strokeWidth="2.5" fill="none"/>
    <circle cx="41" cy="29" r="2.8" stroke={color} strokeWidth="1.8" fill="none"/>
    <circle cx="39" cy="38" r="1.2" fill={color}/><circle cx="41" cy="38" r="1.2" fill={color}/><circle cx="43" cy="38" r="1.2" fill={color}/>
    <line x1="20" y1="22" x2="24" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="38" y1="22" x2="42" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const SectionTitle = ({glyph, label, subtitle}) => (
  <div style={{textAlign:"center",padding:"0 16px"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:14}}>
      <div style={{height:1,width:32,background:`linear-gradient(90deg,transparent,${C.olive})`}}/>
      <span style={{fontSize:9,letterSpacing:"0.28em",color:C.olive,fontFamily:"'Cormorant SC',serif"}}>{label}</span>
      <span style={{fontSize:12,color:C.olive,fontFamily:"'Cormorant SC',serif"}}>{glyph}</span>
      <span style={{fontSize:9,letterSpacing:"0.28em",color:C.olive,fontFamily:"'Cormorant SC',serif"}}>{label}</span>
      <div style={{height:1,width:32,background:`linear-gradient(90deg,${C.olive},transparent)`}}/>
    </div>
    <h2 style={{fontSize:"clamp(24px,5vw,40px)",fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontStyle:"italic",color:C.text,letterSpacing:"0.04em",lineHeight:1.2,margin:0}}>
      {subtitle}
    </h2>
  </div>
);  

export const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.oliveLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.oliveLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

export const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.oliveLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export const IconInsta = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.oliveLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);