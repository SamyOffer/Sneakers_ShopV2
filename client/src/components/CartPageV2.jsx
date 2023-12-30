import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import data003 from "../database/data003.json";
import { Link } from "react-router-dom";

const CartPageV2 = () => {
  // Access the parameters from the URL
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  useEffect(() => {
    // Calculate total price separately
    let totalPrice = 0;
    cart.forEach((shoe) => {
      for (const sneakerKey in data003) {
        const sneaker = data003[sneakerKey];
        if (parseInt(sneaker.id) === parseInt(shoe.id)) {
          totalPrice += sneaker.price * shoe.quantity;
          break; // Sortir de la boucle une fois que l'objet est trouvé
        }
      }
    });
    setTotalPrice(totalPrice);
  }, [cart]);

  const removeFromCart = async (sneakerId, size) => {
    try {
      const getUserFromLocalStorage = JSON.parse(
        localStorage.getItem("user")
      )._id;
      if (getUserFromLocalStorage !== null) {
        const response = await fetch("/removeFromCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: getUserFromLocalStorage,
            sneakerId,
            size,
          }),
        });
        const result = await response.json();

        // Update the cart state after removing the item
        if (result.message === "Item removed from cart") {
          const updatedCart = cart.filter(
            (item) => !(item.id === sneakerId && item.size === size)
          );
          setCart(updatedCart);
        }
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const DisplayShoes = () => {
    // Verifier si le panier est vide
    if (cart.length === 0) {
      return <p className="text-3xl text-center mt-20">Your Cart is empty !</p>;
    }
    const updateQuantity = async (sneakerId, size, newQuantity) => {
      try {
        const getUserFromLocalStorage = JSON.parse(
          localStorage.getItem("user")
        )._id;
        if (getUserFromLocalStorage !== null) {
          const response = await fetch("/updateQuantity", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: getUserFromLocalStorage,
              sneakerId,
              size,
              quantity: newQuantity,
            }),
          });
          const result = await response.json();
  
          // Si la mise à jour est réussie, mettez à jour le panier côté client
          if (result.message === "Quantity updated successfully") {
            const updatedCart = cart.map((item) =>
              item.id === sneakerId && item.size === size
                ? { ...item, quantity: newQuantity }
                : item
            );
            setCart(updatedCart);
          }
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    };
  
    return (
      <div className="flex flex-col items-start">
        {cart.map((shoe) => {
          let sneakerData = null;
          for (const sneakerKey in data003) {
            const sneaker = data003[sneakerKey];
            if (parseInt(sneaker.id) === parseInt(shoe.id)) {
              sneakerData = sneaker;
              break;
            }
          }
  
          return (
            <div key={sneakerData.id} className="flex items-center mb-4">
              <Link to={`/ProductPage/${sneakerData.id}`} key={sneakerData.id}>
                <img
                  src={sneakerData.imageURL}
                  alt={sneakerData.imageURL}
                  className="w-40 h-40 ml-20 mt-10 rounded"
                />
              </Link>
              <div>
                <p className="text-lg font-bold ml-5"> {sneakerData.name}</p>
                <p className="text-base ml-5 ">Selected Size: {shoe.size}</p>
                <div className="flex mt-4 pl-5">
                  <button
                    onClick={() => updateQuantity(shoe.id, shoe.size, shoe.quantity - 1 > 0 ? shoe.quantity - 1 : 1)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-l"
                  >
                    -
                  </button>
                  <div className="px-4 py-2 bg-gray-100 text-center">{shoe.quantity}</div>
                  <button
                    onClick={() => updateQuantity(shoe.id, shoe.size, shoe.quantity + 1)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-r"
                  >
                    +
                  </button>
                </div>
                <p className="text-base ml-5">Price: {sneakerData.price * shoe.quantity}€</p>
                <button
                  onClick={() => removeFromCart(shoe.id, shoe.size)}
                  className="text-red-500 underline ml-5 cursor-pointer"
                >
                  Remove from cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex">
        <div className="flex-1">
          <DisplayShoes />
        </div>
        {cart.length !== 0 ? (
          <div className="flex-0 p-4 mt-auto pr-48">
            <p className="text-2xl font-bold mb-20">
              Total Price: {totalPrice}€
            </p>
            <button className="bg-black text-white px-12 py-2 rounded border-2 border-white">
              {" "}
              {/* a faire rediriger avec stripe */}
              Validate my cart
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPageV2;
