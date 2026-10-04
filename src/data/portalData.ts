import {
  MetricRowData,
  ThreatVector,
  IntelligenceItem,
  EvidenceLock,
  Workstream,
  VaultDocument,
  TimelineMilestone
} from '../types';

export const INITIAL_METRICS: MetricRowData[] = [
  {
    id: 'rev-velocity',
    name: 'Revenue Velocity',
    currentValue: '$11.24M',
    deltaText: '-31.4% vs baseline ($16.40M)',
    isNegative: true,
    baseline: '$16.40M/mo',
    sparkline: [16.4, 15.8, 15.1, 14.2, 13.0, 12.1, 11.24],
    unit: 'USD / Month',
    historicalRange: '90-Day Trailing'
  },
  {
    id: 'liq-runway',
    name: 'Liquidity Runway',
    currentValue: '41.2 Days',
    deltaText: '-54.2% vs covenant threshold (90d)',
    isNegative: true,
    baseline: '90.0 Days',
    sparkline: [92, 84, 76, 68, 55, 47, 41.2],
    unit: 'Calendar Days',
    historicalRange: 'Cash-Zero Burn Horizon'
  },
  {
    id: 'op-integrity',
    name: 'Operational Integrity',
    currentValue: '62.8%',
    deltaText: '-24.1% breach variance index',
    isNegative: true,
    baseline: '86.9% Target',
    sparkline: [88, 85, 79, 74, 69, 64, 62.8],
    unit: 'Composite Index',
    historicalRange: 'Core Architecture Availability'
  }
];

export const INITIAL_THREAT_VECTORS: ThreatVector[] = [
  {
    id: 'tv-01',
    code: 'TV-01',
    title: 'Subordinated Debt Covenant Acceleration',
    severity: 'CRITICAL',
    description: 'Lead creditor syndicate initiated notice of inquiry regarding Q3 fixed-charge coverage ratio failure.',
    financialExposure: '$18.50M Immediate Call',
    immediacy: '72 Hours to Cure Window',
    rootCause: 'EBITDA erosion triggered clause 8.4(b) under 2024 Mezzanine Credit Agreement.',
    prescribedIntervention: 'Execute 45-day Standstill Protocol; ring-fence cash receivables under special escrow control.',
    linkedEvidenceLockId: 'lock-01',
    mitigated: false
  },
  {
    id: 'tv-02',
    code: 'TV-02',
    title: 'Core Distributed Systems Architect Defection',
    severity: 'CRITICAL',
    description: '3 principal infrastructure engineers solicited with liquid equity offers from direct rival.',
    financialExposure: '$14.20M IP Replacement & Downtime',
    immediacy: 'Imminent (T-5 Days)',
    rootCause: 'Severely underwater unvested options package coupled with delayed recapitalization disclosure.',
    prescribedIntervention: 'Issue synthetic retention escrow instruments backed by senior preferred carve-outs.',
    linkedEvidenceLockId: 'lock-03',
    mitigated: false
  },
  {
    id: 'tv-03',
    code: 'TV-03',
    title: 'Hyperscaler Compute Margin Inversion',
    severity: 'HIGH',
    description: 'Uncapped GPU cluster reservation usage exceeding enterprise customer contract recoupment rate by 42%.',
    financialExposure: '$1.85M/mo Unhedged Bleed',
    immediacy: 'Billing cycle closes in 9 days',
    rootCause: 'Misconfigured multi-tenant orchestration layer executing idle batch inferences without backcharge.',
    prescribedIntervention: 'Impose hard compute quotas; re-route overflow workloads to reserved spot instances.',
    linkedEvidenceLockId: 'lock-02',
    mitigated: false
  },
  {
    id: 'tv-04',
    code: 'TV-04',
    title: 'Top-2 Enterprise Renewal Flight Risk',
    severity: 'HIGH',
    description: 'Procurement officers at apex accounts ($26M aggregate ARR) requested formal SLA audit logs.',
    financialExposure: '$26.40M Annual Recurring Run-rate',
    immediacy: '18 Days to Renewal Notification',
    rootCause: 'Repeated latency spikes on production cluster and circulating industry restructuring rumors.',
    prescribedIntervention: 'Deploy Mx3 technical assurance memorandum and bind service guarantees with SLA escrow.',
    mitigated: false
  },
  {
    id: 'tv-05',
    code: 'TV-05',
    title: 'Off-Balance-Sheet Arbitration Exposure',
    severity: 'ELEVATED',
    description: 'Former silicon supplier claims unaccrued minimum-take penalties under unexecuted memorandum.',
    financialExposure: '$4.20M Contingent Claim',
    immediacy: 'Pre-litigation conference pending',
    rootCause: 'Ambiguous purchase order wording drafted during 2024 scaling push without legal countersign.',
    prescribedIntervention: 'Deploy forensic communication trail; invoke mutual non-fulfillment defense.',
    linkedEvidenceLockId: 'lock-04',
    mitigated: false
  }
];

