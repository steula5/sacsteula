import { Upload, X, FileImage, FileVideo } from 'lucide-react';
import { useRef } from 'react';

interface FileUploadProps {
  label: string;
  required?: boolean;
  accept: string;
  file: File | null;
  onChange: (file: File | null) => void;
  hint?: string;
}

const FileUpload = ({ label, required, accept, file, onChange, hint }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isVideo = accept.includes('video');

  return (
    <div className="space-y-1.5">
      <label className={`block text-sm font-medium text-foreground ${required ? 'form-label-required' : ''}`}>
        {label}
      </label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
      {file ? (
        <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
          {isVideo ? <FileVideo className="w-5 h-5 text-primary" /> : <FileImage className="w-5 h-5 text-primary" />}
          <span className="text-sm text-foreground flex-1 truncate">{file.name}</span>
          <button type="button" onClick={() => onChange(null)} className="text-muted-foreground hover:text-destructive transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <Upload className="w-5 h-5" />
          <span className="text-sm">Clique para enviar</span>
        </button>
      )}
    </div>
  );
};

export default FileUpload;
