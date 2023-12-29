import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import data003 from "../database/data003.json";

const CartPageV2 = () => {
  // Access the parameters from the URL
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // demande le panier a lutilisateur
    const fetchCart = async () => {
      try {
        const getUserFromLocalStorage = JSON.parse(
          localStorage.getItem("user")
        )._id;
        if (null !== getUserFromLocalStorage) {
          console.log("getUserFromLocalStorage : ", getUserFromLocalStorage);
          try {
            const reponse = await fetch("/getCartFromOneUser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: getUserFromLocalStorage,
              }), // Include the data in the body
            });
            const cartData = await reponse.json();
            setCart(cartData);
          } catch (error) {
            console.error("Error during registration:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCart();
  }, []);

  const DisplayShoes = () => {
    return cart.map((shoe) => {
      let imageURL = null;
      for (const sneakerKey in data003) {
        const sneaker = data003[sneakerKey];
        if (parseInt(sneaker.id)=== parseInt(shoe.id)) {
          imageURL = sneaker.imageURL;
          break; // Sortir de la boucle une fois que l'objet est trouvé
        }
      }
      
      return (
        <div key={shoe._id}>
          <img src={imageURL} alt={imageURL} />
          <p>Shoe ID: {shoe.id}</p>
          <p>Selected Size: {shoe.size}</p>
          <p>Quantity: {shoe.quantity}</p>
        </div>
      );
    });
  };
  
  

  return (
    <div>
      <Header />
      <DisplayShoes />
      <Footer />
    </div>
  );
};

export default CartPageV2;