export const INITIAL_INTELLIGENCE: IntelligenceItem[] = [
  {
    id: 'intel-01',
    timestamp: '10:47:12 UTC',
    type: 'Signal',
    actor: 'CREDITOR DESK',
    title: 'Lead mezzanine creditor issued reservation of rights notice',
    detail: 'Syndicate counsel (Gibson & Dunn) sent formal communication citing covenant delta on Q3 trailing twelve-month revenue calculations.',
    hash: '0x8f2a991b',
    flaggedCritical: true
  },
  {
    id: 'intel-02',
    timestamp: '10:32:05 UTC',
    type: 'Action',
    actor: 'Mx3 OPERATOR',
    title: 'Ring-fenced treasury operations on primary commercial accounts',
    detail: 'Dual-signature custody authorization instituted on all wire transfers exceeding $25,000. Outbound non-critical vendor disbursements paused.',
    hash: '0x7c41e002'
  },
  {
    id: 'intel-03',
    timestamp: '09:58:44 UTC',
    type: 'Observation',
    actor: 'FORENSIC AUDIT',
    title: 'Discrepancy detected in cloud compute commit drawdown',
    detail: 'AWS cluster reservation consumed $410K in unallocated capacity over past 72h. Root vector pinpointed to internal training sandbox #4.',
    hash: '0x33b1e98a'
  },
  {
    id: 'intel-04',
    timestamp: '08:15:30 UTC',
    type: 'Action',
    actor: 'Mx3 LEGAL',
    title: 'Drafted 45-day Standstill Protocol for lender syndicate review',
    detail: 'Intervention framework establishes temporary covenant waiver conditioned on weekly cash flow visibility and Mx3 board observer seat.',
    hash: '0x992b45ca'
  },
  {
    id: 'intel-05',
    timestamp: '07:42:19 UTC',
    type: 'Signal',
    actor: 'HUMAN CAPITAL',
    title: 'External headhunter inquiries logged on principal systems engineers',
    detail: 'Identified targeted outreach from tier-1 competitor targeting 3 staff infrastructure engineers with immediate sign-on packages.',
    hash: '0x1a7f3400',
    flaggedCritical: true
  }
];

