# KM Studio — Ferramentas e referências para agentes

Este catálogo reúne os repositórios que complementam as skills de `.agents/skills/`. Ele distingue **skills locais**, **aplicativos independentes**, **CLIs** e **catálogos de referência**: nem todo repositório deve ser copiado para dentro do projeto.

## Skills locais
- **Ponytail** — orienta mudanças pequenas, completas e verificáveis. Arquivo local: `.agents/skills/ponytail/SKILL.md`. Origem: https://github.com/DietrichGebert/ponytail
- **Design Taste** — direção de arte para sites públicos, portfólios e landing pages, com foco em fugir de layouts genéricos. Arquivo local: `.agents/skills/design-taste-frontend/SKILL.md`. Origem: https://github.com/Leonxlnx/taste-skill
- **Redesign Existing Projects** — auditoria e melhoria visual de sites existentes preservando comportamento e stack. Arquivo local: `.agents/skills/redesign-existing-projects/SKILL.md`. Origem: https://github.com/Leonxlnx/taste-skill

## Aplicativos independentes
- **HTML Anything** — editor local que usa CLIs de agentes já autenticadas para gerar, pré-visualizar e exportar artefatos HTML. Não foi copiado para este repositório porque é uma aplicação Next.js separada. Origem: https://github.com/nexu-io/html-anything
  - Requisitos indicados pelo projeto: Node.js, pnpm e uma CLI de agente compatível já instalada/autenticada.
  - Inicialização upstream: `git clone https://github.com/nexu-io/html-anything`, `cd html-anything`, `pnpm install`, `pnpm -F @html-anything/next dev`.
- **Open Design** — aplicativo independente para criar e iterar designs/protótipos. Não faz parte das skills locais. Origem: https://github.com/nexu-io/open-design

## Ferramentas de desenvolvimento
- **Open Code Review** — CLI de revisão de diffs e arquivos com comentários focados em código. Requer Git >= 2.41 e configuração de um provedor de LLM (salvo modos específicos de delegação). Origem: https://github.com/alibaba/open-code-review
  - Instalação upstream: `npm install -g @alibaba-group/open-code-review`.
  - Antes de usar em um repositório de trabalho, revisar a documentação de configuração e os dados enviados ao provedor selecionado.
- **SkillSpector** — scanner de segurança para skills e outros artefatos de agentes; pode produzir relatórios terminal, JSON, Markdown e SARIF. Origem: https://github.com/NVIDIA/SkillSpector
  - Instalação upstream: `uv tool install git+https://github.com/NVIDIA/skillspector.git`.
  - Para uma primeira verificação estática, use `skillspector scan <caminho-da-skill> --no-llm`. Revise os achados manualmente; um scanner não garante segurança.

## Catálogos úteis
- **Awesome** — índice de listas curadas de projetos e recursos open source; use para descobrir opções, não como uma skill executável. https://github.com/sindresorhus/awesome
- **Public APIs** — catálogo de APIs públicas para integrações e protótipos. Confira autenticação, limites, disponibilidade, licença e política de dados antes de integrar. https://github.com/public-apis/public-apis
- **Free for Dev** — catálogo de serviços com planos gratuitos para desenvolvimento. Verifique os termos, limites e requisitos atuais diretamente no fornecedor. https://github.com/ripienaar/free-for-dev

## Regras de uso
1. Leia a skill mais específica para a tarefa; não aplique todas de forma mecânica.
2. Para frontend, combine **Design Taste** com `make-interfaces-feel-better` ou **Oil UI** conforme o tipo de trabalho. Use **Redesign Existing Projects** quando estiver refinando algo que já existe.
3. Use **Ponytail** para controlar escopo e evitar dependências ou abstrações desnecessárias.
4. Use os catálogos para pesquisar opções, mas valide os detalhes no projeto original e nos fornecedores.
5. Não diga que uma CLI, aplicativo ou teste foi executado sem executá-lo de fato.
6. Estas referências não autorizam ignorar o briefing, a segurança, a acessibilidade, nem as convenções do projeto.

## Fontes upstream
- https://github.com/DietrichGebert/ponytail
- https://github.com/Leonxlnx/taste-skill
- https://github.com/nexu-io/open-design
- https://github.com/nexu-io/html-anything
- https://github.com/alibaba/open-code-review
- https://github.com/NVIDIA/SkillSpector
- https://github.com/sindresorhus/awesome
- https://github.com/public-apis/public-apis
- https://github.com/ripienaar/free-for-dev
