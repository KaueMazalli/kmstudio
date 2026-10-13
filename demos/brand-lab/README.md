# KM Studio Brand Lab Studio

Gerador experimental de conceitos de identidade visual e artes para redes sociais em HTML, CSS e JavaScript, sem dependências externas.

## Como executar

Abra `index.html` diretamente no Firefox, Chrome ou Edge. Não é necessário instalar pacotes nem iniciar servidor.

## Recursos

- Briefing de marca com nome, slogan, segmento, personalidade, descrição, direção criativa e paleta.
- Galeria com 18 conceitos vetoriais por rodada, combinando famílias de símbolos, composições, ornamentos, cores e tipografia.
- Símbolos ajustáveis: monograma, órbita, flora, arquitetura, ondas, brasão, brilho, letra desenhada e abstrato.
- Editor de composição com controles para layout, símbolo, detalhe, escala e espaçamento tipográfico.
- Favoritos e filtros por tipo de fundo.
- Exportação de logo em SVG, PNG e versão monocromática SVG.
- Exportação de kit JSON com briefing, paleta e SVGs das propostas.
- Geração de posts quadrados com exportação PNG.
- Painel de referências externas com pesquisas contextuais no SVG Repo, Dribbble e Behance, além de atalhos para Logosystem e Brandfetch.
- Biblioteca vetorial integrada via API pública do Iconify: pesquisa símbolos, filtra coleções e importa um SVG higienizado para o conceito selecionado.
- Sugestões locais de direção criativa.
- Salvar projeto em JSON e reabrir com o botão **Abrir projeto**.
- Exportar apresentação para PDF pela impressão do navegador.

## Limitações importantes

Os conceitos são compostos por regras locais e formas vetoriais programadas; não são desenhos exclusivos criados por IA generativa. As sugestões criativas também são locais e não chamam uma API de IA. O painel de referências abre sites externos com termos relacionados ao briefing; ele não importa imagens ou logos automaticamente. A biblioteca do Iconify faz uma integração real com API para pesquisar e importar símbolos SVG. A API pública depende de internet e pode estar indisponível ocasionalmente. As licenças variam por coleção; confira a licença exibida nos resultados e as condições da fonte antes do uso comercial. Um ícone de biblioteca é um elemento gráfico de partida, não um logo exclusivo. Os conceitos podem precisar de ajustes manuais para alcançar qualidade de marca profissional. Antes de usar comercialmente, revise legibilidade, qualidade visual, originalidade e possíveis semelhanças com marcas existentes.

Uma integração real com um modelo de IA deve ser feita por um backend seguro, com a chave da API guardada no servidor — nunca dentro deste HTML público.

## Privacidade e arquivos

O briefing permanece no navegador até você exportar um arquivo. **Salvar projeto** baixa um JSON e tenta guardar uma cópia no armazenamento local do navegador. Guarde o JSON exportado para backup e transferência entre computadores.
