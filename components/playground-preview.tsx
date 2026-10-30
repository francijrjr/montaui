import * as React from "react";
import { Check, CircleCheck, Eye, LayoutDashboard, Plus, Sparkles } from "lucide-react";
import { Button } from "../registry/ui/button";
import { Input } from "../registry/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../registry/ui/card";
import { Statistic } from "../registry/ui/statistic";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../registry/ui/dialog";
import { ToastProvider, useToast } from "../registry/ui/toast";

function ButtonDemo() {
  const [loading, setLoading] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  React.useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function save() {
    setLoading(true);
    timer.current = setTimeout(() => { setLoading(false); setSaved(true); }, 850);
  }
  return <div className="flex flex-col items-center gap-4">
    <Button onClick={save} isLoading={loading}><Check className="size-4" />{saved ? "Salvo com sucesso" : "Salvar alterações"}</Button>
    <div className="flex flex-wrap justify-center gap-2"><Button variant="secondary">Secundário</Button><Button variant="danger">Excluir</Button></div>
    <span className="text-[10px] text-muted-foreground">Clique para experimentar o estado de loading</span>
  </div>;
}

function InputDemo() {
  const [email, setEmail] = React.useState("hello@montaui.dev");
  const [password, setPassword] = React.useState("montaui2026");
  return <div className="max-w-[300px] mx-auto space-y-4 text-left">
    <label className="block text-[10px] font-semibold" htmlFor="playground-email">E-mail corporativo</label>
    <Input id="playground-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} clearable onClear={() => setEmail("")} aria-describedby="playground-email-hint" />
    <span id="playground-email-hint" className="block text-[10px] text-muted-foreground">Campo com foco acessível e ação para limpar.</span>
    <label className="block text-[10px] font-semibold" htmlFor="playground-password">Senha</label>
    <Input id="playground-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
  </div>;
}

function ModalDemo() {
  const [open, setOpen] = React.useState(false);
  return <div className="flex flex-col items-center gap-3">
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mp-button"><Plus className="size-4" />Abrir diálogo</DialogTrigger>
      <DialogContent aria-labelledby="playground-dialog-title">
        <DialogHeader><div className="mp-dialog-icon"><Sparkles /></div><DialogTitle id="playground-dialog-title">Publicar alterações?</DialogTitle><DialogDescription>Seu novo projeto ficará disponível para toda a equipe. Você poderá atualizar as configurações depois.</DialogDescription></DialogHeader>
        <DialogFooter><Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button><Button onClick={() => setOpen(false)}><Check />Publicar</Button></DialogFooter>
      </DialogContent>
    </Dialog>
    <span className="text-[10px] text-muted-foreground">Diálogo Monta UI com backdrop e fechamento acessível</span>
  </div>;
}

function ToastAction() {
  const { toast } = useToast();
  return <div className="flex flex-col items-center gap-4">
    <Button onClick={() => toast({ title: "Alterações salvas", description: "Seu projeto foi atualizado com sucesso.", variant: "success", duration: 3200 })}><CircleCheck />Mostrar notificação</Button>
    <span className="text-[10px] text-muted-foreground">Feedback success com dispensa automática</span>
  </div>;
}

function DashboardDemo() {
  return <div className="w-full max-w-[360px] mx-auto text-left">
    <Card className="border-0 bg-transparent shadow-none"><CardHeader className="p-0 pb-3"><CardTitle className="flex items-center justify-between text-[13px]"><span className="flex items-center gap-2"><LayoutDashboard className="size-4 text-brand" />Visão geral</span><span className="text-[9px] font-normal text-muted-foreground">Últimos 30 dias</span></CardTitle></CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 p-0">
        <Statistic className="p-3" title="Receita total" value="R$ 48.290" trend={12.8} trendLabel="este mês" />
        <Statistic className="p-3" title="Novos clientes" value="1.284" trend={8.2} trendLabel="este mês" />
        <div className="mp-chart col-span-2" aria-label="Gráfico de receita dos últimos meses">{[32,48,38,70,55,86,64,96].map((height, index) => <i key={index} style={{ "--bar": `${height}%`, animationDelay: `${index * 45}ms` } as React.CSSProperties} />)}</div>
      </CardContent>
    </Card>
  </div>;
}

export function PlaygroundPreview({ name }: { name: string }) {
  if (name === "button") return <ButtonDemo />;
  if (name === "input") return <InputDemo />;
  if (name === "modal") return <ModalDemo />;
  if (name === "toast") return <ToastProvider><ToastAction /></ToastProvider>;
  return <DashboardDemo />;
}
