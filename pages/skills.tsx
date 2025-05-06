import Head from "next/head";
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Layers, Code, Server, Activity, Database, Monitor } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Données des compétences - à personnaliser selon votre profil
const skillsData = {
  frontend: [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "JavaScript", level: 95 },
    { name: "HTML5/CSS3", level: 90 },
    { name: "Tailwind CSS", level: 85 },
    { name: "Redux", level: 75 },
    { name: "Vue.js", level: 70 },
    { name: "SASS/SCSS", level: 85 },
    { name: "WebPack", level: 70 },
  ],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Express", level: 85 },
    { name: "NestJS", level: 75 },
    { name: "Django", level: 70 },
    { name: "GraphQL", level: 80 },
    { name: "REST API", level: 90 },
    { name: "PHP", level: 65 },
    { name: "Python", level: 75 },
    { name: "Java", level: 60 },
  ],
  "bases de données": [
    { name: "MongoDB", level: 85 },
    { name: "PostgreSQL", level: 80 },
    { name: "MySQL", level: 75 },
    { name: "Redis", level: 70 },
    { name: "Firebase", level: 80 },
    { name: "DynamoDB", level: 65 },
  ],
  devops: [
    { name: "Docker", level: 80 },
    { name: "Kubernetes", level: 70 },
    { name: "AWS", level: 75 },
    { name: "CI/CD", level: 85 },
    { name: "GitHub Actions", level: 80 },
    { name: "Jenkins", level: 65 },
    { name: "Linux", level: 80 },
    { name: "Nginx", level: 75 },
  ],
  outils: [
    { name: "Git", level: 90 },
    { name: "VS Code", level: 95 },
    { name: "Postman", level: 90 },
    { name: "Figma", level: 70 },
    { name: "Jest", level: 75 },
    { name: "Cypress", level: 70 },
    { name: "Jira", level: 80 },
  ]
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [matrixChars, setMatrixChars] = useState<string[]>([]);
  const [glitchText, setGlitchText] = useState("COMPÉTENCES");
  const [isClient, setIsClient] = useState(false);
  
  // Determine if we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Matrix animation effect (simplified)
  useEffect(() => {
    if (!isClient) return;
    
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const generateRandomChars = () => {
      const newChars = [];
      for (let i = 0; i < 25; i++) {
        const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        newChars.push(randomChar);
      }
      setMatrixChars(newChars);
    };
    
    const interval = setInterval(generateRandomChars, 150);
    return () => clearInterval(interval);
  }, [isClient]);
  
  // Glitch text effect for the title
  useEffect(() => {
    if (!isClient) return;
    
    const originalText = "COMPÉTENCES";
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
  }, [isClient]);

  // Fonction pour obtenir l'icône en fonction de la catégorie
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "frontend": return <Monitor size={20} />;
      case "backend": return <Server size={20} />;
      case "bases de données": return <Database size={20} />;
      case "devops": return <Code size={20} />;
      case "outils": return <Activity size={20} />;
      default: return <Layers size={20} />;
    }
  };

  // Génère des positions fixes pour éviter les différences d'hydration
  const generateFixedPositions = (count: number) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push({
        left: `${(i * 5) % 100}%`,
        top: `${(i * 7) % 100}%`,
        opacity: 0.2 + ((i % 6) / 10),
        fontSize: `${10 + (i % 12)}px`
      });
    }
    return positions;
  };

  const matrixPositions = generateFixedPositions(25);
  const codeBackgroundPositions = generateFixedPositions(20);

  return (
    <>
      <Head>
        <title>Mes Compétences | Portfolio Madany DOUMBIA</title>
        <meta name="description" content="Découvrez mes compétences techniques en développement web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-black text-green-500 font-mono`}>
        {/* Matrix background effect - Only shown on client-side */}
        {isClient && (
          <div className="fixed inset-0 opacity-10 pointer-events-none">
            {matrixChars.map((char, index) => (
              <div 
                key={index} 
                className="absolute text-green-400" 
                style={{
                  left: matrixPositions[index % matrixPositions.length].left,
                  top: matrixPositions[index % matrixPositions.length].top,
                  opacity: matrixPositions[index % matrixPositions.length].opacity,
                  fontSize: matrixPositions[index % matrixPositions.length].fontSize,
                  filter: "blur(0.5px)"
                }}
              >
                {char}
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <nav className="p-6 flex justify-between items-center relative z-10 border-b border-green-800">
          <Link href="/" className="text-2xl font-bold hover:text-white transition-colors">
            <span>&lt; Retour</span>
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projets</Link>
            <Link href="/skills" className="text-white transition-colors">Compétences</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-16">
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 relative inline-block">
              <span className="relative z-10">{!isClient ? "COMPÉTENCES" : glitchText}</span>
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
              Une vue d'ensemble de mes compétences techniques, outils et technologies que j'utilise 
              pour construire des applications web modernes et performantes.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(skillsData).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-md transition-all ${
                  activeCategory === category 
                    ? "bg-green-700 text-black border-green-600" 
                    : "border-green-800 hover:border-green-500"
                }`}
              >
                {getCategoryIcon(category)}
                <span className="capitalize">{category}</span>
              </button>
            ))}
          </div>

          {/* Skills Display */}
          <div className="grid gap-6">
            {skillsData[activeCategory as keyof typeof skillsData].map((skill, index) => (
              <div key={skill.name} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">{skill.name}</span>
                  <span className="text-green-400">{skill.level}%</span>
                </div>
                <div className="h-3 bg-green-900 bg-opacity-30 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-green-600 rounded-full relative"
                    style={{ width: `${skill.level}%` }}
                  >
                    {/* Binary overlay effect - Client-side only */}
                    {isClient && (
                      <div className="absolute inset-0 overflow-hidden flex items-center">
                        {Array.from({ length: 15 }).map((_, i) => (
                          <span 
                            key={i} 
                            className="text-black text-opacity-40 text-xs"
                            style={{ marginLeft: `${i * 8}px` }}
                          >
                            {(i % 2 === 0) ? "1" : "0"}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Glitch effect on hover - Client-side only */}
                    {isClient && (
                      <div 
                        className="absolute inset-0 bg-green-500 opacity-0 hover:opacity-30 transition-opacity"
                        style={{ 
                          clipPath: "polygon(0 30%, 100% 20%, 100% 50%, 0 60%)"
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-green-800 p-6 rounded-lg bg-black bg-opacity-70 hover:border-green-500 transition-all">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Code size={24} />
                <span>Certifications</span>
              </h2>
              <ul className="space-y-4">
                {[
                  "AWS Certified Developer Associate",
                  "MongoDB Certified Developer",
                  "React Advanced Development",
                  "Docker & Kubernetes Mastery"
                ].map((cert, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-400">›</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border border-green-800 p-6 rounded-lg bg-black bg-opacity-70 hover:border-green-500 transition-all">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Layers size={24} />
                <span>Langues</span>
              </h2>
              <ul className="space-y-4">
                {[
                  { lang: "Français", level: "Langue maternelle" },
                  { lang: "Anglais", level: "Courant (C1)" },
                ].map((lang, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{lang.lang}</span>
                    <span className="text-green-400">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 p-8 border border-green-800 rounded-lg bg-black bg-opacity-80 text-center relative overflow-hidden">
            {/* Code background - Client-side only */}
            {isClient && (
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div 
                    key={`code-${i}`}
                    className="absolute text-xs text-green-500" 
                    style={{
                      left: codeBackgroundPositions[i % codeBackgroundPositions.length].left,
                      top: codeBackgroundPositions[i % codeBackgroundPositions.length].top,
                      opacity: codeBackgroundPositions[i % codeBackgroundPositions.length].opacity
                    }}
                  >
                    {i % 2 === 0 ? "10101" : "01010"}
                  </div>
                ))}
              </div>
            )}
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Intéressé par mon profil ?</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Téléchargez mon CV complet pour plus de détails sur mon expérience professionnelle, 
                mes projets et ma formation.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a 
                  href="/cv_madany-doumbia.pdf" 
                  download 
                  className="bg-green-600 hover:bg-green-700 text-black px-6 py-3 rounded-md font-bold transition-all hover:scale-105"
                >
                  Télécharger mon CV
                </a>
                <Link 
                  href="/contact" 
                  className="border border-green-600 hover:border-green-400 px-6 py-3 rounded-md font-bold transition-all hover:text-white"
                >
                  Me contacter
                </Link>
              </div>
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

      {/* Global CSS specific to this page */}
      <style jsx global>{`
        @keyframes skillGlitch {
          0% {
            clip-path: polygon(0 30%, 100% 20%, 100% 50%, 0 60%);
            transform: translateX(-5px);
          }
          50% {
            clip-path: polygon(0 40%, 100% 30%, 100% 70%, 0 60%);
            transform: translateX(5px);
          }
          100% {
            clip-path: polygon(0 30%, 100% 20%, 100% 50%, 0 60%);
            transform: translateX(-5px);
          }
        }
      `}</style>
    </>
  );
}