// app/villes/[city]/page.tsx
import { notFound } from 'next/navigation';
import { allCities, citiesByDepartment, DepartmentKey } from '@/data/cities-by-department';
import styles from './style.module.scss';

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  return allCities.map((city) => ({
    city: city.slug,
  }));
}

export default async function CityPage({ params }: PageProps) {
  const { city } = await params;
  
  // Find city data
  const cityData = allCities.find(c => c.slug === city);
  
  if (!cityData) {
    notFound();
  }
  
  // Type-safe way to get department cities
  const departmentKey = cityData.departmentKey as DepartmentKey;
  const departmentCities = citiesByDepartment[departmentKey]?.cities || [];
  
  // Filter out current city
  const otherCitiesInDepartment = departmentCities.filter(
    c => c !== cityData.name
  );

  return (
    <div className={styles.cityPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Serrurier à {cityData.name} - {cityData.department}
          </h1>
          <p className={styles.subtitle}>
            Urgence 24h/24 - 7j/7 • Intervention rapide • Prix transparent
          </p>
          <div className={styles.description}>
            <p>Besoin d&apos;un serrurier professionnel à <strong>{cityData.name}</strong> ? Notre équipe intervient rapidement pour toute urgence de serrurerie dans le département {cityData.department}.</p>
          </div>
          
          <button className={styles.ctaButton}>
            <span className={styles.ctaIcon}>📞</span>
            <span className={styles.ctaText}>
              <span className={styles.ctaLabel}>Appelez-nous</span>
              <span className={styles.ctaPhone}>07 57 83 18 00</span>
            </span>
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <h2>Nos services à {cityData.name}</h2>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <h3>🔓 Ouverture de porte</h3>
            <p>Claquement de porte, clé cassée, perte de clés</p>
          </div>
          <div className={styles.serviceCard}>
            <h3>🔧 Réparation de serrure</h3>
            <p>Serrure bloquée, cylindre défectueux, clé qui tourne dans le vide</p>
          </div>
          <div className={styles.serviceCard}>
            <h3>🚨 Urgence 24/7</h3>
            <p>Intervention rapide en moins de 30 minutes</p>
          </div>
          <div className={styles.serviceCard}>
            <h3>🏡 Installation sécurité</h3>
            <p>Pose de serrures haute sécurité, blindage</p>
          </div>
        </div>
      </section>

      {/* Department Cities */}
      {otherCitiesInDepartment.length > 0 && (
        <section className={styles.departmentCities}>
          <h2>Nos interventions dans le {cityData.department}</h2>
          <div className={styles.citiesGrid}>
            {otherCitiesInDepartment.map((otherCity, index) => {
              const otherCitySlug = otherCity
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '');
              
              return (
                <a 
                  key={index} 
                  href={`/villes/${otherCitySlug}`}
                  className={styles.cityLink}
                >
                  {otherCity}
                </a>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}