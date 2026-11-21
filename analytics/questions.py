"""As 16 perguntas de cultura do Kokoro (mesma base dos índices da v1, OSMI 2016) e a codificação de cada resposta.
Índices: Apoio (5), Estigma (6), Abertura (5) — média das respostas codificadas, normalizada para 0–100."""
import numpy as np, pandas as pd

YN = {"Yes": 1.0, "No": 0.0}
YNM = {"Yes": 1.0, "No": 0.0, "Maybe": 0.5}
PREV = {"None of them": 0.0, "Some of them": 0.5, "Yes, all of them": 1.0}
REVEAL = {"No, because it would impact me negatively": 0.0, "No, because it doesn't matter": 0.25, "Sometimes, if it comes up": 0.5, "Yes, always": 1.0}
LEAVE = {"Very easy": 0.0, "Somewhat easy": 0.25, "Neither easy nor difficult": 0.5, "Somewhat difficult": 0.75, "Very difficult": 1.0}

QUESTIONS = [
  # Apoio
  {"id": "apoio_beneficio", "index": "apoio", "kind": "yn", "osmi": "Does your employer provide mental health benefits as part of healthcare coverage?",
   "pt": "A empresa oferece benefício de saúde mental no plano de saúde?"},
  {"id": "apoio_conhece", "index": "apoio", "kind": "yn", "osmi": "Do you know the options for mental health care available under your employer-provided coverage?",
   "pt": "Você conhece as opções de cuidado em saúde mental que o seu plano cobre?"},
  {"id": "apoio_discutiu", "index": "apoio", "kind": "yn", "osmi": "Has your employer ever formally discussed mental health (for example, as part of a wellness campaign or other official communication)?",
   "pt": "A empresa já falou formalmente sobre saúde mental (campanha, comunicado)?"},
  {"id": "apoio_recursos", "index": "apoio", "kind": "yn", "osmi": "Does your employer offer resources to learn more about mental health concerns and options for seeking help?",
   "pt": "A empresa oferece materiais para entender saúde mental e onde buscar ajuda?"},
  {"id": "apoio_anonimato", "index": "apoio", "kind": "yn", "osmi": "Is your anonymity protected if you choose to take advantage of mental health or substance abuse treatment resources provided by your employer?",
   "pt": "Seu anonimato é protegido se você usar os recursos de cuidado da empresa?"},
  # Estigma (maior = mais estigma)
  {"id": "estigma_consequencia", "index": "estigma", "kind": "ynm", "osmi": "Do you think that discussing a mental health disorder with your employer would have negative consequences?",
   "pt": "Falar de um transtorno mental com a empresa traria consequências negativas?"},
  {"id": "estigma_fisica", "index": "estigma", "kind": "ynm", "osmi": "Do you think that discussing a physical health issue with your employer would have negative consequences?",
   "pt": "Falar de um problema de saúde física com a empresa traria consequências negativas?"},
  {"id": "estigma_colegas", "index": "estigma", "kind": "yn", "osmi": "Have you heard of or observed negative consequences for co-workers who have been open about mental health issues in your workplace?",
   "pt": "Você já viu colegas sofrerem consequências por falar abertamente de saúde mental aqui?"},
  {"id": "estigma_anterior", "index": "estigma", "kind": "prev", "osmi": "Do you think that discussing a mental health disorder with previous employers would have negative consequences?",
   "pt": "Em empregos anteriores, falar de saúde mental traria consequências negativas?"},
  {"id": "estigma_colegas_antes", "index": "estigma", "kind": "prev", "osmi": "Did you hear of or observe negative consequences for co-workers with mental health issues in your previous workplaces?",
   "pt": "Em empregos anteriores, você viu colegas sofrerem consequências por isso?"},
  {"id": "estigma_licenca", "index": "estigma", "kind": "leave", "osmi": "If a mental health issue prompted you to request a medical leave from work, asking for that leave would be:",
   "pt": "Se precisasse de afastamento por saúde mental, pedir seria:"},
  # Abertura
  {"id": "abertura_colegas", "index": "abertura", "kind": "ynm", "osmi": "Would you feel comfortable discussing a mental health disorder with your coworkers?",
   "pt": "Você se sentiria à vontade para falar de saúde mental com colegas?"},
  {"id": "abertura_lideranca", "index": "abertura", "kind": "ynm", "osmi": "Would you feel comfortable discussing a mental health disorder with your direct supervisor(s)?",
   "pt": "Você se sentiria à vontade para falar de saúde mental com sua liderança?"},
  {"id": "abertura_seriedade", "index": "abertura", "kind": "ynm", "osmi": "Do you feel that your employer takes mental health as seriously as physical health?",
   "pt": "A empresa leva saúde mental tão a sério quanto a física?"},
  {"id": "abertura_revela", "index": "abertura", "kind": "reveal", "osmi": "If you have been diagnosed or treated for a mental health disorder, do you ever reveal this to coworkers or employees?",
   "pt": "Se você tivesse um diagnóstico, contaria para colegas?"},
  {"id": "abertura_observou", "index": "abertura", "kind": "ynm", "invert": True, "osmi": "Have your observations of how another individual who discussed a mental health disorder made you less likely to reveal a mental health issue yourself in your current workplace?",
   "pt": "O que você viu acontecer com outras pessoas te deixou com menos vontade de se abrir aqui?"},
]

CONTEXT = [
  {"id": "area", "pt": "Em qual área você trabalha?"},
  {"id": "tempo_casa", "pt": "Há quanto tempo você está na empresa?"},
  {"id": "modelo", "pt": "Qual é o seu modelo de trabalho?"},
  {"id": "time", "pt": "Quantas pessoas há no seu time?"},
]

def encode(q, v):
    if v is None or (isinstance(v, float) and np.isnan(v)):
        return np.nan
    m = {"yn": YN, "ynm": YNM, "leave": LEAVE, "prev": PREV, "reveal": REVEAL}[q["kind"]]
    return m.get(str(v).strip(), np.nan)   # código da resposta original; a inversão é só no índice

def build_indexes(E):
    """E: DataFrame com colunas = ids das perguntas (já codificadas 0–1). Mesma fórmula da v1."""
    out = {}
    for name, label in (("apoio", "Apoio"), ("estigma", "Estigma"), ("abertura", "Abertura")):
        cols = [q["id"] for q in QUESTIONS if q["index"] == name]
        X = E[cols].copy()
        for q in QUESTIONS:
            if q["index"] == name and q.get("invert"):
                X[q["id"]] = 1.0 - X[q["id"]]   # "me deixou com menos vontade de me abrir" conta contra a abertura (v1)
        s = X.mean(axis=1, skipna=True)
        out[label] = (s - np.nanmin(s)) / (np.nanmax(s) - np.nanmin(s) + 1e-9) * 100
    return pd.DataFrame(out)
