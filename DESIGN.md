# Direção visual e decisões

Revisão de 9 de novembro de 2026. Skill estudada: `C:/Users/Bravo/Documents/ui-ux-pro-max-skill/.claude/skills/ui-ux-pro-max/SKILL.md`, incluindo buscas de sistema visual e controles de carrossel, quick-reference e pro-rules. Também consultadas as skills locais design e ui-styling.

## Aplicação

- Marca preservada: azul escuro, vermelho e branco. Logo completa no cabeçalho e símbolo fornecido somente no favicon.
- Tipografia: Barlow Condensed para títulos e Source Sans 3 para leitura. Contraste forte, texto base de 18px, foco visível, controles com alvos confortáveis.
- Composição editorial com fotos reais: abertura dividida, seleção de categorias em proporções diferentes, seção de vídeo ampla, história em duas colunas, entrega em vermelho, galeria horizontal, perguntas em acordeão e endereço com fachada.
- Textos diretos, específicos da loja. Sem avaliações inventadas, números de clientes, promessas médicas, estoque ou prazo de entrega não confirmados.
- Recomendações de paleta cyan/verde, neumorfismo e depoimentos retornadas pela busca não foram adotadas: conflitam com a identidade fornecida ou dependem de dados não disponíveis. Aplicadas as recomendações pertinentes de legibilidade, hierarquia, navegação, contraste e interação.
- Carrossel manual com botões, teclado, posição anunciada e suporte a toque. Sem rotação automática. Movimento reduzido respeitado.
- Vídeo local de 38,5s com controles nativos, poster e preload=none. Versão 1280px, aproximadamente 6,4 MB; original preservado.
- Fotos em WebP, variantes de 720 e 1600px; carregamento lazy fora da primeira imagem.
- Ícone WhatsApp: SVG do projeto Simple Icons v15, sem deformação. Fonte: https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/whatsapp.svg (CC0).

## Estrutura

17 URLs reais, pré-renderizadas: inicial, catálogo, 10 categorias, loja, entregas, contato, dúvidas e privacidade. Página 404 separada. O catálogo e cada categoria contêm os produtos no HTML, sem depender de JavaScript para acesso ao conteúdo.

Títulos e descrições únicos, canonical, Open Graph, dados estruturados Pharmacy e BreadcrumbList, sitemap e robots. A hospedagem mantém o acesso privado preexistente; preparar SEO não torna um site privado indexável. Configurar SITE_URL para o domínio definitivo e publicar com acesso público quando solicitado.

Referência de SEO: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
