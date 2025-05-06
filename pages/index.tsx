import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { DownloadIcon, Code, Layers, MessageSquare } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [matrixChars, setMatrixChars] = useState<string[]>([]);
  const [glitchText, setGlitchText] = useState("");
  
  // Matrix animation effect
  useEffect(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const generateRandomChars = () => {
      const newChars = [];
      for (let i = 0; i < 50; i++) {
        const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        newChars.push(randomChar);
      }
      setMatrixChars(newChars);
    };
    
    const interval = setInterval(generateRandomChars, 100);
    return () => clearInterval(interval);
  }, []);
  
  // Glitch text effect for the name
  useEffect(() => {
    const originalText = "Madany Doumbia";
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

  // Photo matrix effect - Client-side only to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const matrixOverlay = document.getElementById('matrix-overlay');
      if (matrixOverlay) {
        // Clear any existing content
        matrixOverlay.innerHTML = '';
        
        // Create matrix columns
        for (let i = 0; i < 10; i++) {
          const column = document.createElement('div');
          column.className = 'absolute text-green-400 text-lg font-mono';
          column.style.left = `${i * 10}%`;
          column.style.top = '0%';
          column.style.opacity = '0.7';
          column.style.animation = `matrixRain ${2 + (i % 3)}s linear infinite`;
          column.style.animationDelay = `${i * 0.1}s`;
          
          // Create characters in the column
          for (let j = 0; j < 12; j++) {
            const char = document.createElement('div');
            char.style.opacity = (0.5 + (j % 5) * 0.1).toString();
            char.textContent = String.fromCharCode(65 + (i + j) % 26); // A-Z based on position
            column.appendChild(char);
          }
          
          matrixOverlay.appendChild(column);
        }
      }
    }
  }, []);


  return (
    <>
      <Head>
        <title>Accueil | Portfolio Madany DOUMBIA</title>
        <meta name="description" content="Portfolio de Madany Doumbia avec thème principalement Matrix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-black text-green-500 font-mono relative overflow-hidden`}>
        {/* Matrix background effect */}
        <div className="fixed inset-0 opacity-20 pointer-events-none">
          {matrixChars.map((char, index) => (
            <div 
              key={index} 
              className="absolute text-green-400" 
              style={{
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                opacity: Math.random(),
                fontSize: `${Math.random() * 10 + 10}px`,
                filter: "blur(0.5px)"
              }}
            >
              {char}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <nav className="p-6 flex justify-between items-center relative z-10 border-b border-green-800">
          <div className="text-2xl font-bold glitch-text relative">
            <span className="absolute top-0 left-0 text-red-500 opacity-70" style={{ clipPath: "inset(0 0 0 0)", transform: "translate(-2px, 2px)" }}>{glitchText}</span>
            <span className="absolute top-0 left-0 text-blue-500 opacity-70" style={{ clipPath: "inset(0 0 0 0)", transform: "translate(2px, -2px)" }}>{glitchText}</span>
            <span>{glitchText}</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projets</Link>
            <Link href="/skills" className="hover:text-white transition-colors">Compétences</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="relative z-10">
          <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
            {/* Text Content */}
            <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 typewriter">
                <span className="text-white">Développeur Full Stack</span>
              </h1>
              <p className="text-xl mb-10 max-w-2xl">
                Spécialisé dans le développement d'applications web modernes 
                et performantes avec une expertise en <span className="text-white">technologies front-end et back-end</span>.
              </p>
              
              {/* CTA Principal */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/contact" 
                  className="bg-green-600 hover:bg-green-700 text-black px-8 py-3 rounded-md font-bold transition-all hover:scale-105 hover:glitch relative overflow-hidden"
                >
                  <span className="relative z-10">LANCER UNE COLLABORATION</span>
                  <span className="absolute inset-0 bg-green-500 opacity-50" style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 55%)",
                    animation: "glitch 2s infinite",
                    transform: "translateX(-5px)"
                  }}></span>
                </a>
                
                <a 
                  href="/cv_madany-doumbia.pdf" 
                  download 
                  className="border border-green-600 hover:border-green-400 px-8 py-3 rounded-md font-bold flex items-center justify-center gap-2 transition-all hover:text-white"
                >
                  <DownloadIcon size={18} />
                  Télécharger CV
                </a>
              </div>
            </div>
            
            {/* Profile Photo with Matrix Effect */}
            <div className="md:w-2/5 relative mt-4">
              <div className="relative w-64 h-64 mx-auto overflow-hidden rounded-full border-4 border-green-500 group">
                {/* Placeholder for your profile photo */}
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                  <Image 
                    src="/profile-photo.jpg" 
                    alt="Madany Doumbia" 
                    width={256} 
                    height={256} 
                    className="object-cover w-full h-full z-10 group-hover:opacity-90 transition-opacity"
                  />
                </div>
                
                {/* Matrix effect overlay that appears on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity z-20 overflow-hidden" id="matrix-overlay">
                  {/* Matrix characters will be rendered client-side only */}
                </div>
                
                {/* Green glow effect */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)] pointer-events-none"></div>
              </div>
              
              {/* Caption underneath the photo */}
              <p className="text-center mt-4 text-green-400 glitch-text">
                <span>Prêt à transformer vos idées en réalité</span>
              </p>
            </div>
          </div>

          {/* Featured Projects Section */}
          <section className="py-16 relative">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-12 flex items-center gap-3">
                <Code size={24} />
                <span>Projets Sélectionnés</span>
                <div className="h-px bg-green-600 flex-grow ml-4"></div>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((project) => (
                  <div 
                    key={project} 
                    className="border border-green-800 bg-black bg-opacity-80 p-6 rounded-lg hover:border-green-500 transition-all cursor-pointer group"
                  >
                    <div className="h-40 bg-green-900 bg-opacity-30 mb-4 rounded flex items-center justify-center">
                      <span className="text-4xl opacity-30">PROJECT {project}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-white">Nom du Projet {project}</h3>
                    <p className="text-green-400 mb-4">Description brève du projet {project} et technologies utilisées.</p>
                    <Link 
                      href={`/projects/${project}`}
                      className="text-sm flex items-center gap-1 hover:text-white"
                    >
                      Voir les détails <span className="ml-1">→</span>
                    </Link>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Link 
                  href="/projects" 
                  className="px-6 py-2 border border-green-600 rounded hover:bg-green-900 hover:bg-opacity-30 transition-all"
                >
                  Voir tous les projets
                </Link>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="py-16 relative bg-black bg-opacity-80">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-12 flex items-center gap-3">
                <Layers size={24} />
                <span>Compétences</span>
                <div className="h-px bg-green-600 flex-grow ml-4"></div>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border border-green-800 p-6 rounded-lg hover:border-green-500 transition-all">
                  <h3 className="text-xl font-bold mb-4">Front-end</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"].map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-green-900 bg-opacity-30 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="border border-green-800 p-6 rounded-lg hover:border-green-500 transition-all">
                  <h3 className="text-xl font-bold mb-4">Back-end</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL"].map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-green-900 bg-opacity-30 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="border border-green-800 p-6 rounded-lg hover:border-green-500 transition-all">
                  <h3 className="text-xl font-bold mb-4">DevOps</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Docker", "Kubernetes", "CI/CD", "AWS", "GitHub Actions"].map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-green-900 bg-opacity-30 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-10">
                <Link 
                  href="/skills" 
                  className="px-6 py-2 border border-green-600 rounded hover:bg-green-900 hover:bg-opacity-30 transition-all"
                >
                  Voir toutes les compétences
                </Link>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="py-20 relative">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center gap-3">
                <MessageSquare size={24} />
                <span>Commençons à travailler ensemble</span>
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Vous avez un projet en tête ? Je suis disponible pour transformer vos idées en solutions numériques.
              </p>
              <Link 
                href="/contact" 
                className="bg-green-600 hover:bg-green-700 text-black px-8 py-3 rounded-md font-bold inline-flex items-center gap-2 transition-all hover:scale-105"
              >
                Discutons de votre projet
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-green-800 py-8 relative z-10">
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

      {/* Global CSS for matrix/glitch effects */}
      <style jsx global>{`
        @keyframes glitch {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 45%, 0 55%);
            transform: translateX(-5px);
          }
          20% {
            clip-path: polygon(0 20%, 100% 15%, 100% 70%, 0 80%);
            transform: translateX(5px);
          }
          40% {
            clip-path: polygon(0 15%, 100% 35%, 100% 80%, 0 90%);
            transform: translateX(-3px);
          }
          60% {
            clip-path: polygon(0 35%, 100% 45%, 100% 65%, 0 75%);
            transform: translateX(3px);
          }
          80% {
            clip-path: polygon(0 45%, 100% 50%, 100% 100%, 0 100%);
            transform: translateX(-1px);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 45%, 0 55%);
            transform: translateX(-5px);
          }
        }
        
        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        
        .typewriter {
          overflow: hidden;
          border-right: 2px solid #22c55e;
          white-space: nowrap;
          margin: 0 auto;
          animation: 
            typewriter 3s steps(40) 1s forwards,
            blink-caret 0.75s step-end infinite;
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #22c55e; }
        }
        
        .hover\:glitch:hover::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: inherit;
          animation: glitch 0.3s infinite;
        }
        
        body {
          background-color: #000;
        }
      `}</style>
    </>
  );
}