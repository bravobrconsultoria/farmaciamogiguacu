# Farmácia Mogi Guaçu

Site institucional multipágina, com 17 URLs, catálogo de 1037 itens, vídeo da loja, galeria manual e atendimento pelo WhatsApp. Sem checkout ou cadastro. HTML gerado no build; busca e paginação são melhorias progressivas.

## Desenvolvimento

- `npm run build`: gera páginas, sitemap e robots.
- `npm run dev`: gera e serve em http://127.0.0.1:4173.
- `npm run check`: verifica páginas, links, assets, metadados, produtos e dados estruturados.
- `PORT=4175` altera a porta do servidor (no PowerShell: `$env:PORT='4175'`).

Não há dependências npm. Node.js é suficiente. Publicar o conteúdo de `dist/` em hospedagem estática com suporte a `index.html` nas subpastas.

## Editar conteúdo

- `build.mjs`: textos, páginas, navegação, links, dados institucionais e SEO. Edite aqui e execute o build; não edite HTML gerado diretamente.
- `dist/products.js`: nomes dos 1037 itens em 10 categorias.
- `dist/styles.css`: identidade visual, componentes e responsividade.
- `dist/app.js`: menu móvel, busca, paginação, galeria e mapa sob demanda.
- `dist/assets/`: imagens, ícones e vídeo local.
- `DESIGN.md`: decisões e aplicação das skills solicitadas.

## URLs

`/`, `/produtos/`, `/produtos/<categoria>/`, `/nossa-loja/`, `/entregas/`, `/contato/`, `/duvidas/`, `/privacidade/`. `pages.json` contém a lista gerada. Página de erro em `/404.html`.

## Domínio e indexação futura

`SITE_URL` define a origem das URLs canônicas, Open Graph, JSON-LD e sitemap. Exemplo PowerShell: `$env:SITE_URL='https://farmamogiguacu.com.br'; npm run build`.

Domínio definitivo: https://farmamogiguacu.com.br (padrão do build). A publicação será feita pela empresa de hospedagem a partir da branch main do GitHub. Consulte PUBLICACAO.md para build, DNS, HTTPS, redirecionamentos, cache, 404 e validação. Após o lançamento, enviar o sitemap ao Google Search Console. A configuração externa ainda precisa ser executada e validada.

## Conteúdo e fontes

Endereço, fundação em 03/05/2005, contatos, horários e área de entrega foram fornecidos pelo responsável pelo projeto. Fotos e vídeo são arquivos originais fornecidos, com cópias otimizadas. A logo do cabeçalho é a original; o símbolo quadrado é usado como favicon.

O catálogo é uma seleção editorial de tipos de produtos; não é ranking verificado de vendas e não garante estoque, marcas ou apresentações. Base de categorias: https://www.farmarcas.com.br/produtos-de-perfumaria-farmacia/. Medicamentos sob prescrição não integram a vitrine promocional. Não há promessa de entrega no dia seguinte nem taxa ou pedido mínimo inventados.

Ícone WhatsApp: Simple Icons v15 (CC0). Fontes: Google Fonts. Não há analytics ou rastreamento publicitário adicionado; o mapa Google é carregado somente mediante clique.

## GitHub

Repositório: https://github.com/bravobrconsultoria/farmaciamogiguacu

Autoria configurada localmente: Gabriel Giovanini, `170587353+gabriel-giovanini@users.noreply.github.com`, vinculada a `gabriel-giovanini`. A cópia `site-publicacao`, fora deste checkout, mantém o histórico da hospedagem Sites separado do histórico corrigido no GitHub.

Catálogo: tipos e apresentações genéricas, não SKUs confirmados. Quantidades editoriais por categoria, sem ranking individual ou promessa de estoque. Edite catalog-source.mjs e execute node generate-catalog.mjs antes do build. Há 1037 nomes únicos, incluindo variações de tamanho, formato e embalagem.
