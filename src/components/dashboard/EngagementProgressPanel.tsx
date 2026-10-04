import React, { useState } from 'react';
import { EngagementPhase, Workstream } from '../../types';
import {
  Check,
  Lock,
  ArrowRight,
  Shield,
  PhoneCall,
  Sliders,
  AlertTriangle,
  FolderGit2
} from 'lucide-react';

interface EngagementProgressPanelProps {
  currentPhase: EngagementPhase;
  onAdvancePhase: (targetPhase: EngagementPhase) => void;
  workstreams: Workstream[];
  onOpenWarRoomModal: () => void;
  onRequestInterventionPackage: () => void;
  onOpenGovernanceLockModal: () => void;
}

export const EngagementProgressPanel: React.FC<EngagementProgressPanelProps> = ({
  currentPhase,
  onAdvancePhase,
  workstreams,
  onOpenWarRoomModal,
  onRequestInterventionPackage,
  onOpenGovernanceLockModal
}) => {
  const phases = [
    {
      id: 'audit' as EngagementPhase,
      code: 'PHASE 01',
      title: 'Audit — The Scare',
      tagline: 'Confrontational Forensic Clarity',
      unlockedDescription: 'Full System Health diagnostics, Black Box extraction, and ranked threat vector exposures.',
      stateLabel: currentPhase === 'audit' ? 'ACTIVE & UNFORGIVING' : 'COMPLETED'
    },
    {
      id: 'intervention' as EngagementPhase,
      code: 'PHASE 02',
      title: 'Intervention — The Fix',
      tagline: 'Tactical Resource Deployment',
      unlockedDescription: 'Active debt standstill, compute quota enforcement, and executive retention lock.',
      stateLabel:
        currentPhase === 'audit'
          ? 'LOCKED PENDING ACKNOWLEDGEMENT'
          : currentPhase === 'intervention'
          ? 'IN FLIGHT'
          : 'COMPLETED'
    },
    {
      id: 'governance' as EngagementPhase,
      code: 'PHASE 03',
      title: 'Governance — The Hook',
      tagline: 'Permanent Operational Escrow',
      unlockedDescription: 'Automated treasury triggers, continuous surveillance, and restricted board oversight.',
      stateLabel:
        currentPhase === 'governance'
          ? 'PERMANENT SURVEILLANCE'
          : 'LOCKED PENDING PROTOCOL'
    }
  ];

  const isAudit = currentPhase === 'audit';
  const isIntervention = currentPhase === 'intervention';
  const isGovernance = currentPhase === 'governance';

  return (
    <div className="bg-[#121214] border border-[#2A2A2E] flex flex-col h-full overflow-hidden select-none">
      {/* Header */}
      <div className="p-4 border-b border-[#2A2A2E] flex items-center justify-between bg-[#0A0A0B]">
        <span className="text-xs font-mono font-bold tracking-wider text-[#E8E8EA] uppercase">
          ZONE C // ENGAGEMENT WORKFLOW
        </span>
        <span className="text-[10px] font-mono text-[#8A8A93]">
          SURRENDER & LOCK ARCHITECTURE
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Vertical Phase Stepper */}
        <div className="space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#8A8A93]">
            Mandatory Irreversible Progression
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#2A2A2E]">
            {phases.map((p, idx) => {
              const isActive = currentPhase === p.id;
              const isPast =
                (currentPhase === 'intervention' && p.id === 'audit') ||
                (currentPhase === 'governance' && (p.id === 'audit' || p.id === 'intervention'));
              const isLocked =
                (currentPhase === 'audit' && (p.id === 'intervention' || p.id === 'governance')) ||
                (currentPhase === 'intervention' && p.id === 'governance');

              return (
                <div key={p.id} className="relative group">
                  {/* Stepper Node Marker */}
                  <div
                    className={`absolute -left-6 top-1 w-5 h-5 flex items-center justify-center border text-[10px] font-mono transition-colors ${
                      isPast
                        ? 'border-[#3A5F6F] bg-[#3A5F6F] text-white'
                        : isActive
                        ? 'border-[#E8E8EA] bg-[#1C1C1F] text-[#E8E8EA] font-bold shadow-md'
                        : 'border-[#2A2A2E] bg-[#0A0A0B] text-[#8A8A93]'
                    }`}
                  >
                    {isPast ? <Check className="w-3 h-3" /> : idx + 1}
                  </div>

                  {/* Card Content */}
                  <div
                    className={`p-3 border transition-colors ${
                      isActive
                        ? 'border-[#E8E8EA] bg-[#0A0A0B]'
                        : isPast
                        ? 'border-[#2A2A2E] bg-[#0A0A0B]/60'
                        : 'border-[#2A2A2E]/60 bg-[#0A0A0B]/30 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-[10px] text-[#8A8A93]">{p.code}</span>
                      <span
                        className={`text-[9px] uppercase font-semibold ${
                          isActive
                            ? 'text-[#C41E3A]'
                            : isPast
                            ? 'text-[#3A5F6F]'
                            : 'text-[#8A8A93]'
                        }`}
                      >
                        {p.stateLabel}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[#E8E8EA]">
                      {p.title}
                    </div>
                    <div className="text-[11px] text-[#8A8A93] mt-0.5">
                      {p.tagline}
                    </div>

                    <p className="text-[11px] text-[#8A8A93] mt-2 leading-relaxed">
                      {p.unlockedDescription}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workstreams Section (Visible in Phase 2 & Phase 3) */}
        {!isAudit && (
          <div className="space-y-3 pt-3 border-t border-[#2A2A2E]">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8A93] uppercase">
              <span>Active Intervention Workstreams</span>
              <span className="text-[#3A5F6F]">{workstreams.length} ACTIVE</span>
            </div>

            <div className="space-y-2">
              {workstreams.map((ws) => (
                <div
                  key={ws.id}
                  className="bg-[#0A0A0B] border border-[#2A2A2E] p-2.5 space-y-1.5"
                >
                  <div className="flex items-start justify-between text-xs">
                    <span className="font-semibold text-[#E8E8EA] leading-tight">
                      {ws.title}
                    </span>
                    <span className="font-mono text-[10px] text-[#8A8A93] shrink-0 ml-2">
                      {ws.progressPercent}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1 bg-[#1C1C1F] overflow-hidden">
                    <div
                      className="h-full bg-[#3A5F6F] transition-all duration-500"
                      style={{ width: `${ws.progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8A8A93] pt-0.5">
                    <span>Lead: {ws.owner.split('(')[0]}</span>
                    <span>{ws.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Decision & Action Surface */}
        <div className="space-y-3 pt-3 border-t border-[#2A2A2E]">
          <div className="text-[11px] font-mono text-[#8A8A93] uppercase tracking-wider">
            Operational Decision Gates
          </div>

          {/* Phase 1 Actions */}
          {isAudit && (
            <div className="space-y-2">
              <button
                onClick={() => onAdvancePhase('intervention')}
                className="w-full py-3 px-4 bg-[#C41E3A] hover:bg-[#A31830] active:translate-y-0.5 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between shadow-lg"
              >
                <span>Acknowledge Findings & Authorize Intervention</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                onClick={onOpenWarRoomModal}
                className="w-full py-2.5 px-3 bg-[#1C1C1F] hover:bg-[#2A2A2E] text-[#E8E8EA] border border-[#2A2A2E] font-mono text-xs font-medium transition-colors flex items-center justify-between"
              >
                <span>Schedule Emergency War-Room</span>
                <PhoneCall className="w-3.5 h-3.5 text-[#8A8A93]" />
              </button>

              <div className="text-[10px] text-[#8A8A93] leading-relaxed pt-1">
                Notice: Acknowledging findings unlocks capital ring-fencing workstreams and formalizes the 45-day standstill protocol with creditors.
              </div>
            </div>
          )}

          {/* Phase 2 Actions */}
          {isIntervention && (
            <div className="space-y-2">
              <button
                onClick={onRequestInterventionPackage}
                className="w-full py-2.5 px-3 bg-[#1C1C1F] hover:bg-[#2A2A2E] text-[#E8E8EA] border border-[#2A2A2E] font-mono text-xs font-medium transition-colors flex items-center justify-between"
              >
                <span>Request Tactical Intervention Package</span>
                <FolderGit2 className="w-3.5 h-3.5 text-[#3A5F6F]" />
              </button>

              <button
                onClick={onOpenWarRoomModal}
                className="w-full py-2.5 px-3 bg-[#1C1C1F] hover:bg-[#2A2A2E] text-[#E8E8EA] border border-[#2A2A2E] font-mono text-xs font-medium transition-colors flex items-center justify-between"
              >
                <span>Schedule Emergency War-Room</span>
                <PhoneCall className="w-3.5 h-3.5 text-[#8A8A93]" />
              </button>

              <button
                onClick={onOpenGovernanceLockModal}
                className="w-full py-3 px-4 bg-[#C41E3A] hover:bg-[#A31830] active:translate-y-0.5 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between shadow-lg"
              >
                <span>Authorize Final Governance Lock</span>
                <Lock className="w-4 h-4 shrink-0" />
              </button>

              <div className="text-[10px] text-[#8A8A93] leading-relaxed pt-1">
                Authorizing Governance Lock permanently binds treasury disbursements and covenants to the Mx3 governance escrow framework.
              </div>
            </div>
          )}

          {/* Phase 3 Actions */}
          {isGovernance && (
            <div className="space-y-2">
              <div className="p-3 bg-[#0A0A0B] border border-[#3A5F6F] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#3A5F6F]">
                  <Shield className="w-4 h-4" />
                  <span>GOVERNANCE PROTOCOL LOCKED</span>
                </div>
                <p className="text-[11px] text-[#8A8A93] leading-relaxed">
                  Automated weekly FCCR covenants armed. Continuous treasury surveillance active. Critical accent budget minimized.
                </p>
              </div>

              <button
                onClick={onOpenWarRoomModal}
                className="w-full py-2.5 px-3 bg-[#1C1C1F] hover:bg-[#2A2A2E] text-[#E8E8EA] border border-[#2A2A2E] font-mono text-xs font-medium transition-colors flex items-center justify-between"
              >
                <span>Consult Governance Custodian</span>
                <PhoneCall className="w-3.5 h-3.5 text-[#8A8A93]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
