export const projects = [
  {
    slug: 'assistant-familial',
    title: 'Assistant Familial (ASE)',
    tagline: 'Application web & mobile de suivi pour l’Aide Sociale à l’Enfance',
    description: `Application multi-plateforme (React & React Native) conçue pour simplifier la gestion administrative, financière et logistique des assistants familiaux.`,
    role: 'Concepteur & Développeur Fullstack (Web & Mobile)',
    year: '2024',
    projectType: 'cda',
    context: 'Projet de fin d’études présenté et validé devant jury pour l’obtention du Titre RNCP Niveau 6 CDA. Né d’un besoin terrain réel pour centraliser la communication et la gestion des enfants accueillis par l’Aide Sociale à l’Enfance (ASE).',
    objectives: [
      'Simplifier la gestion administrative, financière et médicale des enfants accueillis',
      'Sécuriser les données très sensibles de mineurs selon le RGPD et les préconisations ANSSI',
      'Mettre en place un contrôle d’accès strict par rôles (Assistante Familiale, Éducateur ISE, Secrétaire)',
      'Développer une solution multi-plateforme : App mobile terrain (React Native) et Portail web (React)'
    ],
    functionalities: [
      'Authentification JWT & Contrôle d’accès granulaire par rôles (RBAC)',
      'Dossiers d’enfants centralisés (profil, historique et documents)',
      'Planning partagé des rendez-vous et relais familiaux',
      'Gestion des frais alloués avec téléversement et stockage sécurisé des tickets de caisse',
      'Cahier de liaison numérique (notes quotidiennes, incidents) et messagerie privée',
      'Backend REST robuste NestJS avec ORM Prisma et base MySQL sous Docker'
    ],
    challenges: [
      'Concevoir une architecture multicouche sécurisée répondant aux 3 blocs de compétences du Titre CDA (CCP1, CCP2, CCP3)',
      'Assurer la cohérence des flux de données entre l’API REST NestJS, l’interface Web React et l’application Mobile React Native/Expo',
      'Implémenter des politiques de sécurité strictes (validation DTO, hashage bcrypt, Guards JWT, prévention injections SQL et XSS)'
    ],
    solutions: [
      'Modélisation MCD/MLD complète et structurée autour d’entités métier fortes (User, Child, Expense, Event, Note, Message)',
      'Architecture conteneurisée avec Docker et Docker Compose, reverse proxy Nginx et déploiement continu via GitHub Actions',
      'Découplage propre de la logique métier avec des contrôleurs et services NestJS réutilisables par le Web et le Mobile'
    ],
    results: [
      'Obtention et validation officielle du Titre RNCP Niveau 6 - Concepteur Développeur d’Applications (CDA)',
      'Application complète et fonctionnelle livrée avec environnement Docker prêt à l’emploi'
    ],
    metrics: [],
    timeline: 'Projet de fin d’études CDA (Conception, Modélisation, Dev & Soutenance)',
    collaboration: 'Projet individuel CDA (Conception, Architecture, Développement Web & Mobile, BDD & DevOps)',
    links: {},
    stack: ['React', 'React Native', 'NestJS', 'TypeScript', 'MySQL', 'Prisma', 'Docker', 'JWT'],
    style: {
      colors: ['#030F1A', '#B5DFCA', '#DB91D2'],
      font: 'Inter'
    },
    gallery: ['/placeholder.png', '/placeholder.png']
  },
  {
    slug: 'premium-vtc',
    title: 'Premium VTC',
    tagline: 'Transport haut de gamme centré utilisateur',
    description: `Premium VTC propose une expérience de réservation fluide, orientée confort et confiance. Objectifs : interface claire, parcours simple, performance côté mobile.`,
    role: 'Design/Développement Front / Développement Back',
    year: '2024',
    projectType: 'internship',
    context: 'Site de réservation VTC pour automatiser et simplifier la prise de course.',
    objectives: [
      'Réduire les échanges manuels pour réserver',
      'Rendre le parcours aller/retour clair en moins de 4 étapes',
      'Fiabiliser le calcul des tarifs dynamiques',
    ],
    functionalities: [
      'Calcul de tarif dynamique',
      'Gestion trajets aller / retour',
      'Notifications e-mail',
      'Panneau admin',
      'Notifications mobile'
    ],
    challenges: [
      'Apprentissage rapide de Vue pour une web app complète',
      'Organisation du code pour évolutivité',
      'Intégration paiement & notifications (structure en place)'
    ],
    solutions: [
      'Architecture composants modulaires',
      'Séparation logique UI / données',
      'Maquettage Figma pour aligner les interactions avant dev'
    ],
    results: [
      'Parcours de réservation prototypé et utilisable',
      'Base front prête pour extensions (comptes chauffeurs / clients)',
    ],
    metrics: [],
    timeline: '1 semaine maquette + 2 mois développement',
    collaboration: 'Stage – travail avec le patron (pilotage produit)',
    links: {},
    stack: ['Vue 3','Laravel','Vite','GSAP','Figma'],
    style: {
      colors: ['#B5DFCA','#DB91D2','#030F1A'],
      font: 'Inter (placeholder)'
    },
    gallery: ['/placeholder.png','/placeholder.png','/placeholder.png']
  },
  {
    slug: 'makara',
    title: 'Makara',
    tagline: 'Application de gestion des réseaux sociaux',
    description: `Makara centralise données et processus internes : facturation, suivi, pilotage léger. Focalisé sur cohérence visuelle et vitesse.`,
    role: 'Développeur Web',
    year: '2024',
    projectType: 'internship',
    context: 'Outil interne pour poster sur plusieurs réseaux depuis une interface unique.',
    objectives: [
      'Publier simultanément sur plusieurs réseaux',
      'Réduire le temps de multi-posting',
    ],
    functionalities: [
      'Publication multi-réseaux',
      'Intégration API Meta',
    ],
    challenges: [
      'Gestion API Meta (auth / limites / formats)'
    ],
    solutions: [
      'Normalisation simple des payloads réseaux',
      'Fonctions abstraites pour points d’intégration futurs'
    ],
    results: [
      'Base fonctionnelle pour envoi multi-canal',
    ],
    metrics: [],
    timeline: '2 mois de développement',
    collaboration: '5 développeurs + 1 designer maquette',
    links: {},
    stack: ['Symfony','Figma','API Meta'],
    style: {
      colors: ['#DB91D2','#B5DFCA','#030F1A'],
      font: 'Inter'
    },
    gallery: ['/placeholder.png','/placeholder.png']
  },
  {
    slug: 'lamarche',
    title: 'Lamarche',
    tagline: 'Média contre le cyberharcelement',
    description: `Média contre le cyberharcelement`,
    role: 'UX / UI / Intégration',
    year: '2024',
    context: 'Projet d’école : média de sensibilisation contre le cyberharcèlement.',
    objectives: [
      'Sensibiliser avec un support simple',
    ],
    functionalities: [
      'Pages média / articles',
    ],
    challenges: [
      'Structurer contenu pédagogique',
      'Maintenir lisibilité & accessibilité'
    ],
    solutions: [
      'Hiérarchie typographique claire',
      'Palette contrastée contrôlée'
    ],
    results: [
      'Prototype communicant pour discussions',
    ],
    metrics: [],
    timeline: 'Projet académique (durée courte)',
    collaboration: 'Équipe marketing + équipe design',
    links: {},
    stack: ['Vue 3','Accessibilité','SEO'],
    style: {
      colors: ['#B5DFCA','#030F1A'],
      font: 'Inter'
    },
    gallery: ['/placeholder.png','/placeholder.png','/placeholder.png']
  }
]

/**
 * Recherche et renvoie le projet correspondant à un slug donné.
 * 
 * @param {string} slug - L'identifiant d'URL du projet (ex: "assistant-familial")
 * @returns {Object|undefined} - L'objet projet ou undefined s'il n'existe pas
 */
export function findProject(slug) {
  return projects.find(p => p.slug === slug)
}
