import React, { useState } from 'react';
import { AlertTriangle, X, ShieldAlert } from 'lucide-react';

interface IrreversibleConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmationPhrase?: string;
  consequences: string[];
  confirmButtonText?: string;
}

export const IrreversibleConfirmModal: React.FC<IrreversibleConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmationPhrase = 'AUTHORIZE-LOCK',
  consequences,
  confirmButtonText = 'EXECUTE IRREVERSIBLE ACTION'
}) => {
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleExecute = () => {
    if (inputVal.trim() !== confirmationPhrase) {
      setError(true);
      return;
    }
    setError(false);
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#121214] border border-[#C41E3A] p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#2A2A2E] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C41E3A]/20 border border-[#C41E3A] flex items-center justify-center text-[#C41E3A]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono tracking-widest text-[#C41E3A] uppercase">
                High-Stakes Operational Protocol
              </div>
              <h3 className="text-base font-semibold text-[#E8E8EA]">
                {title}
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

        {/* Description */}
        <p className="text-xs text-[#8A8A93] leading-relaxed mb-4">
          {description}
        </p>

        {/* Consequences */}
        <div className="bg-[#1C1C1F] border border-[#2A2A2E] p-3 mb-5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#8A8A93] mb-2">
            Binding Consequences of Authorization:
          </div>
          <ul className="space-y-1.5 text-xs text-[#E8E8EA]">
            {consequences.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#C41E3A] font-mono select-none">■</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Type-to-confirm */}
        <div className="mb-6">
          <label className="block text-[11px] text-[#8A8A93] mb-1.5 font-mono">
            Type <span className="text-[#E8E8EA] font-semibold">{confirmationPhrase}</span> to confirm irreversible execution:
          </label>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              if (error) setError(false);
            }}
            placeholder={confirmationPhrase}
            className="w-full bg-[#0A0A0B] border border-[#2A2A2E] focus:border-[#C41E3A] px-3 py-2 text-xs font-mono text-[#E8E8EA] outline-none transition-colors"
          />
          {error && (
            <p className="text-[11px] text-[#C41E3A] mt-1 font-mono">
              Confirmation string does not match exactly.
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2A2A2E]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#8A8A93] hover:text-[#E8E8EA] border border-[#2A2A2E] hover:bg-[#1C1C1F] transition-colors"
          >
            Abort Action
          </button>
          <button
            onClick={handleExecute}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#C41E3A] hover:bg-[#A31830] transition-colors flex items-center gap-2"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{confirmButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
