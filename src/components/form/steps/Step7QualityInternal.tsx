import type { FormData, SituationType } from '@/types/complaint-form';
import FormField from '../FormField';
import { maskDate, maskCurrency } from '@/lib/masks';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ClipboardCheck } from 'lucide-react';

interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
}

const situacoes: { value: SituationType; label: string }[] = [
  { value: 'garantia', label: 'Garantia' },
  { value: 'conserto', label: 'Conserto' },
  { value: 'improcedente', label: 'Improcedente' },
];

const Step7QualityInternal = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-accent">
        <ClipboardCheck className="w-5 h-5" />
        <h2 className="form-section-title mb-0">Uso Interno — Qualidade</h2>
      </div>
      <p className="text-sm text-muted-foreground">Seção preenchida pelo setor de qualidade.</p>

      <FormField label="Laudo técnico" type="textarea" value={data.laudoTecnico} onChange={(v) => onChange('laudoTecnico', v)} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Técnico responsável" value={data.tecnicoResponsavel} onChange={(v) => onChange('tecnicoResponsavel', v)} />
        <FormField label="Data do laudo" value={data.dataLaudo} onChange={(v) => onChange('dataLaudo', maskDate(v))} placeholder="DD/MM/AAAA" />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Situação</Label>
        <RadioGroup value={data.situacao} onValueChange={(v) => onChange('situacao', v)} className="flex gap-6">
          {situacoes.map((s) => (
            <div key={s.value} className="flex items-center gap-2">
              <RadioGroupItem value={s.value} id={`sit-${s.value}`} />
              <Label htmlFor={`sit-${s.value}`}>{s.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Valor a ser cobrado" value={data.valorCobrado} onChange={(v) => onChange('valorCobrado', maskCurrency(v))} placeholder="R$ 0,00" />
        <div className="space-y-3">
          <Label className="text-sm font-medium">Orçamento aprovado?</Label>
          <RadioGroup value={data.orcamentoAprovado} onValueChange={(v) => onChange('orcamentoAprovado', v)} className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="sim" id="orc-sim" />
              <Label htmlFor="orc-sim">Sim</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="nao" id="orc-nao" />
              <Label htmlFor="orc-nao">Não</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default Step7QualityInternal;
