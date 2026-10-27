import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export function GuiaCadastro() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="inline-flex items-center gap-2 rounded-lg border border-primary px-5 py-2.5 font-medium text-primary hover:bg-primary hover:text-primary-foreground transition">
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
            <p>Consultar se a empresa é optante pelo Simples Nacional.</p>
            <p>Aba Fiscais - Grupo Tributário: <strong>001</strong></p>
            <p className="pt-2">Se for optante:</p>
            <p className="pl-4">Aba Outros - Optante pelo Simples Nacional: <strong>Sim</strong></p>
            <p className="pt-2">Se <strong>não</strong> for optante:</p>
            <p className="pl-4">Aba Outros - Optante pelo Simples Nacional: <strong>Não</strong></p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold">Fornecedores SEM Inscrição Estadual</h3>
            <p>Contribuinte: <strong>NÃO</strong></p>
            <p>Grupo Tributário: <strong>004</strong></p>
          </section>

          <Separator />

          <section className="space-y-3">
            <p><strong>Aba outros: Optante pelo Simples Nacional: CONSULTAR</strong></p>
            <p className="text-muted-foreground">Para a consulta da Inscrição Estadual, é necessária a utilização do Certificado Digital em alguns estados.</p>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
