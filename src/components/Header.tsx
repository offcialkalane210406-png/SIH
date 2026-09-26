/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationTab, PipelineStageId } from '../types';
import { AirGapModal } from './modals/AirGapModal';
import { InfoModal } from './modals/InfoModal';
import { AnalystModal } from './modals/AnalystModal';
import { TideTraceModelModal } from './modals/TideTraceModelModal';

interface HeaderProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  activePipelineStage?: PipelineStageId;
  onStageSelect?: (stage: PipelineStageId) => void;
  onSelectScene?: (sceneId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  activePipelineStage = '05_AIS_MATCH',
  onStageSelect,
  onSelectScene
}) => {
  const [utcTime, setUtcTime] = useState<string>('');
  const [isAirGapModalOpen, setIsAirGapModalOpen] = useState<boolean>(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [isAnalystModalOpen, setIsAnalystModalOpen] = useState<boolean>(false);
  const [isModelModalOpen, setIsModelModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${h}:${m}:${s} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { id: NavigationTab; label: string; badge: string }[] = [
    { id: 'investigate', label: 'Investigate', badge: '03' },
    { id: 'drift', label: 'Drift', badge: '48H' },
    { id: 'vessels', label: 'Vessels', badge: '142' },
    { id: 'evidence', label: 'Evidence', badge: '07' },
    { id: 'method', label: 'Method', badge: 'DOCS' },
    { id: 'data', label: 'Data', badge: 'LOCAL' },
  ];

  const pipelineStages: { id: PipelineStageId; label: string; tabTarget: NavigationTab }[] = [
    { id: '01_DETECT', label: '01 DETECT (S1-SAR)', tabTarget: 'investigate' },
    { id: '02_CHARACTERIZE', label: '02 CHARACTERIZE', tabTarget: 'investigate' },
    { id: '03_HINDCAST', label: '03 TRACE (LAGRANGIAN)', tabTarget: 'drift' },
    { id: '04_FORECAST', label: '04 FORECAST 48H', tabTarget: 'drift' },
    { id: '05_AIS_MATCH', label: '05 CORRELATE (AIS)', tabTarget: 'vessels' },
    { id: '06_ATTRIBUTION', label: '06 ATTRIBUTE', tabTarget: 'evidence' },
    { id: '07_REPORT', label: '07 REPORT DOSSIER', tabTarget: 'evidence' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col bg-[#07111F]/95 backdrop-blur-md border-b border-[#20364D]">
      {/* Top Main Navigation Bar */}
      <div className="h-14 w-full px-4 flex items-center justify-between">
        {/* Left: Official Brand Logo & Nav */}
        <div className="flex items-center gap-3.5">
          {/* Logo with restrained breathing cyan aura */}
          <div className="relative flex items-center justify-center shrink-0">
            <div className="w-10 h-10 rounded-full logo-breathing-aura p-0.5 flex items-center justify-center shrink-0 border border-[#00C8FF]/60 bg-[#000F21] overflow-hidden transition-all shadow-md">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtXrZgJCPjE1xpJLzVafh-M-SWSPgDtOOCN43ZLAiDxscn0hXU25Fq_d2bEIUAmyXTn0rGNOYBYzYar21Mj7eOwtZwKuiBE6fHMMKHvdmQ_qWarYF_v0REK3-S_I7YsJ1RoV5MBFtm0-3tVB-gEUiHEBGBQ0MTCkca5zAZIvUJUWanvZtGY8Za3tlZX98RnOLR_XEIuU-Nx-hMXDCfh3NSFx4y3vtrYyXimbSRalZffFA84a-e_vbK1jrAvLfrdDSUpw"
                alt="THE OUTLIERS Logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-['Space_Grotesk'] text-[17px] uppercase tracking-widest text-[#DBFCFF] font-bold">
                OUTLIERS
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-[9px] text-[#8FA6BD] tracking-wider">
              BEYOND THE EXPECTED // SATELLITE MARITIME FORENSICS
            </span>
          </div>

          <div className="h-6 w-px bg-[#20364D]/60 ml-1.5 hidden md:block"></div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 ml-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`font-['JetBrains_Mono'] text-[12px] transition-all px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#00C8FF]/15 text-[#00C8FF] border border-[#00C8FF]/50 shadow-[0_0_12px_rgba(0,200,255,0.25)] font-semibold'
                      : 'text-[#8FA6BD] hover:text-[#F4F8FC] hover:bg-[#101F33] border border-transparent'
                  }`}
                >
                  {isActive && (
                    <span className="relative flex h-2 w-2 mr-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C8FF] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C8FF]"></span>
                    </span>
                  )}
                  <span>{item.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                      isActive
                        ? 'bg-[#00C8FF] text-[#00363A] font-bold'
                        : 'bg-[#14263D] text-[#8FA6BD]'
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Telemetry & Status Widgets */}
        <div className="flex items-center gap-2.5">
          {/* TideTrace ML Model Trigger */}
          <button
            onClick={() => setIsModelModalOpen(true)}
            title="TideTrace ML Model Inspector: UNet++ (timm-efficientnet-b0) · oil_unet_best.pt"
            className="flex items-center gap-1.5 bg-[#00C8FF]/10 hover:bg-[#00C8FF]/20 px-2.5 py-1 rounded border border-[#00C8FF]/40 text-[#00C8FF] transition-all cursor-pointer group active:scale-95"
          >
            <span className="material-symbols-outlined text-[15px] group-hover:rotate-12 transition-transform">smart_toy</span>
            <span className="font-['JetBrains_Mono'] text-[11px] font-bold hidden sm:inline">
              UNet++ <span className="text-[#DBFCFF] font-normal text-[9.5px]">IoU 0.889</span>
            </span>
          </button>

          {/* SAR Active Badge */}
          <div className="flex items-center gap-2 bg-[#0B1728] px-2.5 py-1 rounded border border-[#20364D]">
            <span className="font-['JetBrains_Mono'] text-[9.5px] text-[#8FA6BD] hidden lg:inline">
              SAR ACTIVE
            </span>
            <span className="h-2 w-2 rounded-full bg-[#00C8FF] animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#DBFCFF] font-semibold">
              SENTINEL-1A
            </span>
          </div>

          {/* Cursor Coordinates */}
          <div className="hidden xl:flex items-center gap-2 bg-[#0B1728] px-2.5 py-1 rounded border border-[#20364D]">
            <span className="font-['JetBrains_Mono'] text-[9.5px] text-[#8FA6BD]">CURSOR</span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#F4F8FC]">
              18°53'42"N 72°49'14"E
            </span>
            <span className="font-['JetBrains_Mono'] text-[9px] text-[#B4C5FF]">(IN-W04)</span>
          </div>

          {/* Case Reference */}
          <div className="hidden sm:block bg-[#0B1728] px-2.5 py-1 rounded border border-[#20364D] font-['JetBrains_Mono'] text-[11px] text-[#7DF4FF]">
            #2025-NTRO-0941B
          </div>

          {/* Live UTC Clock */}
          <div className="bg-[#0B1728] px-2.5 py-1 rounded border border-[#20364D] font-['JetBrains_Mono'] text-[11px] text-[#8FA6BD]">
            [{utcTime || '14:32:08 UTC'}]
          </div>

          {/* Air-Gap Secured (Icon/Logo Only) */}
          <button
            onClick={() => setIsAirGapModalOpen(true)}
            title="AIR-GAP SECURED // Offline On-Premise Mode"
            className="w-8 h-8 rounded bg-[#FF4D5A]/15 hover:bg-[#FF4D5A]/25 border border-[#FF4D5A]/50 flex items-center justify-center cursor-pointer transition-all shrink-0 active:scale-95"
          >
            <span className="material-symbols-outlined text-[#FF4D5A] text-[16px]">lock</span>
          </button>

          {/* Information Button (Icon/Logo Only) */}
          <button
            onClick={() => setIsInfoModalOpen(true)}
            title="INCIDENT & SYSTEM INFO // SIH26143 Mumbai High Sector"
            className="w-8 h-8 rounded bg-[#0B1728] hover:bg-[#14263D] border border-[#20364D] hover:border-[#00C8FF]/50 flex items-center justify-center cursor-pointer transition-all shrink-0 text-[#8FA6BD] hover:text-[#00C8FF] active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">info</span>
          </button>

          {/* Analyst Profile (Icon/Logo Only) */}
          <button
            onClick={() => setIsAnalystModalOpen(true)}
            title="ANALYST PROFILE // OP-04"
            className="w-8 h-8 rounded bg-[#14263D] hover:bg-[#1A3350] border border-[#20364D] hover:border-[#00C8FF]/50 flex items-center justify-center cursor-pointer transition-all shrink-0 active:scale-95"
          >
            <span className="material-symbols-outlined text-[#00C8FF] text-[16px]">person</span>
          </button>
        </div>
      </div>

      {/* Sub-pipeline Lifecycle Ribbon */}
      <div className="h-7 w-full px-4 bg-[#07111F]/90 flex items-center justify-between border-t border-[#20364D]/30 text-[9.5px] font-['JetBrains_Mono']">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-[#8FA6BD] uppercase tracking-wider shrink-0">LIFECYCLE PIPELINE:</span>
          <div className="flex items-center gap-1 shrink-0">
            {pipelineStages.map((stage, idx) => {
              const isCurrent = activePipelineStage === stage.id;
              return (
                <React.Fragment key={stage.id}>
                  {idx > 0 && <span className="text-[#8FA6BD]/60 font-mono">&gt;</span>}
                  <button
                    onClick={() => {
                      if (onStageSelect) onStageSelect(stage.id);
                      onTabChange(stage.tabTarget);
                    }}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-[#00C8FF]/20 text-[#00C8FF] border border-[#00C8FF]/40 font-bold shadow-[0_0_8px_rgba(0,200,255,0.2)]'
                        : 'bg-[#101F33] text-[#8FA6BD] hover:text-[#F4F8FC] hover:bg-[#14263D]'
                    }`}
                  >
                    {stage.label}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <span className="text-[#B4C5FF]">ZONE: MUMBAI HIGH OFFSHORE (UTM 43N)</span>
          <span className="text-[#20364D]">|</span>
          <span className="text-[#00C8FF] font-mono">HYCOM + SPIRE FEED SYNCED</span>
        </div>
      </div>

      {/* Modals */}
      <AirGapModal
        isOpen={isAirGapModalOpen}
        onClose={() => setIsAirGapModalOpen(false)}
      />

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        onNavigateTab={onTabChange}
      />

      <AnalystModal
        isOpen={isAnalystModalOpen}
        onClose={() => setIsAnalystModalOpen(false)}
      />

      <TideTraceModelModal
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
        onSelectSceneForInvestigation={(sceneId) => {
          if (onSelectScene) onSelectScene(sceneId);
          onTabChange('investigate');
        }}
      />
    </header>
  );
};
