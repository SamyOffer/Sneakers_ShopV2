import React, { useEffect, useState } from "react";
import {useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import { getSpecificShoes } from "./Models/Models";
import Footer from "./Footer";

//* chatgpt
const SizeSelector = ({ onSelectSize, shoes }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [isInInventory, setIsInInventory] = useState(true);

  const sizes = Array.from({ length: 11 }, (_, index) => 38 + index);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    onSelectSize(size);
  };

  useEffect(() => {
    if (shoes.length > 0) {
      const firstShoe = shoes[0];
      setIsInInventory(firstShoe.is_in_inventory === true);
    } else {
      setIsInInventory(false);
    }
  }, [shoes]);

  return (
    <div className="my-10">
      {isInInventory === true ? <p className="text-1xl font-bold">Choose a size please : </p> : <p className="text-2xl font-bold  text-red-500">Not available</p>}
      <div className="flex flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeClick(size)}
            className={`mr-2 mb-2 p-2 border ${selectedSize === size ? "bg-slate-400 text-white" : ""} ${isInInventory === false ? "line-through" : ""
              }`}
            disabled={!isInInventory}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
/*
const DisplayDescription = ({ shoes }) => {
  const shoesVar = shoes && shoes[0]; 
  return (
    <div className="flex flex-col ml-44 mt-10 mr-44">
      {shoesVar ? (
        <p className="text-2xl font-bold text-center">{shoesVar.description}</p>
      ) : (
        <p className="text-xl text-center">No description available</p>
      )}
    </div>
  );
  }:*/
  const DisplayDescription = ({ shoes }) => {
    const shoesVar = shoes && shoes[0];  // si je ne mets pas ça alors j'ai une erreure qui me dis que shoes est vide  
    const description = shoesVar ? shoesVar.description : '';
  
    // Séparer le texte en mots
    const words = description.split(' ');
  
    // Extraire les trois premiers mots
    const firstThreeWords = words.slice(0, 3).join(' ');
  
    // Reste du texte après les trois premiers mots
    const remainingText = words.slice(3).join(' ');
  
    return (
      <div className="flex flex-col ml-44 mt-10 mr-44">
        <p className="text-2xl font-bold text-center">
          <span style={{ color: 'red' }}>{firstThreeWords}</span> {remainingText}
        </p>
      </div>
    );
  };
  

const ProductPageV2 = () => {
  const [shoes, setShoes] = useState([]);
  const [quantity, setQuantity] = useState(1); // État pour suivre la quantité sélectionnée
  const { sneakerId } = useParams();
  const [selectedSize, setSelectedSize] = useState(""); // État pour stocker la taille sélectionnée
  const navigate = useNavigate(); // Use useNavigate instead of useHistory



  useEffect(() => {
    const navigateToHome = () => {
      navigate("/");
    };

    const fetchData = async () => {
      try {
        const getShoes = await getSpecificShoes(sneakerId);
        setShoes(getShoes);

        // If getShoes is empty, navigate to "/"
        if (getShoes.length === 0) {
          navigateToHome();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [sneakerId, navigate]);



    
  const handleSizeSelection = (size) => {
    setSelectedSize(size);  
  };

  const addToCart = () => {
    // Check if the required information is available
    if (selectedSize && quantity > 0) {
      // Construct the URL with parameters
      const cartUrl = `/CartPage/${sneakerId}/${selectedSize}/${quantity}`;
      
      // Navigate to the cart page with parameters
      navigate(cartUrl);
    } else {
      // Handle the case where size or quantity is not selected
      console.error("Please select a size and quantity before adding to the cart.");
    }
  };
    

  function displayShoesInformation() {
    const shoesVar = shoes[0];
    return (
      <div className="flex flex-col ml-28 mt-10 ">
        <p  style={{ color: 'red' }} className="text-2xl font-bold text-center">{shoesVar.brand}</p>
        <p className="text-4xl font-bold text-center">{shoesVar.name}</p>
        <p className="text-3xl font-bold text-center mt-3">From {shoesVar.price}€</p>
        <SizeSelector onSelectSize={handleSizeSelection} shoes={shoes} />

        <p className="text-3xl font-bold text-center mb-3">{shoesVar.SKU}</p>
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
        <button className="mt-4 px-6 py-3 text-white rounded bg-black" onClick={addToCart}>
          Add to cart
        </button>
      </div>
    );
  }

  function displayImage() {
    const shoesVar = shoes[0];

    if (shoesVar) {
      return (
        <div className="flex flex-wrap ml-32 mt-10">
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
      <DisplayDescription  shoes={shoes}/>
      <Footer/>
    </div>
  );
};

export default ProductPageV2;



