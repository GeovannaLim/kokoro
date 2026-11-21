import Image from "next/image";
import type { ReactNode } from "react";
import { Logo, Seal } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { brand, osmi } from "@/lib/brand";
import { ChatMock, ClusterMock, DashboardMock, PhoneMock, ReportMock } from "./Mockups";

const wrap = "mx-auto w-full max-w-[1320px] px-4 sm:px-8";
const card = "hair rounded-[28px] bg-washi-deep/70";

function Heading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`display text-center text-[2.1rem] sm:text-5xl lg:text-[3.6rem] ${className}`}>{children}</h2>;
}

/** Carimbo vertical com kanji, no acento índigo. */
function Hanko({ text }: { text: string }) {
  return (
    <span
      aria-hidden
      className="inline-grid place-items-center rounded-md border-[2.5px] border-ai px-2 py-2.5 font-serif text-2xl leading-[1.05] font-semibold text-ai [writing-mode:vertical-rl]"
    >
      {text}
    </span>
  );
}

function fmt(n: number) {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

/* ───────────────────── Hero ───────────────────── */
export function Hero() {
  return (
    <section className="pt-32 sm:pt-36">
      <div className={wrap}>
        <h1 className="display text-center text-[2.6rem] sm:text-6xl lg:text-[4.6rem]">
          Escute sua equipe.
          <br />
          Cuide da cultura.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-sumi-soft">
          Pesquisa anônima, três índices de cultura e um assistente com IA para o RH agir sobre saúde mental e
          cumprir a NR-1.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <ButtonLink href="#contato">Agendar demo</ButtonLink>
          <ButtonLink href="#plataforma" variant="secondary">
            Ver a plataforma
          </ButtonLink>
        </div>

        <div className={`${card} relative mt-14 overflow-hidden rounded-[36px] px-4 pt-8 sm:rounded-[44px] sm:px-10 sm:pt-12`}>
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_340px]">
            <div className="pb-6 sm:pb-10">
              <DashboardMock />
            </div>
            <Image
              src="/kokoro/kokoro-ai.png"
              alt="Kokoro, o mascote: um robô redondo de cachecol acenando"
              width={680}
              height={680}
              preload
              className="animate-float mx-auto w-[220px] mix-blend-multiply sm:w-[280px] lg:w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Faixa de confiança ───────────────────── */
const trust = [
  "NR-1 · riscos psicossociais",
  "LGPD",
  "Anonimato: grupos de 5 ou mais",
  "Modelos testados em dados reais",
  `${osmi.respondents.toLocaleString("pt-BR")} respostas OSMI`,
  "Sem diagnóstico individual",
];

export function TrustStrip() {
  return (
    <section className="pt-16 sm:pt-20">
      <p className="text-center text-xs tracking-[0.08em] text-stone">Construído com cuidado</p>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="animate-marquee flex w-max gap-3">
          {[...trust, ...trust].map((t, i) => (
            <span
              key={i}
              aria-hidden={i >= trust.length}
              className={`${card} flex h-20 min-w-[260px] items-center justify-center rounded-full px-8 text-sm text-sumi-soft`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Plataforma (bento) ───────────────────── */
export function Platform() {
  return (
    <section id="plataforma" className="scroll-mt-24 pt-28 sm:pt-36">
      <div className={wrap}>
        <Heading>
          Uma plataforma moderna
          <br />
          para cuidar de pessoas
        </Heading>

        <div className="mt-14 grid gap-3 md:grid-cols-3 md:grid-rows-[auto_auto]">
          <div className={`${card} flex flex-col items-center p-8 text-center`}>
            <p className="text-sm">Pesquisa anônima</p>
            <div className="my-8">
              <Hanko text="匿名" />
            </div>
            <p className="text-sm leading-relaxed text-sumi-soft">
              Vinte perguntas, pelo celular. O RH nunca vê respostas individuais.
            </p>
          </div>

          <div className={`${card} flex flex-col items-center overflow-hidden p-8 text-center md:row-span-2`}>
            <p className="text-sm">Assistente com IA</p>
            <Image
              src="/kokoro/kokoro-ai.png"
              alt=""
              width={520}
              height={520}
              className="my-6 w-full max-w-[300px] mix-blend-multiply"
            />
            <p className="display text-3xl">
              Pergunte em
              <br />
              português
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sumi-soft">
              O assistente responde com base só nos dados agregados da sua empresa e sugere o próximo passo.
            </p>
          </div>

          <div className={`${card} flex flex-col items-center p-8 text-center`}>
            <p className="text-sm">Três índices de cultura</p>
            <div className="my-8">
              <Hanko text="指標" />
            </div>
            <p className="text-sm leading-relaxed text-sumi-soft">Apoio, estigma e abertura, por área e por perfil.</p>
          </div>

          <div className={`${card} flex flex-col items-center p-8 text-center`}>
            <p className="text-sm">Perfis de equipe</p>
            <div className="my-4">
              <ClusterMock />
            </div>
            <p className="text-sm leading-relaxed text-sumi-soft">
              Agrupamos as respostas em perfis para mostrar onde agir primeiro.
            </p>
          </div>

          <div className={`${card} flex flex-col items-center p-8 text-center`}>
            <p className="text-sm">Relatório NR-1</p>
            <div className="my-6">
              <ReportMock />
            </div>
            <p className="text-sm leading-relaxed text-sumi-soft">Diagnóstico e plano de ação em PDF, prontos para auditoria.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Assistente ───────────────────── */
const steps = [
  { k: "01", t: "Aplique a pesquisa", d: "Um link anônimo para a equipe responder em poucos minutos." },
  { k: "02", t: "Leia os índices", d: "O dashboard mostra apoio, estigma e abertura por área." },
  { k: "03", t: "Pergunte e aja", d: "O assistente explica os números e propõe ações práticas." },
];

export function Assistant() {
  return (
    <section id="assistente" className="scroll-mt-24 pt-28 sm:pt-36">
      <div className={wrap}>
        <Heading>
          Pergunte.
          <br />O Kokoro responde.
        </Heading>
        <div className="mt-14 grid gap-3 lg:grid-cols-[1.15fr_1fr]">
          <div className={`${card} grid place-items-center p-5 sm:p-12`}>
            <ChatMock />
          </div>
          <div className={`${card} grid items-center gap-8 p-8 sm:grid-cols-[1fr_auto] sm:p-12`}>
            <div className="space-y-8">
              {steps.map((s) => (
                <div key={s.k} className="flex gap-5">
                  <span className="pt-1.5 font-serif text-sm text-ai">{s.k}</span>
                  <div>
                    <p className="display text-2xl">{s.t}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-sumi-soft">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <PhoneMock />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Sobre ───────────────────── */
export function About() {
  return (
    <section id="sobre" className="scroll-mt-24 pt-28 sm:pt-36">
      <div className={wrap}>
        <Heading>
          Construindo empresas onde é seguro
          <br className="hidden sm:block" /> falar de saúde mental
        </Heading>
        <div className="mt-14 grid gap-3 lg:grid-cols-[400px_1fr]">
          <div className={`${card} flex flex-col items-center justify-end rounded-t-[200px] px-8 pt-24 pb-8 text-center`}>
            <Seal className="h-12 w-12 text-2xl" />
            <p className="mt-6 text-sm leading-relaxed text-sumi-soft">
              Os modelos do Kokoro nasceram no EY AI &amp; Data Challenge e foram testados com respostas reais de{" "}
              {osmi.respondents.toLocaleString("pt-BR")} profissionais de tecnologia.
            </p>
            <ButtonLink href="#dados" className="mt-8 w-full">
              Ver os dados
            </ButtonLink>
          </div>
          <div className={`${card} grid place-items-center overflow-hidden rounded-[28px] p-6`}>
            <Image
              src="/kokoro/kokoro-sumi.png"
              alt="Kokoro, o mascote, em gravura preta"
              width={900}
              height={900}
              className="w-full max-w-[560px] mix-blend-multiply"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Dados reais ───────────────────── */
const stats = [
  { v: osmi.careerHarm, t: "acham que falar de saúde mental prejudicaria a carreira" },
  { v: osmi.neverDiscussed, t: "trabalham em empresas que nunca discutiram o tema formalmente" },
  { v: osmi.unsureSerious, t: "não sabem se a empresa leva saúde mental tão a sério quanto a física" },
  { v: osmi.wouldTellInterview, t: "falariam do assunto numa entrevista de emprego" },
];

export function RealData() {
  return (
    <section id="dados" className="scroll-mt-24 pt-28 sm:pt-36">
      <div className={wrap}>
        <Heading>
          Pessoas reais,
          <br />
          dados reais
        </Heading>
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.t} className={`${card} flex min-h-[280px] flex-col justify-between p-8`}>
              <p className="display text-6xl">
                {fmt(s.v)}
                <span className="text-3xl">%</span>
              </p>
              <p className="text-sm leading-relaxed text-sumi-soft">{s.t}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-stone">
          {osmi.source}. Só percentuais agregados, nenhum dado individual.
        </p>
      </div>
    </section>
  );
}

/* ───────────────────── Planos ───────────────────── */
// TODO: preços provisórios — validar antes de publicar
const plans = [
  {
    name: "Piloto",
    price: "Grátis",
    detail: "1 pesquisa · até 50 respostas",
    features: ["Três índices de cultura", "Dashboard da empresa", "10 perguntas ao assistente"],
    cta: "Começar piloto",
  },
  {
    name: "Empresa",
    price: "R$ 990/mês",
    detail: "até 500 colaboradores",
    features: ["Pesquisas ilimitadas", "Recortes por área e perfis", "Assistente sem limite", "Relatório NR-1 em PDF"],
    cta: "Agendar demo",
    featured: true,
  },
  {
    name: "Corporativo",
    price: "Sob consulta",
    detail: "acima de 500 colaboradores",
    features: ["Tudo do Empresa", "Login único (SSO)", "Comparativo entre unidades", "Acompanhamento especializado"],
    cta: "Falar com a gente",
  },
];

export function Pricing() {
  return (
    <section id="planos" className="scroll-mt-24 pt-28 sm:pt-36">
      <div className={wrap}>
        <Heading>Planos</Heading>
        <div className="mt-14 grid gap-3 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`flex flex-col rounded-[28px] p-8 ${p.featured ? "bg-sumi text-washi" : card}`}>
              <p className={`text-sm ${p.featured ? "text-washi/60" : "text-stone"}`}>{p.name}</p>
              <p className="display mt-3 text-4xl">{p.price}</p>
              <p className={`mt-2 text-sm ${p.featured ? "text-washi/60" : "text-stone"}`}>{p.detail}</p>
              <ul className={`mt-8 flex-1 space-y-3 text-sm ${p.featured ? "text-washi/85" : "text-sumi-soft"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className={`h-px w-3 ${p.featured ? "bg-washi/50" : "bg-sumi/40"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <ButtonLink href="#contato" variant={p.featured ? "inverse" : "primary"} className="mt-10">
                {p.cta}
              </ButtonLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── FAQ ───────────────────── */
const faq = [
  {
    q: "O Kokoro ajuda a cumprir a NR-1?",
    a: "Sim. A NR-1 pede que as empresas identifiquem e gerenciem riscos psicossociais. O Kokoro mede esses fatores, aponta prioridades e gera um relatório com o diagnóstico e o plano de ação.",
  },
  {
    q: "O RH consegue ver o que cada pessoa respondeu?",
    a: "Não. As respostas são anônimas e os resultados só aparecem para grupos de 5 pessoas ou mais.",
  },
  {
    q: "O Kokoro diagnostica transtornos mentais?",
    a: "Não. O Kokoro avalia a cultura e o ambiente de trabalho. Diagnóstico é papel de profissionais de saúde, e o assistente sempre orienta nesse sentido.",
  },
  {
    q: "Quanto tempo leva para ter o primeiro diagnóstico?",
    a: "Você cria a pesquisa em minutos. Com as primeiras respostas, o dashboard já mostra os índices.",
  },
];

export function FAQ() {
  return (
    <section className="pt-28 sm:pt-36">
      <div className={wrap}>
        <Heading>Perguntas frequentes</Heading>
        <div className="mx-auto mt-12 max-w-3xl border-t border-sumi/10">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-sumi/10 py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl">
                {f.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-sans text-lg shadow-[inset_0_0_0_1px_rgba(17,17,17,0.22)] transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-sumi-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── CTA final + rodapé ───────────────────── */
export function FinalCTA() {
  return (
    <section id="contato" className="scroll-mt-24 pt-28 pb-20 sm:pt-40 sm:pb-28">
      <div className={wrap}>
        <h2 className="display text-center text-5xl sm:text-7xl lg:text-[5.5rem]">Comece a escutar</h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <span className={`${card} rounded-full px-6 py-3 text-sm text-sumi-soft`}>Piloto grátis · pronto em minutos</span>
          {/* TODO: definir brand.contactEmail antes de publicar */}
          <ButtonLink href={brand.contactEmail ? `mailto:${brand.contactEmail}` : "#contato"}>Agendar demo</ButtonLink>
        </div>
      </div>
    </section>
  );
}

const footerCols = [
  {
    t: "Plataforma",
    l: [
      { h: "#plataforma", n: "Pesquisa anônima" },
      { h: "#plataforma", n: "Índices de cultura" },
      { h: "#assistente", n: "Assistente com IA" },
      { h: "#plataforma", n: "Relatório NR-1" },
    ],
  },
  {
    t: "Empresa",
    l: [
      { h: "#sobre", n: "Sobre" },
      { h: "#dados", n: "Dados" },
      { h: "#planos", n: "Planos" },
    ],
  },
  { t: "Contato", l: [{ h: "#contato", n: "Agendar demo" }] },
];

export function Footer() {
  return (
    <footer className={`${wrap} pb-10`}>
      <div className="hair grid gap-10 rounded-[28px] p-8 sm:p-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="display mt-6 max-w-sm text-2xl">Saúde mental organizacional, escutada com cuidado.</p>
          <p className="mt-4 text-sm text-stone">Feito no Brasil.</p>
        </div>
        {footerCols.map((c) => (
          <div key={c.t}>
            <p className="text-xs text-stone">{c.t}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.l.map((l) => (
                <li key={l.n}>
                  <a href={l.h} className="transition-colors hover:text-ai">
                    {l.n}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-2 px-2 text-xs text-stone sm:flex-row sm:justify-between">
        <p>© 2026 Kokoro</p>
        <p>Em sofrimento agora? Ligue 188 (CVV), 24 horas, gratuito.</p>
      </div>
    </footer>
  );
}
