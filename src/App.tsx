import React, { useState } from 'react';
import {
  SystemHealthState,
  EngagementPhase,
  MetricRowData,
  ThreatVector,
  IntelligenceItem,
  EvidenceLock,
  Workstream,
  VaultDocument,
  TimelineMilestone,
  SignalType
} from './types';
import {
  INITIAL_METRICS,
  INITIAL_THREAT_VECTORS,
  INITIAL_INTELLIGENCE,
  INITIAL_EVIDENCE_LOCKS,
  INITIAL_WORKSTREAMS,
  INITIAL_VAULT_DOCUMENTS,
  INITIAL_TIMELINE
} from './data/portalData';

import { Sidebar, PortalView } from './components/layout/Sidebar';
import { TopStatusBar } from './components/layout/TopStatusBar';
import { SystemHealthPanel } from './components/dashboard/SystemHealthPanel';
import { LiveFeedPanel } from './components/dashboard/LiveFeedPanel';
import { EngagementProgressPanel } from './components/dashboard/EngagementProgressPanel';
import { BlackBoxModule } from './components/blackbox/BlackBoxModule';
import { EngagementTimeline } from './components/timeline/EngagementTimeline';
import { SecureVault } from './components/vault/SecureVault';
import { SettingsModule } from './components/settings/SettingsModule';

import { IrreversibleConfirmModal } from './components/modals/IrreversibleConfirmModal';
import { EscalationModal } from './components/modals/EscalationModal';
import { KillSwitchModal } from './components/modals/KillSwitchModal';

