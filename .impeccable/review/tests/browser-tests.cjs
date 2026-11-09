const { chromium } = require("C:/Users/Artemon/AppData/Local/Temp/orbita-qa-tools-20261109/node_modules/playwright-core");
const { default: AxeBuilder } = require("C:/Users/Artemon/AppData/Local/Temp/orbita-qa-tools-20261109/node_modules/@axe-core/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const output = "D:/Projects/my_sait/.impeccable/review";
fs.mkdirSync(output,{recursive:true});
const report = { cases:[], viewport:[], accessibility:[], runtimeErrors:[], requestErrors:[] };
const base = process.env.QA_BASE_URL || "http://127.0.0.1:3000/";
const shot = name => path.join(output,name+".png");
let browser;
async function test(name, run) {
  try { const data = await run(); report.cases.push({name,status:"pass",data}); console.log("PASS "+name); }
  catch(error) { report.cases.push({name,status:"fail",error:error.message}); console.log("FAIL "+name+": "+error.message); }
}
async function ready(page) {
  page.on("pageerror", error => report.runtimeErrors.push(error.message));
  page.on("response", response => { if(response.url().startsWith(base) && response.status()>=400) report.requestErrors.push({url:response.url(),status:response.status()}); });
  await page.goto(base,{waitUntil:"networkidle"});
  await page.evaluate(()=>document.fonts.ready);
}
async function allImages(page) {
  await page.evaluate(async()=> {
    const images=[...document.images];
    images.forEach(image=>image.loading="eager");
    await Promise.all(images.map(image=>image.decode().catch(()=>{})));
  });
}
(async()=>{
  browser = await chromium.launch({channel:"chrome",headless:true});
  for(const [width,height] of [[360,800],[390,844],[768,1024],[1366,900],[1920,1080],[1366,500],[844,390]]) {
    await test("layout "+width+"x"+height, async()=>{
      const context=await browser.newContext({viewport:{width,height},reducedMotion:"reduce"});
      const page=await context.newPage(); await ready(page); await allImages(page);
      const metrics=await page.evaluate(()=>{
        const overflowing=[...document.querySelectorAll("h1,h2,h3,button")].filter(el=>{
          const box=el.getBoundingClientRect();
          return box.width>0 && (box.left < -1 || box.right > innerWidth+1 || el.scrollWidth>el.clientWidth+2);
        }).map(el=>({tag:el.tagName,text:el.textContent.trim(),width:el.clientWidth,scroll:el.scrollWidth,box:el.getBoundingClientRect().toJSON()}));
        return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,overflowing,images:[...document.images].map(i=>({src:i.getAttribute("src"),ok:i.complete&&i.naturalWidth>0}))};
      });
      report.viewport.push(metrics);
      await page.screenshot({path:shot("qa-"+width+"x"+height),fullPage:true});
      if(width===390||width===1366&&height===900) {
        const axe=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"]).analyze();
        report.accessibility.push({width,height,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({html:n.html,summary:n.failureSummary}))})),incomplete:axe.incomplete.map(v=>v.id)});
      }
      await context.close();
      assert(metrics.scrollWidth<=width,"horizontal overflow: "+metrics.scrollWidth);
      assert.equal(metrics.overflowing.length,0,JSON.stringify(metrics.overflowing));
      assert(metrics.images.every(i=>i.ok),"image failed");
      return metrics;
    });
  }
  await test("menu keyboard and atlas",async()=>{
    const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:"reduce"});
    const page=await context.newPage(); await ready(page);
    const menu=page.getByRole("button",{name:"Открыть меню",exact:true});
    await menu.focus(); await page.keyboard.press("Enter");
    assert.equal(await page.locator("#site-nav").isVisible(),true);
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#site-nav").isVisible(),false);
    assert.equal(await page.getByRole("button",{name:"Открыть меню",exact:true}).evaluate(el=>el===document.activeElement),true);
    await page.getByRole("button",{name:"Открыть меню",exact:true}).click();
    await page.locator("#site-nav").getByRole("link",{name:"Три мира"}).click();
    assert.equal(await page.locator("#site-nav").isVisible(),false);
    await page.locator("#solar-system").getByRole("button",{name:/Марс/}).click();
    assert.equal(await page.locator("[data-planet=mars]").count(),1);
    await page.locator("#solar-system").getByRole("button",{name:/Сатурн/}).click();
    assert.equal(await page.locator("[data-planet=saturn]").count(),1);
    assert.equal(await page.locator("#planet-description a").getAttribute("href"),"https://science.nasa.gov/saturn/facts/");
    await allImages(page);
    assert.equal(await page.locator("[data-planet=saturn] img").evaluate(i=>i.naturalWidth>0),true);
    const contacts=await page.locator('a[href="https://t.me/webdiz3d"]').count();
    assert(contacts>=3);
    assert.equal(await page.locator("canvas").count(),0,"reduced motion should not create Canvas");
    await page.screenshot({path:shot("qa-mobile-atlas"),fullPage:false});
    await context.close(); return {contacts};
  });
  await test("desktop WebGL, pause, recompose, chapters",async()=>{
    const context=await browser.newContext({viewport:{width:1366,height:900},reducedMotion:"no-preference"});
    const page=await context.newPage(); await ready(page);
    const field=page.locator('[data-variant="field"]');
    await field.locator("canvas").waitFor({timeout:20000});
    await page.waitForFunction(()=>document.querySelector('[data-variant="field"]')?.getAttribute("data-ready")==="true");
    await field.getByRole("button",{name:"Пауза анимации",exact:true}).click();
    assert.equal(await field.getAttribute("data-motion"),"paused");
    const canvas=field.locator("canvas");
    await page.waitForTimeout(700);
    const a=await canvas.screenshot();
    await page.waitForTimeout(250);
    const b=await canvas.screenshot();
    assert.equal(crypto.createHash("sha256").update(a).digest("hex"),crypto.createHash("sha256").update(b).digest("hex"),"paused canvas pixels changed");
    await field.getByRole("button",{name:"Изменить форму",exact:true}).click();
    await page.waitForTimeout(250);
    const c=await canvas.screenshot();
    assert.notEqual(crypto.createHash("sha256").update(a).digest("hex"),crypto.createHash("sha256").update(c).digest("hex"),"recompose did not change canvas pixels");
    await field.getByRole("button",{name:"Продолжить анимацию",exact:true}).click();
    const normalAxe=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"]).analyze();
    report.accessibility.push({width:1366,height:900,motion:"no-preference",violations:normalAxe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({html:n.html,summary:n.failureSummary}))})),incomplete:normalAxe.incomplete.map(v=>v.id)});
    await page.screenshot({path:shot("qa-desktop-live"),fullPage:false});
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await page.locator("#experience").getByRole("button",{name:"02 — ДВИЖЕНИЕ",exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('#experience button[aria-current="step"]')?.getAttribute("aria-label")?.endsWith("ДВИЖЕНИЕ"));
    await page.locator("#experience").getByRole("button",{name:"03 — ПРОСТРАНСТВО",exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('#experience button[aria-current="step"]')?.getAttribute("aria-label")?.endsWith("ПРОСТРАНСТВО"));
    await page.screenshot({path:shot("qa-journey-live"),fullPage:false});
    await context.close(); return {webgl:true};
  });
  await test("mobile opt-in 3D and synthesized touch scroll",async()=>{
    const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:"no-preference"});
    const page=await context.newPage(); await ready(page);
    assert.equal(await page.locator("canvas").count(),0);
    const field=page.locator('[data-variant="field"]');
    await field.getByRole("button",{name:"Включить 3D-анимацию",exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('[data-variant="field"]')?.getAttribute("data-ready")==="true",{timeout:20000});
    const client=await context.newCDPSession(page);
    const before=await page.evaluate(()=>scrollY);
    await client.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x:200,y:620}]});
    for(let y=580;y>=240;y-=40) await client.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{x:200,y}],timestamp:Date.now()/1000});
    await client.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
    await page.waitForTimeout(500);
    const after=await page.evaluate(()=>scrollY);
    assert(after>before,"touch did not scroll");
    await context.close();return {before,after};
  });
  for (const [width,height] of [[360,800],[390,844],[1366,500],[844,390]]) {
    await test("live controls "+width+"x"+height,async()=>{
      const context=await browser.newContext({viewport:{width,height},reducedMotion:"no-preference"});
      const page=await context.newPage(); await ready(page);
      const field=page.locator('[data-variant="field"]');
      const start=field.getByRole("button",{name:"Включить 3D-анимацию",exact:true});
      if(await start.count()) await start.click();
      await page.waitForFunction(()=>document.querySelector('[data-variant="field"]')?.dataset.ready==="true");
      const hero=await field.locator("button").evaluateAll(buttons=>buttons.map(button=>button.getBoundingClientRect().toJSON()));
      assert(hero.every(box=>box.left>=0&&box.right<=width+1),"hero control is horizontally clipped");
      await page.evaluate(()=>scrollTo({top:document.querySelector("#experience").getBoundingClientRect().top+scrollY,behavior:"instant"}));
      await page.waitForTimeout(150);
      const journey=page.locator('[data-variant="journey"]');
      const enable=journey.getByRole("button",{name:"Включить 3D-анимацию",exact:true});
      if(await enable.count()) await enable.click();
      await page.waitForFunction(()=>document.querySelector('[data-variant="journey"]')?.dataset.ready==="true");
      const boxes=await page.evaluate(()=>{
        const root=document.querySelector("#experience");
        return {
          buttons:[...root.querySelectorAll('[data-variant="journey"] button')].map(e=>e.getBoundingClientRect().toJSON()),
          text:[...root.querySelectorAll('div:not([hidden])>h2,div:not([hidden])>p')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.getBoundingClientRect().toJSON()),
        };
      });
      for(const box of boxes.buttons){
        assert(box.left>=0&&box.right<=width+1&&box.top>=0&&box.bottom<=height+1,"journey control outside viewport");
        assert(!boxes.text.some(text=>box.left<text.right&&box.right>text.left&&box.top<text.bottom&&box.bottom>text.top),"journey control overlaps chapter text");
      }
      await page.screenshot({path:shot("qa-controls-final-"+width+"x"+height),fullPage:false});
      await context.close(); return boxes;
    });
  }
  await test("WebGL context loss fallback",async()=>{
    const context=await browser.newContext({viewport:{width:1366,height:900},reducedMotion:"no-preference"});
    const page=await context.newPage(); await ready(page);
    const field=page.locator('[data-variant="field"]');
    await page.waitForFunction(()=>document.querySelector('[data-variant="field"]')?.dataset.ready==="true");
    await field.locator("canvas").evaluate(canvas=>canvas.getContext("webgl2").getExtension("WEBGL_lose_context").loseContext());
    await page.waitForFunction(()=>document.querySelector('[data-variant="field"]')?.dataset.ready==="false"&&!document.querySelector('[data-variant="field"] canvas'));
    assert.equal(await field.locator("img").evaluate(image=>image.naturalWidth>0),true);
    await context.close(); return {fallbackAfterLoss:true};
  });
  await test("WebGL unavailable fallback",async()=>{
    const context=await browser.newContext({viewport:{width:1366,height:900},reducedMotion:"no-preference"});
    await context.addInitScript(()=>{
      const original=HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext=function(type,...args){ if(type==="webgl"||type==="webgl2"||type==="experimental-webgl")return null; return original.call(this,type,...args); };
    });
    const page=await context.newPage(); await ready(page);
    assert.equal(await page.locator("canvas").count(),0);
    assert.equal(await page.getByRole("button",{name:"Включить 3D-анимацию",exact:true}).count(),0);
    assert.equal(await page.locator('[data-variant="field"] img').evaluate(i=>i.complete&&i.naturalWidth>0),true);
    await context.close(); return {fallback:true};
  });
  const failureCount=report.cases.filter(c=>c.status==="fail").length;
  fs.writeFileSync(path.join(output,"browser-qa-report.json"),JSON.stringify(report,null,2));
  console.log(JSON.stringify({failures:failureCount,runtimeErrors:report.runtimeErrors,requestErrors:report.requestErrors,axe:report.accessibility.map(a=>({width:a.width,height:a.height,violations:a.violations}))},null,2));
  await browser.close();
  if(failureCount||report.runtimeErrors.length||report.accessibility.some(a=>a.violations.length))process.exitCode=1;
})().catch(async error=>{console.error(error);if(browser)await browser.close();process.exitCode=1;});

