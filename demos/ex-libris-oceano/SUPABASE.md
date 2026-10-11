# Conectar o Supabase do Ex Libris original

O Ex Libris Oceano foi adaptado para usar a mesma tabela `public.books` do repositório `KaueMazalli/ex-libris-mazalli`.

## 1. Configuração do cliente

Edite `assets/supabase-config.js` e preencha:
- `EXLIBRIS_SUPABASE_URL`: valor de `NEXT_PUBLIC_SUPABASE_URL` do projeto original.
- `EXLIBRIS_SUPABASE_PUBLISHABLE_KEY`: valor de `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (ou a chave anon legada, se esse for o valor configurado no projeto).

Não coloque uma chave `service_role` ou secret no navegador.

## 2. Tabela esperada

O código consulta `public.books`, usando os campos existentes no projeto original:
`id`, `title`, `author`, `publisher`, `country`, `year`, `edition_year`, `type`, `volume`, `status`, `genre`, `rating`, `cover`, `relic`.

A aplicação converte `edition_year` para `editionYear` e normaliza os status `lido`/`lendo` para a apresentação. Capas armazenadas como `/covers/arquivo.jpg` são resolvidas para os arquivos públicos do repositório original.

## 3. Segurança

A chave publishable/anon pode aparecer no frontend; a segurança precisa ser aplicada com Row Level Security (RLS). O código não cria nem altera políticas automaticamente. Não habilite escrita pública anônima para a biblioteca pessoal: sem autenticação e políticas restritivas, qualquer pessoa que acesse a página poderia modificar ou apagar registros.

Enquanto a URL e a chave estiverem vazias, a demo continua usando os dados locais de demonstração. Depois de preencher a configuração, ela tenta carregar os livros do Supabase. Se a consulta falhar, confira as credenciais e as permissões de leitura da tabela.
