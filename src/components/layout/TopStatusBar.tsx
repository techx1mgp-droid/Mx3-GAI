import React, { useEffect, useState } from 'react';
import { SystemHealthState, EngagementPhase } from '../../types';
import { ShieldCheck, PhoneCall, Skull } from 'lucide-react';

interface TopStatusBarProps {
  clientCodename: string;
  phase: EngagementPhase;
  healthState: SystemHealthState;
  onOpenWarRoom: () => void;
  onTriggerKillSwitch: () => void;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  clientCodename,
  phase,
  healthState,
  onOpenWarRoom,
  onTriggerKillSwitch
}) => {
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(
        now.toISOString().substring(11, 19) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPhaseLabel = (p: EngagementPhase) => {
    switch (p) {
      case 'audit':
        return 'PHASE 1: AUDIT (THE SCARE)';
      case 'intervention':
        return 'PHASE 2: INTERVENTION (THE FIX)';
      case 'governance':
        return 'PHASE 3: GOVERNANCE (THE HOOK)';
    }
  };

  const getHealthBadgeStyle = (state: SystemHealthState) => {
    switch (state) {
      case 'CRITICAL':
        return 'text-[#C41E3A]';
      case 'DEGRADED':
        return 'text-[#B8860B]';
      case 'STABILIZED':
        return 'text-[#3A5F6F]';
      case 'GOVERNED':
        return 'text-[#6A8FA5]';
    }
  };

  return (
    <header className="h-14 bg-[#0A0A0B] border-b border-[#2A2A2E] px-4 lg:px-6 flex items-center justify-between z-30 select-none">
      {/* Zone 1: Client Codename & Identity */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold tracking-wider text-[#E8E8EA] uppercase font-mono">
          {clientCodename}
        </span>
        <span className="hidden sm:inline text-xs text-[#8A8A93]/60 font-mono">
          RESTRICTED CLIENT PORTAL
        </span>
      </div>

      {/* Zone 2: Telemetry & Engagement Metadata with Unboxed Dividers */}
      <div className="hidden md:flex items-center gap-3 text-xs font-mono text-[#8A8A93]">
        <span className="text-[#E8E8EA] font-medium">
          {getPhaseLabel(phase)}
        </span>
        <span className="text-[#2A2A2E]" aria-hidden="true">/</span>

        <span className="flex items-center gap-1.5">
          <span className="text-[11px] text-[#8A8A93]">HEALTH:</span>
          <span className={`font-semibold ${getHealthBadgeStyle(healthState)}`}>
            {healthState}
          </span>
        </span>
        <span className="text-[#2A2A2E]" aria-hidden="true">/</span>

        <span className="text-[#8A8A93]">
          SYNC: <span className="text-[#E8E8EA]">{timestamp || '10:48:19 UTC'}</span>
        </span>
        <span className="text-[#2A2A2E]" aria-hidden="true">/</span>

        <span className="flex items-center gap-1 text-[#8A8A93]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3A5F6F]" />
          <span>E2EE TLS 1.3</span>
        </span>
      </div>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenWarRoom}
          className="px-3 py-1.5 text-xs font-mono font-medium text-[#E8E8EA] bg-[#1C1C1F] hover:bg-[#2A2A2E] border border-[#2A2A2E] transition-colors flex items-center gap-1.5"
          title="Connect directly to assigned Mx3 Operating Partner War-Room"
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#8A8A93]" />
          <span className="hidden sm:inline">War-Room</span>
        </button>

        <button
          onClick={onTriggerKillSwitch}
          className="px-3 py-1.5 text-xs font-mono font-semibold text-[#C41E3A] hover:text-white bg-[#C41E3A]/10 hover:bg-[#C41E3A] border border-[#C41E3A]/40 transition-colors flex items-center gap-1.5"
          title="Emergency Blackout / Purge Session"
        >
          <Skull className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Kill Switch</span>
        </button>
      </div>
    </header>
  );
};
