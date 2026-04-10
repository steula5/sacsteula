import type { FormData } from '@/types/complaint-form';
import FileUpload from '../FileUpload';

interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: File | null) => void;
}

const Step5Evidence = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-5">
      <h2 className="form-section-title">Evidências</h2>
      <p className="text-sm text-muted-foreground">Envie fotos e vídeos que ajudem na análise do problema.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FileUpload label="Foto do produto com problema" required accept="image/*" file={data.fotoProduto} onChange={(f) => onChange('fotoProduto', f)} />
        <FileUpload label="Foto da embalagem / etiqueta / lote" accept="image/*" file={data.fotoEmbalagem} onChange={(f) => onChange('fotoEmbalagem', f)} hint="Opcional" />
        <FileUpload label="Vídeo mostrando o problema durante o uso" accept="video/*" file={data.videoProblema} onChange={(f) => onChange('videoProblema', f)} hint="Opcional" />
        {data.clientType === 'cliente_final' && (
          <FileUpload label="Foto da nota fiscal ou cupom fiscal" required accept="image/*" file={data.fotoNotaFiscal} onChange={(f) => onChange('fotoNotaFiscal', f)} />
        )}
      </div>
    </div>
  );
};

export default Step5Evidence;
