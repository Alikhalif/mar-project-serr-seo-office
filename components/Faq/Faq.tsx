'use client';

import React, { useState } from 'react';
import styles from './Faq.module.scss';

export interface FaqItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

export interface FaqProps {
  title?: string;
  items: FaqItem[];
  ctaText?: string;
  ctaLink?: string;
  defaultExpandedId?: string;
  className?: string;
}

const Faq: React.FC<FaqProps> = ({
  title = "Questions fréquentes",
  items,
  ctaText = "Voir toutes les questions",
  ctaLink,
  defaultExpandedId,
  className = ''
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    defaultExpandedId || (items.length > 0 ? items[0].id : null)
  );

  const toggleQuestion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCtaClick = () => {
    if (ctaLink) {
      window.location.href = ctaLink;
    }
  };

  return (
    <section className={`${styles.faq} ${className}`}>
      <div className={styles.container}>
        {title && <h2 className={styles.title}>{title}</h2>}
        
        <div className={styles.list}>
          {items.map((item) => (
            <article 
              key={item.id}
              className={`${styles.item} ${expandedId === item.id ? styles.itemExpanded : ''}`}
            >
              <button
                type="button"
                className={styles.question}
                onClick={() => toggleQuestion(item.id)}
                aria-expanded={expandedId === item.id}
                aria-controls={`faq-answer-${item.id}`}
              >
                <h3 className={styles.questionText}>{item.question}</h3>
                <span 
                  className={`${styles.icon} ${expandedId === item.id ? styles.iconRotated : ''}`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>

              <div
                className={`${styles.answer} ${expandedId === item.id ? styles.answerVisible : ''}`}
                id={`faq-answer-${item.id}`}
                role="region"
              >
                <div className={styles.answerContent}>
                  {typeof item.answer === 'string' ? (
                    <p className={styles.answerText}>{item.answer}</p>
                  ) : (
                    item.answer
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {ctaText && (
          <div className={styles.ctaContainer}>
            <button 
              className={styles.ctaButton}
              onClick={handleCtaClick}
              aria-label={ctaText}
              disabled={!ctaLink}
            >
              <span className={styles.ctaIcon}>🔗</span>
              <span className={styles.ctaText}>{ctaText}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Faq;