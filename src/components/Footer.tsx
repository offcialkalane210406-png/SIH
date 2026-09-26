/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 h-7 bg-[#07111F]/95 backdrop-blur-md border-t border-[#20364D] px-4 flex items-center justify-between text-[10px] font-['JetBrains_Mono'] text-[#8FA6BD]">
      {/* Left: Active Telemetry Data Feeds */}
      <div className="flex items-center gap-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-[#20D6A3]"></span>
          <span className="text-[#F4F8FC]">S1A VV/VH GRD</span>
          <span className="text-[#20D6A3] text-[9px]">[CALIBRATED]</span>
        </div>

        <span className="text-[#20364D]">|</span>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-[#20D6A3]"></span>
          <span>GEBCO 2024 BATHY</span>
        </div>

        <span className="text-[#20364D]">|</span>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-[#20D6A3]"></span>
          <span>ECMWF 10M + HYCOM V3</span>
        </div>

        <span className="text-[#20364D]">|</span>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00C8FF]"></span>
          <span>SPIRE+ORBCOMM AIS (1.42M)</span>
        </div>

        <span className="text-[#20364D] hidden md:inline">|</span>

        <div className="hidden md:flex items-center gap-1.5 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A00]"></span>
          <span>LAGRANGIAN N=5,000 ACTIVE</span>
        </div>
      </div>

      {/* Right: Security, Coordinate Reference & Latency */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[#B4C5FF] hidden sm:inline">
          PROJ: WGS-84 / UTM ZONE 43N
        </span>
        <span className="text-[#20364D] hidden sm:inline">|</span>
        <span className="text-[#20D6A3]">LATENCY: 22ms</span>
        <span className="text-[#20364D]">|</span>
        <span className="text-[#FF8A00] font-semibold tracking-wider">
          OFFICIAL SENSITIVE // SIH26143
        </span>
      </div>
    </footer>
  );
};
