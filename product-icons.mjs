// Ícones genéricos de tipos de produto; não representam embalagens de marcas.
const shapes={
 bottle:'M9 4h6v4H9z M8 8h8l2 4v16H6V12z M6 16h12 M10 20h4',
 pump:'M9 8h8v20H7V12l2-4Z M13 8V4h9v3 M7 17h10 M10 21h4',
 soap:'M6 13c0-4 18-4 18 0v9c0 5-18 5-18 0z M6 13c0 5 18 5 18 0 M22 5h.01 M26 9h.01 M18 3h.01',
 tube:'M7 4h18l-3 20H10z M11 24h10v5H11z M8 8h16 M13 14h6',
 jar:'M6 12h20v14H6z M5 8h22v4H5z M11 18h10 M13 22h6',
 spray:'M11 8h10v21H9V12z M13 8V4h8v4 M25 5h3 M25 9l3 1 M9 17h12',
 roll:'M10 10V7a6 6 0 0 1 12 0v3 M9 10h14v18H9z M9 20h14',
 brush:'M7 3h9v11H7z M10 14v14h4V14 M7 6h9 M7 10h9',
 comb:'M5 8h22v6H5z M7 14v12 M11 14v12 M15 14v12 M19 14v12 M23 14v12 M27 14v12',
 diaper:'M4 9h24l-3 14-9 5-9-5z M4 13h7 M21 13h7 M7 23c0-5 4-7 9-7s9 2 9 7',
 wipes:'M4 13h24v15H4z M12 13l-2-7 10-3 3 10 M9 18h14 M12 22h8',
 pad:'M12 3h8l2 8 5 5-5 5-2 8h-8l-2-8-5-5 5-5z M14 9v14 M18 9v14',
 drop:'M16 3S6 15 6 21a10 10 0 0 0 20 0C26 15 16 3 16 3Z M11 21c0 3 2 5 5 5',
 serum:'M13 3h6v7h-6z M12 10h8v5l4 4v10H8V19l4-4z M8 22h16',
 sun:'M16 9a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z M16 2v3 M16 27v3 M2 16h3 M27 16h3 M6 6l2 2 M24 24l2 2 M6 26l2-2 M24 8l2-2',
 lipstick:'M11 17V7l10-4v14 M9 17h14v12H9z M11 24h10',
 polish:'M12 3h8v10h-8z M11 13h10l3 5v11H8V18z M8 21h16',
 makeup:'M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24Z M16 8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z M14 28h4',
 razor:'M5 4h22v8H5z M8 8h16 M13 12h6l-1 17h-4z',
 bandage:'M7 3 29 25l-4 4L3 7z M11 13l8 8 4-4-8-8z M7 7h.01 M25 25h.01',
 thermometer:'M13 21V5a3 3 0 0 1 6 0v16a6 6 0 1 1-6 0Z M16 11v13 M23 7h4 M23 12h4 M23 17h4',
 cotton:'M10 8a5 5 0 0 1 10-1 6 6 0 0 1 6 10 7 7 0 0 1-10 10A7 7 0 0 1 6 17a6 6 0 0 1 4-9Z',
 scissors:'M9 18a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z M23 18a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z M12 19 24 3 M20 19 8 3',
 box:'M4 10 16 4l12 6v16H4z M4 10h24 M16 10v16 M12 18h8',
 baby:'M12 3h8v5l3 4v17H9V12l3-4z M9 15h14 M18 19h5 M18 23h5',
 floss:'M8 9h16v19H8z M8 9V6h16v3 M12 18h8 M16 9V5l10-2',
 mask:'M7 9h18v14l-9 5-9-5z M7 12H3v9h4 M25 12h4v9h-4 M11 14h10 M11 18h10',
 perfume:'M12 3h8v5h-8z M15 8v4 M8 12h16v17H8z M12 18h8v6h-8z'
};
export const productSprite=`<svg xmlns="http://www.w3.org/2000/svg">${Object.entries(shapes).map(([id,d])=>`<symbol id="${id}" viewBox="0 0 32 32"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>`).join('')}</svg>`;
export function productIcon({name,category}){
 const rules=[[/fralda|roupa íntima descartável/i,'diaper'],[/lenços|toalhas umedecidas/i,'wipes'],[/algodão|hastes/i,'cotton'],[/protetor solar|pós-sol|protetor labial/i,'sun'],[/absorvente|protetor diário|calcinha/i,'pad'],[/escova dental|escova interdental|escova unitufo/i,'brush'],[/fio dental|fita dental/i,'floss'],[/mamadeira|bico de mamadeira/i,'baby'],[/esmalte|base para unhas|cobertura para unhas/i,'polish'],[/batom|gloss|labial/i,'lipstick'],[/sérum|ampola|tônico/i,'serum'],[/óleo|lubrificante/i,'drop'],[/aerosol|spray|repelente/i,'spray'],[/roll-on|bastão/i,'roll'],[/sabonete em barra/i,'soap'],[/líquido para mãos|espuma/i,'pump'],[/creme dental|creme depilatório|creme para mãos|creme hidratante|fixador/i,'tube'],[/máscara capilar|máscara de |pomada|gelatina|cera modeladora/i,'jar'],[/barbear|carga para aparelho/i,'razor'],[/pente|escova de cabelo/i,'comb'],[/tesoura|alicate|cortador|pinça/i,'scissors'],[/curativo|atadura|esparadrapo|fita microporosa/i,'bandage'],[/termômetro/i,'thermometer'],[/máscara descartável/i,'mask'],[/colônia|body splash/i,'perfume'],[/base facial|pó compacto|blush|corretivo/i,'makeup']];
 const fallback={'Higiene diária':'bottle','Saúde bucal':'tube','Cabelos':'bottle','Cuidados com a pele':'jar','Corpo e proteção solar':'tube','Bebê e criança':'baby','Cuidados íntimos':'box','Beleza e perfumaria':'makeup','Barbear e acessórios':'comb','Cuidados em casa':'box'};
 const id=rules.find(([pattern])=>pattern.test(name))?.[1]||fallback[category]||'box';
 return `<span class="product-illustration" aria-hidden="true"><svg width="64" height="64" focusable="false"><use href="/assets/product-icons.svg#${id}"/></svg></span>`;
}
