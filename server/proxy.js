// Optional: run with `npm init -y && npm i express node-fetch && node server/proxy.js`
// Then set webhooks in the code below or pass as env vars.
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
app.use(express.json());

const WEBHOOKS = {
  pechhulp: process.env.WH_Pechhulp || "https://discord.com/api/webhooks/1405687530862678189/DZJyhejinm_ALo851bmAsinPqPyTEkro6D2mRLdfb4qWA7yIGHXS53nZiU65C2tznACy",
  ambulance: process.env.WH_Ambulance || "https://discord.com/api/webhooks/1405687668507152424/y8EORlb8XUy0fKoxOFhLErkZfkpEifinYzq_J6-ylPFdAZp6MrSMGJ-DzM-HvtiGKSo_",
  politie: process.env.WH_Politie || "https://discord.com/api/webhooks/1405687376734588989/VReSat5Zb-FtNRzP4RfbOh2fInZLZpPLtCDIDfP-n9TZUQpkQS96hxOC0QEzpY0j-psr"
};

app.post('/hook/:dept', async (req,res)=>{
  const dept = req.params.dept;
  const webhook = WEBHOOKS[dept];
  if(!webhook) return res.status(400).json({error:"Unknown department"});
  try{
    const r = await fetch(webhook, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(req.body)});
    const text = await r.text();
    res.status(r.status).type('text/plain').send(text);
  }catch(e){
    res.status(500).json({error:e.message});
  }
});

app.listen(8787, ()=>console.log('Proxy running on http://localhost:8787'));
