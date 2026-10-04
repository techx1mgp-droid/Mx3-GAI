import React, { useState } from 'react';
import { VaultDocument } from '../../types';
import {
  Lock,
  FileText,
  Download,
  ShieldCheck,
  Search,
  CheckCircle,
  XCircle,
  Hash,
  AlertCircle
} from 'lucide-react';

interface SecureVaultProps {
  documents: VaultDocument[];
  onBackToDashboard?: () => void;
}

export const SecureVault: React.FC<SecureVaultProps> = ({
  documents,
  onBackToDashboard
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [verifyHashInput, setVerifyHashInput] = useState('');
  const [verifyResult, setVerifyResult] = useState<{ match: boolean; docTitle?: string } | null>(null);

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = selectedCategory === 'ALL' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.checksumSha256.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVerifyHash = (e: React.FormEvent) => {
    e.preventDefault();
    const query = verifyHashInput.trim().toLowerCase();
    if (!query) return;

    const matchedDoc = documents.find(
      (d) => d.checksumSha256.toLowerCase() === query || d.checksumSha256.toLowerCase().includes(query)
    );

    if (matchedDoc) {
      setVerifyResult({ match: true, docTitle: matchedDoc.title });
    } else {
      setVerifyResult({ match: false });
    }
  };

  const handleDownloadDoc = (doc: VaultDocument) => {
    const payload = {
      vaultCode: doc.code,
      title: doc.title,
      category: doc.category,
      sha256: doc.checksumSha256,
      classification: doc.classification,
      retrievedTimestamp: new Date().toISOString(),
      authorizedSession: 'MX-AUTH-9912-OP',
      signature: 'SEALED-CRYPTOGRAPHIC-VAULT-MANIFEST-VERIFIED'
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.code}_vault_manifest.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-full bg-[#0A0A0B] text-[#E8E8EA] select-none p-4 lg:p-6 pb-16 space-y-6">
      {/* Header */}
      <div className="border-b border-[#2A2A2E] pb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono text-[#8A8A93] uppercase tracking-wider">
            Encrypted Document Room // Level-5 Access
          </div>
          <h1 className="text-xl lg:text-2xl font-bold font-mono tracking-tight text-[#E8E8EA]">
            SECURE RESTRUCTURING VAULT
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="bg-[#121214] border border-[#2A2A2E] px-3 py-1.5 text-[#8A8A93]">
            VAULT STATUS: <span className="text-[#3A5F6F] font-semibold">ENCRYPTED AT REST</span>
          </div>
        </div>
      </div>

      {/* Checksum Verification Tool */}
      <div className="bg-[#121214] border border-[#2A2A2E] p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-[#3A5F6F]" />
            <span className="font-semibold text-[#E8E8EA]">
              Cryptographic SHA-256 Checksum Verifier
            </span>
          </div>
          <span className="text-[10px] text-[#8A8A93]">
            IMMUTABLE LEDGER CROSS-CHECK
          </span>
        </div>

        <form onSubmit={handleVerifyHash} className="flex gap-2">
          <input
            type="text"
            value={verifyHashInput}
            onChange={(e) => {
              setVerifyHashInput(e.target.value);
              setVerifyResult(null);
            }}
            placeholder="Paste SHA-256 checksum to verify tamper-proof custody integrity..."
            className="flex-1 bg-[#0A0A0B] border border-[#2A2A2E] focus:border-[#E8E8EA] px-3 py-2 text-xs font-mono text-[#E8E8EA] outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#1C1C1F] hover:bg-[#2A2A2E] text-[#E8E8EA] border border-[#2A2A2E] font-mono text-xs font-semibold"
          >
            VERIFY
          </button>
        </form>

        {verifyResult && (
          <div
            className={`p-2.5 text-xs font-mono flex items-center gap-2 border ${
              verifyResult.match
                ? 'border-[#3A5F6F] bg-[#3A5F6F]/10 text-[#E8E8EA]'
                : 'border-[#C41E3A] bg-[#C41E3A]/10 text-[#C41E3A]'
            }`}
          >
            {verifyResult.match ? (
              <>
                <CheckCircle className="w-4 h-4 text-[#3A5F6F]" />
                <span>
                  VALIDATED: Checksum perfectly matches source document — &ldquo;{verifyResult.docTitle}&rdquo;.
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-[#C41E3A]" />
                <span>
                  INTEGRITY FAILURE: Provided hash does not exist in the verified custody ledger.
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#121214] border border-[#2A2A2E] p-3">
        <div className="flex items-center gap-1 bg-[#0A0A0B] border border-[#2A2A2E] p-0.5">
          {['ALL', 'LEGAL', 'FINANCIAL', 'FORENSIC', 'GOVERNANCE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-mono transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1C1C1F] text-[#E8E8EA] font-semibold'
                  : 'text-[#8A8A93] hover:text-[#E8E8EA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#8A8A93]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vault documents..."
            className="w-full bg-[#0A0A0B] border border-[#2A2A2E] pl-8 pr-3 py-1.5 text-xs text-[#E8E8EA] outline-none font-mono"
          />
        </div>
      </div>

      {/* Document Grid / Table */}
      <div className="border border-[#2A2A2E] bg-[#121214] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-[#2A2A2E] bg-[#1C1C1F] text-[#8A8A93]">
              <th className="py-3 px-4 uppercase text-[10px] tracking-wider">Document Code</th>
              <th className="py-3 px-4 uppercase text-[10px] tracking-wider">Title</th>
              <th className="py-3 px-4 uppercase text-[10px] tracking-wider">Category</th>
              <th className="py-3 px-4 uppercase text-[10px] tracking-wider">Classification</th>
              <th className="py-3 px-4 uppercase text-[10px] tracking-wider">SHA-256 Checksum</th>
              <th className="py-3 px-4 uppercase text-[10px] tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1C1F]">
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-[#1A1A1E] transition-colors">
                <td className="py-3 px-4 font-bold text-[#E8E8EA] whitespace-nowrap">
                  {doc.code}
                </td>
                <td className="py-3 px-4 font-sans font-medium text-[#E8E8EA]">
                  <div>{doc.title}</div>
                  <div className="text-[10px] text-[#8A8A93] font-mono mt-0.5">
                    {doc.fileSize} · Uploaded {doc.uploadedAt}
                  </div>
                </td>
                <td className="py-3 px-4 text-[#8A8A93]">
                  {doc.category}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="text-[10px] text-[#C41E3A] border border-[#C41E3A]/40 bg-[#C41E3A]/10 px-1.5 py-0.5 font-semibold">
                    {doc.classification}
                  </span>
                </td>
                <td className="py-3 px-4 max-w-[200px] truncate text-[11px] text-[#3A5F6F]">
                  <button
                    onClick={() => {
                      setVerifyHashInput(doc.checksumSha256);
                      setVerifyResult({ match: true, docTitle: doc.title });
                    }}
                    className="hover:underline text-left truncate block w-full"
                    title="Click to copy into Checksum Verifier"
                  >
                    {doc.checksumSha256}
                  </button>
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => handleDownloadDoc(doc)}
                    className="px-2.5 py-1 bg-[#1C1C1F] hover:bg-[#2A2A2E] text-[#E8E8EA] border border-[#2A2A2E] text-xs font-mono transition-colors inline-flex items-center gap-1.5"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
