// app/data/serrurerie-faq.ts
import FaqItem from "@/components/Faq/Faq";
import React from 'react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string ;
}


export const serrurerieFaq: FaqItem[] = [
  {
    id: 'urgence-1',
    question: 'Quels sont vos délais d\'intervention en cas d\'urgence ?',
    answer: `
        <p>Nous intervenons <strong>en moins de 30 minutes</strong> dans la plupart des cas d'urgence. Notre service d'urgence 24h/24 et 7j/7 nous permet de répondre immédiatement à vos besoins, que ce soit le dimanche, les jours fériés ou même la nuit.</p>
        <p>Nous traitons en priorité les urgences suivantes :</p>
        <ul>
          <li>🔓 Ouverture de porte claquée</li>
          <li>🔑 Clé cassée dans la serrure</li>
          <li>🚪 Porte blindée bloquée</li>
          <li>🏠 Perte totale des clés</li>
        </ul>
      `
    
  },
  {
    id: 'urgence-2',
    question: 'Que faire si ma clé est cassée dans la serrure ?',
    answer: `
        <p>Si votre clé s'est cassée dans la serrure, <strong>ne tentez pas de l'enlever vous-même</strong> car vous risquez d'endommager définitivement le cylindre.</p>
        <p>Nos serruriers sont équipés d'outils spécialisés pour :</p>
        <ul>
          <li>Extraire délicatement le morceau de clé coincé</li>
          <li>Réparer ou remplacer le cylindre sans abîmer la porte</li>
          <li>Vous fournir de nouvelles clés sur place</li>
        </ul>
        <p>L'intervention coûte généralement entre 80€ et 120€, cylindre fourni.</p>
      `
  },
  {
    id: 'urgence-3',
    question: 'Combien coûte une ouverture de porte en urgence ?',
    answer: `
        <p>Le tarif d'une ouverture de porte varie selon plusieurs facteurs :</p>
        <ul>
          <li><strong>Type de porte</strong> : Simple (60-90€) / Blindée (90-140€) / Portail (100-160€)</li>
          <li><strong>Heure de l'intervention</strong> : Jours ouvrables (tarif normal) / Nuit, dimanche, férié (+30%)</li>
          <li><strong>Éloignement</strong> : Paris intramuros / Banlieue proche / Grand Paris</li>
        </ul>
        <p>Nous pratiquons des <strong>prix transparents et sans surprise</strong>. Un devis gratuit vous est communiqué par téléphone avant toute intervention.</p>
      `
  },
  {
    id: 'urgence-4',
    question: 'Intervenez-vous la nuit et le dimanche ?',
    answer: `
        <p><strong>Oui, notre service d'urgence fonctionne 24h/24 et 7j/7</strong>, y compris les dimanches et jours fériés.</p>
        <p>Pour les interventions nocturnes (22h-6h) et dominicales, une majoration de 30% s'applique. Cette majoration couvre :</p>
        <ul>
          <li>La disponibilité immédiate de nos techniciens</li>
          <li>Les frais de déplacement supplémentaires</li>
          <li>La garantie d'intervention rapide quelle que soit l'heure</li>
        </ul>
      `
  },
  {
    id: 'reparation-1',
    question: 'Comment savoir si ma serrure doit être changée ou réparée ?',
    answer: `
        <p>Plusieurs signes indiquent qu'une intervention est nécessaire :</p>
        <ul>
          <li><strong>À changer impérativement</strong> :
            <ul>
              <li>Serrure forcée ou tentative d'effraction</li>
              <li>Cylindre grippé ou rouillé</li>
              <li>Clés perdues ou volées</li>
            </ul>
          </li>
          <li><strong>Réparable dans la plupart des cas</strong> :
            <ul>
              <li>Clé qui tourne difficilement</li>
              <li>Pêne qui ne rentre plus complètement</li>
              <li>Bruit anormal au verrouillage</li>
            </ul>
          </li>
        </ul>
        <p>Nos techniciens peuvent évaluer gratuitement l'état de votre serrure lors de leur passage.</p>
      `
  },
  {
    id: 'reparation-2',
    question: 'Combien de temps pour changer une serrure complète ?',
    answer: `
        <p>Le changement d'une serrure standard prend généralement <strong>30 à 45 minutes</strong>. Pour une serrure 3 points ou une porte blindée, comptez <strong>1 à 2 heures</strong> selon la complexité.</p>
        <p>Les étapes incluent :</p>
        <ol>
          <li>Démontage de l'ancienne serrure (10-15 min)</li>
          <li>Préparation de l'emplacement (5-10 min)</li>
          <li>Pose et fixation de la nouvelle serrure (15-20 min)</li>
          <li>Réglage et tests de fonctionnement (5-10 min)</li>
        </ol>
      `
  },
  {
    id: 'reparation-3',
    question: 'Quelle est la durée de vie moyenne d\'une serrure ?',
    answer: `
        <p>La durée de vie varie selon l'usage et la qualité :</p>
        <ul>
          <li><strong>Serrure standard</strong> : 5 à 10 ans</li>
          <li><strong>Serrure haute sécurité (3 points)</strong> : 10 à 15 ans</li>
          <li><strong>Serrure de porte blindée</strong> : 15 à 20 ans</li>
        </ul>
        <p>Facteurs qui réduisent la durée de vie :</p>
        <ul>
          <li>Utilisation intensive (porte d'entrée principale)</li>
          <li>Exposition aux intempéries (porte extérieure)</li>
          <li>Qualité des clés et du cylindre</li>
          <li>Manque d'entretien régulier</li>
        </ul>
      `
  },
  {
    id: 'securite-1',
    question: 'Quelle est la meilleure serrure pour sécuriser ma maison ?',
    answer: `
        <p>Pour une sécurité optimale, nous recommandons :</p>
        <ul>
          <li><strong>Niveau 1 (Sécurité basique)</strong> : Serrure 3 points A2P (de 150€ à 300€)</li>
          <li><strong>Niveau 2 (Sécurité renforcée)</strong> : Serrure multipoints + cylindre haute sécurité (300€ à 500€)</li>
          <li><strong>Niveau 3 (Sécurité maximale)</strong> : Porte blindée avec serrure certifiée A2P 3* (à partir de 800€)</li>
        </ul>
        <p>Nos serrures A2P (Assurance Prévention Protection) sont certifiées et ouvrent droit à des <strong>réductions sur votre assurance habitation</strong> (jusqu'à 20%).</p>
      `
  },
  {
    id: 'securite-2',
    question: 'Qu\'est-ce qu\'une serrure A2P et pourquoi est-elle importante ?',
    answer: `
        <p>La certification <strong>A2P (Assurance Prévention Protection)</strong> est un label de sécurité reconnu par les compagnies d'assurance.</p>
        <p>Une serrure A2P offre :</p>
        <ul>
          <li><strong>Résistance aux tentatives d'effraction</strong> : 5 à 15 minutes selon le niveau (1 à 3 étoiles)</li>
          <li><strong>Réduction de prime d'assurance</strong> : Jusqu'à 20% selon votre contrat</li>
          <li><strong>Garantie constructeur</strong> : 2 à 5 ans selon les marques</li>
          <li><strong>Indemnisation facilitée</strong> en cas de vol avec effraction</li>
        </ul>
      `
  },
  {
    id: 'securite-3',
    question: 'Combien coûte l\'installation d\'une porte blindée ?',
    answer: `
        <p>Le coût d'une porte blindée varie de <strong>800€ à 2500€</strong> selon plusieurs critères :</p>
        <ul>
          <li><strong>Porte seule</strong> : 600-1500€ (matériel)</li>
          <li><strong>Pose professionnelle</strong> : 200-400€ (main d'œuvre)</li>
          <li><strong>Serrure certifiée A2P 3*</strong> : +100-300€</li>
          <li><strong>Options</strong> : Oeilleton numérique, double serrure, etc.</li>
        </ul>
        <p>Notre devis comprend toujours : la porte, la serrure, la pose, la finition et la garantie 2 ans.</p>
      `
  },
  {
    id: 'prix-1',
    question: 'Pourquoi les prix des serruriers varient-ils autant ?',
    answer: `
        <p>Plusieurs facteurs expliquent les variations de prix :</p>
        <ul>
          <li><strong>Qualité du matériel</strong> : Cylindre européen (15€) vs cylindre haute sécurité (60-100€)</li>
          <li><strong>Expérience du serrurier</strong> : Artisan qualifié vs débutant</li>
          <li><strong>Urgence de l'intervention</strong> : Heures normales vs nuit/dimanche</li>
          <li><strong>Garanties offertes</strong> : Garantie 1 an vs garantie 5 ans</li>
          <li><strong>Transparence</strong> : Devis détaillé vs prix forfaitaire imprécis</li>
        </ul>
        <p>Notre politique : <strong>transparence totale, devis détaillé par téléphone, pas de surprise</strong>.</p>
      `
  },
  {
    id: 'prix-2',
    question: 'Comment obtenir un serrurier pas cher sans compromettre la qualité ?',
    answer: `
        <p>Voici nos conseils pour réduire les coûts :</p>
        <ul>
          <li><strong>Planifier à l'avance</strong> : Évitez les interventions en urgence (+30% en moyenne)</li>
          <li><strong>Choisir le bon moment</strong> : Lundi-vendredi 8h-18h (tarifs normaux)</li>
          <li><strong>Opter pour la réparation</strong> quand c'est possible plutôt que le remplacement</li>
          <li><strong>Demander plusieurs devis</strong> mais comparer ce qui est comparable</li>
          <li><strong>Vérifier les certifications</strong> : Mieux vaut payer un peu plus pour un travail garanti</li>
        </ul>
        <p>Nous proposons des <strong>forfaits économiques</strong> pour les interventions programmées.</p>
      `
  },
  {
    id: 'prix-3',
    question: 'Quels sont vos tarifs pour les services les plus courants ?',
    answer: `
        <p>Nos tarifs indicatifs (hors urgences) :</p>
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Prix moyen</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ouverture porte simple</td>
              <td>60-90€</td>
              <td>15-30 min</td>
            </tr>
            <tr>
              <td>Changement cylindre standard</td>
              <td>80-120€</td>
              <td>20-40 min</td>
            </tr>
            <tr>
              <td>Réparation serrure 3 points</td>
              <td>100-160€</td>
              <td>30-60 min</td>
            </tr>
            <tr>
              <td>Installation serrure A2P</td>
              <td>150-300€</td>
              <td>45-90 min</td>
            </tr>
            <tr>
              <td>Pose porte blindée</td>
              <td>à partir de 800€</td>
              <td>2-4 heures</td>
            </tr>
          </tbody>
        </table>
        <p><em>* Prix TTC, déplacement inclus dans Paris et petite couronne. Devis gratuit par téléphone.</em></p>
      `
  },
  {
    id: 'garantie-1',
    question: 'Quelles garanties offrez-vous sur vos interventions ?',
    answer: `
        <p>Toutes nos interventions bénéficient de :</p>
        <ul>
          <li><strong>Garantie pièces</strong> : 2 ans sur les serrures et cylindres</li>
          <li><strong>Garantie main d'œuvre</strong> : 1 an sur la pose et le réglage</li>
          <li><strong>Assurance responsabilité civile professionnelle</strong> : 5 millions d'euros</li>
          <li><strong>Garantie satisfaction</strong> : Nous revenons gratuitement si le problème persiste dans les 48h</li>
        </ul>
        <p>Nous travaillons exclusivement avec des marques reconnues : <strong>Vachette, Fichet, Hoppe, ABUS, Kaba</strong>.</p>
      `
  },
  {
    id: 'garantie-2',
    question: 'Comment contester une facture ou signaler un problème ?',
    answer: `
        <p>Notre processus de réclamation :</p>
        <ol>
          <li><strong>Contact immédiat</strong> : Appelez-nous dans les 24h (07 57 83 18 00)</li>
          <li><strong>Photos/vidéos</strong> : Envoyez-nous des preuves par email</li>
          <li><strong>Intervention de contrôle</strong> : Un technicien senior passe gratuitement dans les 48h</li>
          <li><strong>Solution proposée</strong> : Réparation, remplacement ou remboursement selon le cas</li>
        </ol>
        <p>Nous résolvons <strong>98% des réclamations en moins de 72h</strong>. En cas de désaccord persistant, vous pouvez saisir la Médiation de la Consommation.</p>
      `
  },
  {
    id: 'geographie-1',
    question: 'Intervenez-vous dans toute la région parisienne ?',
    answer: `
        <p><strong>Oui, nous couvrons l'ensemble de l'Île-de-France</strong> :</p>
        <ul>
          <li><strong>Paris intra-muros</strong> : Tous les arrondissements (1 à 20)</li>
          <li><strong>Petite couronne</strong> : Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94)</li>
          <li><strong>Grande couronne</strong> : Yvelines (78), Essonne (91), Seine-et-Marne (77), Val-d'Oise (95)</li>
        </ul>
        <p>Nos délais d'intervention :</p>
        <ul>
          <li><strong>Paris & petite couronne</strong> : Moins de 30 minutes en urgence</li>
          <li><strong>Grande couronne</strong> : 45 à 60 minutes selon la localisation</li>
        </ul>
        <p>Pas de majoration kilométrique dans un rayon de 30km autour de Paris.</p>
      `
  },
  {
    id: 'geographie-2',
    question: 'Êtes-vous également présents en région PACA ?',
    answer: `
        <p><strong>Oui, nous avons des équipes dans toute la région PACA</strong> :</p>
        <ul>
          <li><strong>Alpes-Maritimes (06)</strong> : Nice, Cannes, Antibes, Grasse</li>
          <li><strong>Bouches-du-Rhône (13)</strong> : Marseille, Aix-en-Provence, Aubagne</li>
          <li><strong>Var (83)</strong> : Toulon, Hyères, Fréjus, Saint-Raphaël</li>
          <li><strong>Vaucluse (84)</strong> : Avignon, Orange, Carpentras</li>
        </ul>
        <p>Mêmes tarifs, mêmes garanties, mêmes délais d'intervention qu'en Île-de-France.</p>
        <p>Nos centres opérationnels sont situés à Paris, Marseille et Nice pour une couverture optimale.</p>
      `
  }
];