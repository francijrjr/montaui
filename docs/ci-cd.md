# CI/CD

Pull requests e pushes em `develop` e `main` executam instalação limpa, build,
TypeScript, testes do registro e da CLI, testes Chromium e validação do pacote npm.
O build também precisa reproduzir os arquivos versionados sem diferenças.

Depois da validação da `main`, o job `deploy` solicita uma publicação na Vercel.
Crie um Deploy Hook para a branch `main` no projeto Vercel e salve a URL no
segredo `VERCEL_DEPLOY_HOOK_URL` do repositório GitHub. Sem esse segredo, o job
falha com uma mensagem de configuração; a publicação não é simulada.

O retorno do hook confirma a solicitação. A conclusão e a URL da publicação
devem ser acompanhadas no painel da Vercel. Para evitar publicação duplicada
ou anterior aos testes, desative o deploy automático por Git da Vercel ao
ativar este fluxo. Nenhum pacote é publicado no npm por este workflow.

Referências: [GitHub Actions](https://docs.github.com/en/actions) e
[Deploy Hooks da Vercel](https://vercel.com/docs/deploy-hooks).
