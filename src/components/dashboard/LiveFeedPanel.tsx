import React, { useState } from 'react';
import { IntelligenceItem, SignalType } from '../../types';
import {
  Send,
  Radio,
  SlidersHorizontal,
  PlusCircle,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Terminal,
  Activity
} from 'lucide-react';

interface LiveFeedPanelProps {
  intelligence: IntelligenceItem[];
  onAddNote: (note: string, type: SignalType) => void;
  onRequestEscalation: () => void;
  onOpenQuickMitigate: () => void;
}

export const LiveFeedPanel: React.FC<LiveFeedPanelProps> = ({
  intelligence,
  onAddNote,
  onRequestEscalation,
  onOpenQuickMitigate
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [inputText, setInputText] = useState('');
  const [selectedInjectType, setSelectedInjectType] = useState<SignalType>('Observation');
  const [isLiveActive, setIsLiveActive] = useState(true);

  const filteredFeed = intelligence.filter((item) => {
    if (filterType === 'ALL') return true;
    return item.type.toUpperCase() === filterType;
  });

  const handleInjectNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onAddNote(inputText.trim(), selectedInjectType);
    setInputText('');
  };

  const getTypeStyle = (type: SignalType) => {
    switch (type) {
      case 'Signal':
        return 'text-[#C41E3A]';
      case 'Action':
        return 'text-[#E8E8EA] font-semibold';
      case 'Observation':
        return 'text-[#3A5F6F]';
    }
  };

  return (
    <div className="bg-[#121214] border border-[#2A2A2E] flex flex-col h-full overflow-hidden relative select-none">
      {/* Header with Filter Controls */}
      <div className="p-4 border-b border-[#2A2A2E] flex flex-wrap items-center justify-between gap-3 bg-[#0A0A0B]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#E8E8EA] uppercase">
            ZONE B // INTELLIGENCE STREAM & COMMAND
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isLiveActive ? 'bg-[#C41E3A] animate-ping' : 'bg-[#8A8A93]'
              }`}
            />
            <span className="text-[10px] font-mono text-[#8A8A93]">
              {isLiveActive ? 'LIVE TELEMETRY' : 'FEED PAUSED'}
            </span>
          </div>
        </div>

        {/* Filter Tabs (Interactive Segmented Control) */}
        <div className="flex items-center gap-1 bg-[#1C1C1F] border border-[#2A2A2E] p-0.5">
          {['ALL', 'SIGNAL', 'ACTION', 'OBSERVATION'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-2.5 py-1 text-[10px] font-mono transition-colors whitespace-nowrap ${
                filterType === tab
                  ? 'bg-[#0A0A0B] text-[#E8E8EA] font-semibold shadow-sm'
                  : 'text-[#8A8A93] hover:text-[#E8E8EA]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Intelligence Feed Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        {filteredFeed.length === 0 ? (
          <div className="p-8 text-center border border-[#2A2A2E] bg-[#0A0A0B] text-xs font-mono text-[#8A8A93]">
            No new signals — monitoring continuous telemetry stream.
          </div>
        ) : (
          filteredFeed.map((item) => (
            <div
              key={item.id}
              className={`bg-[#0A0A0B] border p-3.5 space-y-1.5 transition-colors ${
                item.flaggedCritical
                  ? 'border-[#C41E3A]/60 bg-[#C41E3A]/5'
                  : 'border-[#2A2A2E] hover:border-[#3A3A40]'
              }`}
            >
              {/* Unboxed Metadata Header with Dot Separators */}
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-[#8A8A93]">
                  <span className={`uppercase font-bold ${getTypeStyle(item.type)}`}>
                    [{item.type}]
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#E8E8EA]">{item.actor}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.timestamp}</span>
                </div>
                <span className="text-[10px] font-mono text-[#8A8A93]/80">
                  {item.hash}
                </span>
              </div>

              {/* Title & Body */}
              <div className="text-xs font-semibold text-[#E8E8EA] pt-0.5">
                {item.title}
              </div>
              <p className="text-xs text-[#8A8A93] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Floating Glassmorphic Command Bar at Bottom */}
      <div className="absolute bottom-3 left-3 right-3 z-20">
        <div className="bg-[#121214]/95 backdrop-blur-md border border-[#2A2A2E] p-2.5 shadow-2xl flex flex-col gap-2">
          {/* Top row: Type switcher & quick actions */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8A93]">
            <div className="flex items-center gap-2">
              <span className="text-[#8A8A93]">INJECT TYPE:</span>
              <div className="flex gap-1">
                {(['Signal', 'Action', 'Observation'] as SignalType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedInjectType(t)}
                    className={`px-2 py-0.5 border text-[10px] transition-colors ${
                      selectedInjectType === t
                        ? 'border-[#E8E8EA] bg-[#1C1C1F] text-[#E8E8EA] font-semibold'
                        : 'border-[#2A2A2E] text-[#8A8A93] hover:text-[#E8E8EA]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenQuickMitigate}
                className="text-[10px] text-[#8A8A93] hover:text-[#E8E8EA] transition-colors flex items-center gap-1"
                title="Mark a threat vector as mitigated"
              >
                <CheckCircle2 className="w-3 h-3 text-[#3A5F6F]" />
                <span className="hidden sm:inline">Mitigate Vector</span>
              </button>

              <button
                type="button"
                onClick={onRequestEscalation}
                className="text-[10px] text-[#C41E3A] hover:text-white bg-[#C41E3A]/10 hover:bg-[#C41E3A] px-2 py-0.5 border border-[#C41E3A]/50 transition-colors flex items-center gap-1 font-semibold"
              >
                <AlertTriangle className="w-3 h-3" />
                <span>Escalate Directive</span>
              </button>
            </div>
          </div>

          {/* Form input */}
          <form onSubmit={handleInjectNote} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Inject tactical note, directive or real-time signal into stream..."
              className="flex-1 bg-[#0A0A0B] border border-[#2A2A2E] focus:border-[#E8E8EA] px-3 py-1.5 text-xs text-[#E8E8EA] placeholder:text-[#8A8A93]/50 outline-none font-mono"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-3.5 py-1.5 bg-[#E8E8EA] hover:bg-white text-[#0A0A0B] font-mono text-xs font-semibold disabled:opacity-40 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Send className="w-3 h-3" />
              <span>INJECT</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
