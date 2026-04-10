export type ClientType = 'distribuidor' | 'cliente_final' | '';

export type SolicitationType = 'troca' | 'garantia' | 'conserto' | 'analise_tecnica' | 'orientacao' | 'outro';

export type SituationType = 'garantia' | 'conserto' | 'improcedente';

export interface FormData {
  // Step 1
  clientType: ClientType;

  // Step 2 - Distribuidor
  distribuidorNome: string;
  razaoSocial: string;
  cnpj: string;
  nomeContato: string;
  telefone: string;
  cidadeEstado: string;
  representante: string;

  // Step 2 - Cliente Final
  nomeCompleto: string;
  telefoneFinal: string;
  cidadeEstadoFinal: string;
  ondeComprou: string;
  nomeLoja: string;
  numNotaFiscal: string;
  fotoCupom: File | null;

  // Step 3
  nomeProduto: string;
  quantidadeProblema: string;
  codigoLote: string;
  dataCompra: string;
  dataProblema: string;
  produtoUtilizado: string;
  vezesUtilizado: string;
  aplicacaoUsada: string;

  // Step 4
  descricaoProblema: string;
  solicitacao: SolicitationType;

  // Step 5
  fotoProduto: File | null;
  fotoEmbalagem: File | null;
  videoProblema: File | null;
  fotoNotaFiscal: File | null;

  // Step 6
  numDevolucao: string;
  recebidoPor: string;
  dataRecebimento: string;
  parecerVendas: string;
  observacoes: string;

  // Step 7
  laudoTecnico: string;
  tecnicoResponsavel: string;
  dataLaudo: string;
  situacao: SituationType | '';
  valorCobrado: string;
  orcamentoAprovado: string;
}

export const initialFormData: FormData = {
  clientType: '',
  distribuidorNome: '',
  razaoSocial: '',
  cnpj: '',
  nomeContato: '',
  telefone: '',
  cidadeEstado: '',
  representante: '',
  nomeCompleto: '',
  telefoneFinal: '',
  cidadeEstadoFinal: '',
  ondeComprou: '',
  nomeLoja: '',
  numNotaFiscal: '',
  fotoCupom: null,
  nomeProduto: '',
  quantidadeProblema: '',
  codigoLote: '',
  dataCompra: '',
  dataProblema: '',
  produtoUtilizado: '',
  vezesUtilizado: '',
  aplicacaoUsada: '',
  descricaoProblema: '',
  solicitacao: 'troca',
  fotoProduto: null,
  fotoEmbalagem: null,
  videoProblema: null,
  fotoNotaFiscal: null,
  numDevolucao: '',
  recebidoPor: '',
  dataRecebimento: '',
  parecerVendas: '',
  observacoes: '',
  laudoTecnico: '',
  tecnicoResponsavel: '',
  dataLaudo: '',
  situacao: '',
  valorCobrado: '',
  orcamentoAprovado: '',
};
