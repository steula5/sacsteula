import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Send, CheckCircle2 } from 'lucide-react';
import StepIndicator from '@/components/form/StepIndicator';
import Step1ClientType from '@/components/form/steps/Step1ClientType';
import Step2ClientData from '@/components/form/steps/Step2ClientData';
import Step3ProductData from '@/components/form/steps/Step3ProductData';
import Step4ProblemDetails from '@/components/form/steps/Step4ProblemDetails';
import Step5Evidence from '@/components/form/steps/Step5Evidence';
import Step6SalesInternal from '@/components/form/steps/Step6SalesInternal';
import Step7QualityInternal from '@/components/form/steps/Step7QualityInternal';
import { type FormData, initialFormData } from '@/types/complaint-form';

const STEP_LABELS = [
  'Tipo de Cliente',
  'Dados do Cliente',
  'Produto',
  'Problema',
  'Evidências',
  'Vendas',
  'Qualidade',
];

const Index = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormData, value: string | File | null) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return data.clientType !== '';
      case 1:
        if (data.clientType === 'distribuidor') {
          return !!(data.distribuidorNome && data.razaoSocial && data.nomeContato && data.telefone && data.cidadeEstado && data.representante);
        }
        return !!(data.nomeCompleto && data.telefoneFinal && data.cidadeEstadoFinal && data.ondeComprou && data.nomeLoja && data.numNotaFiscal);
      case 2:
        return !!(data.nomeProduto && data.quantidadeProblema && data.dataCompra && data.dataProblema && data.produtoUtilizado);
      case 3:
        return !!(data.descricaoProblema && data.solicitacao);
      case 4:
        return !!data.fotoProduto;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      toast.error('Preencha todos os campos obrigatórios antes de continuar.');
      return;
    }
    setStep((s) => Math.min(s + 1, 6));
  };

  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    console.log('Form data:', data);
    setSubmitted(true);
    toast.success('Formulário enviado com sucesso!');
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-accent mx-auto" />
          <h1 className="text-2xl font-bold text-foreground">Enviado com sucesso!</h1>
          <p className="text-muted-foreground">Seu registro de reclamação foi enviado para o setor de qualidade. Você receberá um retorno em breve.</p>
          <Button onClick={() => { setData(initialFormData); setStep(0); setSubmitted(false); }} className="mt-4">
            Novo registro
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 px-4 md:py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Registro de Reclamação e Solicitação de Laudo Técnico
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Preencha as informações para registro e análise do problema com o produto.
          </p>
        </div>

        <StepIndicator currentStep={step} totalSteps={7} labels={STEP_LABELS} />

        <Card className="p-6 md:p-8">
          {step === 0 && <Step1ClientType value={data.clientType} onChange={(v) => updateField('clientType', v)} />}
          {step === 1 && <Step2ClientData data={data} onChange={updateField} />}
          {step === 2 && <Step3ProductData data={data} onChange={updateField} />}
          {step === 3 && <Step4ProblemDetails data={data} onChange={updateField} />}
          {step === 4 && <Step5Evidence data={data} onChange={updateField} />}
          {step === 5 && <Step6SalesInternal data={data} onChange={updateField} />}
          {step === 6 && <Step7QualityInternal data={data} onChange={updateField} />}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button variant="outline" onClick={handlePrev} disabled={step === 0} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Anterior
            </Button>
            {step < 6 ? (
              <Button onClick={handleNext} className="gap-2">
                Próximo <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Send className="w-4 h-4" /> Enviar para Qualidade
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
