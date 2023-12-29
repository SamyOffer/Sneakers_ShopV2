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
    { phrase: "Free delivery from 200€", icon: <CiDeliveryTruck /> },
    { phrase: "Dedicated and available customer service", icon: <BsChatDots /> },
    { phrase: "Authentic products", icon: <BsStar /> },
    { phrase: "Payment in 2, 3, or 4 times with Alma", icon: <PiContactlessPaymentThin /> },
    { phrase: "Free delivery from 200€", icon: <CiDeliveryTruck /> },
    { phrase: "Dedicated and available customer service", icon: <BsChatDots /> },
    { phrase: "Authentic products", icon: <BsStar /> },
    { phrase: "Payment in 2, 3, or 4 installments with Alma", icon: <PiContactlessPaymentThin /> },
    { phrase: "Free delivery from 200€", icon: <CiDeliveryTruck /> },
    { phrase: "Dedicated and available customer service", icon: <BsChatDots /> },
    { phrase: "Authentic products", icon: <BsStar /> },
    { phrase: "Payment in 2, 3, or 4 installments with Alma", icon: <PiContactlessPaymentThin /> }
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
              <div className="slidingAnimationHomePage__phrase text-1xl">
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
