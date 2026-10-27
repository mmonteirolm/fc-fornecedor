import type { ReactNode } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

function Item({ children, variante = "cheio", className = "" }: { children: ReactNode; variante?: "cheio" | "secundario"; className?: string }) {
  return (
    <li className={`flex items-start gap-2.5 ${className}`}>
      <span aria-hidden className={
        variante === "cheio"
          ? "mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
          : "mt-[0.55em] h-2 w-2 shrink-0 rounded-full border-2 border-primary/50"
      } />
      <span>{children}</span>
    </li>
  );
}

export function GuiaCadastro() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-md transition hover:bg-gold/90">
          📋 Guia de Cadastro de Fornecedores
        </button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Guia de Cadastro de Fornecedores</SheetTitle>
          <SheetDescription>Regras para preencher o cadastro conforme a inscrição estadual.</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6 px-4 pb-6 text-sm leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-base font-bold">Fornecedores COM Inscrição Estadual</h3>
            <p>Contribuinte: <strong>SIM</strong></p>
            <p className="w-fit rounded-md bg-primary/10 px-2 py-1 font-semibold text-foreground ring-1 ring-primary/15">
              Consultar se a empresa é optante pelo Simples Nacional.
            </p>
            <p>Aba Fiscais - Grupo Tributário: <strong>001</strong></p>
            <ul className="space-y-1.5 pt-2">
              <Item>Se for optante:</Item>
              <Item variante="secundario" className="pl-5">Aba Outros - Optante pelo Simples Nacional: <strong>Sim</strong></Item>
              <Item>Se <strong>não</strong> for optante:</Item>
              <Item variante="secundario" className="pl-5">Aba Outros - Optante pelo Simples Nacional: <strong>Não</strong></Item>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold">Fornecedores SEM Inscrição Estadual</h3>
            <p>Contribuinte: <strong>NÃO</strong></p>
            <p>Grupo Tributário: <strong>004</strong></p>
          </section>

          <Separator />

          <section className="space-y-3">
            <ul>
              <Item><strong>Aba outros: Optante pelo Simples Nacional: CONSULTAR</strong></Item>
            </ul>
            <p className="text-muted-foreground">Para a consulta da Inscrição Estadual, é necessária a utilização do Certificado Digital em alguns estados.</p>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
