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
    service: ''
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
        service: ''
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
          {/* <h1 className={styles.title}>Contactez-nous</h1> */}
          <p className={styles.subtitle}>Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Nom complet </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jean Dupont"
                className={errors.name ? styles.error : ''}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label>Email </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jean@exemple.com"
                className={errors.email ? styles.error : ''}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label>Téléphone </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01 23 45 67 89"
                className={errors.phone ? styles.error : ''}
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>

            <div className={styles.field}>
              <label>Ville </label>
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                placeholder="Paris"
                className={errors.ville ? styles.error : ''}
              />
              {errors.ville && <span className={styles.errorText}>{errors.ville}</span>}
            </div>

            <div className={styles.field}>
              <label>Adresse </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Rue de Paris"
                className={errors.address ? styles.error : ''}
              />
              {errors.address && <span className={styles.errorText}>{errors.address}</span>}
            </div>

            {/* <div className={styles.field}>
              <label>Service demandé</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">Sélectionnez un service</option>
                <option value="urgence">Urgence Serrurier</option>
                <option value="ouverture">Ouverture de Porte</option>
                <option value="reparation">Réparation de Serrure</option>
                <option value="installation">Installation Sécurité</option>
                <option value="devis">Devis Gratuit</option>
              </select>
            </div> */}
          </div>

          <div className={styles.field}>
            <label>Message </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Décrivez votre problème ou demande..."
              rows={4}
              className={errors.message ? styles.error : ''}
            />
            {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            <div className={styles.counter}>
              {formData.message.length}/500 caractères
            </div>
          </div>

          <div className={styles.recaptcha}>
            {siteKey ? (
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={siteKey}
                onChange={onRecaptchaChange}
              />
            ) : (
              <p style={{ color: 'red', fontSize: '14px' }}>
                reCAPTCHA non configuré
              </p>
            )}
            {!recaptchaToken && (
              <div className={styles.recaptchaHint}>Veuillez vérifier que vous n'êtes pas un robot</div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || !recaptchaToken}
            className={styles.button}
          >
            {isSubmitting ? (
              <>
                <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Envoi en cours...
              </>
            ) : 'Envoyer le message'}
          </button>
        </form>
      </div>
    </div>
  );
}