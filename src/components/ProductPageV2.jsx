import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { getSpecificShoes } from "./Models/Models";

const ProductPageV2 = () => {
    const [shoes, setShoes] = useState([]);
    const { sneakerId } = useParams(); // on récupère l'id de la sneaker dans l'url

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getShoes = await getSpecificShoes(sneakerId);
                setShoes(getShoes);
                console.log(getShoes[0].imageURL);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    function displayShoesInformation() {
        const shoesVar = shoes[0];

        return (
            <div className="flex flex-col ml-44 mt-10">
                <h2 className="text-2xl font-bold text-center">{shoesVar.brand}</h2>
                <h1 className="text-4xl font-bold text-center">{shoesVar.name}</h1>
                <SizeSelector />
            </div>
        )
    }

    //* chatgpt
    const SizeSelector = () => {
        const [selectedSize, setSelectedSize] = useState(""); // État pour stocker la taille sélectionnée
      
        const sizes = Array.from({ length: 11 }, (_, index) => 38 + index); // Créer un tableau de tailles du 38 au 48
      
        const handleSizeClick = (size) => {
          setSelectedSize(size);
        };
      
        return (
          <div className="my-10">
            <label>Choisissez votre taille :</label>
            <div className="flex flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`mr-2 mb-2 p-2 border ${
                    selectedSize === size ? "bg-slate-400 text-white" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && (
              <p className="mt-2">Vous avez sélectionné la taille : {selectedSize}</p>
            )}
          </div>
        );
      };
      


    function displayImage() {
        const shoesVar = shoes[0];
    
        if (shoesVar) {
          return (
            <div className="flex flex-wrap ml-44 mt-10">
              <img
                src={shoesVar.imageURL}
                alt={shoesVar.imageURL}
                key={shoesVar.id}
                className="object-cover w-[30em] h-[30em]"
              />
                {displayShoesInformation()} {/* On affiche les informations de la sneaker - Pourquoi les infos ce mette BIEN a droite la jsp */}
                
            </div>
            
          );
        } else {
          return <div>ERROR</div>; // Message d'erreur si l'ID mis en paramètre ne correspond à aucune sneaker
        }
    }

    return (
        <div className="">
            <Header />
            {displayImage()}
          
        </div>
    );
};

export default ProductPageV2;



