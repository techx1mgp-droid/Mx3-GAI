import React, { useState } from 'react';
import { Radio, X, CheckCircle2 } from 'lucide-react';

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: { reason: string; severity: string; urgency: string }) => void;
  defaultSeverity?: string;
}

export const EscalationModal: React.FC<EscalationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultSeverity = 'CRITICAL'
}) => {
  const [severity, setSeverity] = useState(defaultSeverity);
  const [urgency, setUrgency] = useState('IMMEDIATE (T < 60 MIN)');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onSubmit({ reason, severity, urgency });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#121214] border border-[#2A2A2E] p-6 shadow-2xl relative">
        <div className="flex items-start justify-between border-b border-[#2A2A2E] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C41E3A]/20 border border-[#C41E3A] flex items-center justify-center text-[#C41E3A]">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#C41E3A] uppercase">
                Priority Dispatch Channel
              </div>
              <h3 className="text-base font-semibold text-[#E8E8EA]">
                Escalate Critical Threat to Mx3 Command
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8A8A93] hover:text-[#E8E8EA] transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-[#3A5F6F] mx-auto" />
            <div className="text-sm font-semibold text-[#E8E8EA]">
              Escalation Dispatched to Lead Operating Partner
            </div>
            <div className="text-xs font-mono text-[#8A8A93]">
              Dispatch ID: ESC-9902 · Target response within 18 minutes
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#8A8A93] mb-1.5 uppercase">
                Escalation Severity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['CRITICAL', 'HIGH', 'ELEVATED'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSeverity(lvl)}
                    className={`py-2 px-3 text-xs font-mono border transition-colors ${
                      severity === lvl
                        ? 'border-[#C41E3A] bg-[#C41E3A]/10 text-white font-semibold'
                        : 'border-[#2A2A2E] bg-[#0A0A0B] text-[#8A8A93] hover:border-[#3A3A40]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8A8A93] mb-1.5 uppercase">
                Response Horizon
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-[#2A2A2E] text-xs font-mono text-[#E8E8EA] p-2.5 outline-none focus:border-[#C41E3A]"
              >
                <option value="IMMEDIATE (T < 60 MIN)">IMMEDIATE (T &lt; 60 MIN) — Standby War-Room</option>
                <option value="SAME DAY (T < 6 HOURS)">SAME DAY (T &lt; 6 HOURS) — Principal Review</option>
                <option value="NEXT MORNING (T < 24 HOURS)">NEXT MORNING (T &lt; 24 HOURS) — Scheduled Sync</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8A8A93] mb-1.5 uppercase">
                Vector Specifics / Counter-Party Details
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Specify creditor communication, immediate liquidity anomaly, key personnel resignation, or board revolt details..."
                rows={4}
                required
                className="w-full bg-[#0A0A0B] border border-[#2A2A2E] p-3 text-xs text-[#E8E8EA] placeholder:text-[#8A8A93]/50 outline-none focus:border-[#C41E3A]"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#2A2A2E]">
              <span className="text-[10px] font-mono text-[#8A8A93]">
                Encrypted Session · TLS 1.3
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs text-[#8A8A93] hover:text-[#E8E8EA] border border-[#2A2A2E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-[#C41E3A] hover:bg-[#A31830] text-white transition-colors"
                >
                  Dispatch Priority Directive
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
