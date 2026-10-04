import React from 'react';
import {
  Activity,
  Terminal,
  Calendar,
  Lock,
  Sliders,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export type PortalView = 'dashboard' | 'blackbox' | 'timeline' | 'vault' | 'settings';

interface SidebarProps {
  currentView: PortalView;
  onSelectView: (view: PortalView) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  unresolvedThreatCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  isExpanded,
  onToggleExpand,
  unresolvedThreatCount
}) => {
  const navItems = [
    {
      id: 'dashboard' as PortalView,
      label: 'Crisis Dashboard',
      icon: Activity,
      count: unresolvedThreatCount > 0 ? unresolvedThreatCount : undefined,
      countTone: 'crimson'
    },
    {
      id: 'blackbox' as PortalView,
      label: 'Black Box',
      icon: Terminal,
      count: 4,
      countTone: 'neutral'
    },
    {
      id: 'timeline' as PortalView,
      label: 'Engagement Timeline',
      icon: Calendar,
      meta: 'Day 14'
    },
    {
      id: 'vault' as PortalView,
      label: 'Secure Vault',
      icon: Lock,
      count: 4,
      countTone: 'neutral'
    },
    {
      id: 'settings' as PortalView,
      label: 'Settings / Kill Switch',
      icon: Sliders
    }
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 bg-[#0A0A0B] border-r border-[#2A2A2E] flex flex-col justify-between transition-all duration-200 ${
        isExpanded ? 'w-60' : 'w-16'
      }`}
    >
      {/* Top brand monogram */}
      <div>
        <div className="h-14 border-b border-[#2A2A2E] flex items-center px-4 justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {/* Mx3 sharp geometric monogram */}
            <div className="w-8 h-8 shrink-0 bg-[#121214] border border-[#2A2A2E] flex items-center justify-center font-mono font-bold text-xs tracking-tighter text-[#E8E8EA]">
              <span className="text-[#C41E3A]">M</span>x3
            </div>
            {isExpanded && (
              <div className="flex flex-col whitespace-nowrap overflow-hidden">
                <span className="text-xs font-semibold tracking-wider text-[#E8E8EA] font-mono">
                  Mx3 OPERATIONAL
                </span>
                <span className="text-[10px] text-[#8A8A93] font-mono">
                  Executive Intelligence
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            const isKill = item.id === 'settings';

            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium transition-all text-left group ${
                  isActive
                    ? 'bg-[#1C1C1F] text-[#E8E8EA] border-l-2 border-[#E8E8EA]'
                    : isKill
                    ? 'text-[#8A8A93] hover:text-[#C41E3A] hover:bg-[#121214]'
                    : 'text-[#8A8A93] hover:text-[#E8E8EA] hover:bg-[#121214]'
                }`}
                title={!isExpanded ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#E8E8EA]'
                      : isKill
                      ? 'group-hover:text-[#C41E3A]'
                      : 'text-[#8A8A93] group-hover:text-[#E8E8EA]'
                  }`}
                />

                {isExpanded && (
                  <div className="flex items-center justify-between flex-1 truncate">
                    <span className="truncate">{item.label}</span>
                    {item.count !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 ${
                          item.countTone === 'crimson'
                            ? 'text-[#C41E3A] font-bold'
                            : 'text-[#8A8A93]'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                    {item.meta && (
                      <span className="text-[10px] font-mono text-[#8A8A93]">
                        {item.meta}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom operator session & expand toggle */}
      <div className="p-2 border-t border-[#2A2A2E] space-y-2">
        {isExpanded && (
          <div className="px-2 py-1.5 bg-[#121214] border border-[#2A2A2E] text-[10px] font-mono text-[#8A8A93]">
            <div className="text-[#E8E8EA]">SESSION KEY</div>
            <div className="truncate text-[#3A5F6F]">MX-AUTH-9912-OP</div>
          </div>
        )}

        <button
          onClick={onToggleExpand}
          className="w-full flex items-center justify-center p-2 text-[#8A8A93] hover:text-[#E8E8EA] hover:bg-[#121214] border border-[#2A2A2E] transition-colors"
          title={isExpanded ? 'Collapse Navigation Rail' : 'Expand Navigation Rail'}
        >
          {isExpanded ? (
            <div className="flex items-center gap-2 text-xs font-mono">
              <ChevronLeft className="w-4 h-4" />
              <span>COLLAPSE RAIL</span>
            </div>
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
};
