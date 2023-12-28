import React from "react";
// eslint-disable-next-line no-unused-vars
import SlidingAnimationHomePage_css from "./css/slidingAnimationHomePage_css.css";
import { CiDeliveryTruck} from "react-icons/ci";
import {BsChatDots, BsStar} from "react-icons/bs";
import {PiContactlessPaymentThin} from "react-icons/pi";

/*
    * Ce composant est une animation coulissante qui affiche une liste de phrases avec des icônes.
 */
function SlidingAnimationHomePage() {
  const phrasesWithIcons = [
    { phrase: "Livraison offerte des 200€", icon: <CiDeliveryTruck /> },
    { phrase: "Service client dédié et disponible", icon: <BsChatDots /> },
    { phrase: "Produits authentiques", icon: <BsStar /> },
    { phrase: "Paiement en 2,3 ou 4 fois avec Alma", icon: <PiContactlessPaymentThin /> },
    { phrase: "Livraison offerte des 200€", icon: <CiDeliveryTruck /> },
    { phrase: "Service client dédié et disponible", icon: <BsChatDots /> },
    { phrase: "Produits authentiques", icon: <BsStar /> },
    { phrase: "Paiement en 2,3 ou 4 fois avec Alma", icon: <PiContactlessPaymentThin /> },
    { phrase: "Livraison offerte des 200€", icon: <CiDeliveryTruck /> },
    { phrase: "Service client dédié et disponible", icon: <BsChatDots /> },
    { phrase: "Produits authentiques", icon: <BsStar /> },
    { phrase: "Paiement en 2,3 ou 4 fois avec Alma", icon: <PiContactlessPaymentThin /> },
  ];

  return (
    <div className="slidingAnimationHomePage_container overflow:hidden">
      <div className="slidingAnimationHomePage_scroll">
        <div className="RightToLeft">
          {phrasesWithIcons.map((item, index) => (
            <div key={index} className="slidingAnimationHomePage__word flex items-center text-1xl">
              <div className="slidingAnimationHomePage__icon ml-2 text-3xl">
                {item.icon}
              </div>  
              <div className="slidingAnimationHomePage__phrase">
                {item.phrase}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SlidingAnimationHomePage;
