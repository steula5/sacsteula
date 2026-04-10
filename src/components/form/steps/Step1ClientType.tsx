import { Building2, User } from 'lucide-react';
import type { ClientType } from '@/types/complaint-form';

interface Props {
  value: ClientType;
  onChange: (val: ClientType) => void;
}

const Step1ClientType = ({ value, onChange }: Props) => {
  const options: { type: ClientType; label: string; desc: string; icon: React.ReactNode }[] = [
    { type: 'distribuidor', label: 'Sou Distribuidor', desc: 'Revenda, representante ou loja', icon: <Building2 className="w-8 h-8" /> },
    { type: 'cliente_final', label: 'Sou Cliente Final', desc: 'Comprei o produto para uso próprio', icon: <User className="w-8 h-8" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="form-section-title">Você é distribuidor ou cliente final?</h2>
        <p className="text-sm text-muted-foreground">Selecione a opção que melhor descreve o seu caso para que possamos direcionar o atendimento.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((opt) => (
          <button
            key={opt.type}
            type="button"
            onClick={() => onChange(opt.type as ClientType)}
            className={`flex flex-col items-center gap-3 p-8 rounded-lg border-2 transition-all duration-200 ${
              value === opt.type
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/40 hover:bg-muted/50'
            }`}
          >
            <div className={value === opt.type ? 'text-primary' : 'text-muted-foreground'}>
              {opt.icon}
            </div>
            <span className="font-bold text-foreground font-display uppercase tracking-wide">{opt.label}</span>
            <span className="text-sm text-muted-foreground">{opt.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step1ClientType;
