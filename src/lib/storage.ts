import type { FormData } from '@/types/complaint-form';

export type ComplaintStatus = 'aberto' | 'em_analise_vendas' | 'em_analise_qualidade' | 'concluido';

export interface Complaint {
  protocolo: string;
  data: FormData;
  status: ComplaintStatus;
  criadoEm: string;        // ISO string
  prazoResposta: string;    // ISO string (48h after criadoEm)
  atualizadoEm: string;    // ISO string
}

const STORAGE_KEY = 'sac_steula_complaints';

function generateProtocol(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const seq = String(Math.floor(Math.random() * 9000) + 1000);
  return `SAC-${year}${month}-${seq}`;
}

export function getAllComplaints(): Complaint[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getComplaintByProtocol(protocolo: string): Complaint | undefined {
  return getAllComplaints().find((c) => c.protocolo === protocolo);
}

export function saveNewComplaint(data: FormData): Complaint {
  const now = new Date();
  const prazo = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  // Files can't be serialized — strip them
  const serializable = { ...data, fotoProduto: null, fotoEmbalagem: null, videoProblema: null, fotoNotaFiscal: null, fotoCupom: null };

  const complaint: Complaint = {
    protocolo: generateProtocol(),
    data: serializable,
    status: 'aberto',
    criadoEm: now.toISOString(),
    prazoResposta: prazo.toISOString(),
    atualizadoEm: now.toISOString(),
  };

  const all = getAllComplaints();
  all.unshift(complaint);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return complaint;
}

export function updateComplaint(protocolo: string, updates: Partial<Pick<Complaint, 'data' | 'status'>>): Complaint | undefined {
  const all = getAllComplaints();
  const idx = all.findIndex((c) => c.protocolo === protocolo);
  if (idx === -1) return undefined;

  if (updates.data) {
    all[idx].data = { ...all[idx].data, ...updates.data };
  }
  if (updates.status) {
    all[idx].status = updates.status;
  }
  all[idx].atualizadoEm = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return all[idx];
}

export function formatProtocolDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export function isOverdue(prazoIso: string): boolean {
  return new Date() > new Date(prazoIso);
}
