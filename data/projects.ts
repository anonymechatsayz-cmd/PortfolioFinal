export interface ProjectResult {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  image: string;
  video?: string;
  results: ProjectResult[];
  tags: string[];
  link: string;
  color: string;
  textColor: string;
  year: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: 'foggia',
    title: "Foggia Ristorante",
    category: "Hospitality",
    year: "2023",
    description: "Une expérience digitale qui se goûte. Immersion totale.",
    longDescription: "Pour Foggia, un restaurant italien authentique, le site web ne devait pas être une simple vitrine, mais un avant-goût de l'expérience culinaire. Il fallait transmettre la chaleur, l'odeur du four à bois et la convivialité italienne à travers un écran.",
    challenge: "Se différencier des milliers de pizzerias génériques. Convaincre les clients potentiels de réserver une table plutôt que de commander sur UberEats.",
    solution: "Une direction artistique centrée sur la photographie culinaire haute définition et des micro-interactions fluides. Le module de réservation est intégré nativement pour réduire la friction au minimum.",
    image: "https://i.postimg.cc/xjMfrnF8/Screenshot-2026-02-27-151317.png",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000&fm=webp",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000&fm=webp",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000&fm=webp"
    ],
    results: [
      { value: "+50%", label: "Réservations Web" },
      { value: "4.8/5", label: "Note Moyenne" },
      { value: "15k", label: "Vues Mensuelles" },
    ],
    tags: ["Immersion", "Booking System", "Photography"],
    link: "#",
    color: "#E8E6E1",
    textColor: "#1A1D29"
  },
  {
    id: 'lc-elagage',
    title: "L.C. Élagage",
    category: "Paysagiste",
    year: "2024",
    description: "Transformation radicale d'une entreprise locale. D'invisible à omniprésent.",
    longDescription: "L.C. Élagage était un expert reconnu localement mais invisible numériquement. Notre mission était de construire une présence digitale capable de capturer la demande locale massive pour l'élagage et l'entretien paysager.",
    challenge: "Le marché local est saturé de petits acteurs. Le client n'avait aucune image de marque et dépendait du bouche-à-oreille. L'objectif était de devenir le leader incontesté sur Google pour la région.",
    solution: "Nous avons créé une identité visuelle robuste et un site web ultra-rapide optimisé pour le SEO local. Chaque page est une landing page conçue pour convertir, avec des appels à l'action contextuels et une preuve sociale omniprésente.",
    image: "https://i.postimg.cc/pXjn1wKS/Screenshot-2026-02-27-at-14-08-17-Copy-of-Copy-of-L-C-Elagage-e-Google-AI-Studio.png",
    gallery: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000&fm=webp",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000&fm=webp",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000&fm=webp"
    ],
    results: [
      { value: "+300%", label: "Croissance Devis" },
      { value: "#1", label: "Position Google" },
      { value: "98/100", label: "Performance" },
    ],
    tags: ["Webflow", "SEO Local", "UX Design"],
    link: "#",
    color: "#F2F0EB",
    textColor: "#1A1D29"
  },
  {
    id: 'solassol',
    title: "Cabinet Solassol",
    category: "Corporate",
    year: "2023",
    description: "L'élégance de la loi. Confiance et statut.",
    longDescription: "Le Cabinet Solassol avait besoin d'une refonte complète de son image pour correspondre à son expertise de haut niveau. L'ancien site ne reflétait pas le prestige et la rigueur de leurs services juridiques.",
    challenge: "Moderniser l'image d'un cabinet d'avocats sans tomber dans les clichés corporate froids, tout en restant accessible et rassurant pour les clients en difficulté.",
    solution: "Un design minimaliste, utilisant beaucoup d'espace blanc et une typographie serif élégante. La structure de l'information a été repensée pour guider l'utilisateur vers la bonne expertise en moins de 2 clics.",
    image: "https://i.postimg.cc/VksNwp36/Screenshot-2026-02-27-145305.png",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000&fm=webp",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000&fm=webp",
      "https://images.unsplash.com/photo-1507537297725-24a1c434e3db?auto=format&fit=crop&q=80&w=1000&fm=webp"
    ],
    results: [
      { value: "+40%", label: "Leads Qualifiés" },
      { value: "x2", label: "Taux Conversion" },
      { value: "-30%", label: "Rebond" },
    ],
    tags: ["Branding", "Corporate", "Identity"],
    link: "#",
    color: "#DEDBD6",
    textColor: "#1A1D29"
  },
  {
    id: 'lumina',
    title: "Lumina Studio",
    category: "Design",
    year: "2024",
    description: "Une identité visuelle qui rayonne. Immersion 3D.",
    longDescription: "Lumina Studio avait besoin d'un portfolio immersif pour présenter ses créations 3D et ses concepts architecturaux. L'objectif était de créer un écrin digital à la hauteur de leurs rendus photoréalistes.",
    challenge: "Créer une plateforme qui s'efface derrière le contenu tout en gardant une identité forte. Gérer des assets 3D lourds sans compromettre la fluidité.",
    solution: "Un design minimaliste en clair-obscur, des animations fluides et une navigation spatiale innovante utilisant WebGL pour une immersion totale.",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000&fm=webp",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000&fm=webp"
    ],
    results: [
      { value: "+200%", label: "Engagement" },
      { value: "Awwwards", label: "Site of the Day" },
      { value: "0.8s", label: "Load Time" },
    ],
    tags: ["WebGL", "Three.js", "Art Direction"],
    link: "#",
    color: "#E5E1D8",
    textColor: "#1A1D29"
  },
  {
    id: 'maison-hotes',
    title: "Maison D'Hôtes",
    category: "Hospitality",
    year: "2023",
    description: "L'art de recevoir, version haute couture.",
    longDescription: "Une maison d'hôtes de luxe en Provence cherchait à augmenter ses réservations directes pour s'affranchir de la dépendance aux plateformes comme Booking.com et Airbnb.",
    challenge: "Transmettre le calme, le luxe et l'exclusivité du lieu à travers l'écran pour justifier un positionnement premium.",
    solution: "Un site web expérientiel avec des vidéos plein écran, une typographie serif raffinée et un moteur de réservation intuitif intégré.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000&fm=webp",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000&fm=webp",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000&fm=webp"
    ],
    results: [
      { value: "65%", label: "Réservations Directes" },
      { value: "+120%", label: "Trafic Organique" },
      { value: "4.9/5", label: "Satisfaction" },
    ],
    tags: ["Hospitality", "SEO", "UX Design"],
    link: "#",
    color: "#E8E6E1",
    textColor: "#1A1D29"
  }
];
