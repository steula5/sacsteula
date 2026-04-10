import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Send, CheckCircle2, Copy, Clock } from 'lucide-react';
import StepIndicator from '@/components/form/StepIndicator';
import Step1ClientType from '@/components/form/steps/Step1ClientType';
import Step2ClientData from '@/components/form/steps/Step2ClientData';
import Step3ProductData from '@/components/form/steps/Step3ProductData';
import Step4ProblemDetails from '@/components/form/steps/Step4ProblemDetails';
import Step5Evidence from '@/components/form/steps/Step5Evidence';
import { type FormData, initialFormData } from '@/types/complaint-form';
import { saveNewComplaint } from '@/lib/storage';

const STEP_LABELS = [
  'Identificação',
  'Seus Dados',
  'Produto',
  'Problema',
  'Fotos e Vídeos',
];

const Index = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [protocolo, setProtocolo] = useState('');

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
      toast.error('Por favor, preencha todos os campos obrigatórios antes de continuar.');
      return;
    }
    setStep((s) => Math.min(s + 1, 4));
  };

  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    if (!canProceed()) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const complaint = saveNewComplaint(data);
    setProtocolo(complaint.protocolo);
    setSubmitted(true);
    toast.success('Solicitação enviada com sucesso!');
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="max-w-md w-full p-8 text-center space-y-4 border-t-4 border-t-primary">
          <CheckCircle2 className="w-16 h-16 text-step-completed mx-auto" />
          <h1 className="text-2xl font-bold text-foreground font-display uppercase tracking-wide">
            Solicitação Enviada!
          </h1>

          <div className="bg-muted rounded-lg p-4 space-y-2">
            <p className="text-sm text-muted-foreground">Seu número de protocolo:</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl font-bold text-primary font-display tracking-widest">{protocolo}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => { navigator.clipboard.writeText(protocolo); toast.success('Protocolo copiado!'); }}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground font-medium">Anote este número para acompanhamento</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Prazo para primeira resposta: <strong>48 horas</strong></span>
          </div>

          <p className="text-muted-foreground">
            Recebemos sua solicitação e nossa equipe técnica irá analisá-la.
          </p>
          <Button onClick={() => { setData(initialFormData); setStep(0); setSubmitted(false); setProtocolo(''); }} className="mt-4">
            Enviar nova solicitação
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Industrial Header */}
      <div className="industrial-header py-5 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <img src="/Logo/Logo.png" alt="Steula" className="h-10" />
          <div>
            <h1 className="text-lg md:text-xl font-bold text-primary-foreground font-display uppercase tracking-wider">
              SAC — Atendimento ao Cliente
            </h1>
            <p className="text-sm text-primary-foreground/70">
              Registro de reclamação e solicitação de laudo técnico
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-6 px-4 md:py-8">
        <StepIndicator currentStep={step} totalSteps={5} labels={STEP_LABELS} />

        <Card className="p-6 md:p-8 border-t-4 border-t-primary shadow-sm">
          {step === 0 && <Step1ClientType value={data.clientType} onChange={(v) => updateField('clientType', v)} />}
          {step === 1 && <Step2ClientData data={data} onChange={updateField} />}
          {step === 2 && <Step3ProductData data={data} onChange={updateField} />}
          {step === 3 && <Step4ProblemDetails data={data} onChange={updateField} />}
          {step === 4 && <Step5Evidence data={data} onChange={updateField} />}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button variant="outline" onClick={handlePrev} disabled={step === 0} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Anterior
            </Button>
            {step < 4 ? (
              <Button onClick={handleNext} className="gap-2">
                Próximo <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gap-2">
                <Send className="w-4 h-4" /> Enviar Solicitação
              </Button>
            )}
          </div>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Após o envio, nossa equipe de qualidade analisará sua solicitação e entrará em contato.
        </p>
      </div>
    </div>
  );
};

export default Index;
