(() => {
 'use strict';
 const canvas=document.querySelector('#particles');
 const ctx=canvas?.getContext('2d');
 if(!canvas||!ctx)return;
 let scheduled=0;
 function random(seed){let n=seed>>>0;return()=>{n=(Math.imul(1664525,n)+1013904223)>>>0;return n/4294967296;};}
 function draw(){
  scheduled=0;
  const width=innerWidth,height=innerHeight,dpr=Math.min(devicePixelRatio||1,1.6),rng=random(94817);
  canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
  canvas.style.width=width+'px';canvas.style.height=height+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
  // Irregular, very faint cloudlets give the field depth without a bright wash.
  for(let i=0;i<15;i++){
   const x=width*(.1+rng()*.9),y=height*(.05+rng()*.9),r=Math.max(width,height)*(.07+rng()*.13);
   const cloud=ctx.createRadialGradient(x,y,0,x,y,r);
   cloud.addColorStop(0,'rgba(37,82,113,'+(.012+rng()*.018)+')');cloud.addColorStop(1,'rgba(9,28,45,0)');
   ctx.fillStyle=cloud;ctx.fillRect(x-r,y-r,r*2,r*2);
  }
  const count=Math.min(560,Math.max(130,Math.floor(width*height/2600)));
  for(let i=0;i<count;i++){
   let x=rng()*width,y=rng()*height;
   // A minority of stars forms loose clusters rather than a uniform grid.
   if(i%5===0){x=width*(.68+(rng()+rng()-1)*.28);y=height*(.31+(rng()+rng()-1)*.27);}
   const bright=rng(),r=.22+rng()*.5,alpha=.10+rng()*.32;
   ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle='rgba(180,208,229,'+alpha+')';ctx.fill();
   if(bright>.984){
    const glow=ctx.createRadialGradient(x,y,0,x,y,6);
    glow.addColorStop(0,'rgba(197,232,255,.5)');glow.addColorStop(.17,'rgba(115,194,239,.17)');glow.addColorStop(1,'rgba(68,142,188,0)');
    ctx.fillStyle=glow;ctx.fillRect(x-6,y-6,12,12);
   }
  }
 }
 addEventListener('resize',()=>{if(!scheduled)scheduled=requestAnimationFrame(draw);},{passive:true});
 draw();
 // Static field: no perpetual animation loop, including in reduced motion.
})();
