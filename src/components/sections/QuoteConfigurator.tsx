import React, { useState } from 'react';
import { PRODUCTS_CATALOG, CABLE_CATEGORIES } from '../../data/products';
import { CableProduct, QuoteItem, QuoteRequest } from '../../types';
import { 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Boxes, 
  MapPin, 
  Building2, 
  Send, 
  AlertCircle,
  Copy,
  Clock,
  ShieldCheck,
  Zap,
  X
} from 'lucide-react';

interface QuoteConfiguratorProps {
  quoteItems: QuoteItem[];
  onUpdateQuoteItems: (items: QuoteItem[]) => void;
  onClose?: () => void;
  onQuoteSubmitted?: (quote: QuoteRequest) => void;
}

export const QuoteConfigurator: React.FC<QuoteConfiguratorProps> = ({
  quoteItems,
  onUpdateQuoteItems,
  onClose,
  onQuoteSubmitted
}) => {
  const [step, setStep] = useState<number>(1);
  const [submittedQuote, setSubmittedQuote] = useState<QuoteRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Line item builder temporary state
  const [selectedProduct, setSelectedProduct] = useState<CableProduct>(PRODUCTS_CATALOG[0]);
  const [tempSection, setTempSection] = useState<string>(PRODUCTS_CATALOG[0].availableSections[0] || '2.5');
  const [tempCores, setTempCores] = useState<number>(PRODUCTS_CATALOG[0].coreCounts[0] || 3);
  const [tempLength, setTempLength] = useState<number>(500);
  const [tempPackaging, setTempPackaging] = useState<string>('Touret bois 500m');
  const [tempNotes, setTempNotes] = useState<string>('');

  // Company and contact information
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [activitySector, setActivitySector] = useState('Installation Électrique / Tertiaire');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [deliveryCountry, setDeliveryCountry] = useState('France');
  const [deliveryDateTarget, setDeliveryDateTarget] = useState('Sous 1 à 2 semaines');
  const [siteAccessType, setSiteAccessType] = useState<'Accès semi-remorque avec hayon' | 'Chantier accès restreint' | 'Enlèvement dépôt'>('Accès semi-remorque avec hayon');
  const [additionalSpecs, setAdditionalSpecs] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Add line item to list
  const handleAddLineItem = () => {
    const newItem: QuoteItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      codeRef: selectedProduct.codeRef,
      section: tempSection,
      cores: tempCores,
      lengthMeters: Number(tempLength) || 100,
      packagingPreference: tempPackaging,
      notes: tempNotes
    };

    onUpdateQuoteItems([...quoteItems, newItem]);
    setTempNotes('');
  };

  const handleRemoveItem = (id: string) => {
    onUpdateQuoteItems(quoteItems.filter(item => item.id !== id));
  };

  const totalLength = quoteItems.reduce((acc, curr) => acc + (curr.lengthMeters || 0), 0);

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (quoteItems.length === 0) {
      setErrorMsg('Veuillez ajouter au moins une ligne de câble à votre demande.');
      return;
    }
    if (!company || !contactName || !email || !phone || !deliveryCity) {
      setErrorMsg('Veuillez renseigner les champs obligatoires (Entreprise, Contact, Email, Téléphone, Ville).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Generate authentic enterprise tracking reference
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingRef = `BTC-DEV-2026-${randomSuffix}`;

    const newQuote: QuoteRequest = {
      id: trackingRef,
      createdAt: new Date().toISOString(),
      status: 'Reçue',
      company,
      contactName,
      email,
      phone,
      activitySector,
      deliveryCity,
      deliveryCountry,
      deliveryDateTarget,
      siteAccessType,
      items: quoteItems,
      additionalSpecs,
      totalEstimatedLength: totalLength
    };

    setTimeout(() => {
      // Store in localStorage for real persistence across app sessions
      try {
        const existing = JSON.parse(localStorage.getItem('btc_quotes_db') || '[]');
        localStorage.setItem('btc_quotes_db', JSON.stringify([newQuote, ...existing]));
      } catch (err) {
        console.error('Storage error:', err);
      }

      setIsSubmitting(false);
      setSubmittedQuote(newQuote);
      if (onQuoteSubmitted) {
        onQuoteSubmitted(newQuote);
      }
    }, 800);
  };

  const copyTrackingId = () => {
    if (submittedQuote) {
      navigator.clipboard.writeText(submittedQuote.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // Step indicator titles
  const stepsList = [
    { num: 1, label: 'Lignes de Câbles' },
    { num: 2, label: 'Livraison & Chantier' },
    { num: 3, label: 'Coordonnées Pro' },
    { num: 4, label: 'Récapitulatif' }
  ];

  return (
    <div className="bg-[#0B0D10] text-[#F4F6F8] rounded-3xl border border-[#26303D] shadow-2xl overflow-hidden max-w-4xl mx-auto my-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#151A20] via-[#1C222B] to-[#151A20] p-6 sm:p-8 border-b border-[#26303D] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D88746]" />
            <span className="text-xs font-mono-tech text-[#D88746] font-semibold uppercase tracking-wider">
              CONFIGURATEUR DE CHIFFRAGE PROFESSIONNEL
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#F4F6F8]">
            Demande de Devis sur Mesure
          </h2>
          <p className="text-xs sm:text-sm text-[#8B949E] mt-1">
            Chiffrage rapide pour chantiers, commandes en volume et approvisionnements programmés.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-[#0B0D10] border border-[#26303D] text-[#8B949E] hover:text-[#F4F6F8] hover:border-[#8B949E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Progress Steps Header */}
      {!submittedQuote && (
        <div className="px-6 sm:px-8 py-4 bg-[#151A20]/60 border-b border-[#26303D]">
          <div className="grid grid-cols-4 gap-2">
            {stepsList.map((s) => (
              <div 
                key={s.num} 
                className={`flex flex-col items-center sm:items-start transition-colors ${
                  step === s.num ? 'text-[#D88746]' : step > s.num ? 'text-[#276BFF]' : 'text-[#8B949E]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono-tech ${
                    step === s.num
                      ? 'bg-[#D88746] text-[#0B0D10]'
                      : step > s.num
                      ? 'bg-[#276BFF] text-white'
                      : 'bg-[#26303D] text-[#8B949E]'
                  }`}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold">{s.label}</span>
                </div>
                <div className={`w-full h-1 mt-2 rounded-full ${
                  step >= s.num ? (step === s.num ? 'bg-[#D88746]' : 'bg-[#276BFF]') : 'bg-[#26303D]'
                }`} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submission Success Screen */}
      {submittedQuote ? (
        <div className="p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#10b981]/20 border border-[#10b981] text-[#10b981] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-mono-tech text-[#10b981] uppercase tracking-wider font-semibold">
              DEMANDE DE DEVIS ENREGISTRÉE AVEC SUCCÈS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F8] font-heading mt-1">
              Merci, {submittedQuote.contactName}.
            </h3>
            <p className="text-sm text-[#8B949E] max-w-lg mx-auto mt-2">
              Votre demande a été attribuée à notre bureau d'études techniques pour analyse et établissement de votre proposition de prix.
            </p>
          </div>

          {/* Reference ID Card */}
          <div className="bg-[#151A20] border border-[#26303D] rounded-2xl p-5 max-w-md mx-auto">
            <span className="text-xs text-[#8B949E] font-mono-tech block mb-1">
              NUMÉRO DE RÉFÉRENCE DE SUIVI :
            </span>
            <div className="flex items-center justify-between gap-3 bg-[#0B0D10] p-3 rounded-xl border border-[#D88746]/50">
              <span className="text-base sm:text-lg font-mono-tech font-bold text-[#D88746]">
                {submittedQuote.id}
              </span>
              <button
                onClick={copyTrackingId}
                className="px-3 py-1.5 rounded-lg bg-[#151A20] hover:bg-[#26303D] text-xs font-medium text-[#F4F6F8] flex items-center gap-1.5 transition-colors"
              >
                {copiedId ? <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId ? 'Copié' : 'Copier'}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#8B949E] mt-2">
              Conservez ce numéro pour suivre l’état d’avancement de votre devis ou pour vos échanges téléphoniques avec notre équipe commerciale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-left text-xs">
            <div className="bg-[#151A20] border border-[#26303D] rounded-xl p-3">
              <span className="text-[#8B949E] block text-[10px]">Statut initial :</span>
              <span className="font-bold text-[#276BFF] flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" />
                En attente d'analyse
              </span>
            </div>
            <div className="bg-[#151A20] border border-[#26303D] rounded-xl p-3">
              <span className="text-[#8B949E] block text-[10px]">Articles chiffrés :</span>
              <span className="font-bold text-[#F4F6F8] mt-0.5 block">
                {submittedQuote.items.length} référence(s)
              </span>
            </div>
            <div className="bg-[#151A20] border border-[#26303D] rounded-xl p-3">
              <span className="text-[#8B949E] block text-[10px]">Longueur totale :</span>
              <span className="font-bold text-[#D88746] mt-0.5 block font-mono-tech">
                {submittedQuote.totalEstimatedLength} mètres
              </span>
            </div>
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => {
                setSubmittedQuote(null);
                setStep(1);
                onUpdateQuoteItems([]);
                if (onClose) onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#D88746] hover:bg-[#E69352] text-[#0B0D10] font-bold text-xs font-heading shadow-lg"
            >
              Terminer & Revenir au site
            </button>
          </div>
        </div>
      ) : (
        /* Form Content Steps */
        <div className="p-6 sm:p-8">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-[#ef4444]/15 border border-[#ef4444]/40 text-[#ef4444] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Products and Cable Line Items */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#F4F6F8] font-heading">
                  1. Composition de votre bordereau de câbles
                </h3>
                <p className="text-xs text-[#8B949E] mt-0.5">
                  Ajoutez les références nécessaires à votre installation. Vous pouvez combiner plusieurs types de câbles et sections.
                </p>
              </div>

              {/* Current Items List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-[#8B949E] font-mono-tech">
                  <span>RÉFÉRENCES DANS VOTRE DEVIS ({quoteItems.length})</span>
                  <span>Métrage cumulé : <strong className="text-[#D88746]">{totalLength} m</strong></span>
                </div>

                {quoteItems.length > 0 ? (
                  <div className="divide-y divide-[#26303D] bg-[#151A20] border border-[#26303D] rounded-2xl overflow-hidden">
                    {quoteItems.map((item) => (
                      <div key={item.id} className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#0B0D10] border border-[#D88746]/40 flex items-center justify-center text-[#D88746] font-mono-tech text-xs font-bold">
                            {item.section}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-[#F4F6F8] flex items-center gap-2">
                              <span>{item.productName}</span>
                              <span className="text-[11px] font-mono-tech text-[#8B949E]">({item.codeRef})</span>
                            </div>
                            <div className="text-xs text-[#8B949E] mt-0.5 flex flex-wrap gap-2">
                              <span>Section : <strong className="text-[#F4F6F8]">{item.section} mm²</strong></span>
                              <span>•</span>
                              <span>Conducteurs : <strong className="text-[#F4F6F8]">{item.cores}G / {item.cores}x</strong></span>
                              <span>•</span>
                              <span>Longueur : <strong className="text-[#D88746] font-mono-tech">{item.lengthMeters} m</strong></span>
                              <span>•</span>
                              <span className="text-[#8B949E]">{item.packagingPreference}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-[#8B949E] hover:text-[#ef4444] hover:bg-[#0B0D10] rounded-lg transition-colors"
                          title="Supprimer la ligne"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#151A20]/60 border border-dashed border-[#26303D] rounded-2xl p-6 text-center text-xs text-[#8B949E]">
                    Aucun câble ajouté pour l'instant. Configurez une première référence ci-dessous.
                  </div>
                )}
              </div>

              {/* Add New Line Item Panel */}
              <div className="bg-[#151A20] border border-[#26303D] rounded-2xl p-5 space-y-4">
                <span className="text-xs font-mono-tech uppercase text-[#D88746] font-semibold block">
                  + AJOUTER UNE NOUVELLE RÉFÉRENCE DE CÂBLE :
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Select Product */}
                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-[#8B949E] block mb-1">
                      Type de Câble :
                    </label>
                    <select
                      value={selectedProduct.id}
                      onChange={(e) => {
                        const p = PRODUCTS_CATALOG.find(item => item.id === e.target.value);
                        if (p) {
                          setSelectedProduct(p);
                          setTempSection(p.availableSections[0] || '2.5');
                          setTempCores(p.coreCounts[0] || 3);
                        }
                      }}
                      className="w-full bg-[#0B0D10] border border-[#26303D] rounded-xl px-3 py-2 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                    >
                      {PRODUCTS_CATALOG.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.codeRef})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select Section */}
                  <div>
                    <label className="text-[11px] text-[#8B949E] block mb-1">
                      Section (mm²) :
                    </label>
                    <select
                      value={tempSection}
                      onChange={(e) => setTempSection(e.target.value)}
                      className="w-full bg-[#0B0D10] border border-[#26303D] rounded-xl px-3 py-2 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none font-mono-tech"
                    >
                      {selectedProduct.availableSections.map((s) => (
                        <option key={s} value={s}>{s} mm²</option>
                      ))}
                    </select>
                  </div>

                  {/* Cores */}
                  <div>
                    <label className="text-[11px] text-[#8B949E] block mb-1">
                      Nb de Conducteurs :
                    </label>
                    <select
                      value={tempCores}
                      onChange={(e) => setTempCores(Number(e.target.value))}
                      className="w-full bg-[#0B0D10] border border-[#26303D] rounded-xl px-3 py-2 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none font-mono-tech"
                    >
                      {selectedProduct.coreCounts.map((c) => (
                        <option key={c} value={c}>{c} conducteur{c > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  {/* Length */}
                  <div>
                    <label className="text-[11px] text-[#8B949E] block mb-1">
                      Longueur requise (mètres) :
                    </label>
                    <input
                      type="number"
                      min="10"
                      step="50"
                      value={tempLength}
                      onChange={(e) => setTempLength(Number(e.target.value))}
                      className="w-full bg-[#0B0D10] border border-[#26303D] rounded-xl px-3 py-2 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none font-mono-tech"
                    />
                  </div>

                  {/* Packaging */}
                  <div>
                    <label className="text-[11px] text-[#8B949E] block mb-1">
                      Conditionnement souhaité :
                    </label>
                    <select
                      value={tempPackaging}
                      onChange={(e) => setTempPackaging(e.target.value)}
                      className="w-full bg-[#0B0D10] border border-[#26303D] rounded-xl px-3 py-2 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                    >
                      <option value="Touret bois 500m">Touret bois 500m</option>
                      <option value="Touret bois 1000m">Touret bois 1000m</option>
                      <option value="Couronne 100m">Couronne 100m</option>
                      <option value="Coupe sur mesure à la longueur">Coupe sur mesure</option>
                    </select>
                  </div>

                  {/* Add Button */}
                  <div className="sm:col-span-2 flex items-end">
                    <button
                      type="button"
                      onClick={handleAddLineItem}
                      className="w-full py-2.5 rounded-xl bg-[#26303D] hover:bg-[#D88746] hover:text-[#0B0D10] text-[#F4F6F8] font-bold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter cette référence à la liste</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation button */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  disabled={quoteItems.length === 0}
                  onClick={() => {
                    setErrorMsg('');
                    setStep(2);
                  }}
                  className={`px-6 py-3 rounded-xl font-bold text-xs font-heading flex items-center gap-2 ${
                    quoteItems.length > 0
                      ? 'bg-[#D88746] text-[#0B0D10] shadow-lg hover:bg-[#E69352]'
                      : 'bg-[#26303D] text-[#8B949E] cursor-not-allowed'
                  }`}
                >
                  <span>Continuer : Livraison & Accès</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Delivery & Logistics */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#F4F6F8] font-heading">
                  2. Destination de livraison & Logistique chantier
                </h3>
                <p className="text-xs text-[#8B949E] mt-0.5">
                  Précisez le lieu de dépôt et les contraintes d'accès pour optimiser le transport des tourets de câble.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#8B949E] block mb-1.5 font-medium">
                    Ville ou Port de Déchargement * :
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : Marseille, Le Havre, Lyon, Abidjan, Dakar..."
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="w-full bg-[#151A20] border border-[#26303D] rounded-xl px-4 py-2.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#8B949E] block mb-1.5 font-medium">
                    Pays de Destination * :
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryCountry}
                    onChange={(e) => setDeliveryCountry(e.target.value)}
                    className="w-full bg-[#151A20] border border-[#26303D] rounded-xl px-4 py-2.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#8B949E] block mb-1.5 font-medium">
                    Délai Souhaité sur Chantier :
                  </label>
                  <select
                    value={deliveryDateTarget}
                    onChange={(e) => setDeliveryDateTarget(e.target.value)}
                    className="w-full bg-[#151A20] border border-[#26303D] rounded-xl px-4 py-2.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                  >
                    <option value="Urgent (sous 48h à 72h)">Urgent (sous 48h à 72h - Stock magasin)</option>
                    <option value="Sous 1 à 2 semaines">Sous 1 à 2 semaines</option>
                    <option value="Sous 1 mois">Sous 1 mois (Approvisionnement échelonné)</option>
                    <option value="Projet trimestriel / Conteneur direct usine">Projet trimestriel / Conteneur direct usine</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#8B949E] block mb-1.5 font-medium">
                    Accessibilité & Manutention :
                  </label>
                  <select
                    value={siteAccessType}
                    onChange={(e) => setSiteAccessType(e.target.value as any)}
                    className="w-full bg-[#151A20] border border-[#26303D] rounded-xl px-4 py-2.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                  >
                    <option value="Accès semi-remorque avec hayon">Accès semi-remorque avec hayon élévateur</option>
                    <option value="Chantier accès restreint">Chantier accès restreint (Porteur ou fourgon)</option>
                    <option value="Enlèvement dépôt">Enlèvement direct au dépôt logistique</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-[#8B949E] block mb-1.5 font-medium">
                  Spécifications particulières (Cahier des charges, repérage, tourets consignés...) :
                </label>
                <textarea
                  rows={3}
                  value={additionalSpecs}
                  onChange={(e) => setAdditionalSpecs(e.target.value)}
                  placeholder="Ex : Besoin de certificats d'essais d'usine (MTC), repérage spécifique sur touret, coupure de câble tous les 250m..."
                  className="w-full bg-[#151A20] border border-[#26303D] rounded-xl p-3 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                />
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-[#26303D] text-xs font-semibold text-[#8B949E] hover:text-[#F4F6F8] flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!deliveryCity) {
                      setErrorMsg('Veuillez renseigner la ville de destination.');
                      return;
                    }
                    setErrorMsg('');
                    setStep(3);
                  }}
                  className="px-6 py-3 rounded-xl bg-[#D88746] hover:bg-[#E69352] text-[#0B0D10] font-bold text-xs font-heading flex items-center gap-2 shadow-lg"
                >
                  <span>Continuer : Coordonnées Pro</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Company & Contact Information */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#F4F6F8] font-heading">
                  3. Coordonnées de votre entreprise
                </h3>
                <p className="text-xs text-[#8B949E] mt-0.5">
                  Informations nécessaires à l'établissement du devis formel B2B avec conditions tarifaires professionnelles.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#8B949E] block mb-1.5 font-medium">
                    Raison Sociale de l'Entreprise * :
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : Eiffage Énergie, Spie, BTP Construction..."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-[#151A20] border border-[#26303D] rounded-xl px-4 py-2.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#8B949E] block mb-1.5 font-medium">
                    Secteur d'Activité :
                  </label>
                  <select
                    value={activitySector}
                    onChange={(e) => setActivitySector(e.target.value)}
                    className="w-full bg-[#151A20] border border-[#26303D] rounded-xl px-4 py-2.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                  >
                    <option value="Installation Électrique / Tertiaire">Installation Électrique / Tertiaire</option>
                    <option value="Entreprise Générale BTP">Entreprise Générale BTP</option>
                    <option value="Industrie / Usine de production">Industrie / Usine de production</option>
                    <option value="Distributeur Matériel Électrique">Distributeur Matériel Électrique</option>
                    <option value="Énergies Renouvelables (Solaire)">Énergies Renouvelables (Solaire)</option>
                    <option value="Marché Public / Institutionnel">Marché Public / Institutionnel</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#8B949E] block mb-1.5 font-medium">
                    Nom & Prénom du Responsable * :
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : Jean Dupont"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#151A20] border border-[#26303D] rounded-xl px-4 py-2.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#8B949E] block mb-1.5 font-medium">
                    Adresse E-mail Professionnelle * :
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@entreprise.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#151A20] border border-[#26303D] rounded-xl px-4 py-2.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#8B949E] block mb-1.5 font-medium">
                    Téléphone Direct * :
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+33 6 00 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#151A20] border border-[#26303D] rounded-xl px-4 py-2.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                  />
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-[#26303D] text-xs font-semibold text-[#8B949E] hover:text-[#F4F6F8] flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!company || !contactName || !email || !phone) {
                      setErrorMsg('Veuillez renseigner tous les champs obligatoires.');
                      return;
                    }
                    setErrorMsg('');
                    setStep(4);
                  }}
                  className="px-6 py-3 rounded-xl bg-[#D88746] hover:bg-[#E69352] text-[#0B0D10] font-bold text-xs font-heading flex items-center gap-2 shadow-lg"
                >
                  <span>Vérifier le récapitulatif</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Summary & Final Submission */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#F4F6F8] font-heading">
                  4. Récapitulatif technique et soumission
                </h3>
                <p className="text-xs text-[#8B949E] mt-0.5">
                  Vérifiez l'exactitude des éléments avant envoi à notre équipe commerciale.
                </p>
              </div>

              {/* Items Summary Table */}
              <div className="bg-[#151A20] border border-[#26303D] rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3 border-b border-[#26303D] pb-2 text-xs font-mono-tech text-[#8B949E]">
                  <span>RÉFÉRENCES CÂBLES ({quoteItems.length})</span>
                  <span>MÉTRAGE TOTAL : <strong className="text-[#D88746]">{totalLength} m</strong></span>
                </div>
                <div className="space-y-2">
                  {quoteItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-[#26303D]/40 last:border-0">
                      <div>
                        <span className="font-bold text-[#F4F6F8]">{item.productName}</span>
                        <span className="text-[#8B949E] ml-2">Section {item.section} mm² ({item.cores} cond.)</span>
                      </div>
                      <div className="font-mono-tech font-bold text-[#D88746]">
                        {item.lengthMeters} m
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery and Contact Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#151A20] border border-[#26303D] rounded-2xl p-4 space-y-2">
                  <span className="text-[11px] font-mono-tech uppercase text-[#276BFF] font-semibold block">
                    DESTINATION & LOGISTIQUE
                  </span>
                  <div>
                    <span className="text-[#8B949E]">Lieu :</span>{' '}
                    <span className="text-[#F4F6F8] font-bold">{deliveryCity}, {deliveryCountry}</span>
                  </div>
                  <div>
                    <span className="text-[#8B949E]">Délai cible :</span>{' '}
                    <span className="text-[#F4F6F8]">{deliveryDateTarget}</span>
                  </div>
                  <div>
                    <span className="text-[#8B949E]">Accès :</span>{' '}
                    <span className="text-[#F4F6F8]">{siteAccessType}</span>
                  </div>
                </div>

                <div className="bg-[#151A20] border border-[#26303D] rounded-2xl p-4 space-y-2">
                  <span className="text-[11px] font-mono-tech uppercase text-[#D88746] font-semibold block">
                    DEMANDEUR PROFESSIONNEL
                  </span>
                  <div>
                    <span className="text-[#8B949E]">Entreprise :</span>{' '}
                    <span className="text-[#F4F6F8] font-bold">{company}</span>
                  </div>
                  <div>
                    <span className="text-[#8B949E]">Contact :</span>{' '}
                    <span className="text-[#F4F6F8]">{contactName} ({activitySector})</span>
                  </div>
                  <div>
                    <span className="text-[#8B949E]">Email / Tél :</span>{' '}
                    <span className="text-[#F4F6F8] font-mono-tech">{email} • {phone}</span>
                  </div>
                </div>
              </div>

              {/* Guarantee Notice */}
              <div className="bg-[#0B0D10] border border-[#26303D] rounded-xl p-3.5 flex items-center gap-3 text-xs text-[#8B949E]">
                <ShieldCheck className="w-4 h-4 text-[#276BFF] shrink-0" />
                <span>
                  Engagement BRAIN TRUST CÂBLE : devis formel sous 24h avec fiches de conformité technique et options d'approvisionnement logistique.
                </span>
              </div>

              {/* Final Actions */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 rounded-xl border border-[#26303D] text-xs font-semibold text-[#8B949E] hover:text-[#F4F6F8] flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmitQuote}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D88746] to-[#E69352] text-[#0B0D10] font-bold text-xs font-heading flex items-center gap-2 shadow-[0_0_25px_rgba(216,135,70,0.4)] hover:shadow-[0_0_35px_rgba(216,135,70,0.6)] transition-all"
                >
                  {isSubmitting ? (
                    <span>Transmission sécurisée...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmettre la Demande de Devis</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
