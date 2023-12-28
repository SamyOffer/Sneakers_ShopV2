import React, { useState, useEffect } from 'react';
import Header from './Header';
import modeles from '../database/modeles.json';
import { Link } from 'react-router-dom';


const SneakersPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => { // useEffect permet d'effectuer des actions au chargement de la page
    const importImages = async () => { // async permet d'attendre que les images soient chargées
      const importedImages = await Promise.all( // Promise.all permet d'attendre que toutes les promesses soient résolues
        modeles.map(async (modele) => { // map permet de parcourir tous les modeles de paires de sneakers
          const { default: image } = await import(`../assets/${modele.lien}`); // import permet d'importer une image
          return { ...modele, image }; // on retourne un objet avec les propriétés du modele et l'image
        })
      );
      setImages(importedImages); // on met à jour le state avec les images
    };

    importImages();
  }, []);

  return (
    <div className='SneakersPage'>
        <Header />
        <h1 className='text-3xl ml-28 mb-5 mt-5'> All the Sneakers </h1>
        <div className='flex flex-wrap ml-44'>
        {images.map((modele) => (
            <Link to={`/ProductPage/${modele.id}`} className='cursor-pointer mb-8 mr-8'>
            <img
                src={modele.image}
                alt={modele.nom}
                key={modele.id}
                className="object-cover w-[15em] h-[15em]"
            />        
            <div className='text-xl font-bold flex justify-between'>
                <div>{modele.nom}</div>
                <div>{modele.prix}€</div>
            </div>
            </Link>
        ))}
        </div>
    </div>
);

};

export default SneakersPage;
