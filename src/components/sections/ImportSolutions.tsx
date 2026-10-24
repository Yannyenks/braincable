import React, { useState } from 'react';
import { ImportInquiry } from '../../types';
import { 
  Ship, 
  Container, 
  FileCheck2, 
  Globe2, 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  Clock, 
  Layers, 
  ShieldCheck,
  Building,
  Anchor,
  FileSpreadsheet,
  PhoneCall,
  Check
} from 'lucide-react';

export const ImportSolutions: React.FC = () => {
  const [submittedInquiry, setSubmittedInquiry] = useState<ImportInquiry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetPort, setTargetPort] = useState('');
  const [volumeType, setVolumeType] = useState<'Conteneur 20ft' | 'Conteneur 40ft' | 'Lot groupage (LCL)' | 'Projet clé en main'>('Conteneur 40ft');
  const [estimatedTonnageOrMeters, setEstimatedTonnageOrMeters] = useState('25 000 mètres linéaires');
  const [requiredCables, setRequiredCables] = useState('U-1000 AR2V forte puissance & R2V basse tension');
  const [requiredNorms, setRequiredNorms] = useState('IEC 60502-1 avec certificats d’usine MTC');
  const [requestedIncoterm, setRequestedIncoterm] = useState<'CIF' | 'FOB' | 'DAP' | 'FCA'>('CIF');
  const [targetDate, setTargetDate] = useState('Approvisionnement planifié sous 60 jours');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !contactName || !email || !phone || !targetPort) {
      setFormError('Veuillez renseigner tous les champs obligatoires.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    const newInquiry: ImportInquiry = {
      id: `BTC-IMP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Nouvelle',
      company,
      contactName,
      email,
      phone,
      targetPort,
      volumeType,
      estimatedTonnageOrMeters,
      requiredCables,
      requiredNorms,
      requestedIncoterm,
      targetDate,
      notes
    };

    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('btc_import_db') || '[]');
        localStorage.setItem('btc_import_db', JSON.stringify([newInquiry, ...stored]));
      } catch (err) {
        console.error(err);
      }
      setIsSubmitting(false);
      setSubmittedInquiry(newInquiry);
    }, 700);
  };

  return (
    <section id="importation" className="py-20 lg:py-28 bg-[#F4F6F8] text-[#0B0D10] relative border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#CBD5E1] mb-3 shadow-xs">
            <Anchor className="w-3.5 h-3.5 text-[#276BFF]" />
            <span className="text-[11px] font-mono-tech tracking-wider uppercase text-[#0B0D10] font-bold">
              LOGISTIQUE INTERNATIONALE & GRANDS VOLUMES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B0D10] font-heading tracking-tight">
            Une approche professionnelle de l’approvisionnement électrique.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#475569] leading-relaxed">
            Pour les distributeurs régionaux, promoteurs et grands chantiers d'infrastructure, BRAIN TRUST CÂBLE coordonne l'approvisionnement en conteneurs maritimes directs avec contrôle d'usine et gestion douanière intégrée.
          </p>
        </div>

        {/* Cargo Ship Photo Banner with Live Sourcing KPIs */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl mb-12 border border-[#CBD5E1]">
          <div className="h-72 sm:h-96 w-full relative">
            <img
              src="/src/assets/images/container_cargo_ship_1792861789655.jpg"
              alt="Transport maritime de conteneurs de câbles électriques BRAIN TRUST CÂBLE"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-between text-white">
              <div className="max-w-md">
                <span className="px-3 py-1 rounded-lg bg-[#D88746] text-[#0B0D10] font-mono-tech font-bold text-xs uppercase tracking-wider">
                  FRET MARITIME & USINE DIRECTE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading mt-3 text-white leading-tight">
                  Conteneurs Complets FCL & Dédouanement Portuaire
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 mt-2 leading-relaxed">
                  Expéditions directes vers l’Europe, l’Afrique de l’Ouest et le bassin méditerranéen. Tourets bois certifiés NIMP 15 et emballage maritime renforcé.
                </p>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 max-w-2xl">
                <div>
                  <span className="text-[10px] uppercase font-mono-tech text-[#D88746] block">Capacité FCL :</span>
                  <span className="text-sm font-bold text-white">20ft & 40ft HC</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono-tech text-[#D88746] block">Incoterms :</span>
                  <span className="text-sm font-bold text-white">CIF • FOB • DAP</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono-tech text-[#D88746] block">Contrôle Qualité :</span>
                  <span className="text-sm font-bold text-white">MTC 100% Usine</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono-tech text-[#D88746] block">Délais cotations :</span>
                  <span className="text-sm font-bold text-white">48h ouvrées</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Wholesale & Importation on Crisp Mineral White */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#D88746]/10 text-[#D88746] flex items-center justify-center mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0B0D10] font-heading mb-2">
              Sourcing Usine Direct
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Sélection rigoureuse des unités de production certifiées ISO 9001, avec audit régulier des lignes de tréfilage et d'extrusion.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#276BFF]/10 text-[#276BFF] flex items-center justify-center mb-4">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0B0D10] font-heading mb-2">
              Audits Documentaires & MTC
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Vérification des fiches d’essais de rigidité diélectrique, traction et pureté du cuivre (99.9%) avant tout scellement de conteneur.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#D88746]/10 text-[#D88746] flex items-center justify-center mb-4">
              <Container className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0B0D10] font-heading mb-2">
              Conteneurs Complets (FCL / LCL)
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Optimisation de chargement en tourets bois traités NIMP 15, avec calage renforcé pour le fret maritime international.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#276BFF]/10 text-[#276BFF] flex items-center justify-center mb-4">
              <Ship className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0B0D10] font-heading mb-2">
              Incoterms & Suivi Portuaire
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Maîtrise complète des expéditions maritimes CIF, FOB ou DAP avec émission des connaissements (Bill of Lading) et dédouanement.
            </p>
          </div>
        </div>

        {/* High Conversion Bulk Sourcing Request Form */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-lg">
          {submittedInquiry ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#10b981]/20 border border-[#10b981] text-[#10b981] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-[#0B0D10]">
                Demande d'Approvisionnement Gros Enregistrée
              </h3>
              <p className="text-sm text-[#64748B] max-w-md mx-auto">
                Notre pôle Négoce & Importation Internationale prend en charge votre dossier ({submittedInquiry.id}) pour formuler une offre tarifaire FOB/CIF adaptée à vos volumes.
              </p>
              <div className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl max-w-sm mx-auto text-xs font-mono-tech text-[#D88746] font-bold">
                RÉF IMP : {submittedInquiry.id}
              </div>
              <button
                onClick={() => setSubmittedInquiry(null)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#0B0D10] text-[#F4F6F8] font-bold text-xs"
              >
                Nouvelle demande d'approvisionnement
              </button>
            </div>
          ) : (
            <form onSubmit={handleImportSubmit} className="space-y-6">
              <div className="border-b border-[#F1F5F9] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-[#0B0D10] font-heading flex items-center gap-2">
                    <Container className="w-5 h-5 text-[#D88746]" />
                    <span>Demande d’Approvisionnement en Gros & Fret Maritime</span>
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Réservé aux acheteurs professionnels : distributeurs, entreprises générales, promoteurs et ministères de l'énergie.
                  </p>
                </div>
                <div className="text-xs text-[#10b981] font-semibold flex items-center gap-1.5 bg-[#10b981]/10 px-3 py-1 rounded-full">
                  <Check className="w-3.5 h-3.5 font-bold" />
                  <span>Réponse sous 48h ouvrées</span>
                </div>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-[#ef4444]/15 border border-[#ef4444]/30 text-[#ef4444] text-xs">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-[#475569] block mb-1 font-semibold">
                    Entreprise / Raison Sociale * :
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ex : Groupe Distri Elec International"
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#0B0D10] focus:border-[#D88746] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#475569] block mb-1 font-semibold">
                    Nom du Contact Import * :
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Ex : M. Pierre Martin"
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#0B0D10] focus:border-[#D88746] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#475569] block mb-1 font-semibold">
                    Email Professionnel * :
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="achats@distri-elec.com"
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#0B0D10] focus:border-[#D88746] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#475569] block mb-1 font-semibold">
                    Téléphone Direct * :
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 1 40 00 00 00"
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#0B0D10] focus:border-[#D88746] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#475569] block mb-1 font-semibold">
                    Port ou Ville de Débarquement * :
                  </label>
                  <input
                    type="text"
                    required
                    value={targetPort}
                    onChange={(e) => setTargetPort(e.target.value)}
                    placeholder="Ex : Port de Fos-sur-Mer / Le Havre / Abidjan / Dakar"
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#0B0D10] focus:border-[#D88746] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#475569] block mb-1 font-semibold">
                    Type de Volume / Conditionnement :
                  </label>
                  <select
                    value={volumeType}
                    onChange={(e) => setVolumeType(e.target.value as any)}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#0B0D10] focus:border-[#D88746] focus:outline-none"
                  >
                    <option value="Conteneur 20ft">Conteneur 20 pieds (FCL ~24T max)</option>
                    <option value="Conteneur 40ft">Conteneur 40 pieds High Cube (FCL)</option>
                    <option value="Lot groupage (LCL)">Lot groupage maritime (LCL)</option>
                    <option value="Projet clé en main">Projet clé en main (Plusieurs conteneurs)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#475569] block mb-1 font-semibold">
                    Incoterm Souhaité :
                  </label>
                  <select
                    value={requestedIncoterm}
                    onChange={(e) => setRequestedIncoterm(e.target.value as any)}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#0B0D10] focus:border-[#D88746] focus:outline-none font-mono-tech"
                  >
                    <option value="CIF">CIF - Cost, Insurance and Freight (Port désigné)</option>
                    <option value="FOB">FOB - Free on Board (Port de départ)</option>
                    <option value="DAP">DAP - Delivered at Place (Site de chantier)</option>
                    <option value="FCA">FCA - Free Carrier</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#475569] block mb-1 font-semibold">
                    Volume / Métrage Estimé :
                  </label>
                  <input
                    type="text"
                    value={estimatedTonnageOrMeters}
                    onChange={(e) => setEstimatedTonnageOrMeters(e.target.value)}
                    placeholder="Ex : 25 000 m ou 32 tonnes"
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#0B0D10] focus:border-[#D88746] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#475569] block mb-1 font-semibold">
                    Normes & Spécifications requises :
                  </label>
                  <input
                    type="text"
                    value={requiredNorms}
                    onChange={(e) => setRequiredNorms(e.target.value)}
                    placeholder="Ex : IEC 60502-1, NF C 32-321, CPR Cca"
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#0B0D10] focus:border-[#D88746] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#475569] block mb-1 font-semibold">
                  Câbles recherchés & Spécifications de la commande :
                </label>
                <textarea
                  rows={3}
                  value={requiredCables}
                  onChange={(e) => setRequiredCables(e.target.value)}
                  placeholder="Listez les références, sections (ex : 3x185+95mm²), longueurs unitaires des tourets et exigences d'étanchéité..."
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-3 text-xs text-[#0B0D10] focus:border-[#D88746] focus:outline-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-[11px] text-[#64748B] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#276BFF]" />
                  <span>Cotations basées sur le cours LME officiel du cuivre et aluminium.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D88746] hover:bg-[#E69352] text-[#0B0D10] font-bold text-xs font-heading flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmission...' : 'Envoyer la demande d’approvisionnement'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
