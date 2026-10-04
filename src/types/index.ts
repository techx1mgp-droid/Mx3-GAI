export type SystemHealthState = 'CRITICAL' | 'DEGRADED' | 'STABILIZED' | 'GOVERNED';

export type EngagementPhase = 'audit' | 'intervention' | 'governance';

export type SignalType = 'Signal' | 'Action' | 'Observation';

export type ThreatSeverity = 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE';

export interface ThreatVector {
  id: string;
  code: string;
  title: string;
  severity: ThreatSeverity;
  description: string;
  financialExposure: string;
  immediacy: string;
  rootCause: string;
  prescribedIntervention: string;
  linkedEvidenceLockId?: string;
  mitigated: boolean;
}

export interface MetricRowData {
  id: string;
  name: string;
  currentValue: string;
  deltaText: string;
  isNegative: boolean;
  baseline: string;
  sparkline: number[];
  unit: string;
  historicalRange: string;
}

export interface IntelligenceItem {
  id: string;
  timestamp: string;
  type: SignalType;
  actor: string;
  title: string;
  detail: string;
  hash: string;
  flaggedCritical?: boolean;
}

export interface EvidenceLock {
  id: string;
  code: string;
  title: string;
  classification: string;
  summary: string;
  timestamp: string;
  sourceHash: string;
  tableData?: {
    columns: string[];
    rows: (string | number)[][];
  };
  redactedExcerpts: {
    label: string;
    redactedText: string;
    unmaskedText: string;
  }[];
  mitigationProtocol: string;
  status: 'LOCKED' | 'FLAGGED' | 'RESOLVED';
}

export interface Workstream {
  id: string;
  title: string;
  owner: string;
  progressPercent: number;
  status: 'ACTIVE' | 'BLOCKED' | 'STABILIZED';
  deadline: string;
  nextMilestone: string;
}

export interface VaultDocument {
  id: string;
  title: string;
  code: string;
  category: 'LEGAL' | 'FINANCIAL' | 'FORENSIC' | 'GOVERNANCE';
  fileSize: string;
  uploadedAt: string;
  checksumSha256: string;
  classification: string;
  downloadRestricted: boolean;
}

export interface TimelineMilestone {
  day: number;
  date: string;
  phase: EngagementPhase;
  title: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'CRITICAL';
  burnInflectionDelta: string;
  deliverables: string[];
}
