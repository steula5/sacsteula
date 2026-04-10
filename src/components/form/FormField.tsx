import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FormFieldProps {
  label: string;
  required?: boolean;
  type?: 'text' | 'textarea';
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  hint?: string;
}

const FormField = ({ label, required, type = 'text', placeholder, value, onChange, hint }: FormFieldProps) => {
  return (
    <div className="space-y-1.5">
      <label className={`block text-sm font-medium text-foreground ${required ? 'form-label-required' : ''}`}>
        {label}
      </label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {type === 'textarea' ? (
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="resize-none"
        />
      ) : (
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
