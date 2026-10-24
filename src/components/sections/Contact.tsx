import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  ShieldCheck,
  Building2,
  FileSpreadsheet
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Demande de renseignements techniques');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 bg-[#0B0D10] relative border-t border-[#26303D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151A20] border border-[#26303D] mb-3">
            <PhoneCall className="w-3.5 h-3.5 text-[#276BFF]" />
            <span className="text-[11px] font-mono-tech tracking-wider uppercase text-[#F4F6F8]">
              ÉCHANGES COMMERCIAUX & TECHNIQUE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F6F8] font-heading tracking-tight">
            Contactez notre équipe spécialisée
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8B949E] leading-relaxed">
            Vous avez un appel d’offres, un bordereau quantitatif à chiffrer ou une question sur la conformité d'une référence ? Nos experts en câblage électrique sont à votre écoute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Logistics Hub */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#151A20] border border-[#26303D] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-[#F4F6F8] font-heading flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#D88746]" />
                <span>Siège Commercial & Dépôt</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#0B0D10] border border-[#26303D] text-[#D88746] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#8B949E] block text-[11px]">Plateforme Logistique & Dépôt :</span>
                    <strong className="text-[#F4F6F8] font-medium block mt-0.5">
                      BRAIN TRUST CÂBLE — Zone Industrielle & Portuaire
                    </strong>
                    <span className="text-[#8B949E] text-xs">Axe logistique distribution nationale & export</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#0B0D10] border border-[#26303D] text-[#276BFF] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#8B949E] block text-[11px]">Courriel Commercial & Devis :</span>
                    <strong className="text-[#F4F6F8] font-mono-tech font-medium block mt-0.5">
                      commercial@braintrustcable.com
                    </strong>
                    <span className="text-[#8B949E] text-xs">Traitement des demandes sous 24h</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#0B0D10] border border-[#26303D] text-[#D88746] shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#8B949E] block text-[11px]">Ligne Directe Professionnels :</span>
                    <strong className="text-[#F4F6F8] font-mono-tech font-medium block mt-0.5">
                      +33 (0)1 89 71 42 00
                    </strong>
                    <span className="text-[#8B949E] text-xs">Du lundi au vendredi de 8h00 à 18h30</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#0B0D10] border border-[#26303D] text-[#10b981] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#8B949E] block text-[11px]">Horaires d'Enlèvement Dépôt :</span>
                    <strong className="text-[#F4F6F8] font-medium block mt-0.5">
                      8h00 - 12h00 / 13h30 - 17h30
                    </strong>
                    <span className="text-[#8B949E] text-xs">Chargement au chariot élévateur sur RDV</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Note about Bill of Quantities */}
            <div className="bg-[#151A20] border border-[#26303D] rounded-2xl p-5 flex items-start gap-3">
              <FileSpreadsheet className="w-5 h-5 text-[#276BFF] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-[#F4F6F8] block mb-1">Transmission de listes Excel ou CCTP</span>
                <span className="text-[#8B949E] leading-relaxed">
                  Pour les appels d'offres complets, vous pouvez également transmettre directement votre bordereau quantitatif par courriel avec vos contraintes de phasage.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact Form */}
          <div className="lg:col-span-7 bg-[#151A20] border border-[#26303D] rounded-3xl p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#10b981]/20 border border-[#10b981] text-[#10b981] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-[#F4F6F8] font-heading">
                  Message Transmis avec Succès
                </h3>
                <p className="text-xs sm:text-sm text-[#8B949E] max-w-md mx-auto">
                  Merci {name}. Votre message a été adressé au service commercial BRAIN TRUST CÂBLE. Un conseiller technique reviendra vers vous sous 24h ouvrées.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#D88746] text-[#0B0D10] font-bold text-xs"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-[#F4F6F8] font-heading mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#276BFF]" />
                  <span>Formulaire de Renseignements Commerciaux</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#8B949E] block mb-1">
                      Votre Nom & Prénom * :
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex : Alexandre Bernard"
                      className="w-full bg-[#0B0D10] border border-[#26303D] rounded-xl px-3.5 py-2.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#8B949E] block mb-1">
                      Entreprise / Raison Sociale :
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ex : Volt Ingénierie"
                      className="w-full bg-[#0B0D10] border border-[#26303D] rounded-xl px-3.5 py-2.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#8B949E] block mb-1">
                      Adresse E-mail Professionnelle * :
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alexandre@volting.fr"
                      className="w-full bg-[#0B0D10] border border-[#26303D] rounded-xl px-3.5 py-2.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#8B949E] block mb-1">
                      Téléphone :
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+33 6 00 00 00 00"
                      className="w-full bg-[#0B0D10] border border-[#26303D] rounded-xl px-3.5 py-2.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#8B949E] block mb-1">
                    Objet de votre demande :
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#0B0D10] border border-[#26303D] rounded-xl px-3.5 py-2.5 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                  >
                    <option value="Demande de renseignements techniques">Demande de renseignements techniques</option>
                    <option value="Question sur les disponibilités de stock">Question sur les disponibilités de stock</option>
                    <option value="Demande d'ouverture de compte professionnel">Demande d'ouverture de compte professionnel</option>
                    <option value="Demande d'importation conteneur complet">Demande d'importation conteneur complet</option>
                    <option value="Autre demande commerciale">Autre demande commerciale</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#8B949E] block mb-1">
                    Votre Message / Spécifications :
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Précisez votre besoin : référence du câble, section souhaitée, métrage approximatif ou contraintes particulières..."
                    className="w-full bg-[#0B0D10] border border-[#26303D] rounded-xl p-3 text-xs text-[#F4F6F8] focus:border-[#D88746] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <span className="text-[11px] text-[#8B949E] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#276BFF]" />
                    <span>Données confidentielles traitées selon le RGPD.</span>
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#D88746] hover:bg-[#E69352] text-[#0B0D10] font-bold text-xs font-heading flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Envoi...' : 'Transmettre mon message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