export default function App() {
  const [currentView, setCurrentView] = useState<PortalView>('dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeLockId, setActiveLockId] = useState<string | null>(null);

  // Core engagement state
  const [engagementPhase, setEngagementPhase] = useState<EngagementPhase>('audit');
  const [systemHealthState, setSystemHealthState] = useState<SystemHealthState>('CRITICAL');

  // Distressed enterprise datasets
  const [metrics, setMetrics] = useState<MetricRowData[]>(INITIAL_METRICS);
  const [threatVectors, setThreatVectors] = useState<ThreatVector[]>(INITIAL_THREAT_VECTORS);
  const [intelligence, setIntelligence] = useState<IntelligenceItem[]>(INITIAL_INTELLIGENCE);
  const [evidenceLocks, setEvidenceLocks] = useState<EvidenceLock[]>(INITIAL_EVIDENCE_LOCKS);
  const [workstreams, setWorkstreams] = useState<Workstream[]>(INITIAL_WORKSTREAMS);
  const [vaultDocs, setVaultDocs] = useState<VaultDocument[]>(INITIAL_VAULT_DOCUMENTS);
  const [timeline, setTimeline] = useState<TimelineMilestone[]>(INITIAL_TIMELINE);

  // Modals
  const [isWarRoomModalOpen, setIsWarRoomModalOpen] = useState(false);
  const [isKillSwitchModalOpen, setIsKillSwitchModalOpen] = useState(false);
  const [isGovernanceLockModalOpen, setIsGovernanceLockModalOpen] = useState(false);
  const [isInterventionPackageModalOpen, setIsInterventionPackageModalOpen] = useState(false);
  const [isMitigateVectorModalOpen, setIsMitigateVectorModalOpen] = useState(false);
  const [isBlackoutActive, setIsBlackoutActive] = useState(false);

  // Add intelligence item
  const handleAddIntelligence = (note: string, type: SignalType) => {
    const now = new Date();
    const timeStr = now.toISOString().substring(11, 19) + ' UTC';
    const randomHash = '0x' + Math.random().toString(16).substring(2, 10);

    const newItem: IntelligenceItem = {
      id: `intel-${Date.now()}`,
      timestamp: timeStr,
      type,
      actor: 'OPERATOR DIRECTIVE',
      title: note.length > 50 ? note.substring(0, 47) + '...' : note,
      detail: note,
      hash: randomHash
    };

    setIntelligence((prev) => [newItem, ...prev]);
  };

  // Toggle threat vector mitigation
  const handleToggleMitigateVector = (id: string) => {
    setThreatVectors((prev) =>
      prev.map((tv) => {
        if (tv.id === id) {
          const nextMitigated = !tv.mitigated;
          handleAddIntelligence(
            nextMitigated
              ? `Operational remediation protocol activated for threat vector ${tv.code} (${tv.title}).`
              : `Threat vector ${tv.code} reopened for active monitoring.`,
            'Action'
          );
          return { ...tv, mitigated: nextMitigated };
        }
        return tv;
      })
    );
  };

  // Drilldown to Black Box
  const handleDrillDownToBlackBox = (lockId: string) => {
    setActiveLockId(lockId);
    setCurrentView('blackbox');
  };

  // Phase progression
  const handleAdvancePhase = (targetPhase: EngagementPhase) => {
    if (targetPhase === 'intervention') {
      setEngagementPhase('intervention');
      setSystemHealthState('DEGRADED');

      // Update metrics slightly to reflect intervention initial containment
      setMetrics((prev) =>
        prev.map((m) => {
          if (m.id === 'rev-velocity') {
            return {
              ...m,
              currentValue: '$12.80M',
              deltaText: '-21.9% vs baseline ($16.40M)',
              sparkline: [...m.sparkline, 12.8]
            };
          }
          if (m.id === 'liq-runway') {
            return {
              ...m,
              currentValue: '54.5 Days',
              deltaText: '-39.4% vs covenant threshold (90d)',
              sparkline: [...m.sparkline, 54.5]
            };
          }
          if (m.id === 'op-integrity') {
            return {
              ...m,
              currentValue: '74.2%',
              deltaText: '-12.7% breach variance index',
              sparkline: [...m.sparkline, 74.2]
            };
          }
          return m;
        })
      );

      handleAddIntelligence(
        'CLIENT PRINCIPALS ACKNOWLEDGED AUDIT FINDINGS: Formally initiated Phase 2 Intervention and authorized 45-day Standstill Protocol with lender steering committee.',
        'Action'
      );
    }
  };

  // Governance lock confirmation
  const handleConfirmGovernanceLock = () => {
    setEngagementPhase('governance');
    setSystemHealthState('GOVERNED');

    setMetrics((prev) =>
      prev.map((m) => {
        if (m.id === 'rev-velocity') {
          return {
            ...m,
            currentValue: '$15.90M',
            deltaText: '-3.0% vs baseline ($16.40M)',
            isNegative: false,
            sparkline: [...m.sparkline, 15.9]
          };
        }
        if (m.id === 'liq-runway') {
          return {
            ...m,
            currentValue: '118.0 Days',
            deltaText: '+31.1% above covenant minimum (90d)',
            isNegative: false,
            sparkline: [...m.sparkline, 118]
          };
        }
        if (m.id === 'op-integrity') {
          return {
            ...m,
            currentValue: '94.8%',
            deltaText: 'NOMINAL OPERATION RESTORED',
            isNegative: false,
            sparkline: [...m.sparkline, 94.8]
          };
        }
        return m;
      })
    );

    handleAddIntelligence(
      'GOVERNANCE ESCROW AUTHORIZED: Board resolutions signed, dual-signature treasury control locked, and automated quarterly covenant monitors deployed.',
      'Action'
    );
  };

  // Handle Escalation Submission
  const handleEscalationSubmit = (details: { reason: string; severity: string; urgency: string }) => {
    handleAddIntelligence(
      `PRIORITY ESCALATION DISPATCHED [${details.severity}]: ${details.reason} (Response target: ${details.urgency})`,
      'Signal'
    );
  };

  // Blackout activation
  const handleExecuteBlackout = () => {
    setIsKillSwitchModalOpen(false);
    setIsBlackoutActive(true);
  };

  // If Blackout is executed, render cold-storage lockdown screen
  if (isBlackoutActive) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0A0A0B] text-[#E8E8EA] flex flex-col items-center justify-center p-6 text-center select-none font-mono">
        <div className="max-w-md w-full border-2 border-[#C41E3A] p-8 bg-[#121214] space-y-4">
          <div className="text-xs font-bold text-[#C41E3A] tracking-widest uppercase">
            LEVEL-0 BLACKOUT ACTIVE // TERMINAL LOCKED
          </div>
          <h1 className="text-xl font-bold text-[#E8E8EA]">
            SESSION IRREVOCABLY PURGED
          </h1>
          <p className="text-xs text-[#8A8A93] leading-relaxed">
            All browser cryptographic caches, forensic disclosures, and access tokens have been wiped. Mx3 Operational Command has placed Project Aethel-9 into cold-storage quarantine.
          </p>
          <div className="pt-4 border-t border-[#2A2A2E] text-[10px] text-[#8A8A93]">
            Reconnection requires dual-key physical token authentication at designated Mx3 vault facilities.
          </div>
          <button
            onClick={() => setIsBlackoutActive(false)}
            className="w-full py-2 bg-[#1C1C1F] hover:bg-[#2A2A2E] text-xs text-[#8A8A93] hover:text-[#E8E8EA] border border-[#2A2A2E] transition-colors"
          >
            Re-initialize Sandbox Session
          </button>
        </div>
      </div>
    );
  }

  const unresolvedThreats = threatVectors.filter((tv) => !tv.mitigated).length;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E8E8EA] noir-noise flex flex-col">
      {/* Persistent Left Rail */}
      <Sidebar
        currentView={currentView}
        onSelectView={(v) => {
          setCurrentView(v);
          if (v !== 'blackbox') {
            setActiveLockId(null);
          }
        }}
        isExpanded={isSidebarExpanded}
        onToggleExpand={() => setIsSidebarExpanded(!isSidebarExpanded)}
        unresolvedThreatCount={unresolvedThreats}
      />

      {/* Main Content Area (Offset by sidebar width) */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 ${
          isSidebarExpanded ? 'pl-60' : 'pl-16'
        }`}
      >
        {/* Top Status Bar (Always Visible) */}
        <TopStatusBar
          clientCodename="PROJECT AETHEL-9"
          phase={engagementPhase}
          healthState={systemHealthState}
          onOpenWarRoom={() => setIsWarRoomModalOpen(true)}
          onTriggerKillSwitch={() => setIsKillSwitchModalOpen(true)}
        />

        {/* View Routing */}
        <main className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && (
            <div className="p-3 lg:p-4 min-h-[calc(100vh-3.5rem)]">
              {/* Full-width Three-Zone Layout: Zone A (28%), Zone B (44%), Zone C (28%) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 h-[calc(100vh-5.5rem)] min-h-[720px]">
                {/* Zone A — System Health (28% width approx 3.5 cols out of 12) */}
                <div className="lg:col-span-4 xl:col-span-3 h-full">
                  <SystemHealthPanel
                    healthState={systemHealthState}
                    onSetHealthState={setSystemHealthState}
                    metrics={metrics}
                    threatVectors={threatVectors}
                    onToggleMitigateVector={handleToggleMitigateVector}
                    onDrillDownToBlackBox={handleDrillDownToBlackBox}
                  />
                </div>

                {/* Zone B — Live Feed & Command Surface (44% width approx 5.5 cols out of 12) */}
                <div className="lg:col-span-5 xl:col-span-6 h-full">
                  <LiveFeedPanel
                    intelligence={intelligence}
                    onAddNote={handleAddIntelligence}
                    onRequestEscalation={() => setIsWarRoomModalOpen(true)}
                    onOpenQuickMitigate={() => setIsMitigateVectorModalOpen(true)}
                  />
                </div>

                {/* Zone C — Engagement Progress & Controls (28% width approx 3 cols out of 12) */}
                <div className="lg:col-span-3 xl:col-span-3 h-full">
                  <EngagementProgressPanel
                    currentPhase={engagementPhase}
                    onAdvancePhase={handleAdvancePhase}
                    workstreams={workstreams}
                    onOpenWarRoomModal={() => setIsWarRoomModalOpen(true)}
                    onRequestInterventionPackage={() => setIsInterventionPackageModalOpen(true)}
                    onOpenGovernanceLockModal={() => setIsGovernanceLockModalOpen(true)}
                  />
                </div>
              </div>
            </div>
          )}

          {currentView === 'blackbox' && (
            <BlackBoxModule
              evidenceLocks={evidenceLocks}
              activeLockId={activeLockId}
              onBackToDashboard={() => setCurrentView('dashboard')}
            />
          )}

          {currentView === 'timeline' && (
            <EngagementTimeline
              milestones={timeline}
              onBackToDashboard={() => setCurrentView('dashboard')}
            />
          )}

          {currentView === 'vault' && (
            <SecureVault
              documents={vaultDocs}
              onBackToDashboard={() => setCurrentView('dashboard')}
            />
          )}

          {currentView === 'settings' && (
            <SettingsModule
              onTriggerKillSwitch={() => setIsKillSwitchModalOpen(true)}
              onBackToDashboard={() => setCurrentView('dashboard')}
            />
          )}
        </main>
      </div>

      {/* Irreversible Governance Lock Confirmation Modal */}
      <IrreversibleConfirmModal
        isOpen={isGovernanceLockModalOpen}
        onClose={() => setIsGovernanceLockModalOpen(false)}
        onConfirm={handleConfirmGovernanceLock}
        title="Authorize Final Governance Escrow Lock"
        description="This irreversible action locks all executive treasury authorizations into the Mx3 permanent operational protocol. Covenant testing transitions to automated continuous surveillance, and non-compliance triggers automatic board escalation."
        confirmationPhrase="AUTHORIZE-LOCK"
        confirmButtonText="SEAL GOVERNANCE PROTOCOL"
        consequences={[
          'Commercial bank disbursements above $50,000 require continuous Mx3 cryptographic counter-signature.',
          'Board seats and creditor observer rights become legally binding under Delaware jurisdiction.',
          'Quarterly EBITDA covenant waivers convert to permanent restated credit facilities.',
          'Client portal transitions to cold, locked-down surveillance mode.'
        ]}
      />

      {/* Escalation / War-Room Modal */}
      <EscalationModal
        isOpen={isWarRoomModalOpen}
        onClose={() => setIsWarRoomModalOpen(false)}
        onSubmit={handleEscalationSubmit}
        defaultSeverity="CRITICAL"
      />

      {/* Emergency Kill Switch Modal */}
      <KillSwitchModal
        isOpen={isKillSwitchModalOpen}
        onClose={() => setIsKillSwitchModalOpen(false)}
        onExecuteBlackout={handleExecuteBlackout}
      />

      {/* Quick Mitigate Vector Modal */}
      {isMitigateVectorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
          <div className="w-full max-w-md bg-[#121214] border border-[#2A2A2E] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#2A2A2E] pb-3">
              <span className="text-xs font-mono font-bold uppercase text-[#E8E8EA]">
                Quick Mitigate Threat Vector
              </span>
              <button
                onClick={() => setIsMitigateVectorModalOpen(false)}
                className="text-[#8A8A93] hover:text-[#E8E8EA] text-xs font-mono"
              >
                CLOSE
              </button>
            </div>

            <div className="space-y-2">
              {threatVectors.map((tv) => (
                <div
                  key={tv.id}
                  onClick={() => {
                    handleToggleMitigateVector(tv.id);
                    setIsMitigateVectorModalOpen(false);
                  }}
                  className="p-2.5 bg-[#0A0A0B] border border-[#2A2A2E] hover:border-[#3A3A40] cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-semibold text-[#E8E8EA]">
                      {tv.code}: {tv.title}
                    </div>
                    <div className="text-[10px] text-[#8A8A93] font-mono">
                      {tv.financialExposure}
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 border ${
                      tv.mitigated
                        ? 'border-[#2A2A2E] text-[#8A8A93]'
                        : 'border-[#3A5F6F] text-[#3A5F6F] bg-[#3A5F6F]/10'
                    }`}
                  >
                    {tv.mitigated ? 'Mitigated' : 'Active'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Intervention Package Requisition Modal */}
      {isInterventionPackageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
          <div className="w-full max-w-lg bg-[#121214] border border-[#2A2A2E] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#2A2A2E] pb-3">
              <div>
                <div className="text-[10px] font-mono text-[#3A5F6F] uppercase">
                  Tactical Operational Resource Requisition
                </div>
                <h3 className="text-base font-semibold text-[#E8E8EA]">
                  Deploy Mx3 Intervention Package
                </h3>
              </div>
              <button
                onClick={() => setIsInterventionPackageModalOpen(false)}
                className="text-[#8A8A93] hover:text-[#E8E8EA] text-xs font-mono"
              >
                CLOSE
              </button>
            </div>

            <p className="text-xs text-[#8A8A93] leading-relaxed">
              Request immediate on-site deployment of specialized restructuring partners across financial covenant defense, hyperscaler cloud contract renegotiation, and executive talent stabilization.
            </p>

            <div className="bg-[#0A0A0B] border border-[#2A2A2E] p-3 text-xs space-y-2 font-mono">
              <div className="flex items-center justify-between text-[#8A8A93]">
                <span>STANDSTILL SPECIAL COUNSEL:</span>
                <span className="text-[#E8E8EA]">AVAILABLE (T-2H)</span>
              </div>
              <div className="flex items-center justify-between text-[#8A8A93]">
                <span>CLOUD INFRASTRUCTURE ARCHITECT:</span>
                <span className="text-[#E8E8EA]">ASSIGNED</span>
              </div>
              <div className="flex items-center justify-between text-[#8A8A93]">
                <span>SPECIAL SITUATIONS CONTROLLER:</span>
                <span className="text-[#3A5F6F]">ACTIVE ON-SITE</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#2A2A2E]">
              <button
                onClick={() => setIsInterventionPackageModalOpen(false)}
                className="px-3 py-1.5 text-xs text-[#8A8A93] hover:text-[#E8E8EA] border border-[#2A2A2E]"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  handleAddIntelligence(
                    'TACTICAL INTERVENTION PACKAGE DISPATCHED: Full restructuring cadre assigned to Aethel-9 operational headquarters.',
                    'Action'
                  );
                  setIsInterventionPackageModalOpen(false);
                }}
                className="px-4 py-1.5 text-xs font-semibold bg-[#3A5F6F] hover:bg-[#2F4D5A] text-white transition-colors"
              >
                Confirm Resource Deployment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
