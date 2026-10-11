# Integração Supabase — Ex Libris Oceano

O Oceano usa o mesmo projeto Supabase do repositório `KaueMazalli/ex-libris-mazalli`. O banco original é a fonte de verdade; o Oceano não importa, duplica nem sincroniza cópias locais dos livros.

## Configuração

As credenciais públicas do projeto estão em `assets/supabase-config.js`:
- URL do projeto Supabase
- Chave publishable (ou chave anon legada)

Nunca use `service_role` ou uma secret key no navegador.

## Tabela usada

A página consulta `public.books` e os campos existentes: `id`, `title`, `author`, `publisher`, `country`, `year`, `edition_year`, `type`, `volume`, `status`, `genre`, `rating`, `cover` e `relic`.

O código adapta `edition_year` para a propriedade visual `editionYear`, converte os status do original — incluindo `Concluído` e `Próxima leitura` — e resolve capas guardadas como caminhos `/covers/...` para os arquivos públicos do repositório original.

## Comportamento e permissões

- Com a conexão ativa, o Oceano carrega o acervo diretamente do banco e não usa `localStorage` nem os dados estáticos de demonstração como substitutos.
- Se a consulta falhar, a página mostra um erro em vez de exibir um acervo local desatualizado.
- O Oceano público é somente para leitura. Os controles de adicionar, alterar status, marcar relíquias e excluir ficam indisponíveis para evitar operações que as políticas atuais não permitem.
- Para administrar registros, use o painel autenticado do Ex Libris original. A tabela tem RLS habilitado; escrita requer autenticação e políticas apropriadas.
- Não habilite escrita anônima irrestrita. A chave publishable/anon é pública por definição, então RLS é a barreira de segurança real.

## Diagnóstico

Se os livros não carregarem, confira a URL/chave, a exposição da tabela à Data API e a política RLS de leitura para `anon`. O código registra detalhes técnicos no console e apresenta uma mensagem amigável na página.
