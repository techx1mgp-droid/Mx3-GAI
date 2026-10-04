import React, { useState } from 'react';
import {
  ShieldAlert,
  Key,
  Globe,
  Clock,
  Trash2,
  RefreshCw,
  Download,
  CheckCircle,
  Skull
} from 'lucide-react';

interface SettingsModuleProps {
  onTriggerKillSwitch: () => void;
  onBackToDashboard?: () => void;
}

export const SettingsModule: React.FC<SettingsModuleProps> = ({
  onTriggerKillSwitch,
  onBackToDashboard
}) => {
  const [sessionTimeout, setSessionTimeout] = useState('15');
  const [ipRestriction, setIpRestriction] = useState(true);
  const [cachePurged, setCachePurged] = useState(false);
  const [rekeyDone, setRekeyDone] = useState(false);

  const handlePurgeCache = () => {
    setCachePurged(true);
    setTimeout(() => setCachePurged(false), 2000);
  };

  const handleRekeySession = () => {
    setRekeyDone(true);
    setTimeout(() => setRekeyDone(false), 2000);
  };

  const handleExportAuditTrail = () => {
    const auditLog = {
      exportTimestamp: new Date().toISOString(),
      operatorId: 'MX-AUTH-9912-OP',
      clientCodename: 'PROJECT AETHEL-9',
      events: [
        { time: '10:48:19 UTC', action: 'TOP_STATUS_SYNC', status: 'OK' },
        { time: '10:45:02 UTC', action: 'VAULT_ACCESS_VERIFY', hash: '9a84f3e2b10...' },
        { time: '10:32:05 UTC', action: 'TREASURY_RINGFENCE_LOG', status: 'EXECUTED' },
        { time: '09:58:44 UTC', action: 'BLACKBOX_EXTRACTION_LOAD', status: 'OK' }
      ]
    };

    const blob = new Blob([JSON.stringify(auditLog, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_log_aethel_${Date.now()}.json`;
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
            Operational Cryptographic Governance
          </div>
          <h1 className="text-xl lg:text-2xl font-bold font-mono tracking-tight text-[#E8E8EA]">
            SECURITY CONTROLS & KILL SWITCH
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="bg-[#121214] border border-[#2A2A2E] px-3 py-1.5 text-[#8A8A93]">
            HARDWARE TOKEN: <span className="text-[#3A5F6F] font-semibold">YUBIKEY FIPS #0921-OK</span>
          </div>
        </div>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Session Security */}
        <div className="bg-[#121214] border border-[#2A2A2E] p-4 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#E8E8EA]">
            <Clock className="w-4 h-4 text-[#8A8A93]" />
            <span>Session Inactivity Enforcer</span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#8A8A93]">
              Automatic Hardware Logout Window:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['15', '30', '60'].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setSessionTimeout(mins)}
                  className={`py-2 text-xs font-mono border transition-colors ${
                    sessionTimeout === mins
                      ? 'border-[#E8E8EA] bg-[#1C1C1F] text-[#E8E8EA] font-semibold'
                      : 'border-[#2A2A2E] text-[#8A8A93] hover:text-[#E8E8EA]'
                  }`}
                >
                  {mins} Minutes
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#8A8A93]">
              Portal session automatically revokes token memory upon lack of DOM mouse or keystroke inputs.
            </p>
          </div>
        </div>

        {/* Network & IP Allowlist */}
        <div className="bg-[#121214] border border-[#2A2A2E] p-4 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#E8E8EA]">
            <Globe className="w-4 h-4 text-[#8A8A93]" />
            <span>Geofence & CIDR Invariant</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#E8E8EA]">Enforce Zero-Trust IP Allowlist</span>
              <button
                type="button"
                onClick={() => setIpRestriction(!ipRestriction)}
                className={`w-10 h-5 border transition-colors relative ${
                  ipRestriction ? 'bg-[#3A5F6F] border-[#3A5F6F]' : 'bg-[#0A0A0B] border-[#2A2A2E]'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 bg-white transition-all absolute top-0.5 ${
                    ipRestriction ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
            <div className="bg-[#0A0A0B] border border-[#2A2A2E] p-2 text-xs font-mono text-[#8A8A93]">
              CURRENT SUBNET: <span className="text-[#E8E8EA]">198.51.100.0/24 (HQ Reserved)</span>
            </div>
          </div>
        </div>

        {/* Local Forensic Memory Management */}
        <div className="bg-[#121214] border border-[#2A2A2E] p-4 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#E8E8EA]">
            <Key className="w-4 h-4 text-[#8A8A93]" />
            <span>Session Memory & Local Cache</span>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-[#8A8A93]">
              Purge client memory registers, temporary Black Box decrypt blobs, and evidence buffer caches.
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handlePurgeCache}
                className="px-3 py-1.5 text-xs font-mono text-[#E8E8EA] bg-[#1C1C1F] hover:bg-[#2A2A2E] border border-[#2A2A2E] transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5 text-[#8A8A93]" />
                <span>{cachePurged ? 'Cache Purged' : 'Purge Browser Cache'}</span>
              </button>

              <button
                onClick={handleRekeySession}
                className="px-3 py-1.5 text-xs font-mono text-[#E8E8EA] bg-[#1C1C1F] hover:bg-[#2A2A2E] border border-[#2A2A2E] transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#8A8A93] ${rekeyDone ? 'animate-spin' : ''}`} />
                <span>{rekeyDone ? 'Re-Keyed' : 'Rotate Cryptographic Key'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Immutable Audit Trail Export */}
        <div className="bg-[#121214] border border-[#2A2A2E] p-4 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#E8E8EA]">
            <Download className="w-4 h-4 text-[#8A8A93]" />
            <span>Cryptographic Audit Trail Export</span>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-[#8A8A93]">
              Export verified JSON log of all operator clicks, view authentications, and parameter modifications.
            </p>

            <button
              onClick={handleExportAuditTrail}
              className="px-3 py-1.5 text-xs font-mono text-[#0A0A0B] font-semibold bg-[#E8E8EA] hover:bg-white transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Trail (JSON)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Blackout Kill Switch Surface */}
      <div className="bg-[#0A0A0B] border-2 border-[#C41E3A] p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C41E3A]/20 border border-[#C41E3A] flex items-center justify-center text-[#C41E3A]">
              <Skull className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#C41E3A] uppercase font-bold">
                Emergency Blackout Protocol
              </div>
              <h2 className="text-base font-bold text-[#E8E8EA]">
                Immediate Portal Termination Kill Switch
              </h2>
            </div>
          </div>

          <button
            onClick={onTriggerKillSwitch}
            className="px-5 py-2.5 bg-[#C41E3A] hover:bg-[#A31830] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>TRIGGER KILL SWITCH</span>
          </button>
        </div>

        <p className="text-xs text-[#8A8A93] leading-relaxed max-w-3xl">
          Warning: Activating the Kill Switch instantly revokes all client portal access tokens, terminates active sessions across all devices, wipes cached client data, and signals the Mx3 Operational Center to lock the client file in offline cold-storage.
        </p>
      </div>
    </div>
  );
};
