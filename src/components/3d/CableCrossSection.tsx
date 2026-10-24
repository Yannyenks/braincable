import React, { useState } from 'react';
import { CABLE_LAYERS_ANATOMY } from '../../data/products';
import { CableLayerAnatomy } from '../../types';
import { ShieldCheck, Info, ChevronRight, Zap } from 'lucide-react';

interface CableCrossSectionProps {
  onSelectLayer?: (layer: CableLayerAnatomy) => void;
  selectedLayerId?: string | null;
}

export const CableCrossSection: React.FC<CableCrossSectionProps> = ({
  onSelectLayer,
  selectedLayerId
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeId = selectedLayerId || 'layer-conductor';
  const currentLayer = CABLE_LAYERS_ANATOMY.find(l => l.id === activeId) || CABLE_LAYERS_ANATOMY[0];

  const handleSelect = (layer: CableLayerAnatomy) => {
    if (onSelectLayer) {
      onSelectLayer(layer);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#151A20] border border-[#26303D] rounded-2xl p-6 lg:p-8">
      {/* 2D Vector Cross Section Diagram */}
      <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
        <div className="w-full max-w-[380px] aspect-square relative flex items-center justify-center p-4">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full drop-shadow-2xl select-none"
          >
            <defs>
              <radialGradient id="copperStrandGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#F5A869" />
                <stop offset="50%" stopColor="#D88746" />
                <stop offset="100%" stopColor="#9E531D" />
              </radialGradient>
              <radialGradient id="sheathGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#252C37" />
                <stop offset="70%" stopColor="#12161D" />
                <stop offset="100%" stopColor="#0B0D11" />
              </radialGradient>
              <pattern id="armorPattern" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="6" cy="6" r="3.2" fill="#768291" stroke="#3E4753" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Dimension guide lines */}
            <circle cx="200" cy="200" r="190" fill="none" stroke="#26303D" strokeDasharray="4 4" />
            <line x1="200" y1="8" x2="200" y2="392" stroke="#26303D" strokeWidth="0.8" strokeDasharray="2 4" />
            <line x1="8" y1="200" x2="392" y2="200" stroke="#26303D" strokeWidth="0.8" strokeDasharray="2 4" />

            {/* Layer 6: Outer Sheath */}
            <circle
              cx="200"
              cy="200"
              r="175"
              fill="url(#sheathGrad)"
              stroke={activeId === 'layer-sheath' ? '#276BFF' : '#26303D'}
              strokeWidth={activeId === 'layer-sheath' ? 4 : 2}
              className="cursor-pointer transition-all hover:opacity-90"
              onClick={() => handleSelect(CABLE_LAYERS_ANATOMY[5])}
              onMouseEnter={() => setHoveredId('layer-sheath')}
              onMouseLeave={() => setHoveredId(null)}
            />

            {/* Layer 5: Armour (Galvanized Steel Wire Armour ring) */}
            <circle
              cx="200"
              cy="200"
              r="154"
              fill="url(#armorPattern)"
              stroke={activeId === 'layer-armor' ? '#276BFF' : '#4E5A69'}
              strokeWidth={activeId === 'layer-armor' ? 3.5 : 1.5}
              className="cursor-pointer transition-all hover:opacity-95"
              onClick={() => handleSelect(CABLE_LAYERS_ANATOMY[4])}
              onMouseEnter={() => setHoveredId('layer-armor')}
              onMouseLeave={() => setHoveredId(null)}
            />

            {/* Layer 4: Screen / Copper Tape */}
            <circle
              cx="200"
              cy="200"
              r="138"
              fill="#9E5B26"
              stroke={activeId === 'layer-screen' ? '#276BFF' : '#D88746'}
              strokeWidth={activeId === 'layer-screen' ? 3.5 : 1.5}
              className="cursor-pointer transition-all"
              onClick={() => handleSelect(CABLE_LAYERS_ANATOMY[3])}
              onMouseEnter={() => setHoveredId('layer-screen')}
              onMouseLeave={() => setHoveredId(null)}
            />

            {/* Layer 3: Inner Bedding Filler Matrix */}
            <circle
              cx="200"
              cy="200"
              r="130"
              fill="#222831"
              stroke={activeId === 'layer-bedding' ? '#276BFF' : '#394351'}
              strokeWidth={activeId === 'layer-bedding' ? 3 : 1}
              className="cursor-pointer transition-all"
              onClick={() => handleSelect(CABLE_LAYERS_ANATOMY[2])}
              onMouseEnter={() => setHoveredId('layer-bedding')}
              onMouseLeave={() => setHoveredId(null)}
            />

            {/* 4 Conductors with XLPE Insulation (Phase 1, 2, 3, Neutral) */}
            {[
              { cx: 155, cy: 155, color: '#5A2D0C', label: 'L1 (Marron)' },
              { cx: 245, cy: 155, color: '#1B1E23', label: 'L2 (Noir)' },
              { cx: 245, cy: 245, color: '#68717D', label: 'L3 (Gris)' },
              { cx: 155, cy: 245, color: '#1D4ED8', label: 'N (Bleu)' }
            ].map((core, i) => (
              <g key={i}>
                {/* Insulation Sleeve */}
                <circle
                  cx={core.cx}
                  cy={core.cy}
                  r="45"
                  fill={core.color}
                  stroke={activeId === 'layer-insulation' ? '#276BFF' : '#111418'}
                  strokeWidth={activeId === 'layer-insulation' ? 3.5 : 2}
                  className="cursor-pointer transition-all"
                  onClick={() => handleSelect(CABLE_LAYERS_ANATOMY[1])}
                  onMouseEnter={() => setHoveredId('layer-insulation')}
                  onMouseLeave={() => setHoveredId(null)}
                />

                {/* Central Conductor Core (Multi-Strand Copper) */}
                <g 
                  className="cursor-pointer"
                  onClick={() => handleSelect(CABLE_LAYERS_ANATOMY[0])}
                  onMouseEnter={() => setHoveredId('layer-conductor')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Center strand */}
                  <circle
                    cx={core.cx}
                    cy={core.cy}
                    r="8.5"
                    fill="url(#copperStrandGrad)"
                    stroke="#7D3B0D"
                    strokeWidth="0.8"
                  />
                  {/* Surrounding 6 strands */}
                  {[0, 60, 120, 180, 240, 300].map((deg, sIdx) => {
                    const rad = (deg * Math.PI) / 180;
                    const sx = core.cx + Math.cos(rad) * 16.5;
                    const sy = core.cy + Math.sin(rad) * 16.5;
                    return (
                      <circle
                        key={sIdx}
                        cx={sx}
                        cy={sy}
                        r="8.5"
                        fill="url(#copperStrandGrad)"
                        stroke="#7D3B0D"
                        strokeWidth="0.8"
                      />
                    );
                  })}
                </g>
              </g>
            ))}

            {/* Central Dummy Core / Core Bedding filler */}
            <circle cx="200" cy="200" r="14" fill="#2E3744" stroke="#1F2630" strokeWidth="1" />
          </svg>

          {/* Interactive badge prompt */}
          <div className="absolute bottom-2 bg-[#0B0D10]/80 border border-[#26303D] rounded-full px-3 py-1 text-[11px] text-[#8B949E] backdrop-blur-sm pointer-events-none">
            Cliquez sur un composant pour l’inspecter
          </div>
        </div>
      </div>

      {/* Layer Specs & Engineering Breakdown */}
      <div className="lg:col-span-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-xs font-mono-tech text-[#D88746] font-semibold tracking-wider uppercase">
              {currentLayer.standardRef}
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded bg-[#276BFF]/15 text-[#548DFF] font-medium border border-[#276BFF]/30">
              Spécification Vérifiée
            </span>
          </div>

          <h3 className="text-xl lg:text-2xl font-bold text-[#F4F6F8] font-heading mb-1">
            {currentLayer.name}
          </h3>
          <p className="text-sm font-mono-tech text-[#8B949E] mb-4">
            {currentLayer.technicalName}
          </p>

          <p className="text-sm text-[#F4F6F8]/90 leading-relaxed mb-6 bg-[#0B0D10]/60 border border-[#26303D] rounded-xl p-4">
            {currentLayer.role}
          </p>

          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8B949E] font-mono-tech">
              Caractéristiques Techniques Documentées :
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentLayer.technicalDetails.map((detail, idx) => (
                <div 
                  key={idx}
                  className="bg-[#0B0D10]/70 border border-[#26303D] rounded-xl p-3 flex flex-col justify-between"
                >
                  <span className="text-[11px] text-[#8B949E] mb-1">
                    {detail.property}
                  </span>
                  <span className="text-xs font-bold font-mono-tech text-[#F4F6F8]">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Nav Chips */}
        <div className="mt-6 pt-4 border-t border-[#26303D]">
          <span className="text-[11px] text-[#8B949E] block mb-2 font-mono-tech">
            SÉLECTION RAPIDE DE LA COUCHE :
          </span>
          <div className="flex flex-wrap gap-2">
            {CABLE_LAYERS_ANATOMY.map((layer) => (
              <button
                key={layer.id}
                onClick={() => handleSelect(layer)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all flex items-center gap-2 ${
                  activeId === layer.id
                    ? 'bg-[#D88746] text-[#0B0D10] border-[#D88746] font-bold shadow-[0_0_12px_rgba(216,135,70,0.3)]'
                    : 'bg-[#0B0D10] text-[#8B949E] border-[#26303D] hover:text-[#F4F6F8] hover:border-[#8B949E]'
                }`}
              >
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: layer.colorHex }}
                />
                {layer.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
