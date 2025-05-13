import Head from "next/head";
import { useState, useEffect, FormEvent } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Mail, MessageSquare, MapPin, Phone, Send, CheckCircle, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [glitchText, setGlitchText] = useState("CONTACT");
  const [matrixChars, setMatrixChars] = useState<string[]>([]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(""); // Réinitialiser les erreurs précédentes
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        
        // Reset submission status after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error(data.message || 'Une erreur est survenue lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setIsSubmitting(false);
      setSubmitError(error instanceof Error ? error.message : 'Une erreur inattendue est survenue');
    }
  };

  // Matrix animation effect (simplified)
  useEffect(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const generateRandomChars = () => {
      const newChars = [];
      for (let i = 0; i < 30; i++) {
        const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        newChars.push(randomChar);
      }
      setMatrixChars(newChars);
    };
    
    const interval = setInterval(generateRandomChars, 150);
    return () => clearInterval(interval);
  }, []);
  
  // Glitch text effect for the title
  useEffect(() => {
    const originalText = "CONTACT";
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

  return (
    <>
      <Head>
        <title>Contact | Portfolio Madany DOUMBIA</title>
        <meta name="description" content="Contactez-moi pour discuter de vos projets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-black text-green-500 font-mono`}>
        {/* Matrix background effect */}
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          {matrixChars.map((char, index) => (
            <div 
              key={index} 
              className="absolute text-green-400" 
              style={{
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                fontSize: `${Math.random() * 12 + 10}px`,
                filter: "blur(0.5px)"
              }}
            >
              {char}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <nav className="p-6 flex justify-between items-center relative z-10 border-b border-green-800">
          <Link href="/" className="text-2xl font-bold hover:text-white transition-colors">
            <span>&lt; Retour</span>
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projets</Link>
            <Link href="/skills" className="hover:text-white transition-colors">Compétences</Link>
            <Link href="/contact" className="text-white transition-colors">Contact</Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-16">
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 relative inline-block">
              <span className="relative z-10">{glitchText}</span>
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
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Besoin d&apos;un développeur pour votre projet ? Je suis disponible pour discuter 
              de vos besoins et comment je peux vous aider à atteindre vos objectifs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="border border-green-800 p-6 rounded-lg bg-black bg-opacity-80 relative">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare size={24} />
                <span>Envoyez-moi un message</span>
              </h2>
              
              {/* Success message */}
              {isSubmitted && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 z-10 rounded-lg">
                  <div className="text-center p-6 animate-fadeIn">
                    <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                    <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
                    <p className="text-green-400">
                      Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                    </p>
                  </div>
                </div>
              )}

              {/* Error message - Nouveau */}
              {submitError && (
                <div className="mb-4 p-3 border border-red-500 bg-red-900 bg-opacity-20 rounded-md">
                <p className="text-red-400">{submitError}</p>
                </div>
             )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm">Nom complet</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border border-green-800 rounded-md focus:border-green-500 focus:outline-none text-green-500"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border border-green-800 rounded-md focus:border-green-500 focus:outline-none text-green-500"
                    placeholder="votre.email@exemple.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm">Sujet</label>
                  <select 
                    id="subject" 
                    name="subject" 
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border border-green-800 rounded-md focus:border-green-500 focus:outline-none text-green-500"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="Projet Web">Projet Web</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Opportunité de travail">Opportunité de travail</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full p-3 bg-black border border-green-800 rounded-md focus:border-green-500 focus:outline-none text-green-500 resize-none"
                    placeholder="Décrivez votre projet ou votre demande..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full p-3 bg-green-600 hover:bg-green-700 text-black font-bold rounded-md flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-col gap-8">
              <div className="border border-green-800 p-6 rounded-lg bg-black bg-opacity-80 h-min">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Mail size={24} />
                  <span>Informations de contact</span>
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:madany.doumbia@epitech.eu" className="text-green-400 hover:text-white transition-colors">
                        madany.doumbia@epitech.eu
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone size={20} className="mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Téléphone</h3>
                      <a href="tel:+2250747064296" className="text-green-400 hover:text-white transition-colors">
                        +225 07 42 06 42 96
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Localisation</h3>
                      <p className="text-green-400">Abidjan, Côte d&apos;Ivoire</p>
                      <p className="text-sm text-green-600 mt-1">Remote friendly</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="border border-green-800 p-6 rounded-lg bg-black bg-opacity-80">
                <h2 className="text-2xl font-bold mb-6">Réseaux sociaux</h2>
                <div className="space-y-4">
                  <a 
                    href="https://github.com/mada-ny" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-green-800 rounded-md hover:border-green-500 hover:bg-green-900 hover:bg-opacity-30 transition-all group"
                  >
                    <Github size={20} className="text-green-400 group-hover:text-white" />
                    <span className="group-hover:text-white">GitHub</span>
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/madany-doumbia-90584a350/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-green-800 rounded-md hover:border-green-500 hover:bg-green-900 hover:bg-opacity-30 transition-all group"
                  >
                    <Linkedin size={20} className="text-green-400 group-hover:text-white" />
                    <span className="group-hover:text-white">LinkedIn</span>
                  </a>
                  
                  <a 
                    href="https://twitter.com/mada_ny" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-green-800 rounded-md hover:border-green-500 hover:bg-green-900 hover:bg-opacity-30 transition-all group"
                  >
                    <Twitter size={20} className="text-green-400 group-hover:text-white" />
                    <span className="group-hover:text-white">Twitter</span>
                  </a>
                </div>
              </div>

              {/* Disponibilité */}
              <div className="border border-green-800 p-6 rounded-lg bg-black bg-opacity-80">
                <h2 className="text-2xl font-bold mb-4">Disponibilité</h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400">Disponible pour nouveaux projets</span>
                </div>
                <p className="text-sm text-green-300">
                  Je réponds généralement dans les 24 heures. N&apos;hésitez pas à me contacter 
                  pour discuter de votre projet !
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Questions fréquentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-green-800 p-6 rounded-lg bg-black bg-opacity-80">
                <h3 className="text-lg font-bold mb-3">Quel est votre tarif ?</h3>
                <p className="text-green-400">
                  Mes tarifs dépendent de la complexité du projet. Je propose des forfaits 
                  pour les projets complets ou un tarif horaire pour les missions ponctuelles. 
                  Contactez-moi pour un devis personnalisé.
                </p>
              </div>
              
              <div className="border border-green-800 p-6 rounded-lg bg-black bg-opacity-80">
                <h3 className="text-lg font-bold mb-3">Travaillez-vous à distance ?</h3>
                <p className="text-green-400">
                  Oui, je travaille principalement à distance mais je peux me déplacer 
                  si nécessaire. J&apos;utilise des outils collaboratifs 
                  pour assurer une communication fluide.
                </p>
              </div>
              
              <div className="border border-green-800 p-6 rounded-lg bg-black bg-opacity-80">
                <h3 className="text-lg font-bold mb-3">Quels types de projets acceptez-vous ?</h3>
                <p className="text-green-400">
                  Je me spécialise dans le développement d&apos;applications web, sites vitrines, 
                  e-commerce, et API. Je peux également aider sur des projets de migration 
                  ou d&apos;optimisation d&apos;applications existantes.
                </p>
              </div>
              
              <div className="border border-green-800 p-6 rounded-lg bg-black bg-opacity-80">
                <h3 className="text-lg font-bold mb-3">Proposez-vous un accompagnement post-projet ?</h3>
                <p className="text-green-400">
                  Oui, je propose toujours un accompagnement post-livraison incluant 
                  corrections de bugs, support technique et formations si nécessaire. 
                  Les modalités sont définies selon le projet.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-green-800 py-8 mt-16">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Madany DOUMBIA - Tous droits réservés</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://github.com/mada-ny" className="hover:text-white" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/madany-doumbia-90584a350/" className="hover:text-white" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://twitter.com/votre-username" className="hover:text-white" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
        </footer>

        {/* Global CSS for matrix/glitch effects */}
        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          
          /* Glitch effect for backgrounds */
          @keyframes glitch {
            0% {
              clip-path: polygon(0 0, 100% 0, 100% 45%, 0 55%);
              transform: translateX(-2px);
            }
            20% {
              clip-path: polygon(0 20%, 100% 15%, 100% 70%, 0 80%);
              transform: translateX(2px);
            }
            40% {
              clip-path: polygon(0 15%, 100% 35%, 100% 80%, 0 90%);
              transform: translateX(-1px);
            }
            60% {
              clip-path: polygon(0 35%, 100% 45%, 100% 65%, 0 75%);
              transform: translateX(1px);
            }
            80% {
              clip-path: polygon(0 45%, 100% 50%, 100% 100%, 0 100%);
              transform: translateX(0);
            }
            100% {
              clip-path: polygon(0 0, 100% 0, 100% 45%, 0 55%);
              transform: translateX(-2px);
            }
          }
        `}</style>
      </div>
    </>
  );
}