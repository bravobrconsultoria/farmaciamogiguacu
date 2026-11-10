import fs from 'node:fs';
import assert from 'node:assert/strict';
import {selection} from './catalog-source.mjs';

const groups = {};
for (const [category, count, source] of selection) {
  const families = source.trim().split('\n').map(row => {
    const [name, variants] = row.trim().split('|');
    assert(name && variants, `Família inválida: ${row}`);
    return variants.split(';').map(variant => `${name} — ${variant}`);
  });
  // Primeiro dá espaço a todas as famílias; depois inclui outras apresentações.
  const chosen = families.map(() => []);
  let added = 0;
  for (let variant = 0; added < count; variant++) {
    assert(variant < Math.max(...families.map(f => f.length)), `Faltam itens: ${category}`);
    for (let index = 0; index < families.length && added < count; index++) {
      if (families[index][variant]) { chosen[index].push(families[index][variant]); added++; }
    }
  }
  groups[category] = chosen.flat();
}
const names = Object.values(groups).flat();
assert.equal(names.length, 1037);
assert.equal(new Set(names.map(n => n.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase())).size, 1037);
fs.writeFileSync('dist/products.js', '// Tipos e apresentações para consulta. Não representa estoque ou ranking de vendas.\n// Gerado por generate-catalog.mjs a partir de catalog-source.mjs.\nexport const groups = ' + JSON.stringify(groups, null, 2) + ';\nexport const products = Object.entries(groups).flatMap(([category,names])=>names.map(name=>({name,category})));\n');
console.log(Object.entries(groups).map(([name,items]) => `${name}: ${items.length}`).join('\n'));
