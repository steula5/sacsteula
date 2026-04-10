import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Step7QualityInternal from '@/components/form/steps/Step7QualityInternal';
import { type FormData } from '@/types/complaint-form';
import { Save, ArrowLeft, Search, Clock, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { type Complaint, getAllComplaints, updateComplaint, formatProtocolDate, isOverdue } from '@/lib/storage';
import { Badge } from '@/components/ui/badge';

const statusLabels: Record<string, string> = {
  aberto: 'Aberto',
  em_analise_vendas: 'Em análise (Vendas)',
  em_analise_qualidade: 'Em análise (Qualidade)',
  concluido: 'Concluído',
};

const Qualidade = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selected, setSelected] = useState<Complaint | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setComplaints(getAllComplaints());
  }, []);

  const filtered = complaints.filter(
    (c) =>
      c.protocolo.toLowerCase().includes(search.toLowerCase()) ||
      (c.data.distribuidorNome || c.data.nomeCompleto || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.data.nomeProduto || '').toLowerCase().includes(search.toLowerCase()),
  );

  const updateField = (field: keyof FormData, value: string) => {
    if (!selected) return;
    setSelected({
      ...selected,
      data: { ...selected.data, [field]: value },
    });
  };

  const handleSave = () => {
    if (!selected) return;
    updateComplaint(selected.protocolo, { data: selected.data, status: 'em_analise_qualidade' });
    toast.success('Laudo salvo com sucesso!');
    setComplaints(getAllComplaints());
    setSelected(null);
  };

  const handleConcluir = () => {
    if (!selected) return;
    updateComplaint(selected.protocolo, { data: selected.data, status: 'concluido' });
    toast.success('Reclamação concluída!');
    setComplaints(getAllComplaints());
    setSelected(null);
  };

  if (selected) {
    const clientName = selected.data.clientType === 'distribuidor' ? selected.data.distribuidorNome : selected.data.nomeCompleto;
    return (
      <div className="min-h-screen bg-background">
        <div className="industrial-header py-5 px-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}Logo/Logo.png`} alt="Steula" className="h-10" />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-primary-foreground font-display uppercase tracking-wider">
                Painel Interno — Qualidade
              </h1>
              <p className="text-sm text-primary-foreground/70">
                Protocolo: {selected.protocolo}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto py-6 px-4 md:py-8 space-y-4">
          <Button variant="outline" onClick={() => setSelected(null)} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Voltar à lista
          </Button>

          {/* Resumo da reclamação */}
          <Card className="p-6 border-t-4 border-t-muted shadow-sm space-y-3">
            <h2 className="form-section-title">Resumo da Reclamação</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><span className="font-medium text-muted-foreground">Cliente:</span> {clientName}</div>
              <div><span className="font-medium text-muted-foreground">Tipo:</span> {selected.data.clientType === 'distribuidor' ? 'Distribuidor' : 'Cliente Final'}</div>
              <div><span className="font-medium text-muted-foreground">Produto:</span> {selected.data.nomeProduto}</div>
              <div><span className="font-medium text-muted-foreground">Quantidade:</span> {selected.data.quantidadeProblema}</div>
              <div><span className="font-medium text-muted-foreground">Data da compra:</span> {selected.data.dataCompra}</div>
              <div><span className="font-medium text-muted-foreground">Data do problema:</span> {selected.data.dataProblema}</div>
              <div className="md:col-span-2"><span className="font-medium text-muted-foreground">Descrição:</span> {selected.data.descricaoProblema}</div>
              <div><span className="font-medium text-muted-foreground">Solicitação:</span> {selected.data.solicitacao}</div>
            </div>
          </Card>

          {/* Parecer de vendas (somente leitura) */}
          {selected.data.parecerVendas && (
            <Card className="p-6 border-t-4 border-t-muted shadow-sm space-y-2">
              <h2 className="form-section-title">Parecer de Vendas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div><span className="font-medium text-muted-foreground">Nº Devolução:</span> {selected.data.numDevolucao}</div>
                <div><span className="font-medium text-muted-foreground">Recebido por:</span> {selected.data.recebidoPor}</div>
                <div><span className="font-medium text-muted-foreground">Data recebimento:</span> {selected.data.dataRecebimento}</div>
              </div>
              <p className="text-sm mt-2"><span className="font-medium text-muted-foreground">Parecer:</span> {selected.data.parecerVendas}</p>
              {selected.data.observacoes && (
                <p className="text-sm"><span className="font-medium text-muted-foreground">Observações:</span> {selected.data.observacoes}</p>
              )}
            </Card>
          )}

          {/* Formulário de qualidade */}
          <Card className="p-6 md:p-8 border-t-4 border-t-primary shadow-sm">
            <Step7QualityInternal data={selected.data} onChange={updateField} />
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
              <Button onClick={handleSave} variant="outline" className="gap-2">
                <Save className="w-4 h-4" /> Salvar Laudo
              </Button>
              <Button onClick={handleConcluir} className="gap-2">
                Concluir Reclamação
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="industrial-header py-5 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}Logo/Logo.png`} alt="Steula" className="h-10" />
          <div>
            <h1 className="text-lg md:text-xl font-bold text-primary-foreground font-display uppercase tracking-wider">
              Painel Interno — Qualidade
            </h1>
            <p className="text-sm text-primary-foreground/70">
              Laudo técnico e análise de reclamações
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-6 px-4 md:py-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por protocolo, cliente ou produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {filtered.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            <p>Nenhuma reclamação encontrada.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map((c) => {
              const clientName = c.data.clientType === 'distribuidor' ? c.data.distribuidorNome : c.data.nomeCompleto;
              const overdue = isOverdue(c.prazoResposta) && c.status !== 'concluido';
              return (
                <Card
                  key={c.protocolo}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary"
                  onClick={() => setSelected(c)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold font-display tracking-wide text-primary">{c.protocolo}</span>
                        <Badge variant={c.status === 'aberto' ? 'default' : c.status === 'concluido' ? 'secondary' : 'outline'}>
                          {statusLabels[c.status]}
                        </Badge>
                        {overdue && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="w-3 h-3" /> Prazo excedido
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-foreground truncate">{clientName} — {c.data.nomeProduto}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>Criado em {formatProtocolDate(c.criadoEm)}</span>
                        <span className="mx-1">·</span>
                        <span>Prazo: {formatProtocolDate(c.prazoResposta)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Qualidade;
