import type { FormData, SolicitationType } from '@/types/complaint-form';
import FormField from '../FormField';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
}

const solicitacoes: { value: SolicitationType; label: string }[] = [
  { value: 'troca', label: 'Troca' },
  { value: 'garantia', label: 'Garantia' },
  { value: 'conserto', label: 'Conserto' },
  { value: 'analise_tecnica', label: 'Análise técnica' },
  { value: 'orientacao', label: 'Orientação de uso' },
  { value: 'outro', label: 'Outro' },
];

const Step4ProblemDetails = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-5">
      <h2 className="form-section-title">Detalhes do Problema</h2>
      <FormField
        label="Explique o que aconteceu com o produto"
        required
        type="textarea"
        value={data.descricaoProblema}
        onChange={(v) => onChange('descricaoProblema', v)}
        hint="Descreva como o produto foi utilizado e qual problema ocorreu."
      />

      <div className="space-y-3">
        <Label className="form-label-required text-sm font-medium">O cliente solicita</Label>
        <RadioGroup value={data.solicitacao} onValueChange={(v) => onChange('solicitacao', v)} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {solicitacoes.map((s) => (
            <div key={s.value} className="flex items-center gap-2">
              <RadioGroupItem value={s.value} id={`sol-${s.value}`} />
              <Label htmlFor={`sol-${s.value}`} className="cursor-pointer">{s.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default Step4ProblemDetails;
