import Head from "next/head";
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Code, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Exemple de projets - à remplacer par vos propres projets
const projects = [
  {
    id: 1,
    title: "Application E-commerce",
    description: "Une plateforme e-commerce complète avec panier, paiement et gestion des commandes.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/project1.jpg",
    github: "https://github.com/mada-ny/ecommerce-app",
    live: "https://ecommerce-app.com",
    featured: true
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    description: "Tableau de bord d'analyse de données avec visualisations interactives et rapports en temps réel.",
    technologies: ["Next.js", "TypeScript", "D3.js", "Firebase"],
    image: "/project2.jpg",
    github: "https://github.com/mada-ny/analytics-dashboard",
    live: "https://analytics-dashboard.com",
    featured: true
  },
  {
    id: 3,
    title: "API REST pour Gestion de Tâches",
    description: "API backend pour une application de gestion de tâches avec authentification et permissions.",
    technologies: ["Express", "PostgreSQL", "JWT", "Docker"],
    image: "/project3.jpg",
    github: "https://github.com/mada-ny/task-api",
    live: null,
    featured: true
  },
  {
    id: 4,
    title: "Application Mobile de Fitness",
    description: "Application mobile pour suivre les exercices, la nutrition et les progrès fitness.",
    technologies: ["React Native", "Redux", "GraphQL", "AWS Amplify"],
    image: "/project4.jpg",
    github: "https://github.com/mada-ny/fitness-app",
    live: "https://play.google.com/store/apps/details?id=com.fitnessapp",
    featured: false
  },
  {
    id: 5,
    title: "Site Web de Portfolio",
    description: "Site web portfolio avec thème matrix et effets glitch pour présenter mes projets et compétences.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/project5.jpg",
    github: "https://github.com/mada-ny/portfolio",
    live: "https://portfolio.com",
    featured: false
  },
  {
    id: 6,
    title: "Microservices CI/CD Pipeline",
    description: "Architecture microservices avec pipeline CI/CD complet pour déploiement automatisé.",
    technologies: ["Docker", "Kubernetes", "GitHub Actions", "AWS"],
    image: "/project6.jpg",
    github: "https://github.com/mada-ny/microservices-cicd",
    live: null,
    featured: false
  }
];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [glitchText, setGlitchText] = useState("PROJETS");
  
  // Effet glitch pour le titre - déplacé côté client uniquement
  useEffect(() => {
    const originalText = "PROJETS";
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        const glitched = originalText.split("").map(char => {
          return Math.random() > 0.9 ? 
            String.fromCharCode(Math.floor(Math.random() * 26) + 65) : char;
        }).join("");
        setGlitchText(glitched);
      } else {
        setGlitchText(originalText);
      }
    }, 100);
    
    return () => clearInterval(glitchInterval);
  }, []);

  // Filtrage des projets
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.technologies.includes(filter));

  // Liste des technologies uniques pour les filtres
  const techFilters = ["all", ...new Set(projects.flatMap(p => p.technologies))];

  // État pour gérer le contenu généré aléatoirement côté client uniquement
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>Mes Projets | Portfolio Madany DOUMBIA</title>
        <meta name="description" content="Découvrez mes projets de développement web et applications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-black text-green-500 font-mono`}>
        {/* Matrix background - rendu côté client uniquement */}
        {isClient && (
          <div className="fixed inset-0 opacity-10 pointer-events-none overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => {
              // Positions déterministes pour éviter les différences d'hydratation
              const left = ((i * 37) % 100);
              const top = ((i * 23) % 100);
              const fontSize = ((i % 5) + 10);
              const rotation = ((i * 17) % 360);
              
              return (
                <div 
                  key={i}
                  className="absolute text-green-400 text-opacity-50" 
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    fontSize: `${fontSize}px`,
                    transform: `rotate(${rotation}deg)`
                  }}
                >
                  {String.fromCharCode(65 + (i % 26))}
                </div>
              );
            })}
          </div>
        )}

        {/* Navigation */}
        <nav className="p-6 flex justify-between items-center relative z-10 border-b border-green-800">
          <Link href="/" className="text-2xl font-bold hover:text-white transition-colors">
            <span>&lt; Retour</span>
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <Link href="/projects" className="text-white transition-colors">Projets</Link>
            <Link href="/skills" className="hover:text-white transition-colors">Compétences</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-16">
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 relative inline-block">
              <span className="relative z-10">{glitchText}</span>
              {isClient && (
                <>
                  <span 
                    className="absolute top-0 left-0 text-red-500 opacity-70" 
                    style={{ clipPath: "inset(0 0 0 0)", transform: "translate(-2px, 2px)" }}
                  >
                    {glitchText}
                  </span>
                  <span 
                    className="absolute top-0 left-0 text-blue-500 opacity-70" 
                    style={{ clipPath: "inset(0 0 0 0)", transform: "translate(2px, -2px)" }}
                  >
                    {glitchText}
                  </span>
                </>
              )}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Une sélection de mes projets personnels et professionnels. Chaque projet représente 
              un défi unique et démontre différentes compétences techniques.
            </p>
          </div>

          {/* Filtres */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Code size={20} />
              <span>Filtrer par technologie</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {techFilters.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={`px-3 py-1 rounded text-sm border transition-all ${
                    filter === tech 
                      ? "bg-green-600 text-black border-green-600" 
                      : "border-green-800 hover:border-green-500"
                  }`}
                >
                  {tech === "all" ? "Tous" : tech}
                </button>
              ))}
            </div>
          </div>
          
          {/* Liste des projets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="border border-green-800 bg-black bg-opacity-80 rounded-lg overflow-hidden hover:border-green-500 transition-all group"
              >
                <div className="h-48 bg-green-900 bg-opacity-30 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-30">{project.title.charAt(0)}</span>
                  </div>
                  {/* Image placeholder - remplacer par vos images réelles */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white">{project.title}</h3>
                  <p className="text-green-400 text-sm mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech) => (
                      <span 
                        key={`${project.id}-${tech}`}
                        className="px-2 py-0.5 bg-black bg-opacity-50 border border-green-800 rounded-sm text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-4">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm hover:text-white transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm hover:text-white transition-colors"
                      >
                        <ExternalLink size={16} />
                        Démo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center py-12 border border-green-800 rounded-lg bg-black bg-opacity-50 relative overflow-hidden">
            {isClient && (
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 20 }).map((_, i) => {
                  // Positions déterministes
                  const left = ((i * 37) % 100);
                  const top = ((i * 23) % 100);
                  const opacity = ((i % 10) + 1) / 20;
                  const rotation = ((i * 9) % 90) - 45;
                  
                  return (
                    <div 
                      key={`cta-${i}`}
                      className="absolute text-6xl text-green-500" 
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        opacity: opacity,
                        transform: `rotate(${rotation}deg)`
                      }}
                    >
                      {i % 2 === 0 ? "0" : "1"}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Vous avez un projet en tête ?</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Je suis actuellement disponible pour des missions freelance ou des opportunités à plein temps.
                Discutons de la façon dont je peux contribuer à votre prochain projet.
              </p>
              <Link 
                href="/contact" 
                className="bg-green-600 hover:bg-green-700 text-black px-8 py-3 rounded-md font-bold inline-flex items-center gap-2 transition-all hover:scale-105"
              >
                Contactez-moi
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-green-800 py-8 mt-16">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Madany DOUMBIA - Tous droits réservés</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://github.com/mada-ny" className="hover:text-white" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/votre-username" className="hover:text-white" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://twitter.com/votre-username" className="hover:text-white" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}