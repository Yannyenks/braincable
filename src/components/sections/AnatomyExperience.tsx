import React, { useState } from 'react';
import { CableScene } from '../3d/CableScene';
import { CableCrossSection } from '../3d/CableCrossSection';
import { CABLE_LAYERS_ANATOMY } from '../../data/products';
import { CableLayerAnatomy } from '../../types';
import { 
  Layers, 
  Rotate3d, 
  ShieldCheck, 
  Cpu, 
  HelpCircle, 
  SlidersHorizontal,
  Compass,
  FileText
} from 'lucide-react';

export const AnatomyExperience: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<CableLayerAnatomy>(CABLE_LAYERS_ANATOMY[0]);
  const [displayMode, setDisplayMode] = useState<'3d' | 'section'>('3d');

  return (
    <section id="anatomie-3d" className="py-24 bg-[#0B0D10] relative overflow-hidden border-t border-[#26303D]">
      {/* Decorative Circuit Lines in background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D88746]/40 to-transparent" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#D88746]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151A20] border border-[#26303D] mb-3">
              <Compass className="w-3.5 h-3.5 text-[#276BFF]" />
              <span className="text-[11px] font-mono-tech tracking-wider uppercase text-[#F4F6F8]">
                INGÉNIERIE & ARCHITECTURE INTERNE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F6F8] font-heading tracking-tight">
              Comprendre ce qui transporte l’énergie.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#8B949E] leading-relaxed">
              Explorez chaque couche protectrice et conductrice en 3D temps réel. Manipulez le modèle, écartez l’armure métallique et analysez les caractéristiques mécaniques et diélectriques normalisées.
            </p>
          </div>

          {/* View Mode Toggle (3D Interactive vs 2D Coupe Vectorielle) */}
          <div className="flex items-center p-1 bg-[#151A20] border border-[#26303D] rounded-xl self-start md:self-auto shadow-inner">
            <button
              onClick={() => setDisplayMode('3d')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                displayMode === '3d'
                  ? 'bg-[#D88746] text-[#0B0D10] shadow-md font-bold'
                  : 'text-[#8B949E] hover:text-[#F4F6F8]'
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5" />
              <span>Scène 3D Interactive</span>
            </button>
            <button
              onClick={() => setDisplayMode('section')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                displayMode === 'section'
                  ? 'bg-[#276BFF] text-white shadow-md font-bold'
                  : 'text-[#8B949E] hover:text-[#F4F6F8]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Section Transversale 2D</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        {displayMode === '3d' ? (
          <div className="space-y-6">
            <CableScene 
              selectedLayerId={selectedLayer.id}
              onSelectLayer={(l) => l && setSelectedLayer(l)}
            />
            
            {/* Pedagogical Note below 3D */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#151A20] border border-[#26303D] rounded-xl p-4 flex items-start gap-3">
                <span className="p-2 rounded-lg bg-[#D88746]/10 text-[#D88746] shrink-0 font-mono-tech font-bold">
                  01
                </span>
                <div>
                  <h4 className="font-bold text-[#F4F6F8] mb-1">Âme Cuivre 99.9% Recuit</h4>
                  <p className="text-[#8B949E] leading-relaxed">
                    Minimise l’échauffement par effet Joule et assure une tenue aux surintensités de court-circuit jusqu’à 250°C.
                  </p>
                </div>
              </div>

              <div className="bg-[#151A20] border border-[#26303D] rounded-xl p-4 flex items-start gap-3">
                <span className="p-2 rounded-lg bg-[#276BFF]/10 text-[#276BFF] shrink-0 font-mono-tech font-bold">
                  02
                </span>
                <div>
                  <h4 className="font-bold text-[#F4F6F8] mb-1">Isolation Diélectrique XLPE</h4>
                  <p className="text-[#8B949E] leading-relaxed">
                    Rigidité diélectrique supérieure à 22 kV/mm avec tolérance continue de 90°C permettant un transit de puissance accru.
                  </p>
                </div>
              </div>

              <div className="bg-[#151A20] border border-[#26303D] rounded-xl p-4 flex items-start gap-3">
                <span className="p-2 rounded-lg bg-[#548DFF]/10 text-[#548DFF] shrink-0 font-mono-tech font-bold">
                  03
                </span>
                <div>
                  <h4 className="font-bold text-[#F4F6F8] mb-1">Protection Mécanique & Anti-Choc</h4>
                  <p className="text-[#8B949E] leading-relaxed">
                    Armure en acier et gaine extérieure stabilisée UV protégeant l’intégrité du câble contre l’écrasement et l’abrasion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <CableCrossSection 
            selectedLayerId={selectedLayer.id}
            onSelectLayer={(l) => setSelectedLayer(l)}
          />
        )}

      </div>
    </section>
  );
};
