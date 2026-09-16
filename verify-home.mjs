import { chromium } from '@playwright/test';
const b=await chromium.launch(); const p=await b.newPage({reducedMotion:'reduce'}); const errors=[]; p.on('pageerror',e=>errors.push(e.message));
for(const width of [360,390,768,1024,1440]) {
 await p.setViewportSize({width,height:900}); await p.goto('http://127.0.0.1:4174'); await p.waitForTimeout(600);
 const result=await p.evaluate(()=>({pageWidth:document.documentElement.scrollWidth, viewport:innerWidth, clipped:[...document.querySelectorAll('.premium-home button,.premium-home input,.premium-home h2,.premium-home h3,.premium-home p')].filter(e=>!e.closest('.os-event-map-scroll,.os-theme-comp-table,.os-hero-orbit-stage')).filter(e=>{const r=e.getBoundingClientRect();return r.width&& (r.right>innerWidth+1||r.left< -1);}).map(e=>({cls:e.className,text:e.textContent.slice(0,50)}))})); console.log(width,JSON.stringify(result));
 if(width===390||width===1440){await p.screenshot({path:`home-${width}-after.png`,fullPage:true});}
}
await p.setViewportSize({width:390,height:844}); await p.goto('http://127.0.0.1:4174');
for(const [name,sel] of [['hero','.os-hero'],['map','.os-connected-section'],['product','.os-product-section'],['faq','.os-faq-section']]){await p.locator(sel).scrollIntoViewIfNeeded();await p.waitForTimeout(300); await p.screenshot({path:`${name}-after.png`});}
console.log('errors',errors); await b.close();
