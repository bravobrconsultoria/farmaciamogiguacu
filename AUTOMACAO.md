# GitHub → cPanel automático

O workflow `.github/workflows/deploy-cpanel.yml` publica após cada push na `main` quando a variável `CPANEL_DEPLOY_ENABLED` vale `true`. Antes disso o job é ignorado, sem tentar acessar a hospedagem. Também permite execução manual em Actions → Publicar no cPanel → Run workflow.

## Configuração única

1. No cPanel → Acesso SSH → Gerenciar chaves SSH, gerar uma chave exclusiva chamada `github_deploy`, RSA 4096, com senha forte. Guardar a senha para o Secret abaixo. Autorizar a chave pública em Gerenciar → Autorizar.
2. Confirmar com a hospedagem o hostname e a porta SSH, que o usuário `farmamogiguacu` tem shell/SSH habilitado e permite conexões dos executores do GitHub Actions. A presença do gerenciador de chaves por si só não confirma shell liberado.
3. Obter a chave pública do servidor em formato `known_hosts` e confirmar seu fingerprint por um canal autenticado da hospedagem. Não confundir a chave do servidor com a chave de login do usuário. Para porta diferente de 22, o nome no known_hosts deve ser `[hostname]:porta`.
4. No repositório GitHub → Settings → Secrets and variables → Actions, cadastrar os Repository secrets abaixo. A chave privada deve ser copiada diretamente do cPanel para o Secret, nunca para o código, mensagens ou arquivos versionados.

| Secret | Conteúdo |
| --- | --- |
| `CPANEL_SSH_HOST` | Hostname SSH confirmado, sem `https://` |
| `CPANEL_SSH_PORT` | Porta SSH confirmada |
| `CPANEL_SSH_KEY` | Chave privada `github_deploy` completa, em formato OpenSSH/PEM, não PuTTY |
| `CPANEL_SSH_PASSPHRASE` | Senha da chave privada |
| `CPANEL_SSH_KNOWN_HOSTS` | Linha(s) de chave pública do servidor verificadas |

5. Na aba Variables da mesma tela, criar Repository variable `CPANEL_DEPLOY_ENABLED` com valor `true`.
6. Executar o workflow manualmente uma vez e conferir sucesso e o site público. Se o provedor bloquear SSH, pedir liberação antes de considerar a automação concluída. Não é necessário Cron.

## Funcionamento

O GitHub gera e verifica o site com Node 22, envia um pacote de `dist/` por SSH e extrai em `/home/farmamogiguacu/public_html`. Preserva arquivos extras da hospedagem, inclusive `.htaccess`, sem exclusão de arquivos antigos. O pacote temporário fica fora da pasta pública e é removido após sucesso. Nomes iguais são substituídos; mudanças que removam páginas precisam de limpeza explícita posterior.

Publicações são serializadas e não cancelam uma transferência em curso. A extração não é uma troca atômica de diretório. Se uma publicação falhar, revisar os logs e executar novamente. Build/check passando localmente não prova conectividade SSH; o primeiro run é necessário.

Esse fluxo não atualiza o clone em `repositories/`. Não usar um Deploy HEAD Commit manual de um clone antigo depois de ativar a automação, pois isso pode restaurar arquivos antigos. Para desativar, definir `CPANEL_DEPLOY_ENABLED` como `false`.
