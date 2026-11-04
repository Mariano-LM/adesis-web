(()=>{
'use strict';
const field=document.querySelector('.identity-field');if(!field)return;
const image=field.querySelector('.panorama-scene'),root=document.documentElement;
const scroller=document.scrollingElement||root;
const clamp=n=>Math.max(0,Math.min(1,n));
let frame=0,dirty=true,lastProgress=0,geometry=null;
function measure(){
 const header=document.querySelector('.site-header')?.getBoundingClientRect().height||0;
 root.style.setProperty('--scene-header',header+'px');
 const box=field.getBoundingClientRect(),picture=image.getBoundingClientRect();
 const next={travel:Math.max(0,picture.height-box.height),max:Math.max(0,scroller.scrollHeight-scroller.clientHeight),width:box.width};
 // Rotation changes the layout and document length: preserve the normalized phase.
 if(geometry&&Math.abs(next.width-geometry.width)>.5&&geometry.max>0){
  window.scrollTo({top:lastProgress*next.max,behavior:'instant'});
 }
 geometry=next;field.dataset.viewport=Math.round(box.width)+'x'+Math.round(box.height);dirty=false;
}
function render(){
 frame=0;if(dirty)measure();
 const progress=geometry.max>0?clamp(scroller.scrollTop/geometry.max):0;
 const offset=-geometry.travel*progress;
 field.style.setProperty('--scene-offset',offset.toFixed(4)+'px');
 field.dataset.progress=progress.toFixed(6);field.dataset.offset=offset.toFixed(4);
 field.dataset.travel=geometry.travel.toFixed(4);field.dataset.maxScroll=geometry.max.toFixed(4);
 lastProgress=progress;
}
function schedule(){if(!frame)frame=requestAnimationFrame(render)}
function resize(){dirty=true;schedule()}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',resize,{passive:true});addEventListener('orientationchange',resize,{passive:true});
screen.orientation?.addEventListener('change',resize);window.visualViewport?.addEventListener('resize',resize,{passive:true});addEventListener('pageshow',resize);
addEventListener('pagehide',()=>{cancelAnimationFrame(frame);frame=0});image.addEventListener('load',resize);
if(typeof ResizeObserver==='function'){const observer=new ResizeObserver(resize);observer.observe(document.body);observer.observe(field);observer.observe(image)}
document.fonts?.ready.then(resize);resize();
})();