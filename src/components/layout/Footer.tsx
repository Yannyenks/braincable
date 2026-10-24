import React from 'react';
import { 
  ShieldCheck, 
  Mail, 
  PhoneCall, 
  MapPin, 
  ArrowUp,
  FileText,
  Lock
} from 'lucide-react';
import { CABLE_CATEGORIES } from '../../data/products';

export const Footer: React.FC<{ onOpenAdmin: () => void }> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07090C] border-t border-[#26303D] text-[#8B949E] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#26303D]/60">
          
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#151A20] border border-[#D88746] flex items-center justify-center p-1.5 shadow-[0_0_12px_rgba(216,135,70,0.3)]">
                <div className="w-4 h-4 rounded-full border border-[#D88746] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D88746]" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold tracking-wider text-base text-[#F4F6F8]">
                    BRAIN TRUST
                  </span>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#D88746] text-[#0B0D10] font-mono-tech">
                    CÂBLE
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#8B949E] leading-relaxed max-w-sm">
              Entreprise spécialisée dans l’importation, la commercialisation et la distribution de câbles électriques industriels et tertiaires pour les professionnels du bâtiment, de l’industrie et de l'énergie.
            </p>

            <div className="text-xs text-[#D88746] font-medium italic">
              « L’énergie de vos projets. La confiance de vos installations. »
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono-tech text-[#8B949E]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#276BFF]" />
              <span>Normes CE • IEC 60502-1 • NF C 32-321 • RPC Euroclasses</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase font-mono-tech text-[#F4F6F8] tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="hover:text-[#F4F6F8] transition-colors">Accueil</a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-[#F4F6F8] transition-colors">Catalogue Câbles</a>
              </li>
              <li>
                <a href="#anatomie-3d" className="hover:text-[#F4F6F8] transition-colors">Anatomie & Vue 3D</a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-[#F4F6F8] transition-colors">Solutions & Environnements</a>
              </li>
              <li>
                <a href="#importation" className="hover:text-[#F4F6F8] transition-colors">Import & Gros Volumes</a>
              </li>
              <li>
                <a href="#qualite" className="hover:text-[#F4F6F8] transition-colors">Qualité & Référentiel</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#F4F6F8] transition-colors">Contact Commercial</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Gammes de Câbles */}
          <div>
            <h4 className="text-xs font-bold uppercase font-mono-tech text-[#F4F6F8] tracking-wider mb-4">
              Gammes Distribuées
            </h4>
            <ul className="space-y-2">
              {CABLE_CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <a href="#catalogue" className="hover:text-[#D88746] transition-colors line-clamp-1">
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Commercial */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase font-mono-tech text-[#F4F6F8] tracking-wider mb-4">
              Service Commercial
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#D88746] shrink-0" />
                <span className="text-[#F4F6F8] font-mono-tech">+33 (0)1 89 71 42 00</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#276BFF] shrink-0" />
                <span className="text-[#F4F6F8] font-mono-tech truncate">commercial@braintrustcable.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8B949E] shrink-0 mt-0.5" />
                <span>Plateforme Logistique Europe & Hub Maritime</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] font-mono-tech text-[#8B949E] hover:text-[#D88746] flex items-center gap-1.5 transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Espace gestion interne</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} BRAIN TRUST CÂBLE. Tous droits réservés. Câbles électriques certifiés.
          </div>

          <div className="flex items-center gap-4 text-[#8B949E]">
            <span>Mentions légales & Conformité</span>
            <span>•</span>
            <span>Politique de confidentialité</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#151A20] hover:bg-[#26303D] text-[#F4F6F8] transition-colors flex items-center gap-1"
              title="Retourner en haut de page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Haut</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
