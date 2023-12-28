// CartePage.js
import React from "react";
import Header from "./Header";
import { useContext , useState, useEffect} from "react";
import CartContext from "./CartContext";
import modeles from "../database/modeles.json";
import marques from "../database/marques.json";

const CartPage = ({}) => {
  // Faites quelque chose avec modeleId et selectedSize
  const context = useContext(CartContext)
  
  const sneakerId =  context.id; // on récupère l'id de la sneaker dans l'url
  console.log("sneakerId : ", context.id);
  const [sneaker] = useState(modeles[sneakerId - 1]); // car les tableaux json commencent à l'index 0
  const [marque, setMarque] = useState(0);
  const [images, setImages] = useState([]);

  console.log("sneaker : ", sneaker);

  useEffect(() => {
    // useEffect permet d'effectuer des actions au chargement de la page
    const importImages = async () => {
      const { default: image } = await import(`../assets/${sneaker.lien}`); // import permet d'importer une image
      setImages(image); // on met à jour le state avec les images
    };
    importImages();
    setMarque(marques[sneaker.marque_id]); // on met à jour le nom de la marque après avoir récupéré les données
  }, [sneaker.lien, sneaker.marque_id,]);



  return (
    <div>
      <Header />
      {/* Partie gauche de l'affichage */}
      {/* Contenu de la première paire  */}
      <div className="ml-44 mt-10 mr-96"> {/* mettre en noir le fond pour capter mieux - bg-black */}
        <div className="flex text-3xl font-bold ">
          My Cart 
        </div>
        <div className="flex mt-20 border-solid border-2 ">
        <img
            src={images}
            alt="air_max_90"
            className="object-cover ml-10 mt-7 mb-7 w-[10em] h-[10em] "
          />
          <div className="flex flex-col">
            <div className="ml-20 text-xl font-bold mt-10">
              <p>{sneaker.nom} - {marque.nom}</p>
            </div>
            <div className="ml-20 text-xl font-bold mt-10">
              <p>Size : {context.taille}</p>
            </div>
          </div>
        </div>

        {/* Contenu de la deuxième paire  */}
      </div>
      <div className="flex justify-end mt-10 mr-96">
        <button className="bg-black hover:text-gray-300 text-white font-bold py-2 px-4 rounded">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default CartPage;
