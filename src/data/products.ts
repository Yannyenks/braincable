import { CableProduct, CableCategory, CableLayerAnatomy } from '../types';

export const CABLE_CATEGORIES: { id: CableCategory; label: string; count: string; icon: string; desc: string }[] = [
  {
    id: 'energie-puissance',
    label: 'Câbles d’Énergie & Puissance BT/MT',
    count: '0.6/1 kV & HTA',
    icon: 'Zap',
    desc: 'Lignes d’alimentation principales, colonnes montantes et réseaux de distribution basse et moyenne tension.'
  },
  {
    id: 'industriel-arme',
    label: 'Câbles Industriels Armés & Blindés',
    count: 'Haute résistance mécanique',
    icon: 'Shield',
    desc: 'Protection renforcée par feuillards d’acier ou fils SWA pour pose directe enterrée sans protection mécanique supplémentaire.'
  },
  {
    id: 'souple-chantier',
    label: 'Câbles Souples Caoutchouc & Chantiers',
    count: 'Usage intensif & mobile',
    icon: 'Activity',
    desc: 'Gaines élastomère polychloroprène (Néoprène) pour machines en mouvement, groupes électrogènes et chantiers sévères.'
  },
  {
    id: 'tertiaire-residentiel',
    label: 'Bâtiment Tertiaire & Résidentiel',
    count: 'Installations fixes',
    icon: 'Building2',
    desc: 'Conducteurs isolés et câbles normalisés pour distribution d’éclairage, prises de courant et colonnes techniques.'
  },
  {
    id: 'solaire-special',
    label: 'Câbles Solaires Photovoltaïques & Spéciaux',
    count: '1500V DC / UV Stable',
    icon: 'SunMedium',
    desc: 'Câbles pour chaînes PV résistant aux températures extrêmes, à l’ozone et aux rayonnements ultraviolets continus.'
  },
  {
    id: 'commande-signal',
    label: 'Contrôle-Commande & Instrumentation',
    count: 'CEM Blindé',
    icon: 'Cpu',
    desc: 'Transmission de signaux de commande, automatismes industriels avec blindage tresse cuivre contre les interférences CEM.'
  },
  {
    id: 'mise-a-la-terre',
    label: 'Conducteurs de Mise à la Terre',
    count: 'Sécurité équipotentielle',
    icon: 'LifeBuoy',
    desc: 'Câbles cuivre nu recuit et conducteurs isolés vert/jaune pour boucles à fond de fouille et liaisons équipotentielles.'
  }
];

