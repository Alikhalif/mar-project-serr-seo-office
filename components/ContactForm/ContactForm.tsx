'use client';

import { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { createClient } from '@supabase/supabase-js';
import ReCAPTCHA from 'react-google-recaptcha';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ContactForm.module.scss';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ville: '',
    address: '',
    message: '',
    service: '',
    type_service: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    else if (formData.name.length > 50) newErrors.name = 'Name must be less than 50 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    else if (formData.email.length > 100) newErrors.email = 'Email must be less than 100 characters';

    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\+?[0-9\s\-\(\)]{6,20}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    else if (formData.phone.length > 20) newErrors.phone = 'Phone must be less than 20 characters';

    if (!formData.ville.trim()) newErrors.ville = 'City is required';
    else if (formData.ville.length < 2) newErrors.ville = 'City must be at least 2 characters';
    else if (formData.ville.length > 50) newErrors.ville = 'City must be less than 50 characters';

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    else if (formData.address.length < 5) newErrors.address = 'Address must be at least 5 characters';
    else if (formData.address.length > 100) newErrors.address = 'Address must be less than 100 characters';

    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 2) newErrors.message = 'Message must be at least 2 characters';
    else if (formData.message.length > 500) newErrors.message = 'Message must be less than 500 characters';

    if (formData.service && formData.service.length > 20) {
      newErrors.service = 'Service must be less than 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token || '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    if (!recaptchaToken) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    setIsSubmitting(true);

    try {
      // Verify reCAPTCHA
      const recaptchaResponse = await fetch('../../api/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      const recaptchaResult = await recaptchaResponse.json();

      if (!recaptchaResult.success) {
        toast.error('reCAPTCHA verification failed');
        recaptchaRef.current?.reset();
        setRecaptchaToken('');
        return;
      }

      // Get IP address
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;
      const service = 'Serrurier';

      // Initialize Supabase
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Insert into Supabase
      const { error } = await supabase
        .from('contacts')
        .insert([{
          ...formData,
          ip_address: ipAddress,
          service: service,
          created_at: new Date().toISOString(),
        }]);

      if (error) throw error;

      toast.success('Message sent successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        ville: '',
        address: '',
        message: '',
        service: '',
        type_service: ''
      });
      setErrors({});
      recaptchaRef.current?.reset();
      setRecaptchaToken('');
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={5000} />
      
      <div className={styles.card}>
        <div className={styles.header}>
          {/* <h1 className={styles.title}>Contactez Notre Équipe</h1> */}
          <p className={styles.subtitle}>
            Besoin d'un serrurier d'urgence ? Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
          </p>
        </div>

        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formHeader}>
              <div className={styles.formIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V12" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8H12.01" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Formulaire de Contact</h2>
              <p className={styles.formSubtitle}>Tous les champs sont requis pour un traitement rapide</p>
            </div>

            <div className={styles.grid}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  <span className={styles.labelText}>Nom complet</span>
                  <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className={`${styles.input} ${errors.name ? styles.error : ''}`}
                  />
                  <div className={styles.inputIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  <span className={styles.labelText}>Email</span>
                  <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean@exemple.com"
                    className={`${styles.input} ${errors.email ? styles.error : ''}`}
                  />
                  <div className={styles.inputIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  <span className={styles.labelText}>Téléphone</span>
                  <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="07 57 83 18 00"
                    className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                  />
                  <div className={styles.inputIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92C18.75 20.92 16.6 20.21 14.78 18.9C12.98 17.6 11.61 15.79 10.88 13.73C10.15 11.67 10.09 9.47 10.71 7.37C11.33 5.27 12.59 3.38 14.34 2.06C14.77 1.74 15.36 1.87 15.68 2.31C15.99 2.75 15.87 3.33 15.43 3.65C14.04 4.7 13.03 6.15 12.54 7.78C12.04 9.41 12.09 11.15 12.68 12.76C13.27 14.37 14.37 15.75 15.82 16.68C17.27 17.61 18.99 18.04 20.74 17.92C21.28 17.88 21.74 18.34 21.78 18.88C21.82 19.42 21.36 19.88 20.82 19.92H17.82" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  <span className={styles.labelText}>Ville</span>
                  <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    name="ville"
                    value={formData.ville}
                    onChange={handleChange}
                    placeholder="Paris"
                    className={`${styles.input} ${errors.ville ? styles.error : ''}`}
                  />
                  <div className={styles.inputIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                {errors.ville && <span className={styles.errorText}>{errors.ville}</span>}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  <span className={styles.labelText}>Adresse</span>
                  <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Rue de Paris"
                    className={`${styles.input} ${errors.address ? styles.error : ''}`}
                  />
                  <div className={styles.inputIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                {errors.address && <span className={styles.errorText}>{errors.address}</span>}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  <span className={styles.labelText}>Type d'urgence</span>
                  <span className={styles.required}>*</span>
                </label>
                <div className={styles.selectWrapper}>
                  <select
                    name="type_service"
                    value={formData.type_service}
                    onChange={handleChange}
                    className={`${styles.select} ${errors.type_service ? styles.error : ''}`}
                  >
                    <option value="">Sélectionnez un type d'urgence</option>
                    <option value="urgence">🔓 Ouverture de porte bloquée</option>
                    <option value="clé">🔑 Clé cassée dans la serrure</option>
                    <option value="perte">🗝️ Perte de clés</option>
                    <option value="reparation">🔧 Réparation de serrure</option>
                    <option value="installation">🏠 Installation de sécurité</option>
                    <option value="autre">❓ Autre demande</option>
                  </select>
                  <div className={styles.selectIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                {errors.service && <span className={styles.errorText}>{errors.service}</span>}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>
                <span className={styles.labelText}>Description du problème</span>
                <span className={styles.required}>*</span>
              </label>
              <div className={styles.textareaWrapper}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre problème en détail (type de porte, heure de l'incident, etc.)"
                  rows={4}
                  className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                />
                <div className={styles.textareaIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 7H16M8 11H12M8 15H13M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              <div className={styles.counter}>
                <span>{formData.message.length}/500 caractères</span>
              </div>
            </div>

            <div className={styles.recaptchaSection}>
              <div className={styles.recaptchaHeader}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V12" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8H12.01" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Sécurité du formulaire</span>
              </div>
              <div className={styles.recaptcha}>
                {siteKey ? (
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteKey}
                    onChange={onRecaptchaChange}
                  />
                ) : (
                  <div className={styles.recaptchaError}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16H12.01" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>reCAPTCHA non configuré - Veuillez contacter l'administrateur</span>
                  </div>
                )}
                {!recaptchaToken && siteKey && (
                  <div className={styles.recaptchaHint}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16H12.01" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Veuillez vérifier que vous n'êtes pas un robot</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.formFooter}>
              <p className={styles.privacyNote}>
                En soumettant ce formulaire, vous acceptez notre <a href="/privacy" className={styles.privacyLink}>politique de confidentialité</a>. 
                Nous ne partagerons jamais vos informations avec des tiers.
              </p>
              
              <button 
                type="submit" 
                disabled={isSubmitting || !recaptchaToken}
                className={styles.submitButton}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.buttonSpinner}></span>
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Envoyer la demande d'urgence
                  </>
                )}
              </button>

              <div className={styles.emergencyContact}>
                <div className={styles.emergencyIcon}>🚨</div>
                <div className={styles.emergencyInfo}>
                  <h4>Urgence immédiate ?</h4>
                  <p>Appelez-nous directement au <a href="tel:0123456789" className={styles.emergencyPhone}>07 57 83 18 00</a></p>
                  <p className={styles.emergencyHours}>Disponible 24h/24 et 7j/7</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}