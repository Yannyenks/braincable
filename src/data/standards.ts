export interface TechnicalStandard {
  code: string;
  title: string;
  organization: string;
  scope: string;
  keyRequirements: string[];
}

export const TECHNICAL_STANDARDS: TechnicalStandard[] = [
  {
    code: 'IEC 60502-1',
    title: 'Câbles d’énergie à isolant extrudé et leurs accessoires pour des tensions assignées de 1 kV à 30 kV',
    organization: 'Commission Électrotechnique Internationale (CEI / IEC)',
    scope: 'Spécifie la construction, les dimensions et les exigences d’essais des câbles de distribution de puissance avec isolants massifs tels que le PR (XLPE) et le PVC.',
    keyRequirements: [
      'Épaisseur minimale d’isolation diélectrique selon le calibre de tension',
      'Essais de tension sous 3.5 U0 pendant 5 minutes sans perforation',
      'Résistance à la traction et allongement à la rupture après vieillissement thermique'
    ]
  },
  {
    code: 'NF C 32-321',
    title: 'Câbles isolés et conducteurs pour installations - Câbles rigides U-1000 R2V',
    organization: 'AFNOR / UTE',
    scope: 'Norme française déterminant la conception mécanique et diélectrique des câbles d’alimentation basse tension 0.6/1 kV avec âme cuivre ou aluminium.',
    keyRequirements: [
      'Gaine extérieure noire non propagatrice de la flamme (classe C2)',
      'Couleur des conducteurs conforme à la norme HD 308 S2',
      'Température maximale de service permanent fixée à 90°C pour le PR'
    ]
  },
  {
    code: 'IEC 60228',
    title: 'Conducteurs pour câbles isolés (Classes de souplesse 1, 2, 5 et 6)',
    organization: 'Commission Électrotechnique Internationale',
    scope: 'Classification internationale normalisée des âmes conductrices en cuivre et aluminium selon leur compacité et flexibilité.',
    keyRequirements: [
      'Résistance électrique linéique maximale admissible en ohms par kilomètre à 20°C',
      'Définition du nombre minimal de brins pour la classe 2 et diamètre max des brins pour classe 5',
      'Masse volumique et conductivité électrique minimale du métal'
    ]
  },
  {
    code: 'EN 50575 (Règlement RPC / CPR)',
    title: 'Câbles d’énergie, de commande et de communication dans les ouvrages de construction soumis aux exigences de réaction au feu',
    organization: 'Union Européenne / CENELEC',
    scope: 'Classification Euroclasses (Aca, B1ca, B2ca, Cca, Dca, Eca) pour la sécurité incendie des bâtiments recevant du public (ERP) et installations à haut risque.',
    keyRequirements: [
      'Mesure du dégagement de chaleur et propagation de flamme',
      'Critères additionnels de production de fumée (s1, s2, s3)',
      'Acidité des gaz de combustion et gouttelettes enflammées (d0, d1, a1)'
    ]
  },
  {
    code: 'EN 50618 / IEC 62930',
    title: 'Câbles électriques pour systèmes photovoltaïques (H1Z2Z2-K)',
    organization: 'CENELEC / IEC',
    scope: 'Câbles dédiés aux chaînes de panneaux photovoltaïques DC jusqu’à 1.5 kV continus.',
    keyRequirements: [
      'Résistance certifiée aux rayonnements UV (vieillissement 20 000 heures)',
      'Tenue à l’ozone et compatibilité thermique avec une durée de vie garantie de 25 ans',
      'Âme cuivre étamé obligatoire pour prévenir la corrosion galvanique aux connecteurs'
    ]
  }
];

export const QUALITY_PILLARS = [
  {
    title: 'Traçabilité et Fiches d’Essais d’Usine (MTC)',
    desc: 'Chaque lot de câbles importé s’accompagne de son certificat de conformité d’usine (Mill Test Certificate) précisant la coulée de cuivre, les essais diélectriques et la métrologie.',
    icon: 'FileCheck'
  },
  {
    title: 'Vérification Dimensionnelle & Conductivité',
    desc: 'Contrôle systématique à réception : résistance linéique au micro-ohmmètre, épaisseur nominale de gaine au micromètre optique et conformité des marquages au mètre.',
    icon: 'ScanLine'
  },
  {
    title: 'Stockage & Protection Logistique',
    desc: 'Tourets protégés par bardage bois ou filmage rétractable épais. Embouts étanches thermorétractables thermoformés sur chaque extrémité de câble pour empêcher toute infiltration d’humidité.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Accompagnement Technique & Calibrage',
    desc: 'Assistance à la détermination des sections en fonction de la chute de tension admissible (ΔU %), du mode de pose et des facteurs de correction de température selon la NF C 15-100.',
    icon: 'Wrench'
  }
];
