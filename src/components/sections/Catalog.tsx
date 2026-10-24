import React, { useState, useMemo } from 'react';
import { PRODUCTS_CATALOG, CABLE_CATEGORIES } from '../../data/products';
import { CableProduct, CableCategory } from '../../types';
import { ProductDetailModal } from '../modals/ProductDetailModal';
import { 
  Search, 
  Filter, 
  Layers, 
  Zap, 
  ShieldCheck, 
  FileText, 
  Plus, 
  Check, 
  Sparkles,
  ArrowRight,
  Boxes,
  HelpCircle,
  Clock,
  Truck,
  Scissors,
  CheckCircle2,
  FileCheck2,
  Eye
} from 'lucide-react';

interface CatalogProps {
  onAddToQuote: (product: CableProduct, section?: string) => void;
  onOpenQuoteConfigurator: () => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  onAddToQuote,
  onOpenQuoteConfigurator
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CableCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<'all' | 'cuivre' | 'aluminium'>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<CableProduct | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [selectedSectionsPerProduct, setSelectedSectionsPerProduct] = useState<Record<string, string>>({});

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (selectedMaterial === 'cuivre' && !product.conductorMaterial.includes('Cuivre')) {
        return false;
      }
      if (selectedMaterial === 'aluminium' && !product.conductorMaterial.includes('Aluminium')) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchRef = product.codeRef.toLowerCase().includes(q);
        const matchDesc = product.shortDesc.toLowerCase().includes(q);
        const matchSections = product.availableSections.some(s => s.includes(q));
        if (!matchName && !matchRef && !matchDesc && !matchSections) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery, selectedMaterial]);

  const handleSelectSection = (productId: string, section: string) => {
    setSelectedSectionsPerProduct(prev => ({
      ...prev,
      [productId]: section
    }));
  };

  const handleQuickAdd = (product: CableProduct) => {
    const chosenSec = selectedSectionsPerProduct[product.id] || product.availableSections[0] || '1.5';
    onAddToQuote(product, chosenSec);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 2000);
  };

  return (
    <section id="catalogue" className="py-20 lg:py-28 bg-[#F4F6F8] text-[#0B0D10] relative transition-colors">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* High Conversion Assurance Strip (White Minéral Accent) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#E2E8F0] mb-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D88746]/10 text-[#D88746] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0B0D10] block">Livraison Direct Chantier</span>
              <span className="text-[11px] text-[#64748B]">Semi-remorques avec hayon</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#276BFF]/10 text-[#276BFF] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0B0D10] block">Devis Garanti sous 24h</span>
              <span className="text-[11px] text-[#64748B]">Chiffrage technique B2B</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 text-[#10b981] flex items-center justify-center shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0B0D10] block">Coupe sur Mesure Gratuite</span>
              <span className="text-[11px] text-[#64748B]">Dès 100m par touret</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D88746]/10 text-[#D88746] flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0B0D10] block">Certificats d’Usine MTC</span>
              <span className="text-[11px] text-[#64748B]">Rigidité diélectrique attestée</span>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#CBD5E1] mb-3 shadow-xs">
              <Boxes className="w-3.5 h-3.5 text-[#D88746]" />
              <span className="text-[11px] font-mono-tech tracking-wider uppercase text-[#D88746] font-bold">
                DISTRIBUTION DIRECTE & APPROVISIONNEMENT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B0D10] font-heading tracking-tight">
              Catalogue Professionnel des Câbles Électriques
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569] leading-relaxed">
              Consultez nos références certifiées basse et moyenne tension. Sélectionnez votre section et ajoutez vos métrages pour générer votre devis officiel sous 24h.
            </p>
          </div>

          <button
            onClick={onOpenQuoteConfigurator}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0B0D10] hover:bg-[#1E252E] text-xs font-bold text-[#F4F6F8] font-heading transition-all shadow-md self-start md:self-auto hover:scale-102"
          >
            <span>Ouvrir le configurateur de devis</span>
            <ArrowRight className="w-4 h-4 text-[#D88746]" />
          </button>
        </div>

        {/* Search and Category Filters on White Mineral Background */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-6 mb-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher par référence, désignation, norme (ex: R2V, AR2V, H07RN-F, 16mm²)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#0B0D10] placeholder-[#94A3B8] focus:outline-none focus:border-[#D88746] transition-colors font-medium"
              />
            </div>

            {/* Conductor Material Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value as any)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs text-[#0B0D10] focus:outline-none focus:border-[#D88746] transition-colors font-medium"
              >
                <option value="all">Tous les conducteurs (Cuivre & Al)</option>
                <option value="cuivre">Conducteurs Cuivre Pur 99.9%</option>
                <option value="aluminium">Conducteurs Aluminium (AR2V)</option>
              </select>
            </div>

            {/* Results count */}
            <div className="md:col-span-3 text-right">
              <span className="text-xs font-mono-tech text-[#64748B]">
                <strong className="text-[#0B0D10] font-bold">{filteredProducts.length}</strong> câble{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-[#F1F5F9] no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#0B0D10] text-[#F4F6F8] shadow-sm font-bold'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0B0D10] border border-[#E2E8F0]'
              }`}
            >
              Tous les Câbles ({PRODUCTS_CATALOG.length})
            </button>

            {CABLE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = PRODUCTS_CATALOG.filter(p => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-[#D88746] border-[#D88746] text-[#0B0D10] shadow-sm font-bold'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#0B0D10]'
                  }`}
                >
                  {cat.label.split('&')[0]} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid with Photos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = recentlyAddedId === product.id;
              const selectedSec = selectedSectionsPerProduct[product.id] || product.availableSections[0] || '1.5';

              return (
                <div
                  key={product.id}
                  className="bg-white border border-[#E2E8F0] hover:border-[#D88746] rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl group"
                >
                  {/* Product Real Image Header */}
                  <div className="relative w-full h-48 bg-[#0B0D10] overflow-hidden">
                    <img
                      src={product.imageUrl || '/src/assets/images/copper_cable_closeup_1792861760859.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />

                    {/* Gradient overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                    {/* Top reference badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[11px] font-mono-tech px-2.5 py-1 rounded-lg bg-[#0B0D10]/90 text-[#D88746] border border-[#D88746]/50 font-bold backdrop-blur-xs">
                        {product.codeRef}
                      </span>
                    </div>

                    {/* Availability pill */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] px-2.5 py-1 rounded-lg bg-[#10b981]/90 text-white font-semibold backdrop-blur-xs flex items-center gap-1 shadow-sm">
                        <Check className="w-3 h-3 font-bold" />
                        {product.availability}
                      </span>
                    </div>

                    {/* Bottom overlay: Voltage badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="font-mono-tech font-semibold bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                        {product.nominalVoltage.split('(')[0]}
                      </span>
                      <button
                        onClick={() => setActiveModalProduct(product)}
                        className="text-[11px] text-white hover:text-[#D88746] flex items-center gap-1 bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-xs transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Zoom détails</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Details Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#0B0D10] font-heading group-hover:text-[#D88746] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
                        {product.shortDesc}
                      </p>

                      {/* Technical Specs Key Values */}
                      <div className="mt-4 pt-3 border-t border-[#F1F5F9] space-y-2 text-xs">
                        <div className="flex items-center justify-between text-[#64748B]">
                          <span>Conducteur :</span>
                          <span className="font-semibold text-[#0B0D10]">{product.conductorMaterial.split(' ')[0]} ({product.conductorClass.split(' ')[0]})</span>
                        </div>

                        <div className="flex items-center justify-between text-[#64748B]">
                          <span>Isolation :</span>
                          <span className="font-semibold text-[#0B0D10]">{product.insulationType.split('(')[0]}</span>
                        </div>

                        <div className="flex items-center justify-between text-[#64748B]">
                          <span>Normes :</span>
                          <span className="font-mono-tech text-[11px] text-[#276BFF] font-semibold">{product.applicableNorms[0]}</span>
                        </div>
                      </div>

                      {/* Quick Section Selector on Card (Conversion Driver) */}
                      <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
                        <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#64748B] mb-2">
                          <span>SECTION (mm²) :</span>
                          <span className="font-bold text-[#D88746]">{selectedSec} mm²</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {product.availableSections.slice(0, 6).map((sec) => (
                            <button
                              key={sec}
                              onClick={() => handleSelectSection(product.id, sec)}
                              className={`text-[11px] font-mono-tech px-2 py-0.5 rounded-lg border transition-all ${
                                selectedSec === sec
                                  ? 'bg-[#D88746] text-[#0B0D10] border-[#D88746] font-bold shadow-xs'
                                  : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
                              }`}
                            >
                              {sec}
                            </button>
                          ))}
                          {product.availableSections.length > 6 && (
                            <button
                              onClick={() => setActiveModalProduct(product)}
                              className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded-lg bg-[#F1F5F9] text-[#64748B] hover:text-[#0B0D10]"
                            >
                              +{product.availableSections.length - 6}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions (High Conversion) */}
                    <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalProduct(product)}
                        className="py-2.5 px-3 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-semibold text-[#0B0D10] flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#276BFF]" />
                        <span>Fiche</span>
                      </button>

                      <button
                        onClick={() => handleQuickAdd(product)}
                        className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs font-heading flex items-center justify-center gap-2 transition-all shadow-sm ${
                          isAdded
                            ? 'bg-[#10b981] text-white'
                            : 'bg-[#D88746] hover:bg-[#E69352] text-[#0B0D10] hover:shadow-md'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 font-bold" />
                            <span>Ajouté au devis !</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 font-bold" />
                            <span>Chiffrer {selectedSec} mm²</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm">
            <HelpCircle className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#0B0D10]">Aucune référence trouvée</h3>
            <p className="text-xs text-[#64748B] mt-1 mb-4">
              Aucun câble ne correspond à vos filtres actuels. Réinitialisez la recherche ou transmettez-nous votre cahier des charges spécifique.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedMaterial('all');
              }}
              className="px-5 py-2 rounded-xl bg-[#0B0D10] text-[#F4F6F8] font-bold text-xs"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

      </div>

      {/* Technical Spec Modal */}
      {activeModalProduct && (
        <ProductDetailModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
          onAddToQuote={onAddToQuote}
        />
      )}
    </section>
  );
};
