import type { FormData } from '@/types/complaint-form';
import FormField from '../FormField';
import { maskDate } from '@/lib/masks';
import { ShieldAlert } from 'lucide-react';

interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
}

const Step6SalesInternal = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-primary">
        <ShieldAlert className="w-5 h-5" />
        <h2 className="form-section-title mb-0">Uso Interno — Vendas</h2>
      </div>
      <p className="text-sm text-muted-foreground">Seção preenchida pela equipe comercial.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Número da devolução" value={data.numDevolucao} onChange={(v) => onChange('numDevolucao', v)} />
        <FormField label="Recebido por" value={data.recebidoPor} onChange={(v) => onChange('recebidoPor', v)} />
        <FormField label="Data do recebimento" value={data.dataRecebimento} onChange={(v) => onChange('dataRecebimento', maskDate(v))} placeholder="DD/MM/AAAA" />
      </div>
      <FormField label="Parecer inicial de vendas" type="textarea" value={data.parecerVendas} onChange={(v) => onChange('parecerVendas', v)} />
      <FormField label="Observações adicionais" type="textarea" value={data.observacoes} onChange={(v) => onChange('observacoes', v)} />
    </div>
  );
};

export default Step6SalesInternal;
