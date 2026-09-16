import { chromium } from '@playwright/test';
const b=await chromium.launch();
const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://127.0.0.1:4174'); await p.waitForTimeout(1800);
await p.screenshot({path:'mobile-before.png',fullPage:true});
console.log(await p.locator('section').evaluateAll(es=>es.map(e=>({cls:e.className,w:e.scrollWidth,h:e.clientHeight}))));
await p.setViewportSize({width:1440,height:1000}); await p.screenshot({path:'desktop-before.png',fullPage:true});
await b.close();