export const PRODUCTS_CATALOG: CableProduct[] = [
  {
    id: 'u-1000-r2v',
    name: 'Câble U-1000 R2V',
    codeRef: 'BTC-R2V-0610',
    category: 'energie-puissance',
    imageUrl: '/src/assets/images/copper_cable_closeup_1792861760859.jpg',
    shortDesc: 'Câble industriel rigide d’alimentation basse tension 0.6/1 kV avec isolation XLPE et gaine PVC.',
    fullDesc: 'Le câble U-1000 R2V est la référence incontournable pour les installations industrielles et tertiaires. Conçu pour le transport d’énergie basse tension, il convient aux poses en chemins de câbles, caniveaux, sous conduits ou enterré avec protection mécanique complémentaire.',
    conductorMaterial: 'Cuivre Électrolytique Recuit',
    conductorClass: 'Classe 2 (Câblé)',
    availableSections: ['1.5', '2.5', '4', '6', '10', '16', '25', '35', '50', '70', '95', '120', '150', '185', '240', '300'],
    coreCounts: [1, 2, 3, 4, 5],
    nominalVoltage: '0.6 / 1 kV (Tension max Um: 1.2 kV)',
    testVoltage: '3 500 V AC pendant 5 min',
    operatingTemp: '-25°C à +90°C (service permanent)',
    shortCircuitTemp: '+250°C (durée max 5 secondes)',
    insulationType: 'PR (Polyéthylène réticulé / XLPE)',
    outerSheath: 'PVC spécial résistant aux intempéries et aux UV, couleur noire',
    firePerformance: 'Non propagateur de la flamme selon IEC 60332-1-2 / NF C 32-070 C2 (Euroclasse CPR Eca)',
    applicableNorms: ['NF C 32-321', 'IEC 60502-1', 'EN 50575', 'IEC 60228'],
    packaging: ['Couronne 50m/100m', 'Touret bois 500m', 'Touret bois 1000m', 'Coupe sur mesure à la longueur'],
    availability: 'En stock magasin',
    applications: ['Alimentation principale TGBT', 'Colonnes montantes tertiaires', 'Réseaux d’usines et ateliers', 'Éclairage public'],
    features: [
      'Âme cuivre classe 2 pour une excellente tenue mécanique et facilité de raccordement',
      'Isolation XLPE autorisant une température de service continue de 90°C',
      'Excellente résistance chimique aux huiles et aux agents corrosifs usuels',
      'Repérage des conducteurs normalisé HD 308 S2'
    ]
  },
  {
    id: 'u-1000-ar2v',
    name: 'Câble U-1000 AR2V (Âme Aluminium)',
    codeRef: 'BTC-AR2V-AL01',
    category: 'energie-puissance',
    imageUrl: '/src/assets/images/cable_drum_yard_1792861775545.jpg',
    shortDesc: 'Câble de puissance économique et léger à conducteurs aluminium câblés pour réseaux de forte intensité.',
    fullDesc: 'L’AR2V est la solution idéale pour les longues liaisons et les fortes puissances où le poids et le coût unitaire du cuivre constituent un frein. Utilisé pour les raccordements de postes de transformation et les départs généraux de sites industriels.',
    conductorMaterial: 'Aluminium',
    conductorClass: 'Classe 2 (Câblé)',
    availableSections: ['35', '50', '70', '95', '120', '150', '185', '240', '300'],
    coreCounts: [1, 3, 4],
    nominalVoltage: '0.6 / 1 kV',
    testVoltage: '3 500 V AC',
    operatingTemp: '-20°C à +90°C',
    shortCircuitTemp: '+250°C',
    insulationType: 'XLPE (Polyéthylène réticulé haute rigidité)',
    outerSheath: 'PVC noir traité anti-UV et résistant aux chocs',
    firePerformance: 'IEC 60332-1-2 (CPR Eca)',
    applicableNorms: ['NF C 32-321', 'IEC 60502-1', 'IEC 60228'],
    packaging: ['Touret 500m', 'Touret 1000m'],
    availability: 'En stock magasin',
    applications: ['Sorties de transformateurs HTA/BT', 'Liaisons enterrées sous fourreau', 'Réseaux de parcs industriels', 'Raccordement de parcs solaires'],
    features: [
      'Gain de poids significatif (densité 3 fois inférieure au cuivre)',
      'Optimisation budgétaire sur les chantiers de grandes longueurs',
      'Conducteurs sectoriels pour les fortes sections (réduction de l’encombrement global)'
    ]
  },
  {
    id: 'u-1000-rvfv',
    name: 'Câble U-1000 RVFV Armé Feuillards d’Acier',
    codeRef: 'BTC-RVFV-ARM9',
    category: 'industriel-arme',
    imageUrl: '/src/assets/images/copper_cable_closeup_1792861760859.jpg',
    shortDesc: 'Câble armé à double feuillard d’acier pour enfouissement direct et environnements industriels sévères.',
    fullDesc: 'Câble renforcé conçu pour résister aux agressions mécaniques directes, aux chocs de pelleteuses et aux attaques de rongeurs. Permet la pose directe en tranchée sans fourreau protecteur.',
    conductorMaterial: 'Cuivre Électrolytique Recuit',
    conductorClass: 'Classe 2 (Câblé)',
    availableSections: ['1.5', '2.5', '4', '6', '10', '16', '25', '35', '50', '70', '95', '120', '150', '185', '240'],
    coreCounts: [2, 3, 4, 5],
    nominalVoltage: '0.6 / 1 kV',
    testVoltage: '4 000 V AC',
    operatingTemp: '-25°C à +90°C',
    shortCircuitTemp: '+250°C',
    insulationType: 'XLPE (Polyéthylène réticulé)',
    armorType: 'Double feuillard d’acier zingué enroulé en hélice croisée',
    outerSheath: 'Gaine extérieure PVC renforcée anti-abrasion',
    firePerformance: 'NF C 32-070 C2 / IEC 60332-1-2 (CPR Eca)',
    applicableNorms: ['NF C 32-322', 'IEC 60502-1', 'EN 50575'],
    packaging: ['Touret 500m', 'Touret 1000m', 'Coupe sur mesure'],
    availability: 'En stock magasin',
    applications: ['Pose directe enterrée en tranchée', 'Raffineries et sites pétrochimiques', 'Zones portuaires et aéroportuaires', 'Carrières et cimenteries'],
    features: [
      'Armure en double feuillard d’acier offrant une protection anti-écrasement intégrale',
      'Barrière anti-rongeurs et protection contre les outils tranchants',
      'Dispense de pose sous caniveau préfabriqué ou gaine TPC selon réglementation'
    ]
  },
  {
    id: 'h07rn-f',
    name: 'Câble Souple H07RN-F (Caoutchouc Néoprène)',
    codeRef: 'BTC-RNF-FLEX7',
    category: 'souple-chantier',
    imageUrl: '/src/assets/images/cable_drum_yard_1792861775545.jpg',
    shortDesc: 'Câble extra-souple industriel en élastomère résistant aux huiles, hydrocarbures et contraintes dynamiques.',
    fullDesc: 'Le H07RN-F est le câble de référence pour tous les équipements mobiles industriels et de chantiers extérieurs. Son isolation élastomère et sa gaine en polychloroprène lui confèrent une flexibilité exceptionnelle et une résistance totale aux graisses et intempéries.',
    conductorMaterial: 'Cuivre Électrolytique Recuit',
    conductorClass: 'Classe 5 (Souple)',
    availableSections: ['1.5', '2.5', '4', '6', '10', '16', '25', '35', '50', '70', '95', '120', '150', '185', '240'],
    coreCounts: [1, 2, 3, 4, 5],
    nominalVoltage: '450 / 750 V (Usage fixe jusqu’à 0.6/1 kV)',
    testVoltage: '2 500 V AC',
    operatingTemp: '-25°C à +60°C (mobile), jusqu’à +85°C (en pose fixe protégée)',
    shortCircuitTemp: '+200°C',
    insulationType: 'Caoutchouc synthétique vulcanisé (EPR type EI4)',
    outerSheath: 'Élastomère polychloroprène réticulé résistant aux huiles (type EM2)',
    firePerformance: 'IEC 60332-1-2 / EN 50575 (CPR Eca)',
    applicableNorms: ['EN 50525-2-21', 'IEC 60245-4', 'NF C 32-102-4'],
    packaging: ['Couronne 50m/100m', 'Touret 500m', 'Coupe à longueur'],
    availability: 'En stock magasin',
    applications: ['Armoires mobiles de chantier', 'Groupes électrogènes industriels', 'Ponts roulants et palans', 'Événementiel et installations temporaires'],
    features: [
      'Âme cuivre souple classe 5 supportant les flexions et torsions répétées',
      'Résistance certifiée aux huiles minérales et projections d’hydrocarbures',
      'Étanche à l’immersion temporaire (norme AD8 eau douce)'
    ]
  },
  {
    id: 'h1z2z2-k',
    name: 'Câble Solaire Photovoltaïque H1Z2Z2-K 1500V DC',
    codeRef: 'BTC-SOLAR-PV15',
    category: 'solaire-special',
    imageUrl: '/src/assets/images/copper_cable_closeup_1792861760859.jpg',
    shortDesc: 'Câble monoconducteur solaire certifié TÜV / EN 50618 pour chaînes photovoltaïques jusqu’à 1500V continu.',
    fullDesc: 'Conçu spécifiquement pour les installations solaires toitures et au sol. Résiste aux conditions atmosphériques les plus agressives, avec une durée de vie certifiée de 25 ans à 90°C.',
    conductorMaterial: 'Cuivre Étamé',
    conductorClass: 'Classe 5 (Souple)',
    availableSections: ['4', '6', '10', '16'],
    coreCounts: [1],
    nominalVoltage: '1.5 kV DC (1.0 kV AC)',
    testVoltage: '6 500 V AC pendant 5 min',
    operatingTemp: '-40°C à +90°C (température ambiante max +120°C sur conducteur)',
    shortCircuitTemp: '+250°C',
    insulationType: 'Polyoléfine réticulée sans halogène (LSZH)',
    outerSheath: 'Polyoléfine réticulée traitée anti-UV, couleurs Noir ou Rouge',
    firePerformance: 'Sans halogène, non propagateur de l’incendie (EN 50575 CPR Dca-s2,d2,a1)',
    applicableNorms: ['EN 50618', 'IEC 62930', 'TÜV 2 Pfg 1169/08.2007'],
    packaging: ['Touret 500m', 'Touret 1000m'],
    availability: 'En stock magasin',
    applications: ['Centrales photovoltaïques au sol', 'Ombrières de parking solaires', 'Toitures solaires tertiaires et résidentielles', 'Liaisons strings vers onduleurs'],
    features: [
      'Cuivre électrolytique étamé anticorrosion pour une durabilité maximale des connexions MC4',
      'Résistance certifiée aux UV, à l’ozone et aux acides/alcalis',
      'Émission de fumées quasi-nulle et sans gaz toxiques en cas d’incendie'
    ]
  },
  {
    id: 'h07v-u-r',
    name: 'Fils & Conducteurs Bâtiment H07V-U / H07V-R',
    codeRef: 'BTC-H07VR-BAT',
    category: 'tertiaire-residentiel',
    imageUrl: '/src/assets/images/copper_cable_closeup_1792861760859.jpg',
    shortDesc: 'Conducteurs isolés rigides en cuivre pour filerie de tableaux et circuits encastrés sous conduit.',
    fullDesc: 'Fils isolés en PVC standard pour le câblage interne des armoires électriques, tableaux divisionnaires et distribution sous gaine ICTA dans les habitations et bâtiments tertiaires.',
    conductorMaterial: 'Cuivre Électrolytique Recuit',
    conductorClass: 'Classe 1 (Massif) de 1.5 à 4mm² / Classe 2 (Câblé) dès 6mm²',
    availableSections: ['1.5', '2.5', '4', '6', '10', '16', '25', '35'],
    coreCounts: [1],
    nominalVoltage: '450 / 750 V',
    testVoltage: '2 500 V AC',
    operatingTemp: '-5°C à +70°C',
    shortCircuitTemp: '+160°C',
    insulationType: 'PVC haute glisse (facilité de tirage)',
    outerSheath: 'Monoconducteur sans gaine externe',
    firePerformance: 'IEC 60332-1-2 (CPR Eca)',
    applicableNorms: ['NF C 32-201-3', 'EN 50525-2-31', 'IEC 60227-3'],
    packaging: ['Boîte dévidoir 100m', 'Couronne 100m', 'Touret 500m'],
    availability: 'En stock magasin',
    applications: ['Câblage interne de tableaux électriques', 'Alimentation prises et éclairage sous gaine', 'Gaines techniques de logements'],
    features: [
      'Glisse facilitée réduisant l’effort de tirage dans les gaines ondulées',
      'Gamme complète de coloris : Bleu, Rouge, Noir, Marron, Blanc, Vert/Jaune, Orange',
      'Dénudage net et rapide sans déchirure'
    ]
  },
  {
    id: 'liycy-blindage',
    name: 'Câble de Commande & Données LiYCY Blindé',
    codeRef: 'BTC-LIYCY-EMC',
    category: 'commande-signal',
    imageUrl: '/src/assets/images/electrical_substation_1792861801747.jpg',
    shortDesc: 'Câble souple multiconducteurs avec tresse en cuivre étamé pour signaux insensibles aux parasites CEM.',
    fullDesc: 'Le câble blindé LiYCY assure la transmission sans distorsion des signaux analogiques et numériques dans les environnements industriels perturbés par les variateurs de fréquence et moteurs électriques.',
    conductorMaterial: 'Cuivre Étamé',
    conductorClass: 'Classe 5 (Souple)',
    availableSections: ['0.5', '0.75', '1.0', '1.5', '2.5'],
    coreCounts: [2, 3, 4, 7, 12, 18, 25],
    nominalVoltage: '300 / 500 V',
    testVoltage: '1 500 V AC',
    operatingTemp: '-30°C à +70°C',
    shortCircuitTemp: '+150°C',
    insulationType: 'PVC spécial isolation diélectrique fine',
    armorType: 'Tresse en cuivre étamé assurant un blindage à 85% de couverture CEM',
    outerSheath: 'PVC gris technique résistant aux frottements',
    firePerformance: 'IEC 60332-1-2',
    applicableNorms: ['VDE 0812', 'EN 50575'],
    packaging: ['Couronne 100m', 'Touret 500m'],
    availability: 'Approvisionnement sous 48-72h',
    applications: ['Armoires d’automates programmables (PLC)', 'Variateurs de vitesse industriels', 'Capteurs de mesure et instrumentation', 'Réseaux de téléreport'],
    features: [
      'Excellente atténuation des bruits électromagnétiques et rayonnements parasites',
      'Faible diamètre extérieur pour intégration dans les goulottes de tableau denses',
      'Repérage des conducteurs par code couleur DIN 47100'
    ]
  },
  {
    id: 'cuivre-nu-terre',
    name: 'Câble Cuivre Nu Recuit pour Mise à la Terre',
    codeRef: 'BTC-CUNU-EARTH',
    category: 'mise-a-la-terre',
    imageUrl: '/src/assets/images/copper_cable_closeup_1792861760859.jpg',
    shortDesc: 'Conducteur nu câblé en cuivre pur à 99.9% pour réseau de terre et boucle à fond de fouille.',
    fullDesc: 'Indispensable pour l’évacuation des courants de fuite et la protection foudre. Posé directement au fond de fouille des fondations ou le long des tranchées pour constituer la prise de terre du bâtiment.',
    conductorMaterial: 'Cuivre Électrolytique Recuit',
    conductorClass: 'Classe 2 (Câblé)',
    availableSections: ['25', '29', '35', '50', '75', '95'],
    coreCounts: [1],
    nominalVoltage: 'Mise à la terre (Equipotentiel)',
    testVoltage: 'Non applicable',
    operatingTemp: '-40°C à +120°C',
    shortCircuitTemp: '+250°C',
    insulationType: 'Aucune (Cuivre nu recuit étiré)',
    outerSheath: 'Aucune',
    firePerformance: 'Incombustible (Métal pur)',
    applicableNorms: ['NF C 15-100', 'IEC 60228', 'EN 50164-2'],
    packaging: ['Couronne 25m/50m', 'Touret bois 500m'],
    availability: 'En stock magasin',
    applications: ['Boucle à fond de fouille des bâtiments', 'Réseau de terre des postes de transformation', 'Protection parafoudre et paratonnerre'],
    features: [
      'Pureté du cuivre garantie > 99.95% pour une conductivité maximale',
      'Excellente résistance à la corrosion tellurique en sol naturel',
      'Conforme aux règles strictes de la NF C 15-100'
    ]
  }
];

