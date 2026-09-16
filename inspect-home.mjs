import { chromium } from '@playwright/test';
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:390,height:844}}); await p.goto('http://127.0.0.1:4174'); await p.waitForTimeout(500);
console.log(await p.locator('.premium-home *').evaluateAll(es=>es.filter(e=>{const r=e.getBoundingClientRect();return r.width>390 && getComputedStyle(e).position!=='absolute' && e.tagName!=='svg' && !e.closest('.os-event-map,.os-hero-orbit-stage');}).map(e=>({cls:e.className,w:Math.round(e.getBoundingClientRect().width),grid:getComputedStyle(e).gridTemplateColumns})).slice(0,90)));
for (const [name,sel] of [['hero','.os-hero'],['partners','.os-partners-section'],['product','.os-product-section'],['faq','.os-faq-section'],['cta','.os-final-cta-section']]){await p.locator(sel).screenshot({path:`${name}-before.png`});}
await b.close();
