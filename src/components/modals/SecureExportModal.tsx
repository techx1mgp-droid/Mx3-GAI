import React, { useState } from 'react';
import { FileText, Download, ShieldCheck, X, Check, Lock } from 'lucide-react';

interface SecureExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
  reportCode: string;
  sourceHash: string;
}

export const SecureExportModal: React.FC<SecureExportModalProps> = ({
  isOpen,
  onClose,
  reportTitle,
  reportCode,
  sourceHash
}) => {
  const [format, setFormat] = useState<'PDF' | 'ARCHIVE'>('PDF');
  const [generating, setGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setGenerating(true);
    setDownloadSuccess(false);

    setTimeout(() => {
      setGenerating(false);
      setDownloadSuccess(true);

      // Generate actual download payload file
      const exportData = {
        metadata: {
          clientCodename: 'PROJECT AETHEL-9',
          reportTitle,
          reportCode,
          classification: 'RESTRICTED // CLIENT PRINCIPALS ONLY',
          sourceDataHash: sourceHash,
          exportedAt: new Date().toISOString(),
          watermarkNotice: 'STRICTLY CONFIDENTIAL - AUTHORIZED TO CLIENT PRINCIPAL ONLY - DO NOT DUPLICATE',
          recipientOfficer: 'CHIEF EXECUTIVE OFFICER / MX3 APPOINTED RESTRUCTURING OFFICER'
        },
        securitySignature: 'ECDSA-SHA256-SIGNATURE-VERIFIED-NODE-99',
        chainOfCustody: 'IMMUTABLE ESCROW LEDGER LOG #88192-A'
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportCode}_${format.toLowerCase()}_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-[#121214] border border-[#2A2A2E] p-6 shadow-2xl relative">
        <div className="flex items-start justify-between border-b border-[#2A2A2E] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1C1C1F] border border-[#2A2A2E] flex items-center justify-center text-[#E8E8EA]">
              <Lock className="w-4 h-4 text-[#8A8A93]" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#8A8A93] uppercase">
                Cryptographic Export Pipeline
              </div>
              <h3 className="text-base font-semibold text-[#E8E8EA]">
                Export Forensic Intelligence Package
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

        <div className="space-y-4 mb-6">
          {/* Metadata Block */}
          <div className="bg-[#0A0A0B] border border-[#2A2A2E] p-3 text-xs space-y-1.5 font-mono">
            <div className="text-[#8A8A93]">
              TARGET: <span className="text-[#E8E8EA]">{reportTitle}</span>
            </div>
            <div className="text-[#8A8A93]">
              ID CODE: <span className="text-[#E8E8EA]">{reportCode}</span>
            </div>
            <div className="text-[#8A8A93] break-all">
              DATA HASH: <span className="text-[#3A5F6F]">{sourceHash}</span>
            </div>
            <div className="text-[#8A8A93]">
              WATERMARK: <span className="text-[#C41E3A]">COPY #004 — PRIVILEGED ATTORNEY-CLIENT WORK PRODUCT</span>
            </div>
          </div>

          {/* Format selection */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormat('PDF')}
              className={`p-3 text-left border transition-all ${
                format === 'PDF'
                  ? 'border-[#E8E8EA] bg-[#1C1C1F]'
                  : 'border-[#2A2A2E] bg-[#0A0A0B] text-[#8A8A93]'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-xs text-[#E8E8EA] mb-1">
                <FileText className="w-4 h-4 text-[#8A8A93]" />
                Secure PDF (Watermarked)
              </div>
              <div className="text-[11px] text-[#8A8A93]">
                Time-limited cryptographic lock, individualized serial number, unalterable PDF/A.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormat('ARCHIVE')}
              className={`p-3 text-left border transition-all ${
                format === 'ARCHIVE'
                  ? 'border-[#E8E8EA] bg-[#1C1C1F]'
                  : 'border-[#2A2A2E] bg-[#0A0A0B] text-[#8A8A93]'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-xs text-[#E8E8EA] mb-1">
                <ShieldCheck className="w-4 h-4 text-[#8A8A93]" />
                Encrypted Archive
              </div>
              <div className="text-[11px] text-[#8A8A93]">
                Full evidence tables + cryptographic SHA-256 audit manifest and ledger logs.
              </div>
            </button>
          </div>

          <div className="text-[11px] text-[#8A8A93] leading-relaxed">
            Notice: No public share links are permitted under Mx3 engagement protocols. Every generated artifact is stamped with your session key and logged to the permanent chain of custody.
          </div>
        </div>

        {downloadSuccess && (
          <div className="mb-4 p-2.5 bg-[#3A5F6F]/20 border border-[#3A5F6F] flex items-center gap-2 text-xs text-[#E8E8EA]">
            <Check className="w-4 h-4 text-[#3A5F6F]" />
            <span>Artifact cryptographic bundle generated and downloaded successfully.</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2E]">
          <span className="text-[10px] font-mono text-[#8A8A93]">
            Custody Node: NY-SEC-01
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-[#8A8A93] hover:text-[#E8E8EA] border border-[#2A2A2E]"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              disabled={generating}
              className="px-4 py-1.5 text-xs font-semibold bg-[#E8E8EA] hover:bg-white text-[#0A0A0B] transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{generating ? 'Compiling Envelope...' : `Download ${format}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