export const INITIAL_EVIDENCE_LOCKS: EvidenceLock[] = [
  {
    id: 'lock-01',
    code: 'LOCK-01',
    title: 'Subordinated Debt Default Acceleration Clause',
    classification: 'RESTRICTED // PRINCIPALS ONLY',
    summary: 'Forensic audit of loan agreement dated March 14, 2024 between Aethel Holdings Inc. and Apex Global Credit Syndicate.',
    timestamp: '2026-10-04T07:12:00Z',
    sourceHash: 'sha256:7b1a92e104fc81290317e082194b1cf204a9192419a4e',
    tableData: {
      columns: ['Facility Tranche', 'Principal Balance', 'Stated Coupon', 'Covenant Threshold', 'Current Reading', 'Default Delta'],
      rows: [
        ['Tranche A (Senior Term)', '$45,000,000', 'SOFR + 475 bps', '1.35x FCCR', '1.41x FCCR', '+0.06x (Compliant)'],
        ['Tranche B (Subordinated Mezz)', '$18,500,000', '14.50% PIK', '1.20x FCCR', '0.84x FCCR', '-0.36x (BREACH)'],
        ['Revolving Credit Facility', '$10,000,000', 'SOFR + 350 bps', 'Min Liquidity $8M', '$4.2M Cash', '-$3.8M (BREACH)']
      ]
    },
    redactedExcerpts: [
      {
        label: 'Acceleration Trigger Clause 8.4(b)',
        redactedText: 'Upon failure of borrower to maintain trailing-12 EBITDA of [████████████████], Agent shall have the unfettered right to accelerate all unpaid principal without cure notice within [██] business days.',
        unmaskedText: 'Upon failure of borrower to maintain trailing-12 EBITDA of $22,400,000, Agent shall have the unfettered right to accelerate all unpaid principal without cure notice within five (5) business days.'
      },
      {
        label: 'Syndicate Lead Entity',
        redactedText: 'Lead Administrative Agent: [████████████████████████████] represented by [███████████████].',
        unmaskedText: 'Lead Administrative Agent: APEX GLOBAL CREDIT OPPORTUNITY FUND LP represented by GIBSON, DUNN & CRUTCHER LLP.'
      }
    ],
    mitigationProtocol: 'Issue formal Standstill Proposal with senior priority carve-out; mandate immediate weekly 13-week cash flow forecasts under Mx3 sign-off.',
    status: 'FLAGGED'
  },
  {
    id: 'lock-02',
    code: 'LOCK-02',
    title: 'Hyperscaler Compute Burn Anomaly & Extraction',
    classification: 'CONFIDENTIAL // ENGINEERING & FINANCE',
    summary: 'Telemetry log decomposition of GPU/TPU cluster allocation across US-East-1 and EU-West-1 from Day 0 through Day 60.',
    timestamp: '2026-10-04T06:45:10Z',
    sourceHash: 'sha256:4ca810f92b77203bca01e812d8a439201f8931ac88a',
    tableData: {
      columns: ['Cluster ID', 'Instance Type', 'Monthly Spend', 'Avg Utilization', 'Wasted Idle Burn', 'Remediation Action'],
      rows: [
        ['cluster-h100-prod-01', '8x H100 SXM5', '$680,000', '94.2%', '$39,440', 'Maintain Priority'],
        ['cluster-a100-train-04', '16x A100 80GB', '$410,000', '18.4%', '$334,560', 'Immediate Quota Kill'],
        ['cluster-cpu-ingress-02', 'c6i.32xlarge x40', '$195,000', '41.0%', '$115,050', 'Downscale Spot Pool']
      ]
    },
    redactedExcerpts: [
      {
        label: 'Contractual Minimum Spend Commitment',
        redactedText: 'Client committed to three-year aggregate spend of [██████████████] with penalty ratchet of [█████████] upon default.',
        unmaskedText: 'Client committed to three-year aggregate spend of $42,000,000 with penalty ratchet of $8,400,000 upon default.'
      }
    ],
    mitigationProtocol: 'Execute instant compute scheduler throttle on non-production training jobs; negotiate 90-day grace reallocation with cloud partner.',
    status: 'FLAGGED'
  },
  {
    id: 'lock-03',
    code: 'LOCK-03',
    title: 'Executive & Core Engineering Flight Vector',
    classification: 'RESTRICTED // BOARD LEVEL ONLY',
    summary: 'Forensic evaluation of talent departure signals, code commit frequency drop-offs, and competitive outreach logs.',
    timestamp: '2026-10-04T05:30:22Z',
    sourceHash: 'sha256:91ef230a11cb93817a00184bba7631980201ca77a33',
    tableData: {
      columns: ['Role / Key Personnel', 'System Criticality', 'Equity Status', 'Defection Probability', 'Replacement Cost'],
      rows: [
        ['VP Distributed Systems (Confidential)', 'CRITICAL (Tier-0 Architecture)', '92% underwater options', 'HIGH (88%)', '$4,800,000 / 6mo delay'],
        ['Lead Kernel Engineer (Confidential)', 'CRITICAL (Low-Latency Pipe)', '100% underwater options', 'HIGH (82%)', '$2,400,000 / 4mo delay'],
        ['Head of Enterprise Solutions', 'ELEVATED (Renewal Relations)', 'Partial vesting complete', 'MODERATE (55%)', '$1,200,000 / 3mo delay']
      ]
    },
    redactedExcerpts: [
      {
        label: 'Competing Solicitation Evidence',
        redactedText: 'Targeted headhunter correspondence originated on behalf of [██████████████████████] offering base salary of [█████████] plus liquid equity.',
        unmaskedText: 'Targeted headhunter correspondence originated on behalf of NEXUS ARCHITECTURE SYSTEMS INC offering base salary of $520,000 plus liquid equity.'
      }
    ],
    mitigationProtocol: 'Deploy synthetic retention units with 12-month liquidity guarantee linked to restructuring completion milestone.',
    status: 'LOCKED'
  },
  {
    id: 'lock-04',
    code: 'LOCK-04',
    title: 'Off-Balance-Sheet Contingent Liabilities',
    classification: 'SECRET // LEGAL PRIVILEGE',
    summary: 'Audit of informal procurement commitments, side letters, and arbitration demands not reflected in audited financials.',
    timestamp: '2026-10-04T04:15:00Z',
    sourceHash: 'sha256:029bc4412e88a09bc221084201882194cf330198bb9',
    tableData: {
      columns: ['Claimant', 'Alleged Breach', 'Claim Amount', 'Probability of Enforcement', 'Status'],
      rows: [
        ['Silicon Foundry Partners Inc.', 'Unfulfilled Wafer Reservation LOI', '$4,200,000', '35% (Unsigned draft)', 'Pre-arbitration demand'],
        ['Commercial Real Estate Trust', 'Sublease Default Guarantee', '$1,950,000', '65% (Co-sign on lease)', 'Notice to cure'],
        ['Legacy Marketing Agency', 'Unapproved Campaign Production', '$420,000', '20% (Disputed quality)', 'Invoice hold']
      ]
    },
    redactedExcerpts: [
      {
        label: 'Settlement Demand Excerpt',
        redactedText: 'Counsel demands payment of [█████████████] within fourteen business days failing which arbitration proceedings will commence at [████████████████].',
        unmaskedText: 'Counsel demands payment of $4,200,000 within fourteen business days failing which arbitration proceedings will commence at JAMS New York.'
      }
    ],
    mitigationProtocol: 'Consolidate all disputed liabilities into formal restructuring master table; assert mutual failure of consideration defense.',
    status: 'RESOLVED'
  }
];

