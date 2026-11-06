import {groups,products} from './products.js';
const whatsapp='https://wa.me/5519974018572';
const defaultMessage='Olá! Gostaria de falar com a equipe da Farmácia Mogi Guaçu.';
const waLink=message=>`${whatsapp}?text=${encodeURIComponent(message||defaultMessage)}`;
document.querySelectorAll('[data-wa]').forEach(a=>{a.href=waLink(a.dataset.wa);a.target='_blank';a.rel='noopener noreferrer'});
// Coordenadas do endereço fornecido; não depende de API de mapas.
document.querySelectorAll('.maps-link').forEach(a=>a.href='https://www.google.com/maps/dir/?api=1&destination=-22.8820574,-47.0328205');
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');menu.textContent='☰'}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');menu.textContent=open?'×':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const search=document.querySelector('#search'),select=document.querySelector('#category'),grid=document.querySelector('#product-grid');
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
Object.keys(groups).forEach(category=>{const option=document.createElement('option');option.value=category;option.textContent=category;select.append(option)});
const icons={
 'Higiene diária':'M8 8h8v13H8z M10 8V4h4v4 M12 4V2h5 M9 13h6',
 'Saúde bucal':'M8 2v7a3 3 0 0 0 6 0V2 M8 4h6 M8 7h6 M11 12v10',
 'Cabelos':'M8 7h8l1 14H7L8 7z M10 7V3h4v4 M9 12h6 M9 16h6',
 'Cuidados com a pele':'M8 3h8l-1 15H9L8 3z M9 18h6v3H9z M10 8h4 M10 11h4',
 'Corpo e proteção solar':'M12 3v2 M12 19v2 M3 12h2 M19 12h2 M5 5l2 2 M17 17l2 2 M5 19l2-2 M17 7l2-2 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
 'Bebê e criança':'M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0 M8 11h.1 M16 11h.1 M9 15q3 3 6 0 M12 4q-3 5 1 4',
 'Cuidados íntimos':'M12 20S3 14 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12-9 12z',
 'Beleza e perfumaria':'M7 10h10v11H7z M10 10V7h4v3 M10 7V2l4 2v3 M7 17h10',
 'Barbear e acessórios':'M5 3h14v5H5z M7 5h10 M10 8v13h4V8',
 'Cuidados em casa':'M8 4h8v3h5v14H3V7h5V4z M12 10v8 M8 14h8'
};
let page=1;const perPage=12;
function render(){
 const query=normalize(search.value.trim());
 const filtered=products.filter(p=>(!select.value||p.category===select.value)&&normalize(p.name+' '+p.category).includes(query));
 const pages=Math.max(1,Math.ceil(filtered.length/perPage));page=Math.min(page,pages);
 grid.replaceChildren();
 filtered.slice((page-1)*perPage,page*perPage).forEach(p=>{
  const card=document.createElement('article');card.className='product-card';
  const icon=document.createElement('div');icon.className='product-icon';icon.setAttribute('aria-hidden','true');icon.innerHTML=`<svg viewBox="0 0 24 24"><path d="${icons[p.category]}"/></svg>`;
  const category=document.createElement('span');category.className='category';category.textContent=p.category;
  const name=document.createElement('h4');name.textContent=p.name;
  const link=document.createElement('a');link.href=waLink(`Olá! Gostaria de consultar a disponibilidade de: ${p.name}.`);link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label',`Consultar ${p.name} pelo WhatsApp`);link.innerHTML='Consultar no WhatsApp <span aria-hidden="true">↗</span>';
  card.append(icon,category,name,link);grid.append(card);
 });
 if(!filtered.length){const empty=document.createElement('div');empty.className='empty';empty.innerHTML='<h4>Vamos encontrar juntos?</h4><p>Não encontramos esse termo na seleção. Consulte outros produtos com a nossa equipe.</p>';const a=document.createElement('a');a.className='button';a.textContent='Perguntar no WhatsApp ↗';a.href=waLink(`Olá! Estou procurando: ${search.value.trim()||'outros produtos'}. Vocês podem me ajudar?`);a.target='_blank';a.rel='noopener noreferrer';empty.append(a);grid.append(empty)}
 document.querySelector('#result-count').textContent=filtered.length?`Mostrando ${(page-1)*perPage+1}–${Math.min(page*perPage,filtered.length)} de ${filtered.length} produtos`:'Nenhum produto encontrado';
 document.querySelector('#page-status').textContent=`Página ${page} de ${pages}`;
 document.querySelector('#previous').disabled=page===1;document.querySelector('#next').disabled=page===pages;
 document.querySelector('.pagination').hidden=!filtered.length;
 document.querySelectorAll('[data-filter]').forEach(b=>{const active=b.dataset.filter===select.value;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
}
search.addEventListener('input',()=>{page=1;render()});select.addEventListener('change',()=>{page=1;render()});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{select.value=b.dataset.filter;page=1;render()}));
document.querySelectorAll('[data-category]').forEach(a=>a.addEventListener('click',()=>{select.value=a.dataset.category;search.value='';page=1;render()}));
for(const [id,step] of [['previous',-1],['next',1]])document.getElementById(id).addEventListener('click',()=>{page+=step;render();document.querySelector('#catalogo').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'})});
render();
document.querySelector('#year').textContent=new Date().getFullYear();
const privacy=document.querySelector('#privacy');document.querySelector('#privacy-open').addEventListener('click',()=>privacy.showModal());document.querySelector('#privacy-close').addEventListener('click',()=>privacy.close());privacy.addEventListener('click',e=>{if(e.target===privacy){const r=privacy.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)privacy.close()}});
