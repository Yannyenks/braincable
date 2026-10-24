import React from 'react';
import { 
  ArrowRight, 
  ChevronDown, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Boxes 
} from 'lucide-react';

interface HeroProps {
  onOpenQuoteConfigurator: () => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuoteConfigurator,
  onExploreCatalog,
}) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-[#0B0D10]"
    >
      {/* 1. Full-bleed Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_cables_bg_1792862213719.jpg"
          alt="Entrepôt industriel de câbles électriques et tourets de cuivre BRAIN TRUST CÂBLE"
          className="w-full h-full object-cover object-center transform scale-105 animate-fade-in"
        />

        {/* Cinematic dark gradients for high contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-black/65 to-black/75" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-[#0B0D10]/90" />
      </div>

      {/* Grid Pattern subtle overlay */}
      <div className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none z-1" />

      {/* 2. Hero Content: Clean, centered title + description */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto pt-32 sm:pt-40 pb-16">
        
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151A20]/90 border border-[#D88746]/40 backdrop-blur-md mb-6 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#D88746] shadow-[0_0_8px_#D88746]" />
          <span className="text-[11px] sm:text-xs font-mono-tech tracking-wider uppercase text-[#F4F6F8] font-bold">
            IMPORTATION • DISTRIBUTION • SOLUTIONS ÉLECTRIQUES
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F4F6F8] leading-[1.12] tracking-tight font-heading max-w-4xl mx-auto drop-shadow-xl">
          La puissance de vos projets commence par le{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D88746] via-[#F09A55] to-[#D88746]">
            bon câble.
          </span>
        </h1>

        {/* Clean, authoritative description */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-[#CBD5E1] leading-relaxed max-w-3xl mx-auto font-normal drop-shadow-md">
          Découvrez des solutions de câblage électrique pensées pour répondre aux exigences des installations résidentielles, commerciales, industrielles et des grands projets de construction.
        </p>

        {/* Functional High-Conversion CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreCatalog}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D88746] hover:bg-[#E69352] text-[#0B0D10] font-bold text-sm font-heading flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(216,135,70,0.45)] hover:shadow-[0_0_40px_rgba(216,135,70,0.65)] transition-all hover:scale-102 active:scale-98"
          >
            <span>Explorer nos câbles</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenQuoteConfigurator}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#151A20]/90 hover:bg-[#1E252E] border border-white/20 hover:border-[#D88746] text-[#F4F6F8] font-bold text-sm font-heading flex items-center justify-center gap-2 backdrop-blur-md transition-all shadow-lg"
          >
            <span>Demander un devis sous 24h</span>
          </button>
        </div>

        {/* Key Guarantees Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#94A3B8] font-mono-tech">
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#D88746]" />
            Cuivre Pur 99.9% Recuit
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#276BFF]" />
            Normes IEC & NF C 32-321
          </span>
          <span className="flex items-center gap-2">
            <Boxes className="w-4 h-4 text-[#10b981]" />
            Stock Dépôt & Tourets Usine
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#F4F6F8]" />
            Chiffrage Express en 24h
          </span>
        </div>

      </div>

      {/* 3. Bottom Micro Scroll Indicator */}
      <div className="relative z-10 flex justify-center items-center pb-8">
        <button 
          onClick={onExploreCatalog}
          className="flex flex-col items-center gap-1.5 text-[11px] font-mono-tech text-[#94A3B8] hover:text-[#D88746] transition-colors focus:outline-none"
        >
          <span>DÉCOUVRIR LE CATALOGUE DE CÂBLES</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#D88746]" />
        </button>
      </div>
    </section>
  );
};
