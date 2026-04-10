import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Step6SalesInternal from '@/components/form/steps/Step6SalesInternal';
import { type FormData, initialFormData } from '@/types/complaint-form';
import { ShieldAlert, Save } from 'lucide-react';
import { toast } from 'sonner';

const Vendas = () => {
  const [data, setData] = useState<FormData>(initialFormData);

  const updateField = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Vendas data:', data);
    toast.success('Dados de vendas salvos com sucesso!');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="industrial-header py-5 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="bg-primary p-2 rounded">
            <ShieldAlert className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-primary-foreground font-display uppercase tracking-wider">
              Painel Interno — Vendas
            </h1>
            <p className="text-sm text-primary-foreground/70">
              Registro de devoluções e parecer comercial
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-6 px-4 md:py-8">
        <Card className="p-6 md:p-8 border-t-4 border-t-primary shadow-sm">
          <Step6SalesInternal data={data} onChange={updateField} />
          <div className="flex justify-end mt-8 pt-6 border-t border-border">
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" /> Salvar
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Vendas;
