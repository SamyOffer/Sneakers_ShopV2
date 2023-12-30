import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const EditShippingInfo = () => {

    const location = useLocation();
    const [shippingAddress, setShippingAddress] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const navigate = useNavigate(); // Use useNavigate instead of useHistory


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const address = searchParams.get("shippingAddress");
    setShippingAddress(decodeURIComponent(address || ""));
  }, [location.search]);

  const handleEditAddress = async (e) => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis
    if (!street || !number || !postalCode || !city || !country) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }

    // Effectuer ici la logique d'édition de l'adresse avec les valeurs des champs du formulaire
    console.log("Form submitted with values:", {
      street,
      number,
      postalCode,
      city,
      country,
    });

    // Préparer les données pour la requête
    const userId = JSON.parse(localStorage.getItem("user"));

    const address = `${street} ${number}, ${postalCode} ${city}, ${country}`;

    try {
      // Envoyer la requête au serveur
      const response = await fetch("/EditMyShippingInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            userId, 
            address: JSON.stringify(address) 
        }),
      });
    console.log("response:", response);
      const result = await response.json();
        console.log("result:", result);
      if (response.ok) {
        alert("Adresse mise à jour avec succès !");
        // Rediriger l'utilisateur vers une autre page après la mise à jour réussie
        navigate("/MyAccount");
      } else {
        alert("Erreur lors de la mise à jour de l'adresse.");
      }
    } catch (error) {
      console.error("Error during address update:", error);
      alert("Erreur lors de la mise à jour de l'adresse.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <p className="text-3xl text-center">Edit Shipping Informations</p>
        {shippingAddress && (
          <p className="text-1xl text-center mt-4">
            The current shipping address is :{" "}
            <strong>{shippingAddress}</strong>
          </p>
        )}

        {/* Formulaire pour éditer l'adresse */}
        <form onSubmit={handleEditAddress} className="mt-8 max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="street" className="block text-sm font-bold">
              Street:
            </label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="form-input mt-1 p-2 w-full border rounded"
              required  // Champ obligatoire
            />
          </div>
          <div className="mb-4">
            <label htmlFor="number" className="block text-sm font-bold">
              Number:
            </label>
            <input
              type="text"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="form-input mt-1 p-2 w-full border rounded"
              required  // Champ obligatoire
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postalCode" className="block text-sm font-bold">
              Postal Code:
            </label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="form-input mt-1 p-2 w-full border rounded"
              required  // Champ obligatoire
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-bold">
              City:
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-input mt-1 p-2 w-full border rounded"
              required  // Champ obligatoire
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-bold">
              Country:
            </label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-input mt-1 p-2 w-full border rounded"
              required  // Champ obligatoire
            />
          </div>
          <button
            type="submit"
            className=" ml-2 px-2 py-2 text-gray-800 rounded bg-gray-300 hover:bg-gray-400 "
            
            >
            Edit My Address!
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default EditShippingInfo;
