import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GuiaCadastro } from "@/components/GuiaCadastro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Consulta de Fornecedores — Simples Nacional e Inscrição Estadual" },
      { name: "description", content: "Acesse a consulta ao Simples Nacional e a consulta de inscrição estadual de todos os estados do Brasil." },
      { property: "og:title", content: "Consulta de Fornecedores — Simples Nacional e IE" },
      { property: "og:description", content: "Links oficiais para consultar Simples Nacional e inscrição estadual por estado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type UF = { uf: string; nome: string; url: string; certificado?: boolean };
const REGIOES: { nome: string; estados: UF[] }[] = [
  { nome: "Região Sul", estados: [
    { uf: "PR", nome: "Paraná", url: "https://www.fazenda.pr.gov.br/Servicos/Consultar-cadastro-ICMS" },
    { uf: "RS", nome: "Rio Grande do Sul", url: "https://www.sefaz.rs.gov.br/consultas/contribuinte" },
    { uf: "SC", nome: "Santa Catarina", url: "https://sat.sef.sc.gov.br/tax.NET/tax.net.cadastro/conssc_sitcad.aspx" },
  ]},
  { nome: "Região Sudeste", estados: [
    { uf: "ES", nome: "Espírito Santo", url: "https://dfe-portal.svrs.rs.gov.br/Nfe/Ccc", certificado: true },
    { uf: "MG", nome: "Minas Gerais", url: "https://dfe-portal.svrs.rs.gov.br/Nfe/Ccc", certificado: true },
    { uf: "RJ", nome: "Rio de Janeiro", url: "https://sucief-sincad-web.fazenda.rj.gov.br/sincad-web/index.jsf" },
    { uf: "SP", nome: "São Paulo", url: "http://www.cadesp.fazenda.sp.gov.br/(S(uhpce1gv3crxbpvnxm4dfeuo))/Pages/Cadastro/Consultas/ConsultaPublica/ConsultaPublica.aspx" },
  ]},
  { nome: "Região Centro-Oeste", estados: [
    { uf: "DF", nome: "Distrito Federal", url: "http://agnet.fazenda.df.gov.br/area.cfm?id_area=1140" },
    { uf: "GO", nome: "Goiás", url: "http://appasp.sefaz.go.gov.br/Sintegra/Consulta/default.html" },
    { uf: "MS", nome: "Mato Grosso do Sul", url: "https://cpe.sefaz.ms.gov.br/" },
    { uf: "MT", nome: "Mato Grosso", url: "https://www.sefaz.mt.gov.br/cadastro/emissaocartao/emissaocartaocontribuinteacessodireto" },
  ]},
  { nome: "Região Nordeste", estados: [
    { uf: "AL", nome: "Alagoas", url: "https://cadastro.sefaz.al.gov.br/#/fic" },
    { uf: "BA", nome: "Bahia", url: "https://portal.sefaz.ba.gov.br/scripts/cadastro/cadastroBa/consultaBa.asp" },
    { uf: "CE", nome: "Ceará", url: "http://internet-consultapublica.apps.sefaz.ce.gov.br/sintegra/preparar-consultar" },
    { uf: "MA", nome: "Maranhão", url: "https://sistemas1.sefaz.ma.gov.br/sintegra/jsp/consultaSintegra/consultaSintegraFiltro.jsf" },
    { uf: "PB", nome: "Paraíba", url: "https://www4.sefaz.pb.gov.br/sintegra/SINf_ConsultaSintegra.jsp" },
    { uf: "PE", nome: "Pernambuco", url: "https://dfe-portal.svrs.rs.gov.br/Nfe/Ccc", certificado: true },
    { uf: "PI", nome: "Piauí", url: "https://dfe-portal.svrs.rs.gov.br/Nfe/Ccc", certificado: true },
    { uf: "RN", nome: "Rio Grande do Norte", url: "https://uvt.sefaz.rn.gov.br/#/services/consultaContribuinte" },
    { uf: "SE", nome: "Sergipe", url: "https://security.sefaz.se.gov.br/SIC/sintegra/index.jsp" },
  ]},
  { nome: "Região Norte", estados: [
    { uf: "AC", nome: "Acre", url: "https://sefazonline.ac.gov.br/sefazonline/app.wmsintegralista" },
    { uf: "AM", nome: "Amazonas", url: "http://online.sefaz.am.gov.br/sintegra/index.asp" },
    { uf: "AP", nome: "Amapá", url: "https://www.sefaz.ap.gov.br/sate/seg/SEGf_AcessarFuncao.jsp?cdFuncao=CAD_011" },
    { uf: "PA", nome: "Pará", url: "https://app.sefa.pa.gov.br/sintegra/" },
    { uf: "RO", nome: "Rondônia", url: "https://portalcontribuinte.sefin.ro.gov.br/Publico/parametropublica.jsp" },
    { uf: "RR", nome: "Roraima", url: "https://portalweb.sefaz.rr.gov.br/sintegra/servlet/wp_siate_consultasintegra" },
    { uf: "TO", nome: "Tocantins", url: "http://sintegra.sefaz.to.gov.br/sintegra/servlet/wpsico01" },
  ]},
];

const REGION_STYLE: Record<string, { dot: string; token: string; hover: string }> = {
  "Região Sul": {
    dot: "bg-region-sul",
    token: "sul",
    hover: "hover:border-region-sul/50 hover:shadow-[0_14px_30px_-14px_var(--region-sul)]",
  },
  "Região Sudeste": {
    dot: "bg-region-sudeste",
    token: "sudeste",
    hover: "hover:border-region-sudeste/50 hover:shadow-[0_14px_30px_-14px_var(--region-sudeste)]",
  },
  "Região Centro-Oeste": {
    dot: "bg-region-centro-oeste",
    token: "centro-oeste",
    hover: "hover:border-region-centro-oeste/50 hover:shadow-[0_14px_30px_-14px_var(--region-centro-oeste)]",
  },
  "Região Nordeste": {
    dot: "bg-region-nordeste",
    token: "nordeste",
    hover: "hover:border-region-nordeste/50 hover:shadow-[0_14px_30px_-14px_var(--region-nordeste)]",
  },
  "Região Norte": {
    dot: "bg-region-norte",
    token: "norte",
    hover: "hover:border-region-norte/50 hover:shadow-[0_14px_30px_-14px_var(--region-norte)]",
  },
};

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function Index() {
  const [q, setQ] = useState("");
  const filtradas = useMemo(() => {
    const t = norm(q.trim());
    return REGIOES.map((r) => ({
      ...r,
      estados: r.estados.filter((e) => !t || norm(e.nome).includes(t) || norm(e.uf).includes(t)),
    })).filter((r) => r.estados.length);
  }, [q]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="hero-band text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ring-primary-foreground/20">
                Consulta de fornecedores
              </span>
              <h1 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                Simples Nacional <span className="text-gold">&</span> Inscrição Estadual
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/75">
                Consulte optantes do Simples Nacional e a inscrição estadual de fornecedores nos portais oficiais da Receita Federal e das Secretarias da Fazenda.
              </p>
            </div>
            <GuiaCadastro />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-12 px-4 py-12">
        <section className="relative overflow-hidden rounded-2xl border bg-card p-8 shadow-card">
          <div aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-gold" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl">Consulta ao Simples Nacional</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Verifique no site da Receita Federal se o fornecedor é optante pelo Simples Nacional.
              </p>
            </div>
            <a href="https://www8.receita.fazenda.gov.br/SIMPLESNACIONAL/aplicacoes.aspx?id=22" target="_blank" rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90">
              Acessar consulta
              <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>

        <section>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl">Consulta de Inscrição Estadual</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Selecione o estado para abrir a consulta oficial. Estados marcados com{" "}
                <span className="whitespace-nowrap rounded-full border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">Necessário Certificado</span>{" "}
                exigem certificado digital para acessar a consulta.
              </p>
            </div>
            <div className="relative w-full sm:w-80">
              <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
                <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
              </svg>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar estado ou sigla..." aria-label="Buscar estado"
                className="w-full rounded-full border border-input bg-card py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30" />
            </div>
          </div>

          <div className="mt-10 space-y-10">
            {filtradas.length === 0 && <p className="text-muted-foreground">Nenhum estado encontrado.</p>}
            {filtradas.map((r) => {
              const style = REGION_STYLE[r.nome] ?? { dot: "bg-primary", token: "primary", hover: "" };
              return (
                <div key={r.nome}>
                  <div className="mb-5 flex items-center gap-3">
                    <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                    <h3 className="font-display text-xl">{r.nome}</h3>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {r.estados.length} {r.estados.length === 1 ? "estado" : "estados"}
                    </span>
                    <div aria-hidden className="h-px flex-1"
                      style={{ background: `linear-gradient(to right, var(--region-${style.token}), transparent)` }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {r.estados.map((e) => (
                      <a key={e.uf} href={e.url} target="_blank" rel="noopener noreferrer"
                        title={`Consultar inscrição estadual de ${e.nome}`}
                        className={`group flex flex-col items-center rounded-xl border bg-card p-4 text-center shadow-card transition duration-200 hover:-translate-y-1 ${style.hover}`}>
                        <img src={`https://raw.githubusercontent.com/bgeneto/bandeiras-br/master/imagens/${e.uf}.png`} alt={`Bandeira de ${e.nome}`} loading="lazy"
                          className="h-16 w-24 rounded-md object-cover shadow-sm ring-1 ring-border" />
                        <span className="mt-3 text-sm font-semibold leading-tight">{e.nome}</span>
                        <span className="mt-1 text-xs font-semibold tracking-[0.2em] text-muted-foreground">{e.uf}</span>
                        {e.certificado && (
                          <span className="mt-2 rounded-full border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-[11px] font-semibold text-destructive">
                            Necessário Certificado
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/50 py-6">
        <p className="mx-auto max-w-6xl px-4 text-center text-xs text-muted-foreground">
          Os links direcionam aos portais oficiais da Receita Federal e das Secretarias da Fazenda estaduais.
        </p>
      </footer>
    </div>
  );
}
