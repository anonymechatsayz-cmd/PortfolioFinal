import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'mentions' | 'cgv' | null;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen || !type) return null;

  const content = {
    mentions: (
      <>
        <h2 className="text-2xl font-bold mb-4">Mentions Légales</h2>
        <div className="space-y-4 text-gray-600">
          <p>Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.</p>
          
          <h3 className="text-lg font-bold text-anthracite mt-6">Edition du site</h3>
          <p>Le présent site, accessible à l’URL www.clementfranjou.fr (le « Site »), est édité par :</p>
          <p><strong>Clément Franjou</strong>, résidant à Paris, de nationalité Française (France), né(e) le 01/01/1990.</p>

          <h3 className="text-lg font-bold text-anthracite mt-6">Hébergement</h3>
          <p>Le Site est hébergé par la société Vercel Inc., situé 340 S Lemon Ave #4133 Walnut, CA 91789, (contact téléphonique ou email : https://vercel.com/contact).</p>

          <h3 className="text-lg font-bold text-anthracite mt-6">Directeur de publication</h3>
          <p>Le Directeur de la publication du Site est Clément Franjou.</p>

          <h3 className="text-lg font-bold text-anthracite mt-6">Nous contacter</h3>
          <p>Par email : clement.franjou@gmail.com</p>

          <h3 className="text-lg font-bold text-anthracite mt-6">Données personnelles</h3>
          <p>Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée, disponible depuis la section "Charte de Protection des Données Personnelles", conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 («RGPD»).</p>
        </div>
      </>
    ),
    cgv: (
      <>
        <h2 className="text-2xl font-bold mb-4">Conditions Générales de Vente (CGV)</h2>
        <div className="space-y-4 text-gray-600">
          <h3 className="text-lg font-bold text-anthracite mt-6">1. Objet</h3>
          <p>Les présentes conditions générales de vente ont pour objet, d'une part, d'informer tout éventuel consommateur sur les conditions et modalités dans lesquelles le vendeur procède à la vente et à la livraison des produits commandés, et d'autre part, de définir les droits et obligations des parties dans le cadre de la vente de produits par le vendeur au consommateur qui s'appliquent, sans restriction ni réserve, à l'ensemble des ventes, par la société Clément Franjou.</p>

          <h3 className="text-lg font-bold text-anthracite mt-6">2. Prix</h3>
          <p>Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables au jour de la commande), sauf indication contraire et hors frais de traitement et d'expédition.</p>

          <h3 className="text-lg font-bold text-anthracite mt-6">3. Commandes</h3>
          <p>Vous pouvez passer commande sur Internet via le formulaire de contact ou par email. Les informations contractuelles sont présentées en langue française et feront l'objet d'une confirmation au plus tard au moment de la validation de votre commande.</p>

          <h3 className="text-lg font-bold text-anthracite mt-6">4. Validation</h3>
          <p>Toute commande figurent sur le site Internet suppose l'adhésion aux présentes Conditions Générales. Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes conditions générales de vente, sans exception ni réserve.</p>
          
          <h3 className="text-lg font-bold text-anthracite mt-6">5. Paiement</h3>
          <p>Le fait de valider votre commande implique pour vous l'obligation de payer le prix indiqué. Le règlement de vos achats s'effectue par virement bancaire ou carte bancaire grâce au système sécurisé Stripe.</p>
        </div>
      </>
    )
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-anthracite/90 z-[80] flex items-center justify-center p-4"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl pointer-events-auto relative flex flex-col p-8">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <div className="mt-2">
                {content[type]}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
