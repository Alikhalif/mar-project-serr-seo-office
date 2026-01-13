// app/faq/page.tsx
'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import { serrurerieFaq } from '@/data/serrurerie-faq';

export default function FAQPage() {
  const [openFaqs, setOpenFaqs] = useState<Set<string>>(new Set());

  const toggleFaq = (id: string) => {
    setOpenFaqs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const categories = [
    {
      id: 'urgence',
      title: 'Urgence & Dépannage',
      icon: '🚨',
      items: serrurerieFaq.filter(faq => faq.id.startsWith('urgence'))
    },
    {
      id: 'reparation',
      title: 'Réparation & Maintenance',
      icon: '🔧',
      items: serrurerieFaq.filter(faq => faq.id.startsWith('reparation'))
    },
    {
      id: 'securite',
      title: 'Installation & Sécurité',
      icon: '🛡️',
      items: serrurerieFaq.filter(faq => faq.id.startsWith('securite'))
    },
    {
      id: 'prix',
      title: 'Tarifs & Devis',
      icon: '💰',
      items: serrurerieFaq.filter(faq => faq.id.startsWith('prix'))
    },
    {
      id: 'garantie',
      title: 'Garanties & Service',
      icon: '✅',
      items: serrurerieFaq.filter(faq => faq.id.startsWith('garantie'))
    },
    {
      id: 'geographie',
      title: 'Zones d\'Intervention',
      icon: '📍',
      items: serrurerieFaq.filter(faq => faq.id.startsWith('geographie'))
    }
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Questions Fréquentes Serrurerie
          </h1>
          <p className={styles.heroSubtitle}>
            Trouvez rapidement les réponses à vos questions sur nos services de serrurerie
          </p>
          <p className={styles.heroDescription}>
            Que ce soit pour une urgence, une réparation ou une installation, consultez notre FAQ complète. 
            Si vous ne trouvez pas votre réponse, notre équipe est disponible 24h/24 au <strong>07 57 83 18 00</strong>.
          </p>
          
          <a 
            href="tel:0123456789" 
            className={styles.ctaButton}
          >
            <span className={styles.ctaIcon}>📞</span>
            <span className={styles.ctaText}>
              <span className={styles.ctaLabel}>Appelez-nous maintenant</span>
              <span className={styles.ctaPhone}>07 57 83 18 00</span>
            </span>
          </a>
        </div>

        {/* <div className={styles.scrollIndicator} aria-hidden="true">
          <span className={styles.scrollText}>Découvrez nos réponses</span>
          <span className={styles.scrollArrow}>↓</span>
        </div> */}
      </section>

      {/* FAQ Content */}
      <div className={styles.faqContainer}>
        {/* Quick Navigation */}
        <div className={styles.quickNav}>
          {categories.map(category => (
            <a 
              key={category.id}
              href={`#${category.id}`}
              className={styles.navItem}
            >
              <span className={styles.navIcon}>{category.icon}</span>
              <span className={styles.navText}>{category.title}</span>
            </a>
          ))}
        </div>

        {/* FAQ Categories */}
        <div className={styles.faqContent}>
          {categories.map(category => (
            <section key={category.id} id={category.id} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  {category.title}
                </h2>
                <p className={styles.categoryCount}>
                  {category.items.length} questions
                </p>
              </div>

              <div className={styles.faqList}>
                {category.items.map(faq => (
                  <div 
                    key={faq.id}
                    className={`${styles.faqItem} ${openFaqs.has(faq.id) ? styles.open : ''}`}
                  >
                    <button
                      className={styles.faqQuestion}
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={openFaqs.has(faq.id)}
                    >
                      <span className={styles.questionText}>{faq.question}</span>
                      <svg 
                        className={styles.chevron} 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M6 9L12 15L18 9" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    
                    <div 
                      className={styles.faqAnswer}
                      aria-hidden={!openFaqs.has(faq.id)}
                    >
                      <div className={styles.answerContent}>
                        {typeof faq.answer === 'string' ? (
                          <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                        ) : faq.answer} 
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <div className={styles.contactCta}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaIcon}>❓</div>
            <div className={styles.ctaContent}>
              <h3 className={styles.ctaTitle}>Question non trouvée ?</h3>
              <p className={styles.ctaDescription}>
                Notre équipe de serruriers experts est à votre écoute 24h/24 pour répondre à toutes vos questions.
              </p>
              <div className={styles.ctaActions}>
                <a href="tel:0123456789" className={styles.phoneButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92C18.75 20.92 16.6 20.21 14.78 18.9C12.98 17.6 11.61 15.79 10.88 13.73C10.15 11.67 10.09 9.47 10.71 7.37C11.33 5.27 12.59 3.38 14.34 2.06C14.77 1.74 15.36 1.87 15.68 2.31C15.99 2.75 15.87 3.33 15.43 3.65C14.04 4.7 13.03 6.15 12.54 7.78C12.04 9.41 12.09 11.15 12.68 12.76C13.27 14.37 14.37 15.75 15.82 16.68C17.27 17.61 18.99 18.04 20.74 17.92C21.28 17.88 21.74 18.34 21.78 18.88C21.82 19.42 21.36 19.88 20.82 19.92H17.82" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Appeler maintenant
                </a>
                <a href="/contact" className={styles.contactButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Formulaire de contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}