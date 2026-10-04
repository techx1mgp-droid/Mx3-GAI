import React, { useState, useEffect } from 'react';
import { EvidenceLock } from '../../types';
import {
  Lock,
  Unlock,
  FileText,
  Download,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Hash,
  ArrowLeft
} from 'lucide-react';
import { SecureExportModal } from '../modals/SecureExportModal';

interface BlackBoxModuleProps {
  evidenceLocks: EvidenceLock[];
  activeLockId?: string | null;
  onBackToDashboard?: () => void;
}

export const BlackBoxModule: React.FC<BlackBoxModuleProps> = ({
  evidenceLocks,
  activeLockId,
  onBackToDashboard
}) => {
  const [expandedLocks, setExpandedLocks] = useState<Record<string, boolean>>({
    'lock-01': true,
    'lock-02': false,
    'lock-03': false,
    'lock-04': false
  });

  const [unmaskRedactions, setUnmaskRedactions] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<{ title: string; code: string; hash: string }>({
    title: 'REPORT 09-OMEGA: FORENSIC CAPITAL RUNWAY & THREAT ASSESSMENT',
    code: 'MX-BB-09-OMEGA',
    hash: 'sha256:7e8b91c944f210d321ea8032cb41209e7c30f4a2'
  });

  // If activeLockId is provided from deep-link, make sure that lock is expanded
  useEffect(() => {
    if (activeLockId) {
      setExpandedLocks((prev) => ({
        ...prev,
        [activeLockId]: true
      }));
      // Scroll to that element if present
      const el = document.getElementById(activeLockId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activeLockId]);

  const toggleLock = (id: string) => {
    setExpandedLocks((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-full bg-[#0A0A0B] text-[#E8E8EA] select-none pb-16">
      {/* Module Master Header */}
      <div className="border-b border-[#2A2A2E] bg-[#0A0A0B] p-4 lg:p-6">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Depth / Hierarchy indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8A8A93]">
              {onBackToDashboard && (
                <button
                  onClick={onBackToDashboard}
                  className="flex items-center gap-1 text-[#8A8A93] hover:text-[#E8E8EA] mr-2 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>DASHBOARD</span>
                </button>
              )}
              <span className="text-[#8A8A93]">CLASSIFICATION:</span>
              <span className="text-[#C41E3A] font-semibold">
                RESTRICTED // CLIENT PRINCIPALS ONLY
              </span>
              <span className="text-[#2A2A2E]">/</span>
              <span>DEPTH 2.0</span>
            </div>

            {/* Redaction toggle & Export actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setUnmaskRedactions(!unmaskRedactions)}
                className={`px-3 py-1.5 text-xs font-mono border transition-colors flex items-center gap-1.5 ${
                  unmaskRedactions
                    ? 'border-[#C41E3A] bg-[#C41E3A]/10 text-white'
                    : 'border-[#2A2A2E] bg-[#121214] text-[#8A8A93] hover:text-[#E8E8EA]'
                }`}
                title="Toggle inspection of obscured counter-party entities"
              >
                {unmaskRedactions ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-[#C41E3A]" />
                    <span>Mask Redacted Citations</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Redacted Entities</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setExportModalOpen(true)}
                className="px-3 py-1.5 text-xs font-mono font-semibold bg-[#E8E8EA] hover:bg-white text-[#0A0A0B] transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Package</span>
              </button>
            </div>
          </div>

          {/* Title & Cryptographic Meta */}
          <div className="pt-2">
            <h1 className="text-xl lg:text-2xl font-bold font-mono tracking-tight text-[#E8E8EA]">
              BLACK BOX REPORT 09-OMEGA: FORENSIC CAPITAL RUNWAY & THREAT ASSESSMENT
            </h1>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono text-[#8A8A93] pt-2">
              <div>
                GENERATION: <span className="text-[#E8E8EA]">2026-10-04T08:12:44.891Z</span>
              </div>
              <span className="text-[#2A2A2E]">·</span>
              <div>
                ENGINE: <span className="text-[#E8E8EA]">Mx3 DEEP FORENSIC EXTRACTOR v9</span>
              </div>
              <span className="text-[#2A2A2E]">·</span>
              <div className="flex items-center gap-1">
                <Hash className="w-3 h-3 text-[#3A5F6F]" />
                <span className="text-[#3A5F6F]">
                  sha256:7e8b91c944f210d321ea8032cb41209e7c30f4a2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body: Collapsible Evidence Locks */}
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-4">
        {evidenceLocks.map((lock) => {
          const isExpanded = !!expandedLocks[lock.id];
          const isHighlighted = activeLockId === lock.id;

          return (
            <div
              key={lock.id}
              id={lock.id}
              className={`bg-[#121214] border transition-all ${
                isHighlighted
                  ? 'border-[#C41E3A] ring-1 ring-[#C41E3A]'
                  : isExpanded
                  ? 'border-[#2A2A2E]'
                  : 'border-[#1C1C1F] hover:border-[#2A2A2E]'
              }`}
            >
              {/* Evidence Lock Bar */}
              <div
                onClick={() => toggleLock(lock.id)}
                className="p-4 cursor-pointer flex items-center justify-between bg-[#121214] hover:bg-[#161619] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#1C1C1F] border border-[#2A2A2E] flex items-center justify-center text-[#8A8A93]">
                    {isExpanded ? (
                      <Unlock className="w-3.5 h-3.5 text-[#E8E8EA]" />
                    ) : (
                      <Lock className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#E8E8EA]">
                        {lock.code}
                      </span>
                      <span className="text-[10px] font-mono text-[#8A8A93]">
                        {lock.classification}
                      </span>
                      {lock.status === 'FLAGGED' && (
                        <span className="text-[10px] font-mono text-[#C41E3A] border border-[#C41E3A]/40 bg-[#C41E3A]/10 px-1.5 py-0.2">
                          ACTIVE THREAT
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-[#E8E8EA] mt-0.5">
                      {lock.title}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline text-xs font-mono text-[#8A8A93]">
                    {lock.timestamp}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#8A8A93]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8A8A93]" />
                  )}
                </div>
              </div>

              {/* Collapsed/Expanded Body */}
              {isExpanded && (
                <div className="p-4 lg:p-6 border-t border-[#1C1C1F] bg-[#0A0A0B] space-y-6">
                  {/* Summary */}
                  <div>
                    <div className="text-[11px] font-mono text-[#8A8A93] uppercase tracking-wider mb-1">
                      Forensic Discovery Summary
                    </div>
                    <p className="text-xs text-[#E8E8EA] leading-relaxed">
                      {lock.summary}
                    </p>
                  </div>

                  {/* Dense Table */}
                  {lock.tableData && (
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-[#8A8A93] uppercase tracking-wider">
                        Decomposed Ledger / Metric Matrix
                      </div>
                      <div className="border border-[#2A2A2E] overflow-x-auto bg-[#121214]">
                        <table className="w-full text-left text-xs font-mono">
                          <thead>
                            <tr className="border-b border-[#2A2A2E] bg-[#1C1C1F] text-[#8A8A93]">
                              {lock.tableData.columns.map((col, idx) => (
                                <th
                                  key={idx}
                                  className="py-2.5 px-3 font-semibold uppercase text-[10px] tracking-wider"
                                >
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#1C1C1F]">
                            {lock.tableData.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className="hover:bg-[#1A1A1E] transition-colors"
                              >
                                {row.map((cell, cIdx) => {
                                  const cellStr = String(cell);
                                  const isBreach = cellStr.includes('BREACH');
                                  const isKill = cellStr.includes('Immediate Quota Kill');

                                  return (
                                    <td
                                      key={cIdx}
                                      className={`py-2 px-3 tabular-nums ${
                                        isBreach
                                          ? 'text-[#C41E3A] font-bold'
                                          : isKill
                                          ? 'text-[#B8860B] font-semibold'
                                          : 'text-[#E8E8EA]'
                                      }`}
                                    >
                                      {cell}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Redacted Excerpts / Source Citations */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8A93] uppercase tracking-wider">
                      <span>Forensic Source Citations & Legal Text</span>
                      <span className="text-[10px] text-[#8A8A93]">
                        {unmaskRedactions ? 'CLEARANCE LEVEL 5 UNMASKED' : 'ENCRYPTED PRIVILEGED STRIP'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {lock.redactedExcerpts.map((excerpt, eIdx) => (
                        <div
                          key={eIdx}
                          className="bg-[#121214] border border-[#2A2A2E] p-3 text-xs space-y-1.5"
                        >
                          <div className="text-[10px] font-mono text-[#3A5F6F] font-semibold uppercase">
                            [EXCERPT REF #{eIdx + 1}] {excerpt.label}
                          </div>
                          <div className="font-mono text-xs leading-relaxed">
                            {unmaskRedactions ? (
                              <span className="text-[#E8E8EA] bg-[#C41E3A]/10 px-1 py-0.5 border border-[#C41E3A]/40">
                                {excerpt.unmaskedText}
                              </span>
                            ) : (
                              <span className="text-[#8A8A93]">
                                {excerpt.redactedText}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prescribed Mitigation Protocol */}
                  <div className="p-3 bg-[#121214] border border-[#2A2A2E] flex items-start gap-3">
                    <div className="text-[#3A5F6F] font-mono text-xs shrink-0 mt-0.5">
                      ■ ACTION PROTOCOL:
                    </div>
                    <div className="text-xs text-[#E8E8EA]">
                      {lock.mitigationProtocol}
                    </div>
                  </div>

                  {/* Source Hash */}
                  <div className="text-[10px] font-mono text-[#8A8A93] pt-1">
                    CUSTODY HASH: <span className="text-[#E8E8EA]">{lock.sourceHash}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer: Chain of Custody Metadata */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-6 border-t border-[#2A2A2E] text-xs font-mono text-[#8A8A93] flex flex-wrap items-center justify-between gap-3">
        <div>
          CHAIN-OF-CUSTODY ID: <span className="text-[#E8E8EA]">MX-CUSTODY-88194-LEAD</span>
        </div>
        <div>
          CUSTODIAN: <span className="text-[#E8E8EA]">Mx3 FORENSIC SPECIAL RESTRUCTURING UNIT</span>
        </div>
        <div>
          LEGAL NON-DISCLOSURE STATUS: <span className="text-[#3A5F6F]">ACTIVE & BINDING</span>
        </div>
      </div>

      {/* Secure Export Modal */}
      <SecureExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        reportTitle={selectedReport.title}
        reportCode={selectedReport.code}
        sourceHash={selectedReport.hash}
      />
    </div>
  );
};
