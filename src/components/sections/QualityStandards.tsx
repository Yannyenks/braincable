import React, { useState } from 'react';
import { TECHNICAL_STANDARDS, QUALITY_PILLARS, TechnicalStandard } from '../../data/standards';
import { 
  ShieldCheck, 
  FileCheck2, 
  CheckCircle2, 
  Download, 
  FileText, 
  ExternalLink, 
  ChevronRight,
  BookOpen,
  Award
} from 'lucide-react';

export const QualityStandards: React.FC = () => {
  const [selectedStandard, setSelectedStandard] = useState<TechnicalStandard>(TECHNICAL_STANDARDS[0]);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleSimulateDownload = (title: string) => {
    setDownloadNotice(`Génération du bordereau technique « ${title} » en cours...`);
    setTimeout(() => {
      setDownloadNotice(`Fiche technique officielle prête au téléchargement.`);
      setTimeout(() => setDownloadNotice(null), 3000);
    }, 1200);
  };

  return (
    <section id="qualite" className="py-24 bg-[#0B0D10] relative border-t border-[#26303D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151A20] border border-[#26303D] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#276BFF]" />
            <span className="text-[11px] font-mono-tech tracking-wider uppercase text-[#F4F6F8]">
              CONFORMITÉ, MÉTROLOGIE & NORMES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F6F8] font-heading tracking-tight">
            La confiance se construit sur des caractéristiques vérifiables.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8B949E] leading-relaxed">
            Dans le domaine du câble électrique, la sécurité des installations et la pérennité des biens dépendent du strict respect des seuils physiques, thermiques et diélectriques normalisés.
          </p>
        </div>

        {/* 4 Quality Assurance Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {QUALITY_PILLARS.map((pillar, i) => (
            <div key={i} className="bg-[#151A20] border border-[#26303D] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0B0D10] border border-[#276BFF]/40 text-[#276BFF] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#F4F6F8] font-heading mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#8B949E] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Standards Interactive Explorer */}
        <div className="bg-[#151A20] border border-[#26303D] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="border-b border-[#26303D] pb-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold font-heading text-[#F4F6F8] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#D88746]" />
                <span>Référentiel Normatif International & Européen</span>
              </h3>
              <p className="text-xs text-[#8B949E] mt-1">
                Cadre normatif régissant les caractéristiques de nos câbles d'énergie et industriels.
              </p>
            </div>

            {downloadNotice && (
              <div className="px-3.5 py-1.5 rounded-xl bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981] text-xs font-mono-tech animate-fadeIn">
                {downloadNotice}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Standards Selector List */}
            <div className="lg:col-span-5 space-y-2.5">
              {TECHNICAL_STANDARDS.map((std) => {
                const isSelected = selectedStandard.code === std.code;
                return (
                  <button
                    key={std.code}
                    onClick={() => setSelectedStandard(std)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#0B0D10] border-[#D88746] shadow-md'
                        : 'bg-[#151A20] border-[#26303D] hover:bg-[#1C222B] text-[#8B949E] hover:text-[#F4F6F8]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-mono-tech font-bold text-[#D88746]">
                        {std.code}
                      </div>
                      <div className="text-xs font-bold text-[#F4F6F8] mt-0.5 line-clamp-1">
                        {std.title}
                      </div>
                      <div className="text-[10px] text-[#8B949E] mt-1">
                        {std.organization}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-[#D88746] translate-x-1' : 'text-[#8B949E]'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Standard Detail Box */}
            <div className="lg:col-span-7 bg-[#0B0D10] border border-[#26303D] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#D88746]/15 border border-[#D88746]/30 text-xs font-mono-tech text-[#D88746] font-bold">
                    NORME : {selectedStandard.code}
                  </span>
                  <span className="text-[11px] text-[#8B949E]">
                    {selectedStandard.organization}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-[#F4F6F8] font-heading">
                  {selectedStandard.title}
                </h4>

                <div>
                  <h5 className="text-xs uppercase font-mono-tech text-[#8B949E] tracking-wider mb-2">
                    Champ d'Application :
                  </h5>
                  <p className="text-xs sm:text-sm text-[#F4F6F8]/90 leading-relaxed bg-[#151A20] p-4 rounded-xl border border-[#26303D]">
                    {selectedStandard.scope}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs uppercase font-mono-tech text-[#8B949E] tracking-wider mb-2">
                    Exigences et Essais Imposés :
                  </h5>
                  <div className="space-y-2">
                    {selectedStandard.keyRequirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#8B949E]">
                        <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-[#26303D] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-[#8B949E]">
                  Document technique pour bureaux d'études et contrôleurs techniques.
                </span>
                <button
                  onClick={() => handleSimulateDownload(selectedStandard.code)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#151A20] hover:bg-[#26303D] border border-[#26303D] text-xs font-semibold text-[#F4F6F8] flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#276BFF]" />
                  <span>Télécharger la notice de synthèse</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
