import React, { useState } from 'react';
import { Skull, AlertOctagon, X, ShieldAlert } from 'lucide-react';

interface KillSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteBlackout: () => void;
}

export const KillSwitchModal: React.FC<KillSwitchModalProps> = ({
  isOpen,
  onClose,
  onExecuteBlackout
}) => {
  const [confirmText, setConfirmText] = useState('');
  const [isWiping, setIsWiping] = useState(false);

  if (!isOpen) return null;

  const handleKill = () => {
    if (confirmText.trim() !== 'KILL-SESSION') return;
    setIsWiping(true);
    setTimeout(() => {
      onExecuteBlackout();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#0A0A0B] border-2 border-[#C41E3A] p-6 shadow-2xl relative">
        <div className="flex items-start justify-between border-b border-[#2A2A2E] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#C41E3A]/20 border border-[#C41E3A] flex items-center justify-center text-[#C41E3A]">
              <Skull className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#C41E3A] uppercase font-bold">
                Level-0 Blackout Protocol
              </div>
              <h3 className="text-base font-semibold text-[#E8E8EA]">
                Initiate Portal Session Kill Switch
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isWiping}
            className="text-[#8A8A93] hover:text-[#E8E8EA] transition-colors p-1 disabled:opacity-30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-[#C41E3A]/10 border border-[#C41E3A]/40 p-3 text-xs text-[#E8E8EA] space-y-2">
            <div className="font-semibold text-[#C41E3A] flex items-center gap-1.5 uppercase font-mono">
              <AlertOctagon className="w-4 h-4" />
              Immediate Irreversible Severance
            </div>
            <p className="text-[11px] leading-relaxed text-[#8A8A93]">
              Executing this kill switch purges all local cryptographic session tokens, wipes cached forensic disclosures, revokes the current operator hardware key, and alerts Mx3 Operational Command to place this portal into offline lockdown.
            </p>
          </div>

          <div className="space-y-1 text-xs text-[#8A8A93]">
            <div className="font-mono text-[11px] text-[#E8E8EA]">ACTIONS PERFORMED:</div>
            <div className="flex items-center gap-2">
              <span className="text-[#C41E3A]">■</span>
              <span>Invalidate Bearer Token <code className="text-[#E8E8EA] font-mono">MX-TOK-8891-B</code></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#C41E3A]">■</span>
              <span>Purge all client cache memory and DOM evidence locks</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#C41E3A]">■</span>
              <span>Broadcast emergency intrusion alert to Mx3 Security Ops Center</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-[#8A8A93] mb-1.5">
              Type <span className="text-[#C41E3A] font-bold">KILL-SESSION</span> to confirm immediate lockout:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="KILL-SESSION"
              disabled={isWiping}
              className="w-full bg-[#121214] border border-[#2A2A2E] focus:border-[#C41E3A] px-3 py-2 text-xs font-mono text-[#E8E8EA] outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2E]">
          <span className="text-[10px] font-mono text-[#8A8A93]">
            Terminal Ref: AETHEL-KILL-0
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              disabled={isWiping}
              className="px-3 py-1.5 text-xs text-[#8A8A93] hover:text-[#E8E8EA] border border-[#2A2A2E] disabled:opacity-30"
            >
              Cancel
            </button>
            <button
              onClick={handleKill}
              disabled={confirmText.trim() !== 'KILL-SESSION' || isWiping}
              className="px-4 py-1.5 text-xs font-semibold bg-[#C41E3A] hover:bg-[#A31830] text-white transition-colors disabled:opacity-40 flex items-center gap-2"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{isWiping ? 'Severing Uplink...' : 'Confirm Blackout'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
