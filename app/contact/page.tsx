// app/contact/page.tsx
import ContactForm from '../../components/ContactForm/ContactForm';
import styles from './page.module.scss';

export const metadata = {
  title: 'Contact | Groupe Officiel de Serrurerie',
  description: 'Contactez-nous pour toute demande d\'information, devis ou intervention urgente. Réseau national de serruriers certifiés.',
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Contactez notre réseau
          </h1>
          {/* <p className={styles.heroSubtitle}>
            Remplissez le formulaire pour toute demande d'information, devis ou intervention urgente.
          </p> */}
          <div className={styles.heroBadge}>
            <span className={styles.badgeIcon}>📞</span>
            <span className={styles.badgeText}>
              Réponse sous 24h
            </span>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Info Section */}
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <span>📧</span>
              </div>
              <h3 className={styles.infoTitle}>Par email</h3>
              <p className={styles.infoText}>contact@serrurier-officiel.fr</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <span>📞</span>
              </div>
              <h3 className={styles.infoTitle}>Par téléphone</h3>
              <p className={styles.infoText}>01 23 45 67 89</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <span>🕒</span>
              </div>
              <h3 className={styles.infoTitle}>Disponibilité</h3>
              <p className={styles.infoText}>24h/24 • 7j/7</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}