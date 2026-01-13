import Faq, { FaqItem } from "@/components/Faq/Faq";
import HeroHome from "@/components/HeroHome/HeroHome";
import Image from "next/image";

const faqData: FaqItem[] = [
    {
      id: "24h7",
      question: "Intervenez-vous 24h/24 et 7j/7 ?",
      answer: "Oui, selon la disponibilité des agences locales, des interventions d'urgence sont possibles de jour comme de nuit."
    },
    {
      id: "contact-agence",
      question: "Puis-je contacter directement une agence locale ?",
      answer: "Oui, chaque ville dispose de son site officiel avec ses coordonnées propres."
    },
    {
      id: "devis",
      question: "Proposez-vous des devis ?",
      answer: "Les agences fournissent une information tarifaire claire avant toute intervention."
    }
  ];

export default function Home() {
  const heroData = {
        title: "SERRURIER D'URGENCE PARIS",
        subtitle: "Dépannez-vous en moins de 30 minutes avec nos experts serruriers agréés, disponibles 24h/24 et 7j/7 pour toutes vos urgences.",
        backgroundImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        ctaText: "URGENCE SERRURERIE - APPEL IMMÉDIAT",
        ctaPhone: "07 57 83 18 00"
    };

    const handleCtaClick = () => {
        console.log('CTA clicked!');
        // You can add analytics tracking here
        window.location.href = `tel:${heroData.ctaPhone}`;
    };

    return (
        <main>
            <HeroHome />
            
            {/* Services Section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">
                Pourquoi choisir notre groupe ?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    <h3 className="text-xl font-bold mb-4 text-slate-900">🏅 Certification officielle</h3>
                    <p className="text-slate-600">Tous nos serruriers sont certifiés et formés aux dernières techniques de sécurité.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    <h3 className="text-xl font-bold mb-4 text-slate-900">⏱️ Intervention rapide</h3>
                    <p className="text-slate-600">Disponibles 24h/24 et 7j/7 pour répondre à toutes vos urgences serrurerie.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    <h3 className="text-xl font-bold mb-4 text-slate-900">🗺️ Couverture nationale</h3>
                    <p className="text-slate-600">Plus de 200 agences partenaires partout en France pour une intervention proche de chez vous.</p>
                </div>
                </div>
            </section>

            {/* FAQ Section */}
            <Faq
                title="Questions fréquentes sur nos services de serrurerie"
                items={faqData}
                ctaText="Consulter la FAQ serrurerie complète"
                ctaLink="/faq"
            />
        </main>
    );
}
