"""Transforma respostas (sintéticas na demo) nos números agregados que a plataforma mostra.
- Índices Apoio / Estigma / Abertura: mesma fórmula da v1 (média das respostas codificadas), escala fixa 0–100.
- Perfis de equipe: K-means (k=3) treinado nos índices das respostas REAIS da OSMI 2016 e aplicado às respostas da empresa.
- Privacidade: nenhum recorte com menos de 5 pessoas é publicado (MIN_GRUPO).
Uso: python analytics/build_dashboard_data.py [respostas.csv]  ->  src/data/empresa-demo.json"""
import json, sys
from pathlib import Path
import numpy as np, pandas as pd
from sklearn.cluster import KMeans
from questions import QUESTIONS, encode

HERE = Path(__file__).parent; ROOT = HERE.parent
MIN_GRUPO = 5
OSMI_CSV = Path.home() / "Downloads/mental-health-tech/data/mental-heath-in-tech-2016_20161114.csv"

def indexes(E):
    out = {}
    for name, label in (("apoio", "apoio"), ("estigma", "estigma"), ("abertura", "abertura")):
        cols = [q["id"] for q in QUESTIONS if q["index"] == name]
        out[label] = E[cols].mean(axis=1, skipna=True) * 100
    return pd.DataFrame(out)

# --- perfis: treinados na OSMI (dados reais), só os índices entram no modelo ---
osmi = pd.read_csv(OSMI_CSV)
Eo = pd.DataFrame({q["id"]: osmi[q["osmi"]].map(lambda v: encode(q, v)) for q in QUESTIONS})
Io = indexes(Eo).dropna()
km = KMeans(n_clusters=3, n_init=20, random_state=42).fit(Io.values)
cent = pd.DataFrame(km.cluster_centers_, columns=Io.columns)
# nomeia os perfis pelo centro: mais acolhido = apoio+abertura-estigma maior
score = cent["apoio"] + cent["abertura"] - cent["estigma"]
order = score.sort_values(ascending=False).index.tolist()
NAMES = [("acolhidos", "Acolhidos", "Sentem apoio e falam com mais liberdade."),
         ("sem_apoio", "Abertos, sem apoio", "Falam com liberdade, mas quase não encontram estrutura de apoio."),
         ("em_silencio", "Em silêncio", "Percebem pouco apoio e muito risco em se abrir.")]
prof_of = {c: NAMES[i] for i, c in enumerate(order)}

# --- respostas da empresa ---
csv = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "out/respostas_sinteticas.csv"
df = pd.read_csv(csv)
E = df[[q["id"] for q in QUESTIONS]].astype(float)
I = indexes(E)
lab = km.predict(I.fillna(I.mean()).values)
df = pd.concat([df, I], axis=1); df["perfil"] = [prof_of[c][0] for c in lab]

def summary(g):
    if len(g) < MIN_GRUPO:
        return {"n": int(len(g)), "oculto": True}
    return {"n": int(len(g)),
            "indices": {k: round(float(g[k].mean()), 1) for k in ("apoio", "estigma", "abertura")},
            "perfis": {p[0]: round(float((g["perfil"] == p[0]).mean() * 100), 1) for p in NAMES}}

def by(col):
    return {str(k): summary(g) for k, g in df.groupby(col, sort=False)}

perguntas = []
for q in QUESTIONS:
    s = df[q["id"]].dropna()
    dist = s.value_counts(normalize=True).sort_index()
    perguntas.append({"id": q["id"], "indice": q["index"], "texto": q["pt"],
                      "media": round(float(s.mean() * 100), 1),
                      "distribuicao": {f"{k:g}": round(float(v * 100), 1) for k, v in dist.items()}})

data = {
  "empresa": str(df["empresa"].iloc[0]), "periodo": "Nov 2026", "sintetico": True,
  "min_grupo": MIN_GRUPO, "total": summary(df),
  "areas": by("area"), "modelo": by("modelo"), "tempo_casa": by("tempo_casa"),
  "perfis_def": [{"id": i, "nome": n, "descricao": d,
                  "centro": {k: round(float(cent.loc[c, k]), 1) for k in ("apoio", "estigma", "abertura")}}
                 for c, (i, n, d) in ((c, prof_of[c]) for c in order)],
  "referencia_osmi": {"n": int(len(Io)), "indices": {k: round(float(Io[k].mean()), 1) for k in ("apoio", "estigma", "abertura")}},
  "perguntas": perguntas,
}
dst = ROOT / "src/data/empresa-demo.json"; dst.parent.mkdir(parents=True, exist_ok=True)
dst.write_text(json.dumps(data, ensure_ascii=False, indent=1))
print("total", data["total"]); print({a: v["indices"] for a, v in data["areas"].items()}); print([ (p["nome"], p["centro"]) for p in data["perfis_def"]])