export const INITIAL_WORKSTREAMS: Workstream[] = [
  {
    id: 'ws-01',
    title: 'Creditor Standstill & Forbearance Agreement',
    owner: 'Mx3 Financial Lead (Marcus Vance)',
    progressPercent: 78,
    status: 'ACTIVE',
    deadline: 'Day 14 (3 Days remaining)',
    nextMilestone: 'Lender consortium steering committee term sheet countersignature'
  },
  {
    id: 'ws-02',
    title: 'GPU Cluster & Hyperscaler Burn Rationalization',
    owner: 'Mx3 Technical Partner (Elena Rostova)',
    progressPercent: 62,
    status: 'ACTIVE',
    deadline: 'Day 21',
    nextMilestone: 'Throttle unallocated compute sandboxes; lock in AWS $1.2M credit concession'
  },
  {
    id: 'ws-03',
    title: 'Key Personnel Special Retention Lock',
    owner: 'Mx3 Executive Counsel (David Stern)',
    progressPercent: 90,
    status: 'STABILIZED',
    deadline: 'Day 10 (Completed)',
    nextMilestone: 'Executed synthetic incentive agreements for 3 critical architects'
  },
  {
    id: 'ws-04',
    title: 'Apex Enterprise Customer SLA Assurance',
    owner: 'Client Chief Commercial Officer',
    progressPercent: 45,
    status: 'ACTIVE',
    deadline: 'Day 28',
    nextMilestone: 'Deliver technical security audit memorandum to top-2 enterprise accounts'
  }
];

