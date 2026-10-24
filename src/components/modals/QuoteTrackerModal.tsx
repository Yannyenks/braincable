import React, { useState } from 'react';
import { QuoteRequest } from '../../types';
import { 
  X, 
  Search, 
  FileSearch, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Boxes, 
  Calendar,
  Building2,
  FileText
} from 'lucide-react';

interface QuoteTrackerModalProps {
  onClose: () => void;
  initialTrackingId?: string;
}

export const QuoteTrackerModal: React.FC<QuoteTrackerModalProps> = ({
  onClose,
  initialTrackingId = ''
}) => {
  const [searchId, setSearchId] = useState(initialTrackingId);
  const [foundQuote, setFoundQuote] = useState<QuoteRequest | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Demo seeded quote if database is empty so user can immediately test
  const demoSeed: QuoteRequest = {
    id: 'BTC-DEV-2026-8492',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'Analyse technique',
    company: 'Spie Batignolles Énergie',
    contactName: 'Marc Vasseur',
    email: 'm.vasseur@spie.fr',
    phone: '+33 1 45 20 88 12',
    activitySector: 'Installation Électrique / Tertiaire',
    deliveryCity: 'Chantier Lyon Part-Dieu',
    deliveryCountry: 'France',
    deliveryDateTarget: 'Sous 1 à 2 semaines',
    siteAccessType: 'Accès semi-remorque avec hayon',
    items: [
      {
        id: '1',
        productId: 'u-1000-r2v',
        productName: 'Câble U-1000 R2V',
        codeRef: 'BTC-R2V-0610',
        section: '16',
        cores: 4,
        lengthMeters: 800,
        packagingPreference: 'Touret bois 1000m'
      },
      {
        id: '2',
        productId: 'u-1000-rvfv',
        productName: 'Câble U-1000 RVFV Armé Feuillards d’Acier',
        codeRef: 'BTC-RVFV-ARM9',
        section: '50',
        cores: 4,
        lengthMeters: 450,
        packagingPreference: 'Touret bois 500m'
      }
    ],
    totalEstimatedLength: 1250,
    additionalSpecs: 'Tourets consignés, fiches d’essais de rigidité diélectrique requises à la livraison.'
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    if (!query) return;

    setHasSearched(true);

    try {
      const stored: QuoteRequest[] = JSON.parse(localStorage.getItem('btc_quotes_db') || '[]');
      const match = stored.find(q => q.id.toUpperCase() === query);

      if (match) {
        setFoundQuote(match);
      } else if (query.includes('8492') || query === demoSeed.id) {
        setFoundQuote(demoSeed);
      } else if (stored.length > 0) {
        // Return latest submitted if user just wants to see their quote
        setFoundQuote(stored[0]);
      } else {
        setFoundQuote(null);
      }
    } catch {
      setFoundQuote(demoSeed);
    }
  };

  const statusWorkflow = [
    { label: 'Reçue', desc: 'Enregistrée dans le système' },
    { label: 'Analyse technique', desc: 'Vérification des sections & faisabilité' },
    { label: 'Chiffrage en cours', desc: 'Calcul des cours des métaux & remises pro' },
    { label: 'Devis transmis', desc: 'Offre formelle envoyée par e-mail' },
    { label: 'Validé', desc: 'Bon de commande généré' }
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'Reçue': return 0;
      case 'Analyse technique': return 1;
      case 'Chiffrage en cours': return 2;
      case 'Devis transmis': return 3;
      case 'Validé': return 4;
      default: return 1;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0B0D10] border border-[#26303D] rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#151A20] p-6 border-b border-[#26303D] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B0D10] border border-[#276BFF]/40 text-[#276BFF] flex items-center justify-center">
              <FileSearch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F4F6F8] font-heading">
                Suivi en Temps Réel d'une Demande de Devis
              </h3>
              <p className="text-xs text-[#8B949E]">
                Consultez l'avancement de votre chiffrage technique à l'aide de votre référence BTC.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#0B0D10] border border-[#26303D] text-[#8B949E] hover:text-[#F4F6F8]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8B949E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Entrez votre référence (ex : BTC-DEV-2026-8492)..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full bg-[#151A20] border border-[#26303D] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F4F6F8] focus:border-[#276BFF] focus:outline-none font-mono-tech"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#276BFF] hover:bg-[#1C51C4] text-white font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <FileSearch className="w-3.5 h-3.5" />
              <span>Consulter</span>
            </button>
          </form>

          {/* Quick Demo Helper */}
          {!foundQuote && !hasSearched && (
            <div className="bg-[#151A20] border border-[#26303D] rounded-2xl p-4 text-xs text-[#8B949E] flex items-center justify-between">
              <div>
                <span>Vous testez la plateforme ? Utilisez la référence de démonstration : </span>
                <strong className="text-[#D88746] font-mono-tech">BTC-DEV-2026-8492</strong>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchId('BTC-DEV-2026-8492');
                  setFoundQuote(demoSeed);
                  setHasSearched(true);
                }}
                className="px-3 py-1 rounded-lg bg-[#0B0D10] text-[#D88746] border border-[#D88746]/40 text-[11px] font-bold"
              >
                Charger l'exemple
              </button>
            </div>
          )}

          {/* Result view */}
          {foundQuote ? (
            <div className="space-y-6">
              {/* Reference & Badge */}
              <div className="bg-[#151A20] border border-[#26303D] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono-tech text-[#8B949E] uppercase block mb-1">
                    DOSSIER DE CHIFFRAGE N°
                  </span>
                  <div className="text-xl font-mono-tech font-extrabold text-[#D88746]">
                    {foundQuote.id}
                  </div>
                  <div className="text-xs text-[#8B949E] mt-0.5">
                    Émis le {new Date(foundQuote.createdAt).toLocaleDateString('fr-FR')} • {foundQuote.company} ({foundQuote.contactName})
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-[#276BFF]/20 border border-[#276BFF]/40 text-[#548DFF] text-xs font-bold font-mono-tech">
                  Statut : {foundQuote.status}
                </div>
              </div>

              {/* Status Progression Timeline */}
              <div>
                <h4 className="text-xs uppercase font-mono-tech text-[#8B949E] tracking-wider mb-3">
                  PROGRESSION DU DOSSIER :
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {statusWorkflow.map((st, i) => {
                    const currentIdx = getStepIndex(foundQuote.status);
                    const isDone = i <= currentIdx;
                    const isCurrent = i === currentIdx;
                    return (
                      <div 
                        key={i} 
                        className={`p-2.5 rounded-xl border flex flex-col justify-between text-xs transition-colors ${
                          isCurrent
                            ? 'bg-[#D88746]/15 border-[#D88746] text-[#F4F6F8]'
                            : isDone
                            ? 'bg-[#151A20] border-[#276BFF]/40 text-[#276BFF]'
                            : 'bg-[#0B0D10] border-[#26303D] text-[#8B949E]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`w-2 h-2 rounded-full ${
                            isCurrent ? 'bg-[#D88746]' : isDone ? 'bg-[#276BFF]' : 'bg-[#26303D]'
                          }`} />
                          <span className="text-[10px] font-bold font-mono-tech uppercase">Étape {i+1}</span>
                        </div>
                        <span className="font-bold text-[11px] truncate">{st.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="bg-[#151A20] border border-[#26303D] rounded-2xl p-4">
                <span className="text-xs font-mono-tech text-[#8B949E] uppercase block mb-3">
                  RÉFÉRENCES DE CÂBLES SOUMISES ({foundQuote.items.length})
                </span>
                <div className="space-y-2">
                  {foundQuote.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-[#26303D]/60 last:border-0">
                      <div>
                        <span className="font-bold text-[#F4F6F8]">{it.productName}</span>
                        <span className="text-[#8B949E] ml-2 font-mono-tech">{it.section} mm² ({it.cores} cond.)</span>
                      </div>
                      <div className="font-mono-tech font-bold text-[#D88746]">
                        {it.lengthMeters} m
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-[#26303D] flex items-center justify-between text-xs">
                  <span className="text-[#8B949E]">Destination : <strong className="text-[#F4F6F8]">{foundQuote.deliveryCity}</strong></span>
                  <span className="font-mono-tech text-[#D88746]">Cumul : {foundQuote.totalEstimatedLength} m</span>
                </div>
              </div>
            </div>
          ) : hasSearched ? (
            <div className="text-center py-8 text-xs text-[#8B949E] bg-[#151A20] border border-[#26303D] rounded-2xl p-6">
              <AlertCircle className="w-8 h-8 text-[#ef4444] mx-auto mb-2" />
              <div className="text-sm font-bold text-[#F4F6F8]">Référence introuvable</div>
              <p className="mt-1">
                Aucune demande ne correspond au numéro saisi. Vérifiez la graphie (ex : BTC-DEV-2026-XXXX) ou contactez notre bureau d'études au +33 (0)1 89 71 42 00.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
