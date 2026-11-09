const menu=document.querySelector('.menu-button'),nav=document.querySelector('#main-nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu')}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus()}});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu()});
const reduce=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const search=document.querySelector('#product-search');
if(search){
 const cards=[...document.querySelectorAll('.product-card')],prev=document.querySelector('[data-prev]'),next=document.querySelector('[data-next]'),pagination=document.querySelector('.pagination'),clear=document.querySelector('[data-clear-search]');
 const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();let page=1;const size=12;
 function render(){const q=norm(search.value.trim());const filtered=cards.filter(c=>norm(c.dataset.name+' '+c.dataset.category).includes(q));const total=Math.max(1,Math.ceil(filtered.length/size));page=Math.min(page,total);const visible=new Set(filtered.slice((page-1)*size,page*size));cards.forEach(c=>c.hidden=!visible.has(c));document.querySelector('#result-count').textContent=filtered.length?`${(page-1)*size+1}–${Math.min(page*size,filtered.length)} de ${filtered.length} produtos`:'Nenhum resultado para esta busca';document.querySelector('[data-page]').textContent=`${page} / ${total}`;prev.disabled=page===1;next.disabled=page===total;pagination.hidden=total<=1;document.querySelector('.empty-results').hidden=filtered.length>0;document.querySelector('.product-grid').hidden=!filtered.length;clear.hidden=!search.value;}
 search.addEventListener('input',()=>{page=1;render()});clear.addEventListener('click',()=>{search.value='';page=1;render();search.focus()});
 for(const [button,step] of [[prev,-1],[next,1]])button.addEventListener('click',()=>{page+=step;render();document.querySelector('[data-catalog]').scrollIntoView({behavior:reduce()?'instant':'smooth',block:'start'});search.focus({preventScroll:true})});
 render();
}
const track=document.querySelector('.gallery-track');
if(track){
 const slides=[...track.querySelectorAll('.gallery-slide')],prev=document.querySelector('[data-gallery-prev]'),next=document.querySelector('[data-gallery-next]'),status=document.querySelector('[data-gallery-status]');let current=0,ticking=false;
 function update(){const left=track.getBoundingClientRect().left;let best=Infinity;slides.forEach((slide,i)=>{const distance=Math.abs(slide.getBoundingClientRect().left-left);if(distance<best){best=distance;current=i}});if(track.scrollLeft+track.clientWidth>=track.scrollWidth-3)current=slides.length-1;status.textContent=`${current+1} / ${slides.length}`;prev.disabled=track.scrollLeft<3;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-3;}
 function move(delta){const index=Math.max(0,Math.min(slides.length-1,current+delta));const x=slides[index].getBoundingClientRect().left-track.getBoundingClientRect().left+track.scrollLeft;track.scrollTo({left:x,behavior:reduce()?'instant':'smooth'})}
 prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});track.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{update();ticking=false});ticking=true}},{passive:true});window.addEventListener('resize',update);update();
}
document.querySelector('[data-load-map]')?.addEventListener('click',()=>{const frame=document.createElement('iframe');frame.src='https://www.google.com/maps?q=-22.8820574,-47.0328205&z=16&output=embed';frame.title='Localização da Farmácia Mogi Guaçu no Google Maps';frame.loading='lazy';frame.referrerPolicy='no-referrer-when-downgrade';frame.allowFullscreen=true;document.querySelector('[data-map]').replaceChildren(frame)});
document.querySelectorAll('video').forEach(video=>{video.addEventListener('error',()=>{const note=document.createElement('p');note.className='small-note';note.textContent='Não foi possível carregar o vídeo. Você pode conhecer a loja pelas fotos abaixo.';video.after(note)},{once:true})});
