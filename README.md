# Kokoro 心

Plataforma de saúde mental organizacional: pesquisa anônima, três índices de cultura (apoio, estigma e abertura), perfis de equipe, assistente com IA e relatório NR-1 para o RH agir com segurança.

Projeto para o **Hack Brasil 2026**, trilha Saúde & bem-estar.

## Dados

- **A demo usa só dados sintéticos.** A "Empresa Aurora", as áreas e as 308 respostas são fictícias (`analytics/generate_synthetic.py`).
- Os dados sintéticos são **calibrados** na pesquisa pública *OSMI Mental Health in Tech Survey 2016* (1.433 respostas reais, licença CC BY 4.0): distribuição de cada resposta e correlação entre perguntas, por cópula gaussiana. Nenhuma linha individual da OSMI entra no app; só agregados (`analytics/osmi_calibration.json`).
- Os perfis de equipe (K-means, k=3) são treinados nos índices das respostas reais da OSMI e aplicados às respostas da empresa.
- Nenhum recorte com menos de 5 pessoas é exibido. O Kokoro não faz diagnóstico individual.

## Rodar

```bash
npm install
npm run dev          # http://localhost:3000  ·  plataforma em /plataforma
```

Regenerar os dados (Python 3.12 com pandas, numpy, scipy, scikit-learn; a OSMI 2016 em CSV):

```bash
python analytics/osmi_calibration.py caminho/para/osmi-2016.csv
python analytics/generate_synthetic.py
python analytics/build_dashboard_data.py
```

## Banco (Neon Postgres)

As migrações ficam em `scripts/migrate.mjs` e rodam sozinhas antes de cada build na Vercel (`npm run build`). Cada uma roda uma vez só (tabela `_migracoes`). Sem `DATABASE_URL`, a plataforma usa o JSON sintético.

## Estética

Marfim washi, tinta sumi, índigo e vermelho; só três fontes (Cormorant Garamond, Jost e Shippori Mincho); botões em pílula, carimbos hanko e ondas seigaiha. Mascote: Kokoro, o robô de cachecol.
