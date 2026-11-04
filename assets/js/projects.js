(() => {
'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const segmenter=typeof Intl.Segmenter==='function'?new Intl.Segmenter('es',{granularity:'grapheme'}):null;
const split=s=>segmenter?[...segmenter.segment(s)].map(x=>x.segment):Array.from(s);
const cards=[...document.querySelectorAll('.project-card')].map(el=>({el,image:el.querySelector('.app-image'),shutter:el.querySelector('.shutter'),stack:el.querySelector('.title-stack'),title:el.querySelector('h3'),subtitle:el.querySelector('.subtitle'),rule:el.querySelector('.rule'),button:el.querySelector('.ver-proyecto'),copy:el.querySelector('.copy'),visual:el.querySelector('.visual-copy'),phase:el.querySelector('.card-status'),version:0,animations:[],frame:0,visible:0,chars:[]}));
const compact=matchMedia('(max-width:760px)');
function centerGroup(c){if(c.el.dataset.state!=='closed')return;const b=c.el.getBoundingClientRect(),t=c.title.getBoundingClientRect(),a=c.button.getBoundingClientRect(),current=parseFloat(c.el.style.getPropertyValue('--center-shift'))||0,offset=b.top+b.height/2-(t.top+a.bottom)/2+current;c.el.style.setProperty('--center-shift',offset.toFixed(3)+'px');}
function fitFlow(c){
 // Floats do not contribute their own height to the paragraph. Iterate the
 // measured line wrapping until the reserved mobile height settles.
 const layoutWidth=c.el.clientWidth;
 if(c.layoutWidth!==undefined&&c.layoutWidth!==layoutWidth){
  // Reflow from the same CSS defaults as a fresh load at this width.
  // Measuring with a float from the previous orientation can push words
  // below that float and permanently inflate the reserved paragraph height.
  for(const prop of ['--flow-width','--flow-height','--flow-cut','--center-shift'])c.el.style.removeProperty(prop);
  c.copy.style.removeProperty('height');
 }
 let reserve=c.layoutWidth===layoutWidth?c.copy.getBoundingClientRect().height:0;
 c.layoutWidth=layoutWidth;
 for(let i=0;i<12;i++){
  reserve=Math.max(reserve,c.visual.getBoundingClientRect().height);
  c.copy.style.height=reserve+"px";
  const before=c.el.clientHeight,style=getComputedStyle(c.el),width=c.el.clientWidth;
  const top=parseFloat(style.getPropertyValue('--open-top')),bottom=parseFloat(style.getPropertyValue('--open-bottom'));
  const inset=width*parseFloat(style.getPropertyValue('--left'))/100;
  const gap=inset*Math.sqrt(1+Math.pow((top-bottom)*width/before,2));
  const y=c.stack.offsetTop+c.copy.offsetTop;
  c.el.style.setProperty('--flow-width',((1-bottom)*width-inset+gap).toFixed(3)+'px');
  c.el.style.setProperty('--flow-height',Math.max(1,before-y).toFixed(3)+'px');
  c.el.style.setProperty('--flow-cut',Math.max(0,(top-bottom)*width*(1-y/before)).toFixed(3)+'px');
  if(Math.abs(c.el.clientHeight-before)<.25&&c.visual.getBoundingClientRect().height<=reserve+.25)break;
 }
 centerGroup(c);
}
let resizeFrame=0;
addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{for(const c of cards)fitFlow(c);});},{passive:true});
const timing=()=>({duration:1280,easing:'cubic-bezier(.22,.62,.21,1)',fill:'both'});
function cancel(c){c.version++;cancelAnimationFrame(c.frame);c.frame=0;for(const animation of c.animations)animation.cancel();c.animations=[];}
function prepare(c){
 const text=c.visual.textContent;c.visual.replaceChildren();c.chars=[];
 for(const token of text.split(/(\s+)/u).filter(Boolean)){
  const group=/^\s+$/u.test(token)?c.visual:document.createElement('span');
  if(group!==c.visual){group.className='word';c.visual.append(group);}
  for(const letter of split(token)){const span=document.createElement('span');span.className='char';span.textContent=letter;group.append(span);c.chars.push(span);}
 }
}
function complete(c){c.el.dataset.state='open';c.phase.textContent='Descripción completa.';}
function type(c,version){
 if(c.version!==version)return;c.copy.hidden=false;c.el.dataset.state='typing';c.phase.textContent='Descripción de '+c.title.textContent+'.';
 if(reduced.matches){for(const letter of c.chars)letter.className='char static';c.visible=c.chars.length;complete(c);return;}
 const start=performance.now();
 // One sweep starts with the first lit grapheme and outlasts its final glow.
 const textDuration=Math.max(0,c.chars.length-1)*8+150;
 c.el.style.setProperty('--rim-duration',Math.max(3200,textDuration+1000)+'ms');
 c.el.classList.add('rim-running');
 function frame(now){
  if(c.version!==version)return;const elapsed=now-start,target=Math.min(c.chars.length,1+Math.floor(elapsed/8));
  while(c.visible<target){const i=c.visible++,letter=c.chars[i];letter.classList.add('lit');letter.style.animationDelay=Math.min(0,i*8-elapsed)+'ms';}
  if(elapsed<Math.max(0,c.chars.length-1)*8+150)c.frame=requestAnimationFrame(frame);else{c.frame=0;complete(c);}
 }
 c.frame=requestAnimationFrame(frame);
}
function motion(c,fromClip,toClip,fromFilter,toFilter,fromOpacity,toOpacity,moving,old){
 const t=timing();c.animations.push(c.shutter.animate([{clipPath:fromClip},{clipPath:toClip}],t));
 c.animations.push(c.image.animate([{filter:fromFilter,opacity:fromOpacity},{filter:toFilter,opacity:toOpacity}],t));
 moving.forEach((el,i)=>{const end=el.getBoundingClientRect(),dx=old[i].left-end.left,dy=old[i].top-end.top;c.animations.push(el.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:'translate(0,0)'}],t));});
}
async function open(c){
 if(c.el.dataset.state!=='closed')return;
 const version=++c.version,moving=[c.title,c.subtitle,c.rule],old=moving.map(el=>el.getBoundingClientRect()),styles=getComputedStyle(c.el),base=styles.getPropertyValue('--base-clip').trim(),opened=styles.getPropertyValue('--open-clip').trim();
 c.button.hidden=true;c.button.setAttribute('aria-expanded','true');c.el.classList.add('expanded');c.el.dataset.state='opening';c.phase.textContent='Abriendo '+c.title.textContent+'.';
 if(!reduced.matches&&typeof c.shutter.animate==='function'){
  motion(c,base,opened,'grayscale(1) saturate(0) brightness(.48)','grayscale(0) saturate(1) brightness(1)',.76,1,moving,old);
  try{await Promise.all(c.animations.map(a=>a.finished));}catch{return;}
 }
 if(c.version!==version)return;for(const animation of c.animations)animation.cancel();c.animations=[];
 c.title.focus({preventScroll:true});type(c,version);
}
for(const c of cards){prepare(c);fitFlow(c);c.button.addEventListener('click',()=>open(c));}
function finishOpen(c){if(c.el.dataset.state!=='opening'&&c.el.dataset.state!=='typing')return;cancel(c);c.el.classList.add('expanded');c.button.hidden=true;c.button.setAttribute('aria-expanded','true');c.copy.hidden=false;for(const span of c.chars)span.className='char static';c.visible=c.chars.length;complete(c);}
compact.addEventListener('change',()=>{for(const c of cards){finishOpen(c);fitFlow(c);}});
const nav=document.querySelector('#primary-nav'),toggle=document.querySelector('.menu-toggle');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
toggle.addEventListener('click',()=>{const state=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(state));});nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});addEventListener('resize',()=>{if(innerWidth>760)closeMenu();},{passive:true});
if('IntersectionObserver' in window&&!reduced.matches){
 document.documentElement.classList.add('motion-ready');
 const io=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}},{threshold:.08});
 document.querySelectorAll('.project-item').forEach(el=>io.observe(el));
}else document.querySelectorAll('.project-item').forEach(el=>el.classList.add('is-visible'));
if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduced.matches){
 for(const c of cards){let scheduled=0,last;
  c.el.addEventListener('pointermove',event=>{last=event;if(scheduled)return;scheduled=requestAnimationFrame(()=>{scheduled=0;const bounds=c.el.getBoundingClientRect();c.el.style.setProperty('--spot-x',((last.clientX-bounds.left)/bounds.width*100).toFixed(1)+'%');c.el.style.setProperty('--spot-y',((last.clientY-bounds.top)/bounds.height*100).toFixed(1)+'%');});},{passive:true});
  c.el.addEventListener('pointerleave',()=>{cancelAnimationFrame(scheduled);scheduled=0;c.el.style.removeProperty('--spot-x');c.el.style.removeProperty('--spot-y');});
 }
}
reduced.addEventListener('change',()=>{for(const c of cards)finishOpen(c);});
document.addEventListener('visibilitychange',()=>{if(document.hidden)for(const c of cards)finishOpen(c);});
if(document.fonts?.ready)document.fonts.ready.then(()=>{for(const c of cards)fitFlow(c);});
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
})();
