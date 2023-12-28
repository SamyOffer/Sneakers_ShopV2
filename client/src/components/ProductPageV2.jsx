import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { getSpecificShoes } from "./Models/Models";

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
                        className={`mr-2 mb-2 p-2 border ${selectedSize === size ? "bg-slate-400 text-white" : ""
                            }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
};

const ProductPageV2 = () => {
  const [shoes, setShoes] = useState([]);
  const [quantity, setQuantity] = useState(1); // État pour suivre la quantité sélectionnée
  const { sneakerId } = useParams();
  const [selectedSize, setSelectedSize] = useState(""); // État pour stocker la taille sélectionnée


  useEffect(() => {
    const fetchData = async () => {
      try {
        const getShoes = await getSpecificShoes(sneakerId);
        setShoes(getShoes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [sneakerId]);

    
  const handleSizeSelection = (size) => {
    setSelectedSize(size);  
  };
    

  function displayShoesInformation() {
    const shoesVar = shoes[0];
    return (
      <div className="flex flex-col ml-44 mt-10 ">
        <h2 className="text-2xl font-bold text-center">{shoesVar.brand}</h2>
        <h1 className="text-4xl font-bold text-center">{shoesVar.name}</h1>
        <SizeSelector onSelectSize={handleSizeSelection} />
        <div className="flex mt-4">
          <button
            onClick={() => {setQuantity(quantity - 1 > 0 ? quantity - 1 : 1);
                console.log("quantity : ", quantity)}}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-l"
            
          >
            -
          </button>
          <div className="px-4 py-2 bg-gray-100 text-center">{quantity}</div>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-r"
          >
            +
          </button>
        </div>
        <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded">
          Ajouter au panier
        </button>
      </div>
    );
  }

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
          {displayShoesInformation()}
        </div>
      );
    } else {
      return <div>ERROR</div>;
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



