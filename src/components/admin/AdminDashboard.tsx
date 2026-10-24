import React, { useState, useEffect } from 'react';
import { QuoteRequest, ImportInquiry, CableProduct } from '../../types';
import { PRODUCTS_CATALOG } from '../../data/products';
import { 
  Lock, 
  X, 
  FileText, 
  Container, 
  Boxes, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  RefreshCw, 
  Eye, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'quotes' | 'imports' | 'catalog'>('quotes');
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [imports, setImports] = useState<ImportInquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuoteDetail, setSelectedQuoteDetail] = useState<QuoteRequest | null>(null);

  const loadData = () => {
    try {
      const storedQuotes: QuoteRequest[] = JSON.parse(localStorage.getItem('btc_quotes_db') || '[]');
      const storedImports: ImportInquiry[] = JSON.parse(localStorage.getItem('btc_import_db') || '[]');
      
      // If empty, supply seeded realistic records so admin has immediate data to test
      if (storedQuotes.length === 0) {
        const demoQuotes: QuoteRequest[] = [
          {
            id: 'BTC-DEV-2026-8492',
            createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
            status: 'Analyse technique',
            company: 'Spie Batignolles Énergie',
            contactName: 'Marc Vasseur',
            email: 'm.vasseur@spie.fr',
            phone: '+33 1 45 20 88 12',
            activitySector: 'Installation Électrique / Tertiaire',
            deliveryCity: 'Lyon',
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
              }
            ],
            totalEstimatedLength: 800
          },
          {
            id: 'BTC-DEV-2026-7210',
            createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
            status: 'Devis transmis',
            company: 'Volt Solaire Méditerranée',
            contactName: 'Sarah Khelifi',
            email: 's.khelifi@voltsolaire.fr',
            phone: '+33 4 91 00 22 14',
            activitySector: 'Énergies Renouvelables (Solaire)',
            deliveryCity: 'Aix-en-Provence',
            deliveryCountry: 'France',
            deliveryDateTarget: 'Sous 1 mois',
            siteAccessType: 'Accès semi-remorque avec hayon',
            items: [
              {
                id: '2',
                productId: 'h1z2z2-k',
                productName: 'Câble Solaire Photovoltaïque H1Z2Z2-K 1500V DC',
                codeRef: 'BTC-SOLAR-PV15',
                section: '6',
                cores: 1,
                lengthMeters: 5000,
                packagingPreference: 'Touret 1000m'
              }
            ],
            totalEstimatedLength: 5000
          }
        ];
        setQuotes(demoQuotes);
        localStorage.setItem('btc_quotes_db', JSON.stringify(demoQuotes));
      } else {
        setQuotes(storedQuotes);
      }

      if (storedImports.length === 0) {
        const demoImports: ImportInquiry[] = [
          {
            id: 'BTC-IMP-2026-3190',
            createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
            status: 'Étude sourcing',
            company: 'Afrik Elec Distribution',
            contactName: 'Ibrahim Touré',
            email: 'i.toure@afrikelec.ci',
            phone: '+225 07 00 00 12',
            targetPort: 'Port Autonome d’Abidjan',
            volumeType: 'Conteneur 40ft',
            estimatedTonnageOrMeters: '45 000 mètres',
            requiredCables: 'U-1000 AR2V forte section (4x150mm²) et R2V 3G2.5',
            requiredNorms: 'IEC 60502-1 avec certificats MTC',
            requestedIncoterm: 'CIF',
            targetDate: 'Sous 45 jours'
          }
        ];
        setImports(demoImports);
        localStorage.setItem('btc_import_db', JSON.stringify(demoImports));
      } else {
        setImports(storedImports);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateQuoteStatus = (id: string, newStatus: QuoteRequest['status']) => {
    const updated = quotes.map(q => q.id === id ? { ...q, status: newStatus } : q);
    setQuotes(updated);
    localStorage.setItem('btc_quotes_db', JSON.stringify(updated));
    if (selectedQuoteDetail && selectedQuoteDetail.id === id) {
      setSelectedQuoteDetail({ ...selectedQuoteDetail, status: newStatus });
    }
  };

  const handleUpdateImportStatus = (id: string, newStatus: ImportInquiry['status']) => {
    const updated = imports.map(imp => imp.id === id ? { ...imp, status: newStatus } : imp);
    setImports(updated);
    localStorage.setItem('btc_import_db', JSON.stringify(updated));
  };

  const filteredQuotes = quotes.filter(q => {
    const s = searchQuery.toLowerCase();
    return q.id.toLowerCase().includes(s) || q.company.toLowerCase().includes(s) || q.contactName.toLowerCase().includes(s);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-[#0B0D10] border border-[#26303D] rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#151A20] px-6 py-4 border-b border-[#26303D] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#0B0D10] border border-[#D88746] text-[#D88746]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F4F6F8] font-heading flex items-center gap-2">
                <span>Espace Gestion Interne — BRAIN TRUST CÂBLE</span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#D88746]/20 text-[#D88746]">
                  ADMIN B2B
                </span>
              </h3>
              <p className="text-[11px] text-[#8B949E]">
                Pilotage des demandes de devis, commandes d'approvisionnement et suivi du catalogue.
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

        {/* Tab Controls Bar */}
        <div className="bg-[#0B0D10] px-6 py-3 border-b border-[#26303D] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'quotes'
                  ? 'bg-[#D88746] text-[#0B0D10] font-bold shadow-md'
                  : 'bg-[#151A20] text-[#8B949E] hover:text-[#F4F6F8]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Demandes de Devis ({quotes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('imports')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'imports'
                  ? 'bg-[#276BFF] text-white font-bold shadow-md'
                  : 'bg-[#151A20] text-[#8B949E] hover:text-[#F4F6F8]'
              }`}
            >
              <Container className="w-3.5 h-3.5" />
              <span>Fret Maritime & Gros ({imports.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'catalog'
                  ? 'bg-[#548DFF] text-[#0B0D10] font-bold shadow-md'
                  : 'bg-[#151A20] text-[#8B949E] hover:text-[#F4F6F8]'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Catalogue & Stocks ({PRODUCTS_CATALOG.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              title="Actualiser les données"
              className="p-1.5 rounded-lg bg-[#151A20] border border-[#26303D] text-[#8B949E] hover:text-[#F4F6F8]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: QUOTES */}
          {activeTab === 'quotes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-[#8B949E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filtrer par réf, entreprise, contact..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#151A20] border border-[#26303D] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                  />
                </div>
                <span className="text-xs font-mono-tech text-[#8B949E]">
                  Total métrage demandé : <strong className="text-[#D88746]">{quotes.reduce((acc, q) => acc + q.totalEstimatedLength, 0)} m</strong>
                </span>
              </div>

              {filteredQuotes.length > 0 ? (
                <div className="divide-y divide-[#26303D] bg-[#151A20] border border-[#26303D] rounded-2xl overflow-hidden">
                  {filteredQuotes.map((q) => (
                    <div key={q.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#1C222B] transition-colors">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono-tech font-bold text-[#D88746]">
                            {q.id}
                          </span>
                          <span className="text-[10px] text-[#8B949E]">
                            • {new Date(q.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-[#F4F6F8]">
                          {q.company} <span className="text-xs font-normal text-[#8B949E]">({q.contactName})</span>
                        </div>
                        <div className="text-xs text-[#8B949E] mt-0.5 flex flex-wrap gap-2">
                          <span>{q.deliveryCity} ({q.deliveryCountry})</span>
                          <span>•</span>
                          <span className="text-[#F4F6F8]">{q.items.length} référence(s)</span>
                          <span>•</span>
                          <span className="font-mono-tech text-[#D88746]">{q.totalEstimatedLength} m</span>
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-3">
                        <select
                          value={q.status}
                          onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value as any)}
                          className="bg-[#0B0D10] border border-[#26303D] rounded-xl px-3 py-1.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none font-medium"
                        >
                          <option value="Reçue">Reçue</option>
                          <option value="Analyse technique">Analyse technique</option>
                          <option value="Chiffrage en cours">Chiffrage en cours</option>
                          <option value="Devis transmis">Devis transmis</option>
                          <option value="Validé">Validé</option>
                        </select>

                        <button
                          onClick={() => setSelectedQuoteDetail(q)}
                          className="p-2 rounded-xl bg-[#0B0D10] border border-[#26303D] text-[#8B949E] hover:text-[#F4F6F8]"
                          title="Voir le détail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-xs text-[#8B949E] bg-[#151A20] rounded-2xl border border-[#26303D]">
                  Aucune demande de devis ne correspond aux critères.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: IMPORTS */}
          {activeTab === 'imports' && (
            <div className="space-y-4">
              <div className="divide-y divide-[#26303D] bg-[#151A20] border border-[#26303D] rounded-2xl overflow-hidden">
                {imports.map((imp) => (
                  <div key={imp.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono-tech font-bold text-[#276BFF]">
                          {imp.id}
                        </span>
                        <span className="text-[10px] text-[#8B949E]">
                          • {imp.volumeType} • Incoterm : {imp.requestedIncoterm}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-[#F4F6F8]">
                        {imp.company} <span className="text-xs font-normal text-[#8B949E]">({imp.contactName})</span>
                      </div>
                      <div className="text-xs text-[#8B949E] mt-1">
                        Port de destination : <strong className="text-[#F4F6F8]">{imp.targetPort}</strong> • Volume : {imp.estimatedTonnageOrMeters}
                      </div>
                      <div className="text-xs text-[#8B949E] mt-0.5 italic">
                        Besoins : {imp.requiredCables}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={imp.status}
                        onChange={(e) => handleUpdateImportStatus(imp.id, e.target.value as any)}
                        className="bg-[#0B0D10] border border-[#26303D] rounded-xl px-3 py-1.5 text-xs text-[#F4F6F8] focus:border-[#276BFF] focus:outline-none"
                      >
                        <option value="Nouvelle">Nouvelle</option>
                        <option value="Étude sourcing">Étude sourcing</option>
                        <option value="Offre FOB/CIF formulée">Offre FOB/CIF formulée</option>
                        <option value="Clôturée">Clôturée</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CATALOG INVENTORY */}
          {activeTab === 'catalog' && (
            <div className="space-y-4">
              <div className="divide-y divide-[#26303D] bg-[#151A20] border border-[#26303D] rounded-2xl overflow-hidden">
                {PRODUCTS_CATALOG.map((p) => (
                  <div key={p.id} className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono-tech font-bold text-[#D88746]">
                        {p.codeRef}
                      </div>
                      <div className="text-sm font-bold text-[#F4F6F8]">
                        {p.name}
                      </div>
                      <div className="text-xs text-[#8B949E] mt-0.5">
                        {p.nominalVoltage} • {p.conductorMaterial}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-1 rounded bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 font-medium">
                        {p.availability}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Quote Detail Sub-overlay */}
        {selectedQuoteDetail && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm z-30 p-6 flex items-center justify-center">
            <div className="bg-[#151A20] border border-[#26303D] rounded-2xl p-6 max-w-xl w-full space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#26303D] pb-3">
                <span className="font-mono-tech text-sm font-bold text-[#D88746]">
                  Détail du devis : {selectedQuoteDetail.id}
                </span>
                <button
                  onClick={() => setSelectedQuoteDetail(null)}
                  className="p-1 rounded-lg text-[#8B949E] hover:text-[#F4F6F8]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs space-y-2">
                <div><strong>Société :</strong> {selectedQuoteDetail.company} ({selectedQuoteDetail.contactName})</div>
                <div><strong>Email :</strong> {selectedQuoteDetail.email} | <strong>Tél :</strong> {selectedQuoteDetail.phone}</div>
                <div><strong>Livraison :</strong> {selectedQuoteDetail.deliveryCity}, {selectedQuoteDetail.deliveryCountry}</div>
                <div><strong>Délai :</strong> {selectedQuoteDetail.deliveryDateTarget}</div>
                {selectedQuoteDetail.additionalSpecs && (
                  <div className="bg-[#0B0D10] p-3 rounded-xl border border-[#26303D]">
                    <strong>Note chantier :</strong> {selectedQuoteDetail.additionalSpecs}
                  </div>
                )}
              </div>

              <div className="border-t border-[#26303D] pt-3">
                <h5 className="text-xs font-mono-tech uppercase text-[#8B949E] mb-2">Lignes chiffrées :</h5>
                <div className="space-y-1.5">
                  {selectedQuoteDetail.items.map((it, i) => (
                    <div key={i} className="flex justify-between text-xs bg-[#0B0D10] p-2 rounded-lg">
                      <span>{it.productName} ({it.section}mm² - {it.cores}G)</span>
                      <strong className="text-[#D88746] font-mono-tech">{it.lengthMeters} m</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
