// data.js
export const C = {
  olive:       "#7a8a2e",
  oliveLight:  "#9aaa3a",
  oliveDim:    "#5a6620",
  gold:        "#c8a96e",
  goldLight:   "#e0c48a",
  dark1:       "#0a0a06",
  dark2:       "#111108",
  dark3:       "#181810",
  text:        "#f0ede6",
  textMuted:   "rgba(240,237,230,0.5)",
  textDim:     "rgba(240,237,230,0.28)",
};

export const MENU_DATA = [
  { id:"starters", label:"Aperitive", glyph:"◈", items:[
    {id:1,  name:"Hummus cu Pita Caldă",        desc:"Năut, tahini, lămâie, ulei de măsline, chilli flakes",    price:28, tag:"Veg"},
    {id:2,  name:"Carpaccio de Vită",            desc:"Carne maturată, rucola, trufe negre, parmezan 36 luni",  price:48, tag:"Chef"},
    {id:3,  name:"Supă Miso cu Shiitake",        desc:"Shiitake, tofu, wakame, ghimbir, ceapă verde",           price:32, tag:"Sezon"},
    {id:4,  name:"Tartare de Somon Atlantic",    desc:"Somon, avocado, ikura, sesam negru, lime, ponzu",        price:52, tag:"Premium"},
  ]},
  { id:"mains", label:"Principale", glyph:"◉", items:[
    {id:5,  name:"Risotto Trufe & Porcini",      desc:"Arborio, parmezan aged, trufe albe, vin alb sec",        price:74, tag:"Chef"},
    {id:6,  name:"Doradă Mediteraneană",         desc:"Pește întreg la cuptor, capere, rozmarin, lămâie",       price:78, tag:"Proaspăt"},
    {id:7,  name:"Rack de Miel cu Ierburi",      desc:"Miel local, jus rozmarin, piure rădăcinoase",            price:92, tag:"Premium"},
    {id:8,  name:"Tagliatelle Böho",             desc:"Paste proaspete, ragu de vită 12h, pecorino",            price:58, tag:"Clasic"},
    {id:9,  name:"Burger Wagyu",                 desc:"Wagyu 180g, trufe, cheddar afumat, brioche artizanal",   price:72, tag:"Popular"},
  ]},
  { id:"desserts", label:"Deserturi", glyph:"◇", items:[
    {id:10, name:"Tiramisu Böho",                desc:"Mascarpone, espresso ristretto, savoiardi, cacao raw",  price:34, tag:"Clasic"},
    {id:11, name:"Crème Brûlée Tonka",           desc:"Fasole tonka, vanilie Madagascar, caramel live",        price:30, tag:"Chef"},
    {id:12, name:"Fondant Valrhona 72%",         desc:"Valrhona, caramel sărat, înghețată Bourbon",            price:38, tag:"Popular"},
    {id:13, name:"Sorbet Passionfruit",          desc:"Fruct pasiune, lychee, spumă citrice, mentă",           price:26, tag:"Veg"},
  ]},
  { id:"drinks", label:"Băuturi", glyph:"◎", items:[
    {id:14, name:"Böho Sour",                    desc:"Mezcal, lime, agave, spumă albuș, sare afumată",        price:38, tag:"Signature"},
    {id:15, name:"Garden Spritz",                desc:"Elderflower, prosecco, mentă, castravete, sifon",        price:32, tag:"Popular"},
    {id:16, name:"Fetească Neagră 2021",         desc:"Cramele Recaș, Dealu Mare, tannic, fructe negre",       price:48, tag:"Local"},
    {id:17, name:"Cold Brew Tonic",              desc:"Cold brew 48h, apă tonică, coajă portocală",             price:22, tag:"0%"},
  ]},
];

export const TAG_S = {
  Chef:      {bg:"rgba(200,169,110,0.15)",color:"#c8a96e",  border:"rgba(200,169,110,0.3)"},
  Premium:   {bg:"rgba(200,169,110,0.10)",color:"#e0c48a",  border:"rgba(200,169,110,0.22)"},
  Popular:   {bg:"rgba(122,138,46,0.15)", color:"#9aaa3a",  border:"rgba(122,138,46,0.3)"},
  Clasic:    {bg:"rgba(255,255,255,0.07)",color:"rgba(240,237,230,0.65)",border:"rgba(255,255,255,0.12)"},
  Veg:       {bg:"rgba(122,138,46,0.12)", color:"#7a8a2e",  border:"rgba(122,138,46,0.25)"},
  Sezon:     {bg:"rgba(154,170,58,0.12)", color:"#9aaa3a",  border:"rgba(154,170,58,0.25)"},
  Proaspăt:  {bg:"rgba(122,138,46,0.10)", color:"#aabb44",  border:"rgba(122,138,46,0.2)"},
  Local:     {bg:"rgba(200,169,110,0.12)",color:"#c8a96e",  border:"rgba(200,169,110,0.25)"},
  Signature: {bg:"rgba(200,169,110,0.18)",color:"#e0c48a",  border:"rgba(200,169,110,0.35)"},
  "0%":      {bg:"rgba(122,138,46,0.10)", color:"#7a8a2e",  border:"rgba(122,138,46,0.2)"},
};

export const EVENTS = [
  {glyph:"◈",title:"Private Dining",    desc:"Rezervați întregul restaurant pentru evenimente private. Meniu personalizat, decor exclusiv, pentru până la 60 persoane.", detail:"De la 150 lei / persoană · Min. 20 persoane", cta:"Solicită Ofertă"},
  {glyph:"◉",title:"Brunch de Weekend", desc:"Sâmbătă și duminică dimineață. Meniu special de brunch cu preparate exclusiviste, cocktailuri și muzică live.",             detail:"Sâmbătă & Duminică · 10:00–15:00",             cta:"Rezervă Brunch"},
  {glyph:"◎",title:"Wine & Dine",       desc:"Seri tematice lunare cu selecții de vinuri românești, ghidate de sommelier-ul nostru. Preparate speciale pentru fiecare curs.", detail:"Prima vineri a lunii · Locuri limitate",       cta:"Rezervă Loc"},
  {glyph:"◇",title:"Chef's Table",      desc:"7 cursuri la bucătărie, direct de la chef. Experiența culinară supremă, maximum 6 persoane, preparate surpriză.",            detail:"Vineri & Sâmbătă · Max. 6 persoane",          cta:"Rezervă Experiența"},
];

export const PROGRAM = [
  {zi:"Luni",     ore:"09:00 – 23:00"},
  {zi:"Marți",    ore:"09:00 – 23:00"},
  {zi:"Miercuri", ore:"09:00 – 23:00"},
  {zi:"Joi",      ore:"09:00 – 23:00"},
  {zi:"Vineri",   ore:"09:00 – 01:00"},
  {zi:"Sâmbătă",  ore:"09:00 – 02:00"},
  {zi:"Duminică", ore:"10:00 – 23:00"},
];