export const CABLE_LAYERS_ANATOMY: CableLayerAnatomy[] = [
  {
    id: 'layer-conductor',
    name: 'Conducteur Cuivre Électrolytique',
    technicalName: 'Âme Conductrice Cuivre Classe 2 (Cu-ETP 99.99%)',
    material: 'Cuivre électrolytique recuit (Conductivité 100% IACS, 58 MS/m)',
    role: 'Transporte le flux électrique avec un échauffement par effet Joule minimal.',
    colorHex: '#D88746',
    standardRef: 'IEC 60228 / NF EN 60228',
    technicalDetails: [
      { property: 'Résistivité max à 20°C', value: '0.017241 Ω.mm²/m' },
      { property: 'Température max admissible', value: '90°C permanent / 250°C court-circuit' },
      { property: 'Configuration brins', value: '7 à 37 brins câblés concentriques' },
      { property: 'Densité nominale', value: '8.89 g/cm³' }
    ]
  },
  {
    id: 'layer-insulation',
    name: 'Isolation Primaire XLPE',
    technicalName: 'Polyéthylène Réticulé Diélectrique (XLPE / PR)',
    material: 'Polymère réticulé par liaisons covalentes silane ou péroxyde',
    role: 'Empêche la fuite de courant entre phases et vers la terre tout en tolérant 90°C en continu.',
    colorHex: '#276BFF',
    standardRef: 'IEC 60502-1 Section 4.2',
    technicalDetails: [
      { property: 'Rigidité diélectrique', value: '> 22 kV / mm' },
      { property: 'Constante diélectrique (εr)', value: '2.3 à 50 Hz' },
      { property: 'Tenue thermique continue', value: '90°C (contre 70°C pour le PVC)' },
      { property: 'Repérage', value: 'Code couleur unifié HD 308 S2' }
    ]
  },
  {
    id: 'layer-bedding',
    name: 'Bourrage & Matrice Interne',
    technicalName: 'Matrice de Remplissage Extrudée Élastomère',
    material: 'Composé thermoplastique extrudé à faible émission de fumée',
    role: 'Assure la géométrie parfaitement cylindrique du câble et absorbe les dilatations thermiques.',
    colorHex: '#353F4D',
    standardRef: 'IEC 60502-1 Section 7',
    technicalDetails: [
      { property: 'Fonction géométrique', value: 'Comblement des interstices inter-conducteurs' },
      { property: 'Comportement mécanique', value: 'Amortissement des contraintes de flexion' },
      { property: 'Épaisseur nominale', value: '1.0 à 1.4 mm' },
      { property: 'Dureté Shore A', value: '75 ± 5' }
    ]
  },
  {
    id: 'layer-screen',
    name: 'Blindage Électrostatique / Écran Cuivre',
    technicalName: 'Écran Métallique Rubané / Tresse Cuivre',
    material: 'Ruban cuivre hélicoïdal ou fils de cuivre étamé tressés',
    role: 'Confinement du champ électrique radial et évacuation des courants de court-circuit capacitifs.',
    colorHex: '#B26E35',
    standardRef: 'IEC 60502-1 Section 8',
    technicalDetails: [
      { property: 'Taux de couverture CEM', value: '> 85% à 100%' },
      { property: 'Atténuation des interférences', value: '> 60 dB jusqu’à 100 MHz' },
      { property: 'Rôle de sécurité', value: 'Maintien au potentiel de terre (protection contacts indirects)' },
      { property: 'Continuité de terre', value: 'Section équivalente normalisée' }
    ]
  },
  {
    id: 'layer-armor',
    name: 'Armure Métallique de Protection (SWA / DSTA)',
    technicalName: 'Armure Double Feuillard Acier ou Fils d’Acier Galvanisé',
    material: 'Acier doux galvanisé à chaud à haute limite élastique',
    role: 'Protège le câble contre les chocs mécaniques, le poinçonnement et les attaques de rongeurs.',
    colorHex: '#8B949E',
    standardRef: 'NF C 32-322 / IEC 60502-1 Section 12',
    technicalDetails: [
      { property: 'Résistance à la traction', value: '> 400 N/mm²' },
      { property: 'Résistance au choc (IK)', value: 'IK 10 (20 Joules direct)' },
      { property: 'Protection anticorrosion', value: 'Galvanisation classe B selon EN 10244-2' },
      { property: 'Option amagnétique', value: 'Fils d’aluminium sur câbles monoconducteurs' }
    ]
  },
  {
    id: 'layer-sheath',
    name: 'Gaine Extérieure de Protection',
    technicalName: 'Enveloppe Protectrice PVC Spécial ou LSZH sans halogène',
    material: 'Polychlorure de vinyle stabilisé aux UV ou polyoléfine ignifugée',
    role: 'Barrière externe étanche contre l’eau, les UV, l’ozone, les hydrocarbures et l’abrasion.',
    colorHex: '#151A20',
    standardRef: 'IEC 60502-1 Section 13 / NF C 32-070 C2',
    technicalDetails: [
      { property: 'Tenue aux UV', value: 'Conforme test de vieillissement accéléré ISO 4892' },
      { property: 'Comportement au feu', value: 'Non-propagateur (C2 / CPR Euroclasse Eca / Cca)' },
      { property: 'Marquage indélébile', value: 'Nom, section, tension, métrique au mètre linéaire' },
      { property: 'Indice d’étanchéité', value: 'AD7 / AD8 (immersion continue possible)' }
    ]
  }
];
