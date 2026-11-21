"""Extrai da pesquisa OSMI 2016 (dados reais, CC BY 4.0) só o que calibra os dados sintéticos do Kokoro:
a distribuição de respostas de cada pergunta e a correlação entre os três índices. Nenhuma linha individual sai daqui.
Uso: python analytics/osmi_calibration.py <osmi.csv>  ->  analytics/osmi_calibration.json"""
import json, sys
from pathlib import Path
import numpy as np, pandas as pd
sys.path.insert(0, str(Path(__file__).parent))
from questions import QUESTIONS, encode, build_indexes

csv = sys.argv[1]
df = pd.read_csv(csv)
out = {"source": "OSMI Mental Health in Tech Survey 2016 (CC BY 4.0)", "n": int(len(df)), "questions": {}}
enc = {}
for q in QUESTIONS:
    col = df[q["osmi"]].astype("string").str.strip()
    vals = col.map(lambda v: encode(q, v) if v is not pd.NA else np.nan).astype(float)
    enc[q["id"]] = vals
    dist = vals.dropna().value_counts(normalize=True).sort_index()
    out["questions"][q["id"]] = {"values": [float(v) for v in dist.index], "probs": [round(float(p), 4) for p in dist.values],
                                 "answered": int(vals.notna().sum())}
E = pd.DataFrame(enc)
idx = build_indexes(E)
qc = E.corr(method="spearman", min_periods=200).fillna(0.0)
out["question_ids"] = list(E.columns)
out["question_corr"] = [[round(float(x), 3) for x in row] for row in qc.values]
out["index_corr"] = [[round(float(x), 3) for x in row] for row in idx.corr().values]
out["index_mean"] = {k: round(float(v), 1) for k, v in idx.mean().items()}
Path(__file__).with_name("osmi_calibration.json").write_text(json.dumps(out, ensure_ascii=False, indent=1))
print(json.dumps({"n": out["n"], "index_mean": out["index_mean"], "index_corr": out["index_corr"]}, ensure_ascii=False))
