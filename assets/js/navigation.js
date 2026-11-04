(() => {
 'use strict';
 const root=document.documentElement,page=document.currentScript?.dataset.page;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const offline=window.__adesisOfflineNavigation===true;
 const key='adesis.navigation.v1';
 let leaving=false,arrival=false,failsafe=0;
 const duration=(name,fallback)=>parseFloat(getComputedStyle(root).getPropertyValue(name))||fallback;
 const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 function clear(){
  arrival=false;leaving=false;clearTimeout(failsafe);
  root.classList.remove('nav-veil','nav-arrival','nav-reveal');
 }
 function store(kind,href){
  try{sessionStorage.setItem(key,JSON.stringify({kind,href:href.split('#')[0],at:Date.now()}));}catch{}
 }
 function consume(kind){
  try{
   const raw=sessionStorage.getItem(key);if(!raw)return false;
   sessionStorage.removeItem(key);const item=JSON.parse(raw),age=Date.now()-item.at;
   return item.kind===kind&&age>=0&&age<12000&&item.href===location.href.split('#')[0];
  }catch{return false;}
 }
 function animationDone(name,limit){
  return new Promise(resolve=>{
   let timer;const finish=()=>{clearTimeout(timer);root.removeEventListener('animationend',onEnd);resolve();};
   const onEnd=event=>{if(event.target===root&&event.animationName===name)finish();};
   root.addEventListener('animationend',onEnd);timer=setTimeout(finish,limit);
  });
 }
 // This head script runs before the original welcome bootstrap.
 if(page==='home'&&!offline&&consume('home-return'))window.__adesisHomeReturn=true;
 if(page==='projects'){
  const requested=offline?window.__adesisProjectArrival===true:consume('projects-arrival');
  if(requested&&!reduced.matches){
   arrival=true;root.classList.add('nav-veil','nav-arrival');
   failsafe=setTimeout(clear,2500);
   const reveal=async()=>{
    const image=document.querySelector('.project-earth');
    const decode=image?.decode?image.decode().catch(()=>{}):Promise.resolve();
    await Promise.all([wait(duration('--nav-hold',70)),Promise.race([decode,wait(180)])]);
    requestAnimationFrame(()=>requestAnimationFrame(async()=>{
     if(!arrival)return;
     const ended=animationDone('adesis-from-black',duration('--nav-in',520)+140);
     root.classList.add('nav-reveal');await ended;clear();
    }));
   };
   if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',reveal,{once:true});else reveal();
  }
 }
 document.addEventListener('click',event=>{
  if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const link=event.target?.closest?.('a[href]');
  if(!link||link.hasAttribute('download')||(link.target&&link.target!=='_self'))return;
  const href=link.getAttribute('href');
  if(page==='projects'&&/^index\.html(?:[?#].*)?$/.test(href)){
   if(!offline)store('home-return',new URL(href,document.baseURI).href);
   return; // Immediate return. No veil, no exit animation.
  }
  if(page!=='home'||!/^proyectos\.html(?:[?#].*)?$/.test(href))return;
  event.preventDefault();event.stopImmediatePropagation();
  if(leaving)return;leaving=true;
  const animated=!reduced.matches; // Navigate immediately; only the destination fades in.
  try{
   if(offline){
    parent.postMessage({type:'adesis-navigate',page:'proyectos',anchor:href.includes('#')?'#'+href.split('#')[1]:'',arrival:animated},'*');
   }else{
    const target=new URL(href,document.baseURI);
    if(animated)store('projects-arrival',target.href);
    location.assign(target.href);
   }
  }catch{clear();}
 },true);
 addEventListener('pageshow',event=>{if(event.persisted)clear();});
})();
