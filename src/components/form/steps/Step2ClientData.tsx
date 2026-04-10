import type { FormData } from '@/types/complaint-form';
import FormField from '../FormField';
import FileUpload from '../FileUpload';
import { maskPhone, maskCNPJ } from '@/lib/masks';

interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string | File | null) => void;
}

const Step2ClientData = ({ data, onChange }: Props) => {
  if (data.clientType === 'distribuidor') {
    return (
      <div className="space-y-5">
        <h2 className="form-section-title">Seus Dados — Distribuidor</h2>
        <p className="text-sm text-muted-foreground">Informe os dados da sua empresa para que possamos identificar o pedido.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Nome do distribuidor" required value={data.distribuidorNome} onChange={(v) => onChange('distribuidorNome', v)} />
          <FormField label="Razão social" required value={data.razaoSocial} onChange={(v) => onChange('razaoSocial', v)} />
          <FormField label="CNPJ" value={data.cnpj} onChange={(v) => onChange('cnpj', maskCNPJ(v))} placeholder="00.000.000/0000-00" hint="Opcional" />
          <FormField label="Nome do contato" required value={data.nomeContato} onChange={(v) => onChange('nomeContato', v)} hint="Pessoa responsável por essa solicitação" />
          <FormField label="Telefone / WhatsApp" required value={data.telefone} onChange={(v) => onChange('telefone', maskPhone(v))} placeholder="(00) 00000-0000" />
          <FormField label="Cidade / Estado" required value={data.cidadeEstado} onChange={(v) => onChange('cidadeEstado', v)} placeholder="São Paulo / SP" />
          <FormField label="Representante responsável" required value={data.representante} onChange={(v) => onChange('representante', v)} hint="Nosso representante que atende sua região" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="form-section-title">Seus Dados</h2>
      <p className="text-sm text-muted-foreground">Precisamos dos seus dados de contato e informações de compra.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Seu nome completo" required value={data.nomeCompleto} onChange={(v) => onChange('nomeCompleto', v)} />
        <FormField label="Telefone / WhatsApp" required value={data.telefoneFinal} onChange={(v) => onChange('telefoneFinal', maskPhone(v))} placeholder="(00) 00000-0000" />
        <FormField label="Cidade / Estado" required value={data.cidadeEstadoFinal} onChange={(v) => onChange('cidadeEstadoFinal', v)} placeholder="São Paulo / SP" />
        <FormField label="Onde você comprou o produto?" required value={data.ondeComprou} onChange={(v) => onChange('ondeComprou', v)} hint="Ex: loja física, internet, representante" />
        <FormField label="Nome da loja ou distribuidor" required value={data.nomeLoja} onChange={(v) => onChange('nomeLoja', v)} />
        <FormField label="Nº da nota fiscal ou cupom fiscal" required value={data.numNotaFiscal} onChange={(v) => onChange('numNotaFiscal', v)} />
      </div>
      <FileUpload label="Foto do cupom fiscal ou comprovante de compra" required accept="image/*" file={data.fotoCupom} onChange={(f) => onChange('fotoCupom', f)} />
    </div>
  );
};

export default Step2ClientData;
