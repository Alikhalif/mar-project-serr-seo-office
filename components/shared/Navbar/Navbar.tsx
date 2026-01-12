// app/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { allDepartments, citiesByDepartment } from '@/data/cities-by-department';
import { DepartmentKey } from '@/data/cities-by-department';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeDepartment, setActiveDepartment] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const createSlug = (cityName: string) => {
    return cityName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/[àâ]/g, 'a')
      .replace(/[éèêë]/g, 'e')
      .replace(/[îï]/g, 'i')
      .replace(/[ôö]/g, 'o')
      .replace(/[ùûü]/g, 'u')
      .replace(/ç/g, 'c');
  };

  const getDepartmentKey = (departmentName: string): DepartmentKey => {
    return departmentName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') as DepartmentKey;
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navbarContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5L35 15V35H5V15L20 5Z" stroke={isScrolled ? "#DC2626" : "#FFFFFF"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 25C22.7614 25 25 22.7614 25 20C25 17.2386 22.7614 15 20 15C17.2386 15 15 17.2386 15 20C15 22.7614 17.2386 25 20 25Z" stroke={isScrolled ? "#DC2626" : "#FFFFFF"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 15V25" stroke={isScrolled ? "#DC2626" : "#FFFFFF"} strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M15 20H25" stroke={isScrolled ? "#DC2626" : "#FFFFFF"} strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M8 12L32 12" stroke={isScrolled ? "#DC2626" : "#FFFFFF"} strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <div className={styles.logoText}>
            <span className={styles.logoPrimary}>LOCK</span>
            <span className={styles.logoSecondary}>PRO</span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.active : ''}`}></span>
        </button>

        {/* Navigation Links */}
        <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.active : ''}`}>
          <Link href="/" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
            Accueil
          </Link>

          {/* Services Dropdown */}
          <div className={styles.dropdown}>
            <button 
              className={styles.dropdownToggle}
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setTimeout(() => setActiveDropdown(null), 200)}
            >
              Nos Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {activeDropdown === 'services' && (
              <div 
                className={styles.dropdownMenu}
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setTimeout(() => setActiveDropdown(null), 200)}
              >
                <Link href="/nos-services/urgence-serrurier" className={styles.dropdownItem}>
                  🔥 Urgence Serrurier
                </Link>
                <Link href="/nos-services/ouverture-porte" className={styles.dropdownItem}>
                  🔓 Ouverture de Porte
                </Link>
                <Link href="/nos-services/reparation-serrure" className={styles.dropdownItem}>
                  🔧 Réparation de Serrure
                </Link>
                <Link href="/nos-services/installation-securite" className={styles.dropdownItem}>
                  🏡 Installation Sécurité
                </Link>
                <Link href="/nos-services/serrurier-pas-cher" className={styles.dropdownItem}>
                  💰 Serrurier Pas Cher
                </Link>
              </div>
            )}
          </div>

          {/* Departments Dropdown */}
          <div 
            className={styles.dropdown}
            onMouseEnter={() => setActiveDropdown('departments')}
            onMouseLeave={() => {
              setTimeout(() => {
                setActiveDropdown(null);
                setActiveDepartment(null);
              }, 200);
            }}
          >
            <button className={styles.dropdownToggle}>
              Nos Départements
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {activeDropdown === 'departments' && (
              <div 
                className={`${styles.dropdownMenu} ${styles.departmentsMenu}`}
                onMouseEnter={() => setActiveDropdown('departments')}
              >
                <div className={styles.departmentsWrapper}>
                  {/* Departments List */}
                  <div className={styles.departmentsList}>
                    {allDepartments.map((dept) => {
                      const deptKey = getDepartmentKey(dept.name);
                      return (
                        <div 
                          key={dept.id}
                          className={`${styles.departmentItem} ${activeDepartment === dept.id ? styles.active : ''}`}
                          onMouseEnter={() => setActiveDepartment(dept.id)}
                        >
                          <span className={styles.departmentName}>{dept.department}</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      );
                    })}
                  </div>

                  {/* Cities List for Active Department */}
                  <div className={styles.citiesPanel}>
                    {activeDepartment ? (
                      <>
                        <h4 className={styles.citiesTitle}>
                          {allDepartments.find(d => d.id === activeDepartment)?.department}
                        </h4>
                        <div className={styles.citiesGrid}>
                          {citiesByDepartment[
                            getDepartmentKey(
                              allDepartments.find(d => d.id === activeDepartment)?.name || ''
                            )
                          ]?.cities.map((city) => (
                            <Link 
                              key={city} 
                              href={`/villes/${createSlug(city)}`}
                              className={styles.cityLink}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {city}
                            </Link>
                          ))}
                        </div>
                        {/* <div className={styles.viewAllLink}>
                          <Link 
                            href={`/nos-agences?department=${activeDepartment}`}
                            className={styles.allCitiesLink}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Voir toutes les villes de ce département →
                          </Link>
                        </div> */}
                      </>
                    ) : (
                      <div className={styles.citiesPlaceholder}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>Sélectionnez un département pour voir les villes</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/faq" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
            FAQ
          </Link>
          <Link href="/contact" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>
        </div>

        {/* Call Button */}
        <a 
          href="tel:0123456789" 
          className={`${styles.ctaButton} ${isScrolled ? styles.scrolledCta : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92C18.75 20.92 16.6 20.21 14.78 18.9C12.98 17.6 11.61 15.79 10.88 13.73C10.15 11.67 10.09 9.47 10.71 7.37C11.33 5.27 12.59 3.38 14.34 2.06C14.77 1.74 15.36 1.87 15.68 2.31C15.99 2.75 15.87 3.33 15.43 3.65C14.04 4.7 13.03 6.15 12.54 7.78C12.04 9.41 12.09 11.15 12.68 12.76C13.27 14.37 14.37 15.75 15.82 16.68C17.27 17.61 18.99 18.04 20.74 17.92C21.28 17.88 21.74 18.34 21.78 18.88C21.82 19.42 21.36 19.88 20.82 19.92H17.82" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.83 9.92C15.38 9.92 15.83 9.47 15.83 8.92C15.83 8.37 15.38 7.92 14.83 7.92C14.28 7.92 13.83 8.37 13.83 8.92C13.83 9.47 14.28 9.92 14.83 9.92Z" fill="white"/>
          </svg>
          <span className={styles.ctaText}>
            <span className={styles.ctaLabel}>Urgence 24/7</span>
            <span className={styles.ctaPhone}>01 23 45 67 89</span>
          </span>
        </a>
      </div>
    </nav>
  );
}