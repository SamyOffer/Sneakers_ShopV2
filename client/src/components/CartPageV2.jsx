import React from "react";
import { useParams } from "react-router-dom";

const CartPageV2 = () => {
  // Access the parameters from the URL
  const { id, size, quantity } = useParams();

  return (
    <div>
      <h2>Cart Page</h2>
      <p>Shoe ID: {id}</p>
      <p>Selected Size: {size}</p>
      <p>Quantity: {quantity}</p>
      {/* Add more content as needed */}
    </div>
  );
};

export default CartPageV2;