export const INITIAL_VAULT_DOCUMENTS: VaultDocument[] = [
  {
    id: 'doc-01',
    title: 'Executed 45-Day Lender Forbearance Agreement',
    code: 'MX-VLT-081',
    category: 'LEGAL',
    fileSize: '4.8 MB',
    uploadedAt: '2026-10-04 09:12 UTC',
    checksumSha256: '9a84f3e2b109c4885721ea8032cb41209e7c30f4a211029bb8877112048f12a9',
    classification: 'RESTRICTED // LEVEL 5',
    downloadRestricted: false
  },
  {
    id: 'doc-02',
    title: 'Weekly 13-Week Cash Flow Forensic Model (v3.2)',
    code: 'MX-VLT-044',
    category: 'FINANCIAL',
    fileSize: '12.4 MB',
    uploadedAt: '2026-10-04 06:30 UTC',
    checksumSha256: '883b1029cf0984a1e7729019ca420188bb3901a18290e441209e7c30f4a28892',
    classification: 'SECRET // PRIVILEGED',
    downloadRestricted: false
  },
  {
    id: 'doc-03',
    title: 'Board Unanimous Written Consent — Mx3 Operational Mandate',
    code: 'MX-VLT-012',
    category: 'GOVERNANCE',
    fileSize: '1.9 MB',
    uploadedAt: '2026-10-03 21:40 UTC',
    checksumSha256: '33e891240188bb9a84f3e2b109c4885721ea8032cb41209e7c30f4a211029112',
    classification: 'TOP SECRET // EXCLUSIVE',
    downloadRestricted: true
  },
  {
    id: 'doc-04',
    title: 'Cloud Infrastructure Forensic Spend & Log Manifest',
    code: 'MX-VLT-099',
    category: 'FORENSIC',
    fileSize: '38.1 MB',
    uploadedAt: '2026-10-03 14:15 UTC',
    checksumSha256: '44a8891029cf0984a1e7729019ca420188bb3901a18290e441209e7c30f4a200',
    classification: 'CONFIDENTIAL',
    downloadRestricted: false
  }
];

export const INITIAL_TIMELINE: TimelineMilestone[] = [
  {
    day: 1,
    date: '2026-09-24',
    phase: 'audit',
    title: 'Mx3 Precision Emergency Mandate Initiated',
    status: 'COMPLETED',
    burnInflectionDelta: '-$0.0M (Base burn: $3.8M/mo)',
    deliverables: ['Board resolution executed', 'Bank account read-access authorized', 'Black Box extraction engine deployed']
  },
  {
    day: 7,
    date: '2026-09-30',
    phase: 'audit',
    title: 'Threat Vector Discovery & Creditor Mapping',
    status: 'COMPLETED',
    burnInflectionDelta: '-$340K/mo initial pause',
    deliverables: ['Identified $18.5M subordinated debt trigger', 'Pinpointed GPU compute burn leak', 'Mapped flight risk vectors']
  },
  {
    day: 14,
    date: '2026-10-04 (Today)',
    phase: 'audit',
    title: 'Audit Findings Presentation & Intervention Lock Gate',
    status: 'IN_PROGRESS',
    burnInflectionDelta: '-$620K/mo target',
    deliverables: ['Black Box Report 09-Omega generated', 'Client acknowledgement gate active', 'Standstill agreement queued']
  },
  {
    day: 28,
    date: '2026-10-18',
    phase: 'intervention',
    title: 'Hyperscaler Renegotiation & Compute Quota Lock',
    status: 'PENDING',
    burnInflectionDelta: '-$1.45M/mo permanent reduction',
    deliverables: ['AWS compute contract renegotiated', 'Idle cluster decommissioned', 'Client gross margins restored to >68%']
  },
  {
    day: 45,
    date: '2026-11-04',
    phase: 'intervention',
    title: 'Subordinated Debt Restructuring & Equity Carve-out',
    status: 'PENDING',
    burnInflectionDelta: '-$2.10M/mo debt service reduction',
    deliverables: ['Lender syndicate converts 40% debt to preferred equity', 'Maturity extended by 36 months', 'Liquidity covenant reset']
  },
  {
    day: 60,
    date: '2026-11-19',
    phase: 'governance',
    title: 'Permanent Governance Lock & Escrow Protocol',
    status: 'PENDING',
    burnInflectionDelta: 'Cash-Flow Positive Trajectory',
    deliverables: ['Dual-signature continuous treasury monitoring', 'Mx3 automated escalation rules armed', 'Exit from critical surveillance']
  }
];
