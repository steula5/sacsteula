import type { FormData } from '@/types/complaint-form';
import FormField from '../FormField';
import { maskDate } from '@/lib/masks';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
}

const Step3ProductData = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-5">
      <h2 className="form-section-title">Informações do Produto</h2>
      <p className="text-sm text-muted-foreground">Conte-nos sobre o produto com problema.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Nome ou código do produto" required value={data.nomeProduto} onChange={(v) => onChange('nomeProduto', v)} hint="Confira na embalagem ou na nota fiscal" />
        <FormField label="Quantidade com problema" required value={data.quantidadeProblema} onChange={(v) => onChange('quantidadeProblema', v)} />
        <FormField label="Código do lote" value={data.codigoLote} onChange={(v) => onChange('codigoLote', v)} hint="Opcional — confira na embalagem" />
        <FormField label="Data da compra" required value={data.dataCompra} onChange={(v) => onChange('dataCompra', maskDate(v))} placeholder="DD/MM/AAAA" />
        <FormField label="Quando o problema apareceu?" required value={data.dataProblema} onChange={(v) => onChange('dataProblema', maskDate(v))} placeholder="DD/MM/AAAA" />
      </div>

      <div className="space-y-3 pt-2">
        <Label className="form-label-required text-sm font-medium">Você já utilizou o produto?</Label>
        <RadioGroup value={data.produtoUtilizado} onValueChange={(v) => onChange('produtoUtilizado', v)} className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="sim" id="uso-sim" />
            <Label htmlFor="uso-sim">Sim</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="nao" id="uso-nao" />
            <Label htmlFor="uso-nao">Não</Label>
          </div>
        </RadioGroup>
      </div>

      {data.produtoUtilizado === 'sim' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg border border-border">
          <FormField label="Quantas vezes foi utilizado?" required value={data.vezesUtilizado} onChange={(v) => onChange('vezesUtilizado', v)} />
          <FormField label="Em qual aplicação foi usado?" required value={data.aplicacaoUsada} onChange={(v) => onChange('aplicacaoUsada', v)} hint='Ex: "pintura automotiva", "verniz", "acabamento"' />
        </div>
      )}
    </div>
  );
};

export default Step3ProductData;
