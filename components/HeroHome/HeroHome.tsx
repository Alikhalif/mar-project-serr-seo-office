'use client';

import React from 'react';
import styles from './Hero.module.scss';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "Groupe Officiel de Serrurerie en France",
  subtitle = "Réseau national de serruriers certifiés – Intervention 24h/24",
  description = "Depuis plusieurs années, notre groupe fédère des entreprises locales de serrurerie reconnues, spécialisées dans le dépannage d'urgence, la sécurisation des habitations et l'installation de solutions de protection partout en France.",
  ctaPrimaryText = "Découvrir nos services",
  ctaSecondaryText = "Trouver une agence",
  backgroundImage = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
}) => {
  const handlePrimaryCta = () => {
    // Navigate to services page
    console.log('Navigate to services');
  };

  const handleSecondaryCta = () => {
    // Navigate to agencies page
    console.log('Navigate to agencies');
  };

  return (
    <section 
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.overlay}></div>
      
      <div className={styles.content}>
        {/* <div className={styles.badge}>
          <span className={styles.badgeIcon}>🏆</span>
          <span className={styles.badgeText}>Groupe Officiel</span>
        </div> */}
        
        <h1 className={styles.title}>{title}</h1>
        
        <p className={styles.subtitle}>{subtitle}</p>
        
        {/* <p className={styles.description}>{description}</p> */}
        
        <div className={styles.ctaContainer}>
          <p className={styles.ctaPrompt}>
            👉 Accédez à nos services ou trouvez l'agence officielle la plus proche de chez vous.
          </p>
          
          <div className={styles.ctaButtons}>
            <button 
              className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}
              onClick={handlePrimaryCta}
              aria-label={ctaPrimaryText}
            >
              <span className={styles.ctaButtonIcon}>🔘</span>
              <span className={styles.ctaButtonText}>{ctaPrimaryText}</span>
            </button>
            
            <button 
              className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}
              onClick={handleSecondaryCta}
              aria-label={ctaSecondaryText}
            >
              <span className={styles.ctaButtonIcon}>🔘</span>
              <span className={styles.ctaButtonText}>{ctaSecondaryText}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;