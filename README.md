# Farmácia Mogi Guaçu

Site institucional estático, responsivo, com catálogo de 200 itens, busca, 10 categorias e consulta por WhatsApp. Não possui checkout nem cadastro.

## Executar

Use `npm run dev` e abra http://127.0.0.1:4173. Para verificar conteúdo e arquivos, use `npm run check`.

O site distribuível está em `dist/`. Não há dependências de build. As fontes do Google têm fallback para Arial.

## Conteúdo

- Produtos: `dist/products.js` (10 categorias, 20 itens cada).
- Textos, endereço, horários e metadados: `dist/index.html`.
- Número do WhatsApp, filtros, paginação e mensagens: `dist/app.js`.
- Visual e responsividade: `dist/styles.css`.
- Imagens: cópias otimizadas das fotos fornecidas, em `dist/assets/`. Os originais foram preservados na pasta superior.

## Critério do catálogo

Seleção editorial de tipos de produtos de higiene, beleza e cuidados pessoais, orientada pelas categorias de maior procura citadas pela Farmarcas (27/05/2025): https://www.farmarcas.com.br/produtos-de-perfumaria-farmacia/

Não foi localizado um ranking público verificável dos 200 produtos mais vendidos. Por isso o site não apresenta essa seleção como ranking, não atribui números de vendas e não promete estoque. Não são SKUs confirmados da loja. Marcas, apresentações, preços e disponibilidade são consultados pelo WhatsApp.

Medicamentos sob prescrição não integram a vitrine promocional. Referência Anvisa: https://bibliotecadigital.anvisa.gov.br/jspui/bitstream/anvisa/170/1/Consumo%20e%20sa%C3%BAde_venda%20de%20medicamentos%20pela%20internet.pdf

Dados institucionais, fundação, contatos, horários e área de entrega foram fornecidos pelo responsável pelo projeto. Horários de feriados não foram informados; o site orienta consultar a equipe. Não há promessa de entrega no dia seguinte nem informação sobre taxa ou pedido mínimo.

O site não implementa rastreamento ou cookies de publicidade. Os botões externos levam a serviços com suas próprias políticas.
