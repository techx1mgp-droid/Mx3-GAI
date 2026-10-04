import React, { useState } from 'react';
import {
  SystemHealthState,
  MetricRowData,
  ThreatVector
} from '../../types';
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

interface SystemHealthPanelProps {
  healthState: SystemHealthState;
  onSetHealthState: (state: SystemHealthState) => void;
  metrics: MetricRowData[];
  threatVectors: ThreatVector[];
  onToggleMitigateVector: (id: string) => void;
  onDrillDownToBlackBox: (lockId: string) => void;
}

export const SystemHealthPanel: React.FC<SystemHealthPanelProps> = ({
  healthState,
  onSetHealthState,
  metrics,
  threatVectors,
  onToggleMitigateVector,
  onDrillDownToBlackBox
}) => {
  const [expandedVectorId, setExpandedVectorId] = useState<string | null>('tv-01');

  // Ring configuration per health state
  const ringConfig = {
    CRITICAL: {
      score: '34%',
      label: 'CRITICAL STATE',
      sublabel: 'Covenant Breach & Active Bleed',
      strokeColor: '#C41E3A',
      pulseClass: 'animate-crimson-pulse',
      dashoffset: 280, // out of 440 circumference
      desc: 'Severe operational variance requiring immediate capital ring-fencing.'
    },
    DEGRADED: {
      score: '58%',
      label: 'DEGRADED STATE',
      sublabel: 'Standstill In Flight',
      strokeColor: '#B8860B',
      pulseClass: '',
      dashoffset: 185,
      desc: 'Active intervention protocols containing immediate acceleration clauses.'
    },
    STABILIZED: {
      score: '82%',
      label: 'STABILIZED STATE',
      sublabel: 'Milestones Secured',
      strokeColor: '#3A5F6F',
      pulseClass: '',
      dashoffset: 79,
      desc: 'Operational run-rate normalized within restructuring covenants.'
    },
    GOVERNED: {
      score: '96%',
      label: 'GOVERNED STATE',
      sublabel: 'Permanent Escrow Control',
      strokeColor: '#6A8FA5',
      pulseClass: '',
      dashoffset: 17,
      desc: 'Restructured governance framework armed with automated triggers.'
    }
  }[healthState];

  // Helper to render monochrome micro-sparklines
  const renderSparkline = (data: number[]) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 80;
    const height = 24;

    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible stroke-[#8A8A93]">
        <polyline
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          points={points}
        />
        {/* Current point terminal dot */}
        {data.length > 0 && (
          <circle
            cx={width}
            cy={height - ((data[data.length - 1] - min) / range) * (height - 6) - 3}
            r="2"
            className="fill-[#E8E8EA]"
          />
        )}
      </svg>
    );
  };

  return (
    <div className="bg-[#121214] border border-[#2A2A2E] flex flex-col h-full overflow-hidden select-none">
      {/* Panel Title */}
      <div className="p-4 border-b border-[#2A2A2E] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#E8E8EA] uppercase">
            ZONE A // SYSTEM HEALTH
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#8A8A93]">
          ACTIVE DIAGNOSTICS
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Dominant Status Ring (Hexagonal / Circular Anchor) */}
        <div className="flex flex-col items-center justify-center p-4 bg-[#0A0A0B] border border-[#2A2A2E] relative">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Hexagonal Corner Accents */}
            <div className="absolute inset-0 pointer-events-none flex justify-between items-between">
              <div className="w-2 h-2 border-t border-l border-[#8A8A93]/40" />
              <div className="w-2 h-2 border-t border-r border-[#8A8A93]/40" />
            </div>
            <div className="absolute inset-0 pointer-events-none flex justify-between items-end">
              <div className="w-2 h-2 border-b border-l border-[#8A8A93]/40" />
              <div className="w-2 h-2 border-b border-r border-[#8A8A93]/40" />
            </div>

            {/* Circular SVG Gauge */}
            <svg className="w-40 h-40 transform -rotate-90">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r="64"
                stroke="#1C1C1F"
                strokeWidth="6"
                fill="none"
              />
              {/* Active Indicator Ring */}
              <circle
                cx="80"
                cy="80"
                r="64"
                stroke={ringConfig.strokeColor}
                strokeWidth="6"
                strokeDasharray="402"
                strokeDashoffset={ringConfig.dashoffset}
                strokeLinecap="square"
                fill="none"
                className={`transition-all duration-700 ${ringConfig.pulseClass}`}
              />
            </svg>

            {/* Ring Center Readout */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-mono font-bold text-[#E8E8EA] tracking-tighter">
                {ringConfig.score}
              </span>
              <span
                className="text-[11px] font-mono font-semibold tracking-wider uppercase mt-0.5"
                style={{ color: ringConfig.strokeColor }}
              >
                {healthState}
              </span>
              <span className="text-[9px] font-mono text-[#8A8A93] mt-1 max-w-[110px] leading-tight">
                {ringConfig.sublabel}
              </span>
            </div>
          </div>

          {/* Health state override buttons for operational evaluation */}
          <div className="w-full mt-3 pt-3 border-t border-[#2A2A2E] flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#8A8A93] uppercase">
              Simulate State:
            </span>
            <div className="flex gap-1">
              {(['CRITICAL', 'DEGRADED', 'STABILIZED', 'GOVERNED'] as SystemHealthState[]).map((st) => (
                <button
                  key={st}
                  onClick={() => onSetHealthState(st)}
                  className={`text-[9px] font-mono px-1.5 py-0.5 border transition-colors ${
                    healthState === st
                      ? 'border-[#E8E8EA] bg-[#1C1C1F] text-[#E8E8EA] font-semibold'
                      : 'border-[#2A2A2E] text-[#8A8A93] hover:text-[#E8E8EA]'
                  }`}
                >
                  {st.substring(0, 4)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stacked Metric Rows */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8A93] uppercase tracking-wider">
            <span>Primary Capital & Ops Metrics</span>
            <span>Delta vs Baseline</span>
          </div>

          <div className="space-y-2">
            {metrics.map((m) => (
              <div
                key={m.id}
                className="bg-[#0A0A0B] border border-[#2A2A2E] p-3 flex flex-col gap-2 hover:border-[#3A3A40] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium text-[#E8E8EA]">
                      {m.name}
                    </div>
                    <div className="text-[10px] text-[#8A8A93] font-mono">
                      {m.historicalRange}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-[#E8E8EA]">
                      {m.currentValue}
                    </div>
                    <div className="text-[10px] font-mono text-[#C41E3A]">
                      {m.deltaText}
                    </div>
                  </div>
                </div>

                {/* Bottom sparkline & baseline row */}
                <div className="flex items-center justify-between pt-1 border-t border-[#1C1C1F]">
                  <span className="text-[10px] font-mono text-[#8A8A93]">
                    Baseline: <span className="text-[#E8E8EA]">{m.baseline}</span>
                  </span>
                  <div>{renderSparkline(m.sparkline)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Vectors List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8A93] uppercase tracking-wider">
            <span>Ranked Threat Vectors ({threatVectors.length})</span>
            <span className="text-[10px] text-[#C41E3A]">EXPOSURE ORDERED</span>
          </div>

          <div className="space-y-2">
            {threatVectors.map((tv) => {
              const isExpanded = expandedVectorId === tv.id;
              const isCritical = tv.severity === 'CRITICAL';
              const isHigh = tv.severity === 'HIGH';

              return (
                <div
                  key={tv.id}
                  className={`bg-[#0A0A0B] border transition-all ${
                    tv.mitigated
                      ? 'border-[#2A2A2E] opacity-60'
                      : isCritical
                      ? 'border-[#C41E3A]/70'
                      : isHigh
                      ? 'border-[#B8860B]/70'
                      : 'border-[#2A2A2E]'
                  }`}
                >
                  {/* Vector Header */}
                  <div
                    onClick={() => setExpandedVectorId(isExpanded ? null : tv.id)}
                    className="p-3 cursor-pointer flex items-start justify-between gap-2"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-mono font-bold text-[#E8E8EA]">
                        {tv.code}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-[#E8E8EA] leading-tight">
                          {tv.title}
                        </div>
                        <div className="text-[10px] font-mono text-[#8A8A93] mt-0.5">
                          {tv.financialExposure} · {tv.immediacy}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[9px] font-mono uppercase px-1.5 py-0.5 border ${
                          isCritical
                            ? 'border-[#C41E3A] text-[#C41E3A] bg-[#C41E3A]/10'
                            : isHigh
                            ? 'border-[#B8860B] text-[#B8860B] bg-[#B8860B]/10'
                            : 'border-[#3A5F6F] text-[#3A5F6F] bg-[#3A5F6F]/10'
                        }`}
                      >
                        {tv.mitigated ? 'MITIGATED' : tv.severity}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#8A8A93]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[#8A8A93]" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Detail Accordion */}
                  {isExpanded && (
                    <div className="p-3 pt-0 border-t border-[#1C1C1F] space-y-2.5 text-xs text-[#8A8A93]">
                      <p className="text-[#E8E8EA] leading-relaxed pt-2">
                        {tv.description}
                      </p>

                      <div className="bg-[#121214] p-2.5 border border-[#2A2A2E] space-y-1.5">
                        <div className="text-[10px] font-mono text-[#8A8A93]">
                          ROOT CAUSE ANALYSIS:
                        </div>
                        <div className="text-xs text-[#E8E8EA]">
                          {tv.rootCause}
                        </div>
                      </div>

                      <div className="bg-[#121214] p-2.5 border border-[#2A2A2E] space-y-1.5">
                        <div className="text-[10px] font-mono text-[#3A5F6F]">
                          PRESCRIBED INTERVENTION PROTOCOL:
                        </div>
                        <div className="text-xs text-[#E8E8EA]">
                          {tv.prescribedIntervention}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-2">
                        {tv.linkedEvidenceLockId ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDrillDownToBlackBox(tv.linkedEvidenceLockId!);
                            }}
                            className="px-2.5 py-1 text-[11px] font-mono text-[#E8E8EA] bg-[#1C1C1F] hover:bg-[#2A2A2E] border border-[#2A2A2E] transition-colors flex items-center gap-1.5"
                          >
                            <ExternalLink className="w-3 h-3 text-[#C41E3A]" />
                            <span>Drill into Black Box</span>
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono text-[#8A8A93]">
                            Evidence in Vault
                          </span>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleMitigateVector(tv.id);
                          }}
                          className={`px-2.5 py-1 text-[11px] font-mono transition-colors flex items-center gap-1.5 ${
                            tv.mitigated
                              ? 'text-[#8A8A93] hover:text-[#E8E8EA] border border-[#2A2A2E]'
                              : 'text-[#3A5F6F] hover:text-white border border-[#3A5F6F] hover:bg-[#3A5F6F]'
                          }`}
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>{tv.mitigated ? 'Reopen Vector' : 'Mark Remediated'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
