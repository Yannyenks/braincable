import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  FileText, 
  ShieldCheck, 
  Layers, 
  PhoneCall, 
  ArrowRight, 
  Briefcase,
  FileSearch,
  ExternalLink,
  Lock
} from 'lucide-react';

interface HeaderProps {
  onOpenQuoteConfigurator: () => void;
  onOpenTracker: () => void;
  onOpenAdmin: () => void;
  quoteItemsCount?: number;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuoteConfigurator,
  onOpenTracker,
  onOpenAdmin,
  quoteItemsCount = 0,
  activeSection = 'hero'
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Nos Câbles', href: '#catalogue' },
    { label: 'Anatomie 3D', href: '#anatomie-3d' },
    { label: 'Solutions & Projets', href: '#solutions' },
    { label: 'Importation & Gros', href: '#importation' },
    { label: 'Qualité & Normes', href: '#qualite' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0D10]/95 backdrop-blur-md border-b border-[#26303D] py-3.5 shadow-2xl'
            : 'bg-transparent border-b border-white/5 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a 
              href="#hero" 
              className="flex items-center gap-3.5 group focus:outline-none"
            >
              {/* Copper Cable Cross-section Icon */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1C222B] to-[#0E1216] border border-[#D88746]/60 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(216,135,70,0.25)] group-hover:border-[#D88746] transition-all">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full border border-[#D88746] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#D88746]" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#276BFF]" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-extrabold tracking-wider text-lg sm:text-xl text-[#F4F6F8]">
                    BRAIN TRUST
                  </span>
                  <span className="text-xs font-black px-1.5 py-0.5 rounded bg-[#D88746] text-[#0B0D10] font-mono-tech tracking-widest">
                    CÂBLE
                  </span>
                </div>
                <span className="text-[9px] font-mono-tech text-[#8B949E] tracking-widest uppercase">
                  Importation & Distribution Industrielle
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8B949E] hover:text-[#F4F6F8] hover:bg-[#151A20] transition-colors focus:outline-none"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Direct Phone Number */}
              <a
                href="tel:+33189714200"
                className="px-3 py-1.5 rounded-xl text-xs font-mono-tech text-[#8B949E] hover:text-[#D88746] transition-colors flex items-center gap-1.5"
                title="Service commercial direct"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#D88746]" />
                <span className="hidden xl:inline">+33 1 89 71 42 00</span>
              </a>

              {/* Quote Tracker button */}
              <button
                onClick={onOpenTracker}
                title="Suivre une demande de devis"
                className="px-3 py-2 rounded-xl text-xs font-medium text-[#8B949E] hover:text-[#F4F6F8] hover:bg-[#151A20] border border-[#26303D] transition-colors flex items-center gap-1.5"
              >
                <FileSearch className="w-3.5 h-3.5 text-[#276BFF]" />
                <span className="hidden xl:inline">Suivi devis</span>
              </button>

              {/* Demander un Devis Primary CTA */}
              <button
                onClick={onOpenQuoteConfigurator}
                className="relative px-4 py-2 rounded-xl bg-gradient-to-r from-[#D88746] to-[#E69352] text-[#0B0D10] font-bold text-xs font-heading tracking-wide shadow-[0_0_20px_rgba(216,135,70,0.35)] hover:shadow-[0_0_25px_rgba(216,135,70,0.55)] transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Demander un devis</span>
                {quoteItemsCount > 0 ? (
                  <span className="w-5 h-5 rounded-full bg-[#0B0D10] text-[#D88746] text-[10px] font-mono-tech flex items-center justify-center font-bold">
                    {quoteItemsCount}
                  </span>
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Admin toggle icon */}
              <button
                onClick={onOpenAdmin}
                title="Accès Espace Gestion / Administration"
                className="p-2 rounded-xl text-[#8B949E] hover:text-[#F4F6F8] hover:bg-[#151A20] border border-transparent hover:border-[#26303D] transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={onOpenQuoteConfigurator}
                className="px-3 py-1.5 rounded-lg bg-[#D88746] text-[#0B0D10] font-bold text-xs"
              >
                Devis
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-[#151A20] border border-[#26303D] text-[#8B949E] hover:text-[#F4F6F8]"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-[#0B0D10] border-l border-[#26303D] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#26303D]">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-lg text-[#F4F6F8]">
                    BRAIN TRUST
                  </span>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#D88746] text-[#0B0D10]">
                    CÂBLE
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-[#8B949E] hover:text-[#F4F6F8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-[#8B949E] hover:text-[#F4F6F8] hover:bg-[#151A20] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#26303D]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteConfigurator();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D88746] to-[#E69352] text-[#0B0D10] font-bold text-sm font-heading flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Configurer un devis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracker();
                }}
                className="w-full py-2.5 rounded-xl bg-[#151A20] border border-[#26303D] text-[#F4F6F8] text-xs font-medium flex items-center justify-center gap-2"
              >
                <FileSearch className="w-4 h-4 text-[#276BFF]" />
                <span>Consulter le statut d'un devis</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2 rounded-xl text-[#8B949E] hover:text-[#F4F6F8] text-[11px] font-mono-tech flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Administration interne</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
