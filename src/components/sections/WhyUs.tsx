import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Boxes, 
  FileCheck, 
  TrendingUp, 
  Headphones, 
  ArrowRight,
  Zap,
  Check
} from 'lucide-react';

export const WhyUs: React.FC<{ onOpenQuote: () => void }> = ({ onOpenQuote }) => {
  const pillars = [
    {
      title: 'Approvisionnement à l’Échelle de Vos Projets',
      desc: 'De la couronne de 100m pour artisans et installateurs jusqu’au conteneur complet de tourets de puissance pour chantiers d’envergure, nous adaptons les unités de livraison à votre planning.',
      icon: Boxes,
      highlight: 'Souplesse de conditionnement'
    },
    {
      title: 'Excellence Technique & Données Documentées',
      desc: 'Aucune approximation sur les caractéristiques. Chaque section, tension d’isolement et classe de réaction au feu (RPC) est rigoureusement attestée par les normes applicables.',
      icon: ShieldCheck,
      highlight: 'Zéro compromis sécurité'
    },
    {
      title: 'Réactivité Commerciale Dédiée aux Professionnels',
      desc: 'Un interlocuteur unique pour vos devis, bordereaux de prix et attestations de conformité. Vos demandes de prix sont chiffrées avec transparence et rapidité.',
      icon: Clock,
      highlight: 'Engagement de chiffrage sous 24h'
    },
    {
      title: 'Maîtrise Logistique & Manutention Spécialisée',
      desc: 'Organisation des transports adaptés aux tourets lourds : camions équipés de hayons élévateurs, calage sécurisé, étiquetage précis et suivi d’acheminement.',
      icon: FileCheck,
      highlight: 'Livraison sécurisée sur site'
    }
  ];

  return (
    <section className="py-24 bg-[#0B0D10] relative border-t border-[#26303D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151A20] border border-[#26303D] mb-3">
            <span className="text-[#D88746]">✦</span>
            <span className="text-[11px] font-mono-tech tracking-wider uppercase text-[#D88746] font-semibold">
              VALEURS & ENGAGEMENTS DE MARQUE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F6F8] font-heading tracking-tight">
            Pourquoi choisir BRAIN TRUST CÂBLE ?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8B949E] leading-relaxed">
            Dans un secteur où l'énergie et la sécurité ne souffrent d'aucun compromis, nous nous positionnons comme votre partenaire technique et logistique de confiance.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-[#151A20] border border-[#26303D] hover:border-[#D88746]/50 rounded-2xl p-6 sm:p-8 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0B0D10] border border-[#26303D] group-hover:border-[#D88746]/60 text-[#D88746] flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-[#0B0D10] text-[#D88746] border border-[#26303D]">
                      {pillar.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#F4F6F8] font-heading group-hover:text-[#D88746] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8B949E] mt-2.5 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#26303D]/60 flex items-center gap-2 text-xs text-[#F4F6F8] font-medium">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span>Procédure vérifiée et appliquée à chaque commande</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partnership Call to Action Banner */}
        <div className="bg-gradient-to-r from-[#151A20] via-[#1E252E] to-[#151A20] border border-[#26303D] rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F8] font-heading">
              Un projet d'électrification ou de réapprovisionnement ?
            </h3>
            <p className="text-sm text-[#8B949E] leading-relaxed">
              Consultez notre équipe commerciale pour étudier vos besoins spécifiques en section, conditionnement et délais de livraison.
            </p>
          </div>

          <button
            onClick={onOpenQuote}
            className="px-8 py-4 rounded-xl bg-[#D88746] hover:bg-[#E69352] text-[#0B0D10] font-bold text-sm font-heading flex items-center gap-2.5 shadow-[0_0_25px_rgba(216,135,70,0.35)] shrink-0 transition-all hover:scale-105"
          >
            <span>Lancer un chiffrage de projet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
