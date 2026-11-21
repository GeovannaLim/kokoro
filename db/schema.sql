-- Kokoro: respostas anônimas. Nada identifica a pessoa: sem nome, e-mail, IP nem horário exato (só a data).
create table if not exists empresas (
  id serial primary key,
  slug text unique not null,
  nome text not null,
  areas text[] not null default '{}'
);
create table if not exists pesquisas (
  id serial primary key,
  empresa_id int not null references empresas(id),
  token text unique not null,
  titulo text not null,
  criada_em date not null default current_date
);
create table if not exists respostas (
  id bigserial primary key,
  pesquisa_id int not null references pesquisas(id),
  area text not null,
  tempo_casa text,
  modelo text,
  time text,
  respostas jsonb not null,          -- { pergunta_id: código 0–1 | null }
  sintetica boolean not null default false,
  data date not null default current_date
);
create index if not exists respostas_pesquisa on respostas(pesquisa_id);
