import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {products,groups} from './dist/products.js';
const pages=JSON.parse(fs.readFileSync('pages.json','utf8'));
assert.equal(pages.length,17);assert.equal(products.length,1037);assert.equal(new Set(products.map(p=>p.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase())).size,1037);
const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const categoryCounts=Object.fromEntries(Object.entries(groups).map(([name,items])=>['/produtos/'+slug(name)+'/',items.length]));
assert.equal(new Set(Object.values(categoryCounts)).size,10,'Quantidades diferentes em cada categoria');
const titles=new Set(),descriptions=new Set();let checkedLinks=0;
for(const {url,file} of [...pages,{url:'/404.html',file:'404.html'}]){
 const html=fs.readFileSync('dist/'+file,'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`H1: ${url}`);
 const title=html.match(/<title>(.*?)<\/title>/)[1],desc=html.match(/name="description" content="([^"]+)"/)[1];assert(!titles.has(title));assert(!descriptions.has(desc));titles.add(title);descriptions.add(desc);
 assert(html.includes('rel="canonical"'));assert(html.includes('href="/assets/simbolo.png"'));assert(html.includes('src="/assets/logo.png"'));assert(!html.includes('A SUA FARMÁCIA DE BAIRRO'));assert(!html.includes('class="topbar"'));
 for(const m of html.matchAll(/(?:src|href|poster)="(\/[^"#?]*)"/g)){const target=m[1].endsWith('/')?m[1]+'index.html':m[1];assert(fs.existsSync(path.join('dist',target)),`${url}: ${target}`);checkedLinks++}
 for(const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g))JSON.parse(m[1]);
 const expected=url==='/produtos/'?products.length:categoryCounts[url]||0;
 assert.equal((html.match(/class="product-card"/g)||[]).length,expected,`Produtos pré-renderizados: ${url}`);
}
const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');assert.equal((sitemap.match(/<loc>/g)||[]).length,17);
assert(fs.statSync('dist/assets/nossa-loja.mp4').size<15_000_000);
console.log(`OK: ${pages.length} páginas, metadados únicos, ${products.length} produtos pré-renderizados, ${checkedLinks} links/arquivos locais, sitemap, favicon e vídeo.`);
