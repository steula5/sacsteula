import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

const StepIndicator = ({ currentStep, totalSteps, labels }: StepIndicatorProps) => {
  return (
    <div className="w-full mb-8">
      {/* Mobile: compact */}
      <div className="flex md:hidden items-center justify-center gap-2 mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Etapa {currentStep + 1} de {totalSteps}
        </span>
      </div>
      <div className="flex md:hidden items-center justify-center">
        <span className="text-base font-semibold text-foreground">{labels[currentStep]}</span>
      </div>
      <div className="flex md:hidden mt-3 gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < currentStep ? 'bg-accent' : i === currentStep ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Desktop: full stepper */}
      <div className="hidden md:flex items-start justify-between relative">
        {labels.map((label, i) => (
          <div key={i} className="flex flex-col items-center flex-1 relative z-10">
            <div
              className={`step-indicator ${
                i < currentStep ? 'step-completed' : i === currentStep ? 'step-active' : 'step-inactive'
              }`}
            >
              {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`mt-2 text-xs text-center leading-tight max-w-[80px] ${
                i === currentStep ? 'font-semibold text-foreground' : 'text-muted-foreground'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
        {/* connector line */}
        <div className="absolute top-[18px] left-[10%] right-[10%] h-0.5 bg-border -z-0" />
      </div>
    </div>
  );
};

export default StepIndicator;
