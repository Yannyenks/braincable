import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Catalog } from './components/sections/Catalog';
import { AnatomyExperience } from './components/sections/AnatomyExperience';
import { Applications } from './components/sections/Applications';
import { ImportSolutions } from './components/sections/ImportSolutions';
import { QualityStandards } from './components/sections/QualityStandards';
import { WhyUs } from './components/sections/WhyUs';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { QuoteConfigurator } from './components/sections/QuoteConfigurator';
import { QuoteTrackerModal } from './components/modals/QuoteTrackerModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StickyConversionBar } from './components/conversion/StickyConversionBar';
import { CableProduct, QuoteItem, QuoteRequest } from './types';
import { FileText, ArrowRight, X, Check, ShieldCheck } from 'lucide-react';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToQuote = (product: CableProduct, section?: string) => {
    const sec = section || product.availableSections[0] || '2.5';
    const newItem: QuoteItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      productId: product.id,
      productName: product.name,
      codeRef: product.codeRef,
      section: sec,
      cores: product.coreCounts[0] || 3,
      lengthMeters: 500,
      packagingPreference: 'Touret bois 500m'
    };

    setQuoteItems(prev => [...prev, newItem]);
    showToast(`« ${product.name} (${sec} mm²) » ajouté au devis`);
  };

  const handleExploreCatalog = () => {
    const el = document.getElementById('catalogue');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F4F6F8] selection:bg-[#D88746] selection:text-[#0B0D10]">
      {/* Top Header */}
      <Header
        onOpenQuoteConfigurator={() => setIsQuoteModalOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        quoteItemsCount={quoteItems.length}
      />

      {/* Main Sections Flow */}
      <main>
        {/* 1. Cinematographic Hero with 3D Cable */}
        <Hero
          onOpenQuoteConfigurator={() => setIsQuoteModalOpen(true)}
          onExploreCatalog={handleExploreCatalog}
        />

        {/* 2. Professional Cable Catalog */}
        <Catalog
          onAddToQuote={handleAddToQuote}
          onOpenQuoteConfigurator={() => setIsQuoteModalOpen(true)}
        />

        {/* 3. Interactive 3D Anatomy Experience */}
        <AnatomyExperience />

        {/* 4. Solutions & Industrial Environments */}
        <Applications />

        {/* 5. Wholesale Importation & Logistics Portal */}
        <ImportSolutions />

        {/* 6. Technical Standards & Quality Compliance */}
        <QualityStandards />

        {/* 7. Why Us Brand Pillars */}
        <WhyUs onOpenQuote={() => setIsQuoteModalOpen(true)} />

        {/* 8. Contact & Depot Logistics */}
        <Contact />
      </main>

      {/* Luxury Industrial Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Persistent Bottom Conversion Bar (WhatsApp, Call, Quote Express) */}
      <StickyConversionBar
        onOpenQuote={() => setIsQuoteModalOpen(true)}
        quoteItems={quoteItems}
      />

      {/* Quote Configurator Modal Overlay */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-4xl">
            <QuoteConfigurator
              quoteItems={quoteItems}
              onUpdateQuoteItems={setQuoteItems}
              onClose={() => setIsQuoteModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Quote Tracker Modal */}
      {isTrackerOpen && (
        <QuoteTrackerModal
          onClose={() => setIsTrackerOpen(false)}
        />
      )}

      {/* Admin Dashboard */}
      {isAdminOpen && (
        <AdminDashboard
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#151A20] border border-[#D88746] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs text-[#F4F6F8] font-medium backdrop-blur-md transition-all">
          <div className="w-5 h-5 rounded-full bg-[#D88746] text-[#0B0D10] flex items-center justify-center font-bold">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
