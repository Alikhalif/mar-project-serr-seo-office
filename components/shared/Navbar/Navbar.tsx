// app/components/Navbar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { allDepartments, citiesByDepartment } from '@/data/cities-by-department';
import { DepartmentKey } from '@/data/cities-by-department';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeDepartment, setActiveDepartment] = useState<string | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const departmentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setActiveDepartment(null);
      }
      if (departmentsRef.current && !departmentsRef.current.contains(event.target as Node)) {
        setActiveDepartment(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  const toggleDropdown = (dropdownName: string) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
      setActiveDepartment(null);
    } else {
      setActiveDropdown(dropdownName);
      if (dropdownName !== 'departments') {
        setActiveDepartment(null);
      }
    }
  };

  const handleDepartmentClick = (departmentId: string) => {
    if (activeDepartment === departmentId) {
      setActiveDepartment(null);
    } else {
      setActiveDepartment(departmentId);
    }
  };

  const handleCityClick = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setActiveDepartment(null);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navbarContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={() => {
          setMobileMenuOpen(false);
          setActiveDropdown(null);
          setActiveDepartment(null);
        }}>
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
        <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.active : ''}`} ref={dropdownRef}>
          <Link href="/" className={styles.navLink} onClick={() => {
            setMobileMenuOpen(false);
            setActiveDropdown(null);
            setActiveDepartment(null);
          }}>
            Accueil
          </Link>

          {/* Services Dropdown */}
          <div className={styles.dropdown}>
            <button 
              className={`${styles.dropdownToggle} ${activeDropdown === 'services' ? styles.active : ''}`}
              onClick={() => toggleDropdown('services')}
              aria-expanded={activeDropdown === 'services'}
            >
              Nos Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={activeDropdown === 'services' ? styles.rotate : ''}>
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {activeDropdown === 'services' && (
              <div className={styles.dropdownMenu}>
                <Link href="/nos-services/urgence-serrurier" className={styles.dropdownItem} onClick={handleCityClick}>
                  🔥 Urgence Serrurier
                </Link>
                <Link href="/nos-services/ouverture-porte" className={styles.dropdownItem} onClick={handleCityClick}>
                  🔓 Ouverture de Porte
                </Link>
                <Link href="/nos-services/reparation-serrure" className={styles.dropdownItem} onClick={handleCityClick}>
                  🔧 Réparation de Serrure
                </Link>
                <Link href="/nos-services/installation-securite" className={styles.dropdownItem} onClick={handleCityClick}>
                  🏡 Installation Sécurité
                </Link>
                <Link href="/nos-services/serrurier-pas-cher" className={styles.dropdownItem} onClick={handleCityClick}>
                  💰 Serrurier Pas Cher
                </Link>
              </div>
            )}
          </div>

          {/* Departments Dropdown */}
          <div className={styles.dropdown} ref={departmentsRef}>
            <button 
              className={`${styles.dropdownToggle} ${activeDropdown === 'departments' ? styles.active : ''}`}
              onClick={() => toggleDropdown('departments')}
              aria-expanded={activeDropdown === 'departments'}
            >
              Nos Départements
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={activeDropdown === 'departments' ? styles.rotate : ''}>
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {activeDropdown === 'departments' && (
              <div className={`${styles.dropdownMenu} ${styles.departmentsMenu}`}>
                <div className={styles.departmentsWrapper}>
                  {/* Departments List */}
                  <div className={styles.departmentsList}>
                    {allDepartments.map((dept) => {
                      const deptKey = getDepartmentKey(dept.name);
                      return (
                        <button
                          key={dept.id}
                          className={`${styles.departmentItem} ${activeDepartment === dept.id ? styles.active : ''}`}
                          onClick={() => handleDepartmentClick(dept.id)}
                          aria-expanded={activeDepartment === dept.id}
                        >
                          <span className={styles.departmentName}>{dept.department}</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      );
                    })}
                  </div>

                  {/* Cities List for Active Department */}
                  <div className={styles.citiesPanel}>
                    {activeDepartment ? (
                      <>
                        <div className={styles.citiesHeader}>
                          <h4 className={styles.citiesTitle}>
                            {allDepartments.find(d => d.id === activeDepartment)?.department}
                          </h4>
                          <button 
                            className={styles.citiesBack}
                            onClick={() => setActiveDepartment(null)}
                            aria-label="Retour aux départements"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Retour
                          </button>
                        </div>
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
                              onClick={handleCityClick}
                            >
                              {city}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className={styles.citiesPlaceholder}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>Cliquez sur un département pour voir ses villes</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/faq" className={styles.navLink} onClick={() => {
            setMobileMenuOpen(false);
            setActiveDropdown(null);
            setActiveDepartment(null);
          }}>
            FAQ
          </Link>
          <Link href="/contact" className={styles.navLink} onClick={() => {
            setMobileMenuOpen(false);
            setActiveDropdown(null);
            setActiveDepartment(null);
          }}>
            Contact
          </Link>
        </div>

        {/* Call Button */}
        <a 
          href="tel:0123456789" 
          className={`${styles.ctaButton} ${isScrolled ? styles.scrolledCta : ''}`}
          onClick={() => {
            setActiveDropdown(null);
            setActiveDepartment(null);
          }}
        >
          <span className={styles.ctaIcon}>📞</span>
          <span className={styles.ctaText}>
            <span className={styles.ctaLabel}>Urgence 24h/24</span>
            <span className={styles.ctaPhone}>07 57 83 18 00</span>
          </span>
        </a>
      </div>
    </nav>
  );
}