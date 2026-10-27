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
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 space-y-14">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Consulta de fornecedores</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">Simples Nacional e Inscrição Estadual</h1>
          </div>
          <GuiaCadastro />
        </header>

        <section className="rounded-2xl border bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Consulta ao Simples Nacional</h2>
          <p className="mt-2 text-muted-foreground">Verifique no site da Receita Federal se o fornecedor é optante pelo Simples Nacional.</p>
          <a href="https://www8.receita.fazenda.gov.br/SIMPLESNACIONAL/aplicacoes.aspx?id=22" target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90">
            Acessar consulta ao Simples Nacional →
          </a>
        </section>

        <section>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Consulta de Inscrição Estadual</h2>
              <p className="mt-1 text-muted-foreground">Selecione o estado para abrir a consulta oficial. Estados marcados com <span className="font-medium text-foreground">Necessário Certificado</span> exigem certificado digital para acessar a consulta.</p>
            </div>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar estado ou sigla..." aria-label="Buscar estado"
              className="w-full sm:w-72 rounded-lg border border-input bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div className="mt-8 space-y-10">
            {filtradas.length === 0 && <p className="text-muted-foreground">Nenhum estado encontrado.</p>}
            {filtradas.map((r) => (
              <div key={r.nome}>
                <h3 className="mb-4 border-b pb-2 text-lg font-semibold">{r.nome}</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {r.estados.map((e) => (
                    <a key={e.uf} href={e.url} target="_blank" rel="noopener noreferrer"
                      title={`Consultar inscrição estadual de ${e.nome}`}
                      className="group flex flex-col items-center rounded-xl border bg-card p-4 text-center transition hover:border-primary hover:shadow-md">
                      <img src={`https://raw.githubusercontent.com/bgeneto/bandeiras-br/master/imagens/${e.uf}.png`} alt={`Bandeira de ${e.nome}`} loading="lazy"
                        className="h-16 w-24 rounded object-cover shadow-sm" />
                      <span className="mt-3 font-medium">{e.nome} ({e.uf})</span>
                      {e.certificado && (
                        <span className="mt-2 rounded-full border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
                          Necessário Certificado
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
