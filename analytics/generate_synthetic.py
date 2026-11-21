"""Gera respostas SINTÉTICAS para a demo do Kokoro (o Hack Brasil exige dados sintéticos em projetos de saúde).
Calibração: distribuição de cada resposta e correlação entre perguntas vindas da OSMI 2016 (cópula gaussiana).
Cada área recebe um deslocamento nos fatores de apoio/estigma/abertura para o dashboard ter contraste.
Ninguém real está aqui: as pessoas, a empresa e as áreas são fictícias.
Uso: python analytics/generate_synthetic.py  ->  analytics/out/respostas_sinteticas.csv"""
import json
from pathlib import Path
import numpy as np, pandas as pd
from scipy.stats import norm
from questions import QUESTIONS

HERE = Path(__file__).parent
CAL = json.loads((HERE / "osmi_calibration.json").read_text())
rng = np.random.default_rng(2026)

EMPRESA = "Empresa Aurora"  # fictícia
# área: (pessoas, deslocamento em desvios-padrão para apoio, estigma, abertura)
AREAS = {
    "Produto":     (58, ( 0.55, -0.45,  0.55)),
    "Engenharia":  (84, ( 0.20, -0.10,  0.15)),
    "Comercial":   (62, (-0.45,  0.60, -0.55)),
    "Operações":   (46, (-0.55,  0.35, -0.35)),
    "Atendimento": (40, (-0.25,  0.45, -0.30)),
    "RH":          (18, ( 0.70, -0.55,  0.65)),
}
TEMPO = ["Menos de 1 ano", "1 a 3 anos", "3 a 5 anos", "Mais de 5 anos"]
MODELO = ["Presencial", "Híbrido", "Remoto"]
TIME = ["Até 5 pessoas", "6 a 15 pessoas", "Mais de 15 pessoas"]

ids = CAL["question_ids"]
C = np.array(CAL["question_corr"], float)
np.fill_diagonal(C, 1.0)
w, V = np.linalg.eigh(C); C = V @ np.diag(np.clip(w, 1e-3, None)) @ V.T   # garante matriz válida
d = np.sqrt(np.diag(C)); C = C / np.outer(d, d)
sign = {"apoio": 0, "estigma": 1, "abertura": 2}

rows = []
for area, (n, shift) in AREAS.items():
    Z = rng.multivariate_normal(np.zeros(len(ids)), C, size=n)
    for j, qid in enumerate(ids):
        q = next(x for x in QUESTIONS if x["id"] == qid)
        Z[:, j] += shift[sign[q["index"]]] * 0.9
    for i in range(n):
        r = {"empresa": EMPRESA, "area": area,
             "tempo_casa": rng.choice(TEMPO, p=[.22, .38, .22, .18]),
             "modelo": rng.choice(MODELO, p=[.25, .5, .25]),
             "time": rng.choice(TIME, p=[.3, .5, .2])}
        for j, qid in enumerate(ids):
            cal = CAL["questions"][qid]
            cum = np.cumsum(cal["probs"]); u = norm.cdf(Z[i, j])
            r[qid] = cal["values"][int(np.searchsorted(cum, u * cum[-1]))]
        rows.append(r)

out = HERE / "out"; out.mkdir(exist_ok=True)
df = pd.DataFrame(rows)
df.insert(0, "id_resposta", [f"r{k:04d}" for k in range(1, len(df) + 1)])
df.to_csv(out / "respostas_sinteticas.csv", index=False)
print(len(df), "respostas sintéticas em", len(AREAS), "áreas ->", out / "respostas_sinteticas.csv")
