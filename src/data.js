// Categories are now stored inside about so they can be edited via the admin.
// CATEGORIES is kept only as a fallback default.
export const CATEGORIES = [
  "Bridal",
  "Editorial",
  "Fashion",
  "Film & TV",
  "Glam",
  "Ecomm",
  "Male Grooming",
];

export const DEFAULT_PORTFOLIO = [
  { id:"1",  category:"Bridal",        type:"image", src:"https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=1200&q=85", title:"Garden Bridal" },
  { id:"2",  category:"Bridal",        type:"image", src:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85", title:"Classic Romance" },
  { id:"3",  category:"Bridal",        type:"image", src:"https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85", title:"Soft Ceremony" },
  { id:"4",  category:"Editorial",     type:"image", src:"https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=85", title:"High Contrast" },
  { id:"5",  category:"Editorial",     type:"image", src:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85", title:"Vogue Study" },
  { id:"6",  category:"Editorial",     type:"image", src:"https://images.unsplash.com/photo-1606830733744-0ad4a3c7b5fe?w=1200&q=85", title:"Avant Garde" },
  { id:"7",  category:"Fashion",       type:"image", src:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=85", title:"Runway Prep" },
  { id:"8",  category:"Fashion",       type:"image", src:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85", title:"Backstage LFW" },
  { id:"9",  category:"Fashion",       type:"image", src:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85", title:"Studio Session" },
  { id:"10", category:"Film & TV",     type:"image", src:"https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=1200&q=85", title:"Screen Glam" },
  { id:"11", category:"Film & TV",     type:"image", src:"https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1200&q=85", title:"Character Work" },
  { id:"12", category:"Glam",          type:"image", src:"https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=85", title:"Red Carpet" },
  { id:"13", category:"Glam",          type:"image", src:"https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1200&q=85", title:"Awards Evening" },
  { id:"14", category:"Ecomm",         type:"image", src:"https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=1200&q=85", title:"Product Shoot" },
  { id:"15", category:"Ecomm",         type:"image", src:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=85", title:"Clean Beauty" },
  { id:"16", category:"Male Grooming", type:"image", src:"https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1200&q=85", title:"Sharp & Polished" },
];

export const DEFAULT_ABOUT = {
  name: "Your Name",
  title: "Makeup & Hair Artist",
  location: "London & Essex · Available Internationally",
  bio: "Ten years of artistry across film, fashion, bridal and editorial.",
  // categories drives BOTH the nav on the public site AND the dropdown in WorksManager
  categories: [
    "Bridal",
    "Editorial",
    "Fashion",
    "Film & TV",
    "Glam",
    "Ecomm",
    "Male Grooming",
  ],
  credits: ["Vogue UK","Channel 4","London Fashion Week","BBC Studios","ELLE Magazine"],
  contact: { email: "hello@yourname.co.uk", instagram: "@yourname_mua", phone: "+44 7700 000000" }
};

export const ADMIN_PASSWORD = "changeme123";

export function isAdminLoggedIn() {
  return sessionStorage.getItem('paint_admin') === 'true';
}
export function adminLogin(pw) {
  if (pw === ADMIN_PASSWORD) { sessionStorage.setItem('paint_admin','true'); return true; }
  return false;
}
export function adminLogout() {
  sessionStorage.removeItem('paint_admin');
}
