import React, { useState } from 'react';
import { TimelineMilestone } from '../../types';
import {
  Calendar,
  Check,
  Clock,
  AlertCircle,
  TrendingDown,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface EngagementTimelineProps {
  milestones: TimelineMilestone[];
  onBackToDashboard?: () => void;
}

export const EngagementTimeline: React.FC<EngagementTimelineProps> = ({
  milestones,
  onBackToDashboard
}) => {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone>(milestones[2]);

  return (
    <div className="min-h-full bg-[#0A0A0B] text-[#E8E8EA] select-none p-4 lg:p-6 pb-16 space-y-6">
      {/* Header */}
      <div className="border-b border-[#2A2A2E] pb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono text-[#8A8A93] uppercase tracking-wider">
            Operational Recovery Roadmap
          </div>
          <h1 className="text-xl lg:text-2xl font-bold font-mono tracking-tight text-[#E8E8EA]">
            90-DAY CRISIS INTERVENTION & BURN INFLECTION TIMELINE
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="bg-[#121214] border border-[#2A2A2E] px-3 py-1.5 text-[#8A8A93]">
            CURRENT POSITION: <span className="text-[#E8E8EA] font-semibold">DAY 14 / 90</span>
          </div>
          <div className="bg-[#121214] border border-[#2A2A2E] px-3 py-1.5 text-[#8A8A93]">
            BURN MITIGATION: <span className="text-[#3A5F6F] font-semibold">-$620K / MO ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Burn Inflection Curve Overview Banner */}
      <div className="bg-[#121214] border border-[#2A2A2E] p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#8A8A93] uppercase">Burn-Rate Inflection Horizon ($M / month)</span>
          <span className="text-[#3A5F6F]">TARGET: CASH-FLOW BREAKEVEN BY DAY 60</span>
        </div>

        {/* Milestone Steps Visualization */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
          {milestones.map((m) => {
            const isCurrent = m.status === 'IN_PROGRESS';
            const isCompleted = m.status === 'COMPLETED';
            const isSelected = selectedMilestone.day === m.day;

            return (
              <div
                key={m.day}
                onClick={() => setSelectedMilestone(m)}
                className={`p-3 border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#E8E8EA] bg-[#1C1C1F]'
                    : isCurrent
                    ? 'border-[#C41E3A] bg-[#C41E3A]/5'
                    : isCompleted
                    ? 'border-[#3A5F6F] bg-[#3A5F6F]/5'
                    : 'border-[#2A2A2E] bg-[#0A0A0B]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-[#8A8A93]">DAY {m.day}</span>
                  <span
                    className={`font-semibold ${
                      isCompleted
                        ? 'text-[#3A5F6F]'
                        : isCurrent
                        ? 'text-[#C41E3A]'
                        : 'text-[#8A8A93]'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>

                <div className="text-xs font-semibold text-[#E8E8EA] line-clamp-2">
                  {m.title}
                </div>

                <div className="text-[10px] font-mono text-[#3A5F6F] mt-2 pt-1 border-t border-[#2A2A2E]">
                  {m.burnInflectionDelta}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Milestone Inspection Panel */}
      <div className="bg-[#121214] border border-[#2A2A2E] p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2A2E] pb-4">
          <div>
            <div className="text-[10px] font-mono text-[#8A8A93] uppercase">
              Selected Operational Milestone // Day {selectedMilestone.day} ({selectedMilestone.date})
            </div>
            <h2 className="text-lg font-bold font-mono text-[#E8E8EA] mt-0.5">
              {selectedMilestone.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 text-xs font-mono font-semibold border ${
                selectedMilestone.status === 'COMPLETED'
                  ? 'border-[#3A5F6F] text-[#3A5F6F] bg-[#3A5F6F]/10'
                  : selectedMilestone.status === 'IN_PROGRESS'
                  ? 'border-[#C41E3A] text-[#C41E3A] bg-[#C41E3A]/10'
                  : 'border-[#2A2A2E] text-[#8A8A93] bg-[#0A0A0B]'
              }`}
            >
              STATUS: {selectedMilestone.status}
            </span>
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8A8A93]">
            Mandatory Deliverables & Legal Instruments:
          </div>

          <div className="space-y-2">
            {selectedMilestone.deliverables.map((deliv, idx) => (
              <div
                key={idx}
                className="bg-[#0A0A0B] border border-[#2A2A2E] p-3 flex items-start gap-3 text-xs"
              >
                <div className="w-5 h-5 bg-[#1C1C1F] border border-[#2A2A2E] flex items-center justify-center shrink-0 text-[#3A5F6F]">
                  {selectedMilestone.status === 'COMPLETED' ? (
                    <Check className="w-3.5 h-3.5 text-[#3A5F6F]" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-[#8A8A93]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-[#E8E8EA] font-medium">{deliv}</div>
                  <div className="text-[10px] font-mono text-[#8A8A93] mt-0.5">
                    Target Execution Standard: Irreversible legal binding under Delaware Chancery jurisdiction
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Burn Impact Box */}
        <div className="bg-[#0A0A0B] border border-[#2A2A2E] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#3A5F6F]/20 border border-[#3A5F6F] flex items-center justify-center text-[#3A5F6F]">
              <TrendingDown className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#8A8A93] uppercase">
                Runway Extension Impact
              </div>
              <div className="text-sm font-semibold font-mono text-[#E8E8EA]">
                {selectedMilestone.burnInflectionDelta}
              </div>
            </div>
          </div>

          <div className="text-right text-xs font-mono text-[#8A8A93]">
            Covenant Defense: <span className="text-[#E8E8EA]">STRICTLY ENFORCED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
