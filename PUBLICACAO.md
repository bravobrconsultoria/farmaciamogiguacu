# Publicação pela empresa de hospedagem

## Origem e domínio

- Repositório: https://github.com/bravobrconsultoria/farmaciamogiguacu
- Branch de produção: `main`.
- Domínio canônico: **https://farmamogiguacu.com.br**, sem `www`.
- Site estático: não requer banco de dados, API, credenciais ou processo Node em produção.
- A pasta `.openai/` pertence à hospedagem anterior; não é necessária na hospedagem externa.

## Build e diretório público

Usar Node.js 22 ou superior no build. Não há dependências externas para instalar.

```sh
npm run build
npm run check
```

Publicar **somente o conteúdo de `dist/` na raiz do domínio**. A pasta já está versionada e também pode ser publicada diretamente do commit. Para alterações no catálogo, executar `node generate-catalog.mjs` antes do build.

O domínio acima é o padrão de `build.mjs`. Se o ambiente definir `SITE_URL`, usar exatamente `https://farmamogiguacu.com.br`, sem subpasta. Não manter uma variável de ambiente com o domínio antigo.

## Configurações da hospedagem

### cPanel desta conta

Repositório clonado em `/home/farmamogiguacu/repositories/farmaciamogiguacu` e raiz pública `/home/farmamogiguacu/public_html`. A configuração `.cpanel.yml` copia apenas o conteúdo de `dist/` para essa raiz, sem Node no servidor. Arquivos existentes com o mesmo nome serão substituídos; arquivos extras não serão removidos.

Antes da primeira publicação, fazer backup da raiz pública fora de `public_html` e verificar arquivos antigos como `.htaccess`, `index.php` e `index.html`, que podem conter o redirecionamento para o Instadelivery. Preservar regras necessárias da hospedagem e remover somente o redirecionamento identificado. O deploy não remove automaticamente arquivos antigos nem altera o HTTPS do cPanel.

No Git Version Control: Manage → Pull or Deploy → Update from Remote → conferir o commit → Deploy HEAD Commit. Isso publica o código do GitHub, mas não configura sincronização automática a cada push. A automação GitHub → cPanel ainda depende da configuração de acesso e de um mecanismo de deploy na hospedagem.

### Vercel

O `vercel.json` fixa Framework Preset em Other, build com verificação e diretório público `dist`. O `server.mjs` é apenas para desenvolvimento local e não deve ser configurado como função ou ponto de entrada de produção.

Importar a branch `main` com Root Directory na raiz do repositório (`./`), onde está `package.json`. Após atualizar o código, usar o novo deployment; redeploy de um commit antigo não inclui a correção. Se houver erro `FUNCTION_INVOCATION_FAILED`, conferir o commit, o preset efetivo e os logs: este projeto não precisa invocar funções para servir as páginas.

### Demais requisitos

- Configurar DNS conforme a infraestrutura da empresa e certificado HTTPS válido.
- Redirecionar HTTP e `www.farmamogiguacu.com.br` para o domínio HTTPS sem `www`, preservando caminho e query string, com status 301 ou 308.
- Servir os `index.html` das subpastas. Exemplo: `/produtos/cabelos/` deve abrir `dist/produtos/cabelos/index.html`.
- Para caminhos inexistentes, servir `404.html` com status **404**, sem redirecionar tudo à home (não é uma SPA).
- Habilitar compressão Brotli ou gzip para HTML, CSS, JS, SVG e XML.
- Como os nomes dos assets não têm hash, usar cache com revalidação ou prazo curto e invalidar o cache a cada deploy. Não usar cache imutável de um ano nesses arquivos.
- Servir SVG como `image/svg+xml` e vídeo como `video/mp4`, com suporte a requisições de intervalo de bytes.
- Não expor `.git`, código-fonte ou arquivos de configuração. Não adicionar bloqueio de robôs, autenticação ou `X-Robots-Tag: noindex` ao domínio público.
- Previews devem ficar protegidos ou não indexáveis, sem aplicar essa restrição à produção.

## Aceite após o deploy

1. Home e 17 páginas do sitemap respondem 200 por HTTPS; um caminho inexistente responde 404.
2. `https://farmamogiguacu.com.br/robots.txt` está público e referencia o sitemap correto.
3. `https://farmamogiguacu.com.br/sitemap.xml`, canonical, Open Graph e JSON-LD usam o domínio definitivo.
4. Confirmar ícones, fotos, vídeo, menu móvel, pesquisa de produtos e links de WhatsApp.
5. Conferir desempenho no PageSpeed Insights e erros de console no domínio público; a infraestrutura externa ainda não foi medida.
6. No Google Search Console, verificar a propriedade do domínio via DNS, enviar `sitemap.xml` e inspecionar a home. Essa etapa fica com o responsável pelo site após o lançamento.

## Busca local e campanhas

Os títulos e conteúdos cobrem farmácia de bairro, localização no Jardim Flamboyant, preços acessíveis, entregas próximas ao Iguatemi, funcionamento aos domingos e categorias de produtos em Campinas. A pergunta “perto de mim” direciona o visitante a conferir a rota real; não promete proximidade a qualquer usuário.

Manter endereço, telefone, horários e URL consistentes no Perfil da Empresa no Google. Não há ranking garantido, preços comparativos, estoque confirmado ou páginas artificiais para cada combinação de palavra-chave.

Não foram instaladas tags de anúncios ou medição de conversões. Caso a agência precise delas, deverá fornecer os IDs e definir a coleta/consentimento aplicável, atualizando a página de privacidade conforme o que for realmente instalado.

Referências: [busca local](https://support.google.com/business/answer/7091?hl=pt-BR), [política contra repetição artificial de palavras-chave](https://developers.google.com/search/docs/essentials/spam-policies?hl=pt-br#keyword-stuffing).
