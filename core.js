export const statuses=['New','Information Required','Documents Required','In Progress','Awaiting Payment','Submitted','Completed','Cancelled'];
export const emptyState=()=>({version:1,clients:[],jobs:[]});
export const money=n=>new Intl.NumberFormat('en-ZA',{style:'currency',currency:'ZAR'}).format(n);
export const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const balance=j=>Math.max(0,Number(j.fee)-Number(j.paid));
export const openJob=j=>!['Completed','Cancelled'].includes(j.status);
export const localDate=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export function validateState(s){
 if(!s||s.version!==1||!Array.isArray(s.clients)||!Array.isArray(s.jobs))throw Error('Choose a Razz Automation version 1 backup.');
 const ids=new Set();for(const c of s.clients){if(typeof c.id!=='string'||ids.has(c.id)||typeof c.name!=='string'||!c.name.trim())throw Error('Invalid client record.');ids.add(c.id);for(const k of ['phone','email','notes'])if(typeof c[k]!=='string')throw Error('Invalid client fields.');}
 const jobs=new Set();for(const j of s.jobs){if(typeof j.id!=='string'||jobs.has(j.id)||!ids.has(j.clientId)||typeof j.service!=='string'||!j.service.trim()||!statuses.includes(j.status)||typeof j.nextAction!=='string'||typeof j.documents!=='string'||typeof j.notes!=='string'||!Number.isFinite(j.fee)||!Number.isFinite(j.paid)||j.fee<0||j.paid<0||j.paid>j.fee||typeof j.due!=='string'||(j.due&&!/^\d{4}-\d{2}-\d{2}$/.test(j.due)))throw Error('Invalid application or payment record.');jobs.add(j.id);}
 return s;
}
export function letterHtml({type,name,employer,position,date,start,duties,contact}){
 const e=escapeHtml;const confirmation=type==='Employment confirmation';
 return `<!doctype html><html><head><meta charset="utf-8"><title>${e(type)}</title><style>body{font:12pt Arial,sans-serif;line-height:1.65;color:#111;max-width:700px;margin:50px auto;padding:20px}h1{font-size:16pt;margin:30px 0} @page{size:A4;margin:22mm}@media print{body{margin:0;padding:0}}</style></head><body><strong>${e(employer)}</strong><p>${e(contact)}</p><p>${e(date)}</p><p>To whom it may concern</p><h1>${e(type)}</h1><p>${confirmation?`This letter confirms that ${e(name)} is employed by ${e(employer)} as a ${e(position)}, with employment commencing on ${e(start)}.`:`This letter confirms that ${e(employer)} has offered ${e(name)} employment as a ${e(position)}, with the proposed commencement date of ${e(start)}. Commencement is subject to the applicant holding valid authorisation to undertake this work.`}</p><p>The main duties and responsibilities are: ${e(duties)}.</p><p>Please contact the employer using the details above for verification.</p><p>Yours faithfully,</p><p>________________________<br>Authorised employer representative<br>Name: ________________________<br>Title: ________________________<br>Date: ________________________</p></body></html>`;
}
