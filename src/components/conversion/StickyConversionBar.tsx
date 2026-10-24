import React, { useState } from 'react';
import { 
  PhoneCall, 
  MessageSquare, 
  FileText, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Zap, 
  Clock, 
  ShieldCheck,
  Send
} from 'lucide-react';
import { QuoteItem } from '../../types';

interface StickyConversionBarProps {
  onOpenQuote: () => void;
  quoteItems: QuoteItem[];
}

export const StickyConversionBar: React.FC<StickyConversionBarProps> = ({
  onOpenQuote,
  quoteItems
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const totalLength = quoteItems.reduce((acc, curr) => acc + (curr.lengthMeters || 0), 0);

  const whatsappMessage = encodeURIComponent(
    `Bonjour BRAIN TRUST CÂBLE, je souhaite un devis professionnel pour des câbles électriques (Projet / Chantier). Merci de me recontacter.`
  );

  return (
    <aside 
      aria-label="Actions rapides et conversion commerciale"
      className={`fixed bottom-0 inset-x-0 z-40 transition-all duration-300 ease-in-out ${
        isMinimized ? 'translate-y-[calc(100%-28px)]' : 'translate-y-0'
      }`}
    >
      {/* Minimize / Expand Tab */}
      <div className="flex justify-center -mb-px">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          aria-expanded={!isMinimized}
          aria-label={isMinimized ? "Déplier la barre de contact rapide" : "Réduire la barre de contact rapide"}
          className="flex items-center gap-1.5 px-4 py-1 rounded-t-xl bg-[#0B0D10] border-t border-x border-[#26303D] text-[11px] font-mono-tech text-[#8B949E] hover:text-[#D88746] transition-colors shadow-lg"
        >
          {isMinimized ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-[#D88746]" />
              <span>Contact direct & Devis express</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Réduire</span>
            </>
          )}
        </button>
      </div>

      {/* Main Glassmorphic Conversion Strip */}
      <div className="bg-[#0B0D10]/95 border-t border-[#26303D] shadow-[0_-10px_35px_rgba(0,0,0,0.7)] backdrop-blur-md px-4 py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left: Commercial Guarantees */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-bold text-[#F4F6F8]">Service Commercial Ouvert</span>
            </div>
            <div className="hidden lg:flex items-center gap-3 text-[11px] text-[#8B949E] border-l border-[#26303D] pl-4">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                Stock direct dépôt
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#276BFF]" />
                Devis garanti sous 24h
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D88746]" />
                Cuivre pur 99.9% certifié
              </span>
            </div>
          </div>

          {/* Right: Direct Conversion CTA Buttons */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            
            {/* Direct Call Button */}
            <a
              href="tel:+33189714200"
              className="px-3.5 py-2 rounded-xl bg-[#151A20] hover:bg-[#1E252E] border border-[#26303D] hover:border-[#D88746]/60 text-xs font-semibold text-[#F4F6F8] flex items-center gap-2 transition-colors shrink-0"
              title="Appeler un conseiller technique"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D88746]" />
              <span className="hidden sm:inline font-mono-tech">+33 1 89 71 42 00</span>
              <span className="sm:hidden">Appeler</span>
            </a>

            {/* Direct WhatsApp B2B */}
            <a
              href={`https://wa.me/33189714200?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#10b981]/15 hover:bg-[#10b981]/25 border border-[#10b981]/40 text-[#10b981] text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
              title="Échanger sur WhatsApp avec notre équipe"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp B2B</span>
            </a>

            {/* Primary Quote Trigger */}
            <button
              onClick={onOpenQuote}
              className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D88746] to-[#E69352] text-[#0B0D10] font-bold text-xs font-heading flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(216,135,70,0.35)] hover:shadow-[0_0_25px_rgba(216,135,70,0.55)] transition-all hover:scale-102 active:scale-98"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>
                {quoteItems.length > 0 
                  ? `Finaliser mon Devis (${quoteItems.length} réf • ${totalLength} m)` 
                  : 'Demander un Devis Express'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>
      </div>
    </aside>
  );
};
