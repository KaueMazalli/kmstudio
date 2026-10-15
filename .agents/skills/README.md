# KM Studio — Agent Skills

Skills locais em `.agents/skills/` para agentes de programação que reconhecem o formato Agent Skills.

## UI e design
- **design-taste-frontend** — direção de arte para sites públicos, landing pages e portfólios; evita composições genéricas e orienta inspeção visual. Leia `.agents/skills/design-taste-frontend/SKILL.md`.
- **redesign-existing-projects** — audita e melhora sites existentes sem quebrar funcionalidades nem trocar a stack sem motivo. Leia `.agents/skills/redesign-existing-projects/SKILL.md`.
- **oil-ui** — explorar direções visuais distintas, comparar conceitos e refinar interfaces com revisão visual.
- **make-interfaces-feel-better** — aprimorar detalhes responsivos: tipografia, superfícies, animação, ícones e performance.
- **superdesign** — projetar e iterar interfaces e assets pelo fluxo Superdesign; requer CLI/autenticação quando usado.
- **better-icons** — descobrir e usar ícones de bibliotecas compatíveis; recursos de CLI/MCP podem exigir configuração.

## Engenharia
- **ponytail** — manter as mudanças pequenas, completas, seguras e verificadas. Leia `.agents/skills/ponytail/SKILL.md`.

## Produtividade e formato das respostas
- **i-have-adhd** — modo opcional para respostas orientadas à ação: passos curtos, progresso explícito e menos tangentes. Não presume diagnóstico nem deve ser ativado automaticamente. Leia `.agents/skills/i-have-adhd/SKILL.md`.

## Escrita
- **anti-ai-slop-writing** — evitar padrões formulaicos de escrita de IA, com lista de palavras e expressões de referência.
- **no-ai-slop** — avaliar e editar textos para clareza e naturalidade, preservando a intenção.
- **humanizer** — identificar e remover padrões de prosa que soam artificiais.

## Como escolher
- Para trabalho novo de frontend, leia **Design Taste** e consulte **Oil UI** ou **make-interfaces-feel-better** conforme necessário.
- Para redesenho, leia **Redesign Existing Projects** e preserve o comportamento existente.
- Para qualquer alteração de código, use **Ponytail** para manter o escopo sob controle.
- Ative **i-have-adhd** apenas quando o usuário pedir esse formato de resposta ou um modo equivalente.
- As skills são orientação, não autorização para ignorar o briefing, as convenções do projeto, acessibilidade, segurança ou manutenção.
- Evite aplicar todas as skills de uma vez; escolha as mais relevantes para a tarefa.

## Ferramentas e catálogos externos
Veja [`.agents/resources/DEVELOPER-TOOLKIT.md`](../resources/DEVELOPER-TOOLKIT.md) para Open Design, HTML Anything, Open Code Review, SkillSpector, Awesome, Public APIs, Free for Dev, Superpowers, Agent Browser, UI UX Pro Max e Agent Reach. As ferramentas novas estão documentadas como integrações opcionais; seus códigos e CLIs não foram copiados nem instalados automaticamente.

## Novas referências de engenharia e testes

O [Developer Toolkit](../resources/DEVELOPER-TOOLKIT.md) também documenta **Matt Pocock Skills**, **Anthropic Skills**, **Chrome DevTools MCP**, **Ruflo** e **Awesome Claude Code**, incluindo critérios de adoção, configurações opcionais e cuidados de segurança. Não são skills locais instaladas automaticamente.

## Fontes das skills
- https://github.com/oil-oil/oil-ui
- https://github.com/jakubkrehel/make-interfaces-feel-better
- https://github.com/better-auth/better-icons
- https://github.com/superdesigndev/superdesign-skill
- https://github.com/DietrichGebert/ponytail
- https://github.com/Leonxlnx/taste-skill
- https://github.com/ayghri/i-have-adhd
- https://github.com/jalaalrd/anti-ai-slop-writing
- https://github.com/petergyang/no-ai-slop
- https://github.com/blader/humanizer

Confira os repositórios originais para versões atuais, licenças completas e atualizações.
