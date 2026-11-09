const fs=require("node:fs");
const assert=require("node:assert/strict");
const yaml=require("C:/Users/Artemon/AppData/Local/Temp/orbita-qa-tools-20261109/node_modules/yaml");
(async()=>{
  const workflow=yaml.parse(fs.readFileSync("D:/Projects/my_sait/.github/workflows/deploy-pages.yml","utf8"));
  assert(workflow.on.push.branches.includes("main"));
  assert(Object.hasOwn(workflow.on,"workflow_dispatch"));
  assert.equal(workflow.jobs.build.permissions.pages,"read");
  assert.equal(workflow.jobs.deploy.permissions.pages,"write");
  assert.equal(workflow.jobs.deploy.permissions["id-token"],"write");
  assert.equal(workflow.jobs.deploy.needs,"build");
  const steps=workflow.jobs.build.steps;
  assert(steps.some(s=>s.run==="npm ci"));
  assert(steps.some(s=>s.run==="npm run test:export"));
  const refs=Object.values(workflow.jobs).flatMap(j=>j.steps).filter(s=>s.uses).map(s=>s.uses);
  for(const ref of refs){
    const [repository,tag]=ref.split("@");
    const response=await fetch("https://raw.githubusercontent.com/"+repository+"/"+tag+"/action.yml");
    assert.equal(response.status,200,ref);
  }
  console.log("PASS: workflow YAML, main/manual triggers, dependency between jobs, minimal permissions and "+refs.length+" official action tags.");
})().catch(e=>{console.error(e);process.exit(1)});

