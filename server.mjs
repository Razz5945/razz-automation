import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('.',import.meta.url));
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript'};
createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=pathname==='/'?'index.html':pathname.slice(1);if(!['index.html','styles.css','app.js','core.js'].includes(file)){res.writeHead(404);res.end('Not found');return;}const data=await readFile(path.join(root,file));res.writeHead(200,{'Content-Type':types[path.extname(file)],'X-Content-Type-Options':'nosniff','Cache-Control':'no-store'});res.end(data);}catch{res.writeHead(500);res.end('Unable to load page');}}).listen(Number(process.env.PORT)||3000,'127.0.0.1',()=>console.log('Razz Automation: http://localhost:3000'));
