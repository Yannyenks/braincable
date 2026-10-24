import React, { useState } from 'react';
import { 
  Building2, 
  Factory, 
  SunMedium, 
  Truck, 
  Construction, 
  HardHat, 
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Zap
} from 'lucide-react';

interface ApplicationItem {
  id: string;
  title: string;
  categoryBadge: string;
  icon: any;
  tagline: string;
  clientNeeds: string;
  recommendedCables: {
    ref: string;
    name: string;
    reason: string;
  }[];
  quoteChecklist: string[];
}

export const Applications: React.FC<{ onSelectProductRef?: (ref: string) => void }> = ({
  onSelectProductRef
}) => {
  const applications: ApplicationItem[] = [
    {
      id: 'industrie',
      title: 'Infrastructures Industrielles & Usines',
      categoryBadge: 'Haute Sévérité',
      icon: Factory,
      tagline: 'Tenue aux hydrocarbures, chocs mécaniques et service continu 90°C.',
      clientNeeds: 'Alimentation des TGBT, ponts roulants, moteurs haute puissance et fours avec contraintes vibratoires et chimiques sévères.',
      recommendedCables: [
        { ref: 'BTC-RVFV-ARM9', name: 'U-1000 RVFV Armé', reason: 'Protection choc mécanique directe par double feuillard d’acier.' },
        { ref: 'BTC-RNF-FLEX7', name: 'H07RN-F Néoprène', reason: 'Alimentation mobile résistante aux huiles et graisses minérales.' },
        { ref: 'BTC-LIYCY-EMC', name: 'LiYCY Blindé CEM', reason: 'Transmission sans parasite pour automates et variateurs.' }
      ],
      quoteChecklist: [
        'Puissance absorbée (kVA / kW) et cos φ',
        'Mode de pose (caniveau, chemin perforé, tranchée)',
        'Exposition aux hydrocarbures ou solvants'
      ]
    },
    {
      id: 'tertiaire',
      title: 'Bâtiments Tertiaires & ERP',
      categoryBadge: 'Sécurité Incendie',
      icon: Building2,
      tagline: 'Colonnes montantes, distribution divisionnaire et conformité RPC / CPR.',
      clientNeeds: 'Électrification d’immeubles de bureaux, hôpitaux, centres commerciaux et tours tertiaires nécessitant une sécurité incendie rigoureuse.',
      recommendedCables: [
        { ref: 'BTC-R2V-0610', name: 'U-1000 R2V', reason: 'La référence polyvalente pour liaisons TGBT et tableaux d’étage.' },
        { ref: 'BTC-H07VR-BAT', name: 'H07V-U / H07V-R', reason: 'Filerie interne de tableaux et circuits sous conduits encastrés.' }
      ],
      quoteChecklist: [
        'Exigence Euroclasse RPC (Eca, Cca-s1,d1,a1 selon type d’ERP)',
        'Sections calculées avec chute de tension < 3%',
        'Nombre de circuits divisionnaires et longueurs estimées'
      ]
    },
    {
      id: 'solaire',
      title: 'Parcs Solaires & Énergies Renouvelables',
      categoryBadge: '1500V DC / UV',
      icon: SunMedium,
      tagline: 'Liaisons DC strings et évacuation MT/BT vers poste de raccordement.',
      clientNeeds: 'Résistance extrême aux rayonnements UV permanents, amplitudes thermiques de -40°C à +90°C et absence d’oxydation sur 25 ans.',
      recommendedCables: [
        { ref: 'BTC-SOLAR-PV15', name: 'H1Z2Z2-K 1500V DC', reason: 'Cuivre étamé anti-oxydation et isolation réticulée certifiée EN 50618.' },
        { ref: 'BTC-AR2V-AL01', name: 'U-1000 AR2V Aluminium', reason: 'Optimisation économique des fortes sections d’évacuation vers onduleur central.' }
      ],
      quoteChecklist: [
        'Tension maximale de chaîne (1000V ou 1500V DC)',
        'Métrage par string et section (4mm² ou 6mm² préconisés)',
        'Type de connecteurs compatibles (MC4 standard)'
      ]
    },
    {
      id: 'btp-infrastructures',
      title: 'Chantiers BTP & Génie Civil',
      categoryBadge: 'Réseaux & Alimentation Temporaire',
      icon: Construction,
      tagline: 'Robustesse aux passages d’engins, armoires de chantier et enfouissement.',
      clientNeeds: 'Distribution temporaire ou définitive pour bases-vie, grues à tour, éclairage de grands chantiers et réseaux enterrés.',
      recommendedCables: [
        { ref: 'BTC-RNF-FLEX7', name: 'H07RN-F Souple', reason: 'Résistance aux écrasements répétés et imperméabilité AD8.' },
        { ref: 'BTC-CUNU-EARTH', name: 'Cuivre Nu de Terre', reason: 'Boucle de fond de fouille conforme NF C 15-100.' },
        { ref: 'BTC-AR2V-AL01', name: 'AR2V Puissance', reason: 'Alimentation principale économique sur les grandes distances de chantier.' }
      ],
      quoteChecklist: [
        'Intensité de raccordement provisoire Enedis / Transformateur',
        'Type de sol pour le réseau de terre (résistivité en Ω.m)',
        'Conditionnement souhaité (touret bois pour déroulage rapide)'
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState<string>(applications[0].id);
  const currentApp = applications.find(a => a.id === activeTab) || applications[0];

  return (
    <section id="solutions" className="py-24 bg-[#0B0D10] relative border-t border-[#26303D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151A20] border border-[#26303D] mb-3">
            <Zap className="w-3.5 h-3.5 text-[#D88746]" />
            <span className="text-[11px] font-mono-tech tracking-wider uppercase text-[#D88746] font-semibold">
              ENVIRONNEMENTS D'EXPLOITATION
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F6F8] font-heading tracking-tight">
            Des câbles adaptés à chaque exigence de chantier.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8B949E] leading-relaxed">
            Chaque environnement impose des contraintes physiques précises : température, agression chimique, rayonnements ultraviolets ou risques mécaniques.
          </p>
        </div>

        {/* Sector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {applications.map((app) => {
            const Icon = app.icon;
            const isCurrent = activeTab === app.id;
            return (
              <button
                key={app.id}
                onClick={() => setActiveTab(app.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#151A20] border-[#D88746] shadow-[0_0_20px_rgba(216,135,70,0.25)]'
                    : 'bg-[#0B0D10] border-[#26303D] text-[#8B949E] hover:text-[#F4F6F8] hover:border-[#8B949E]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${
                    isCurrent ? 'bg-[#D88746] text-[#0B0D10]' : 'bg-[#151A20] text-[#8B949E]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono-tech px-2 py-0.5 rounded ${
                    isCurrent ? 'bg-[#D88746]/20 text-[#D88746]' : 'bg-[#151A20] text-[#8B949E]'
                  }`}>
                    {app.categoryBadge}
                  </span>
                </div>
                <h3 className={`text-xs sm:text-sm font-bold font-heading ${
                  isCurrent ? 'text-[#F4F6F8]' : 'text-[#8B949E]'
                }`}>
                  {app.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Selected Sector Deep Dive Panel */}
        <div className="bg-[#151A20] border border-[#26303D] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 6 cols: Context & Checklist */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono-tech text-[#D88746] font-semibold uppercase tracking-wider block mb-1">
                  OBJECTIF ET ENJEUX D'INSTALLATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F8] font-heading">
                  {currentApp.title}
                </h3>
                <p className="text-sm text-[#8B949E] mt-2 italic">
                  « {currentApp.tagline} »
                </p>
              </div>

              {/* Photo Asset Callout for Selected Sector */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-[#26303D] bg-[#0B0D10]">
                <img
                  src={
                    activeTab === 'industrie' || activeTab === 'tertiaire'
                      ? '/src/assets/images/electrical_substation_1792861801747.jpg'
                      : '/src/assets/images/cable_drum_yard_1792861775545.jpg'
                  }
                  alt={currentApp.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-black/30 to-transparent" />
                <div className="absolute bottom-2.5 left-3 text-[11px] font-mono-tech text-[#F4F6F8] bg-black/60 px-2.5 py-0.5 rounded backdrop-blur-xs">
                  {activeTab === 'industrie' ? 'Poste de distribution & TGBT industriel' : 'Plateforme logistique & tourets de câbles'}
                </div>
              </div>

              <div className="bg-[#0B0D10] border border-[#26303D] rounded-2xl p-4">
                <h4 className="text-xs font-bold text-[#F4F6F8] uppercase tracking-wider mb-2 font-mono-tech">
                  Analyse du besoin chantier :
                </h4>
                <p className="text-xs sm:text-sm text-[#8B949E] leading-relaxed">
                  {currentApp.clientNeeds}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#F4F6F8] uppercase tracking-wider mb-3 font-mono-tech flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#276BFF]" />
                  <span>Données requises pour le dimensionnement :</span>
                </h4>
                <ul className="space-y-2">
                  {currentApp.quoteChecklist.map((check, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#8B949E]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#276BFF] mt-1.5 shrink-0" />
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 6 cols: Recommended Cables Cards */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono-tech text-[#8B949E] font-semibold uppercase tracking-wider block">
                RÉFÉRENCES CÂBLES RECOMMANDÉES :
              </span>

              <div className="space-y-3">
                {currentApp.recommendedCables.map((cable, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#0B0D10] border border-[#26303D] hover:border-[#D88746]/60 rounded-2xl p-4 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h5 className="text-sm font-bold text-[#F4F6F8] font-heading">
                        {cable.name}
                      </h5>
                      <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#151A20] text-[#D88746] border border-[#26303D]">
                        {cable.ref}
                      </span>
                    </div>
                    <p className="text-xs text-[#8B949E] leading-relaxed mb-3">
                      {cable.reason}
                    </p>
                    <a
                      href="#catalogue"
                      className="text-xs font-semibold text-[#D88746] hover:text-[#E69352] flex items-center gap-1 self-start"
                    >
                      <span>Consulter la fiche dans le catalogue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>

              {/* Engineering Notice */}
              <div className="bg-[#151A20] border border-[#26303D] rounded-xl p-3.5 text-[11px] text-[#8B949E] flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                <span>
                  <strong>Avertissement technique :</strong> Le choix définitif de la section et de l'armure doit être validé par une note de calcul électrique (ex: logiciel Caneco BT ou conforme NF C 15-100) tenant compte des intensités admissibles et chutes de tension réelles.
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
