export type CableCategory = 
  | 'energie-puissance'
  | 'industriel-arme'
  | 'souple-chantier'
  | 'tertiaire-residentiel'
  | 'commande-signal'
  | 'mise-a-la-terre'
  | 'solaire-special';

export interface CableProduct {
  id: string;
  name: string;
  codeRef: string;
  category: CableCategory;
  shortDesc: string;
  fullDesc: string;
  conductorMaterial: 'Cuivre Électrolytique Recuit' | 'Aluminium' | 'Cuivre Étamé';
  conductorClass: 'Classe 1 (Massif)' | 'Classe 2 (Câblé)' | 'Classe 5 (Souple)' | 'Classe 6 (Extra-souple)' | string;
  availableSections: string[]; // e.g. ["1.5", "2.5", "4", "6", "10", "16", "25", "35", "50", "70", "95", "120", "150", "185", "240", "300"]
  coreCounts: number[]; // e.g. [1, 2, 3, 4, 5]
  nominalVoltage: string; // e.g. "0.6/1 kV (Um: 1.2 kV)"
  testVoltage: string; // e.g. "3.5 kV AC"
  operatingTemp: string; // e.g. "-25°C à +90°C"
  shortCircuitTemp: string; // e.g. "+250°C (max 5s)"
  insulationType: string; // e.g. "XLPE (Polyéthylène réticulé)" or "PVC"
  outerSheath: string; // e.g. "PVC sans plomb haute résistance UV" or "LSZH (Halogen Free)"
  armorType?: string; // e.g. "Feuillard acier double" or "Fils d'acier galvanisé (SWA)"
  firePerformance: string; // e.g. "Non propagateur de la flamme (NF C 32-070 C2 / IEC 60332-1-2) - CPR Eca"
  applicableNorms: string[]; // e.g. ["NF C 32-321", "IEC 60502-1", "EN 50575"]
  packaging: string[]; // e.g. ["Couronne 100m", "Touret 500m", "Touret 1000m", "Coupe à longueur sur mesure"]
  availability: 'En stock magasin' | 'Approvisionnement sous 48-72h' | 'Conteneur direct usine' | 'Sur commande spéciale';
  applications: string[];
  features: string[];
  datasheetUrl?: string;
  imageUrl?: string;
}

export interface QuoteItem {
  id: string;
  productId: string;
  productName: string;
  codeRef: string;
  section: string;
  cores: number;
  lengthMeters: number;
  packagingPreference: string;
  notes?: string;
}

export interface QuoteRequest {
  id: string;
  createdAt: string;
  status: 'Reçue' | 'Analyse technique' | 'Chiffrage en cours' | 'Devis transmis' | 'Validé';
  company: string;
  contactName: string;
  email: string;
  phone: string;
  activitySector: string;
  deliveryCity: string;
  deliveryCountry: string;
  deliveryDateTarget: string;
  siteAccessType: 'Accès semi-remorque avec hayon' | 'Chantier accès restreint' | 'Enlèvement dépôt';
  items: QuoteItem[];
  additionalSpecs?: string;
  totalEstimatedLength: number;
}

export interface ImportInquiry {
  id: string;
  createdAt: string;
  status: 'Nouvelle' | 'Étude sourcing' | 'Offre FOB/CIF formulée' | 'Clôturée';
  company: string;
  contactName: string;
  email: string;
  phone: string;
  targetPort: string;
  volumeType: 'Conteneur 20ft' | 'Conteneur 40ft' | 'Lot groupage (LCL)' | 'Projet clé en main';
  estimatedTonnageOrMeters: string;
  requiredCables: string;
  requiredNorms: string;
  requestedIncoterm: 'CIF' | 'FOB' | 'DAP' | 'FCA';
  targetDate: string;
  notes?: string;
}

export interface CableLayerAnatomy {
  id: string;
  name: string;
  technicalName: string;
  material: string;
  role: string;
  technicalDetails: {
    property: string;
    value: string;
  }[];
  standardRef: string;
  colorHex: string;
}
