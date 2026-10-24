import React from 'react';
import { CableProduct } from '../../types';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Boxes, 
  Download, 
  Plus, 
  Thermometer, 
  Flame, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface ProductDetailModalProps {
  product: CableProduct | null;
  onClose: () => void;
  onAddToQuote: (product: CableProduct, section?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
}) => {
  if (!product) return null;

  const [selectedSection, setSelectedSection] = React.useState<string>(
    product.availableSections[0] || '1.5'
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl bg-[#0B0D10] border border-[#26303D] rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with copper gradient accent */}
        <div className="relative bg-gradient-to-r from-[#151A20] via-[#1E252E] to-[#151A20] p-6 sm:p-8 border-b border-[#26303D]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono-tech px-2.5 py-1 rounded bg-[#D88746]/20 text-[#D88746] border border-[#D88746]/40 font-semibold">
                  RÉF : {product.codeRef}
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-[#276BFF]/15 text-[#548DFF] border border-[#276BFF]/30 font-medium">
                  {product.nominalVoltage}
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 font-medium">
                  {product.availability}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F8] font-heading">
                {product.name}
              </h2>
              <p className="text-sm text-[#8B949E] mt-1 max-w-2xl">
                {product.shortDesc}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-[#0B0D10] border border-[#26303D] text-[#8B949E] hover:text-[#F4F6F8] hover:border-[#8B949E] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Product Real Image Banner */}
          {product.imageUrl && (
            <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-[#26303D] bg-[#0B0D10]">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 text-xs text-[#F4F6F8] font-mono-tech bg-black/60 px-3 py-1 rounded-lg backdrop-blur-sm">
                Vue produit d'usine • {product.name}
              </div>
            </div>
          )}

          {/* General Description */}
          <div>
            <h3 className="text-xs font-mono-tech uppercase text-[#8B949E] tracking-wider mb-2">
              PRÉSENTATION TECHNIQUE
            </h3>
            <p className="text-sm text-[#F4F6F8]/90 leading-relaxed bg-[#151A20] border border-[#26303D] rounded-2xl p-4">
              {product.fullDesc}
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h3 className="text-xs font-mono-tech uppercase text-[#8B949E] tracking-wider mb-3">
              CARACTÉRISTIQUES ÉLECTRIQUES & MÉCANIQUES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-[#151A20] border border-[#26303D] rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-[#8B949E] text-xs mb-1">
                  <Zap className="w-3.5 h-3.5 text-[#D88746]" />
                  <span>Âme conductrice</span>
                </div>
                <div className="text-sm font-semibold text-[#F4F6F8]">
                  {product.conductorMaterial}
                </div>
                <div className="text-xs text-[#8B949E] font-mono-tech mt-0.5">
                  {product.conductorClass}
                </div>
              </div>

              <div className="bg-[#151A20] border border-[#26303D] rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-[#8B949E] text-xs mb-1">
                  <Layers className="w-3.5 h-3.5 text-[#276BFF]" />
                  <span>Isolation diélectrique</span>
                </div>
                <div className="text-sm font-semibold text-[#F4F6F8]">
                  {product.insulationType}
                </div>
                <div className="text-xs text-[#8B949E] font-mono-tech mt-0.5">
                  Gaine : {product.outerSheath.split(' ')[0]}
                </div>
              </div>

              <div className="bg-[#151A20] border border-[#26303D] rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-[#8B949E] text-xs mb-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>Plage thermique</span>
                </div>
                <div className="text-sm font-semibold text-[#F4F6F8]">
                  {product.operatingTemp}
                </div>
                <div className="text-xs text-[#8B949E] font-mono-tech mt-0.5">
                  Court-circuit : {product.shortCircuitTemp}
                </div>
              </div>

              <div className="bg-[#151A20] border border-[#26303D] rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-[#8B949E] text-xs mb-1">
                  <Flame className="w-3.5 h-3.5 text-[#ef4444]" />
                  <span>Comportement au feu</span>
                </div>
                <div className="text-xs font-semibold text-[#F4F6F8] leading-tight">
                  {product.firePerformance}
                </div>
              </div>

              <div className="bg-[#151A20] border border-[#26303D] rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-[#8B949E] text-xs mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Armure / Blindage</span>
                </div>
                <div className="text-sm font-semibold text-[#F4F6F8]">
                  {product.armorType || 'Non armé (Standard)'}
                </div>
              </div>

              <div className="bg-[#151A20] border border-[#26303D] rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-[#8B949E] text-xs mb-1">
                  <Boxes className="w-3.5 h-3.5 text-[#8B949E]" />
                  <span>Conditionnements</span>
                </div>
                <div className="text-xs font-medium text-[#F4F6F8] truncate">
                  {product.packaging.join(' • ')}
                </div>
              </div>
            </div>
          </div>

          {/* Applicable Norms */}
          <div>
            <h3 className="text-xs font-mono-tech uppercase text-[#8B949E] tracking-wider mb-2">
              NORMES ET CERTIFICATIONS APPLICABLES
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.applicableNorms.map((norm, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-[#151A20] border border-[#26303D] text-xs font-mono-tech text-[#F4F6F8] font-medium flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#276BFF]" />
                  {norm}
                </span>
              ))}
            </div>
          </div>

          {/* Section Selection for Instant Quote Add */}
          <div className="bg-[#151A20] border border-[#26303D] rounded-2xl p-5">
            <h3 className="text-xs font-mono-tech uppercase text-[#D88746] tracking-wider mb-3">
              CHOIX DE SECTION ET AJOUT AU DEVIS :
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.availableSections.map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSection(sec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech font-bold transition-all ${
                    selectedSection === sec
                      ? 'bg-[#D88746] text-[#0B0D10] shadow-md scale-105'
                      : 'bg-[#0B0D10] border border-[#26303D] text-[#8B949E] hover:text-[#F4F6F8] hover:border-[#8B949E]'
                  }`}
                >
                  {sec} mm²
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#26303D]">
              <div className="text-xs text-[#8B949E]">
                Sélection actuelle : <span className="font-bold text-[#F4F6F8]">{product.name} — {selectedSection} mm²</span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    onAddToQuote(product, selectedSection);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#D88746] hover:bg-[#E69352] text-[#0B0D10] font-bold text-xs font-heading flex items-center justify-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insérer dans la demande de devis</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#151A20] px-6 py-4 border-t border-[#26303D] flex items-center justify-between">
          <div className="text-[11px] text-[#8B949E] flex items-center gap-1.5 font-mono-tech">
            <ShieldCheck className="w-3.5 h-3.5 text-[#276BFF]" />
            <span>Données constructeur vérifiées conformes aux fiches d’essais</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0B0D10] border border-[#26303D] text-xs font-medium text-[#8B949E] hover:text-[#F4F6F8] transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
